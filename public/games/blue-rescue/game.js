(() => {
  "use strict";

  const W = 390;
  const H = 844;
  const GROUND_Y = 806;
  const THRUST_VISUAL_TAIL = 0.32;
  const SHIELD_DURATION = 9;
  const STORAGE_KEY = "blue-rescue-best";
  const core = window.BlueRescueCore;

  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const ui = {
    menu: document.querySelector("#menu"),
    gameOver: document.querySelector("#gameOver"),
    hud: document.querySelector("#hud"),
    hint: document.querySelector("#hint"),
    score: document.querySelector("#scoreValue"),
    rescued: document.querySelector("#rescuedValue"),
    combo: document.querySelector("#comboBadge"),
    fuelFill: document.querySelector("#fuelFill"),
    fuelValue: document.querySelector("#fuelValue"),
    shieldStatus: document.querySelector("#shieldStatus"),
    menuBest: document.querySelector("#menuBest"),
    finalScore: document.querySelector("#finalScore"),
    finalRescued: document.querySelector("#finalRescued"),
    finalCombo: document.querySelector("#finalCombo"),
    finalDistance: document.querySelector("#finalDistance"),
    newBest: document.querySelector("#newBest"),
    sound: document.querySelector("#soundButton"),
    share: document.querySelector("#shareButton"),
    shareStatus: document.querySelector("#shareStatus"),
    phaseNotice: document.querySelector("#phaseNotice"),
    fuelWarning: document.querySelector("#fuelWarning"),
  };

  const state = {
    mode: "menu",
    time: 0,
    playTime: 0,
    distance: 0,
    rescueScore: 0,
    rescued: 0,
    combo: 0,
    bestCombo: 0,
    best: Number(localStorage.getItem(STORAGE_KEY)) || 0,
    speed: 138,
    thrusting: false,
    thrustVisual: 0,
    spawnDistance: 320,
    eventIndex: 0,
    pickupTimer: 12,
    pickupIndex: 0,
    fuel: 100,
    shield: false,
    shieldTimer: 0,
    invulnerable: 0,
    shake: 0,
    flash: 0,
    muted: false,
    phase: 0,
    phaseNoticeTimer: 0,
    lowFuelAlerted: false,
    windForce: 0,
    fogExposure: 0,
  };

  const player = {
    x: 94,
    y: 360,
    vy: 0,
    tilt: 0,
    rotor: 0,
  };

  let obstacles = [];
  let rescues = [];
  let pickups = [];
  let particles = [];
  let popups = [];
  let audioContext = null;
  let rotorOscillator = null;
  let rotorGain = null;
  let lastTime = performance.now();
  let hintTimer = 0;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function score() {
    return core.calculateScore(state.distance, state.rescueScore);
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(value, min, max) {
    return core.clamp(value, min, max);
  }

  function show(element, visible) {
    element.classList.toggle("is-hidden", !visible);
  }

  function tone(frequency, duration, type = "sine", volume = 0.06, delay = 0) {
    if (state.muted) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const start = audioContext.currentTime + delay;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.02);
    } catch {
      state.muted = true;
      ui.sound.textContent = "SES KAPALI";
    }
  }

  function buttonTone() {
    tone(420, 0.07, "sine", 0.035);
  }

  function rescueTone() {
    tone(610, 0.12, "sine", 0.06);
    tone(890, 0.16, "sine", 0.05, 0.09);
  }

  function crashTone() {
    tone(95, 0.36, "sawtooth", 0.07);
    tone(62, 0.46, "square", 0.035, 0.05);
  }

  function pickupTone() {
    tone(480, 0.1, "triangle", 0.05);
    tone(720, 0.14, "sine", 0.045, 0.07);
  }

  function missTone() {
    tone(245, 0.12, "triangle", 0.035);
    tone(180, 0.16, "triangle", 0.025, 0.08);
  }

  function warningTone() {
    tone(330, 0.1, "square", 0.025);
    tone(330, 0.1, "square", 0.025, 0.16);
  }

  function haptic(pattern) {
    try {
      navigator.vibrate?.(pattern);
    } catch {
      // Haptics are an optional enhancement and may be unavailable.
    }
  }

  function startRotorSound() {
    if (state.muted || rotorOscillator) return;

    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      audioContext.resume?.();
      rotorOscillator = audioContext.createOscillator();
      rotorGain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      rotorOscillator.type = "sawtooth";
      rotorOscillator.frequency.value = 68;
      filter.type = "lowpass";
      filter.frequency.value = 240;
      rotorGain.gain.value = 0.0001;
      rotorOscillator.connect(filter).connect(rotorGain).connect(audioContext.destination);
      rotorOscillator.start();
      rotorGain.gain.setTargetAtTime(0.018, audioContext.currentTime, 0.06);
    } catch {
      rotorOscillator = null;
      rotorGain = null;
    }
  }

  function updateRotorSound() {
    if (!audioContext || !rotorOscillator || !rotorGain) return;
    const frequency = state.thrusting ? 92 : 72;
    const volume = state.thrusting ? 0.026 : 0.016;
    rotorOscillator.frequency.setTargetAtTime(frequency, audioContext.currentTime, 0.045);
    rotorGain.gain.setTargetAtTime(volume, audioContext.currentTime, 0.06);
  }

  function stopRotorSound() {
    if (!audioContext || !rotorOscillator || !rotorGain) return;
    const oscillator = rotorOscillator;
    rotorGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.025);
    oscillator.stop(audioContext.currentTime + 0.12);
    rotorOscillator = null;
    rotorGain = null;
  }

  function resetGame() {
    state.mode = "playing";
    state.playTime = 0;
    state.distance = 0;
    state.rescueScore = 0;
    state.rescued = 0;
    state.combo = 0;
    state.bestCombo = 0;
    state.speed = 138;
    state.spawnDistance = 270;
    state.eventIndex = 0;
    state.pickupTimer = 12;
    state.pickupIndex = 0;
    state.fuel = 100;
    state.shield = false;
    state.shieldTimer = 0;
    state.invulnerable = 0;
    state.shake = 0;
    state.flash = 0;
    state.phase = 0;
    state.phaseNoticeTimer = 0;
    state.lowFuelAlerted = false;
    state.windForce = 0;
    state.fogExposure = 0;
    state.thrusting = false;
    state.thrustVisual = 0;
    player.y = 365;
    player.vy = 0;
    player.tilt = 0;
    obstacles = [];
    rescues = [];
    pickups = [];
    particles = [];
    popups = [];
    hintTimer = 3.2;
    show(ui.menu, false);
    show(ui.gameOver, false);
    show(ui.hud, true);
    show(ui.hint, true);
    show(ui.phaseNotice, false);
    show(ui.fuelWarning, false);
    ui.shareStatus.textContent = "";
    updateHud();
    startRotorSound();
  }

  function goToMenu() {
    state.mode = "menu";
    state.thrusting = false;
    obstacles = [];
    rescues = [];
    pickups = [];
    particles = [];
    popups = [];
    ui.menuBest.textContent = state.best.toLocaleString("tr-TR");
    show(ui.menu, true);
    show(ui.gameOver, false);
    show(ui.hud, false);
    show(ui.hint, false);
    show(ui.phaseNotice, false);
    show(ui.fuelWarning, false);
    stopRotorSound();
  }

  function endGame() {
    if (state.mode !== "playing") return;
    state.mode = "gameover";
    state.thrusting = false;
    state.shake = 0.42;
    state.flash = 0.22;
    crashTone();
    haptic([80, 40, 120]);
    stopRotorSound();

    for (let i = 0; i < 20; i += 1) {
      particles.push({
        x: player.x + random(-10, 14),
        y: player.y + random(-8, 10),
        vx: random(-100, 95),
        vy: random(-130, 60),
        life: random(0.35, 0.8),
        maxLife: 0.8,
        color: Math.random() > 0.45 ? "#ffbf45" : "#214f70",
        size: random(2, 6),
      });
    }

    const finalScore = score();
    const isNewBest = finalScore > state.best;
    if (isNewBest) {
      state.best = finalScore;
      localStorage.setItem(STORAGE_KEY, String(state.best));
    }
    ui.finalScore.textContent = finalScore.toLocaleString("tr-TR");
    ui.finalRescued.textContent = String(state.rescued);
    ui.finalCombo.textContent = `×${state.bestCombo}`;
    ui.finalDistance.textContent = `${Math.floor(state.distance / 2)} m`;
    show(ui.newBest, isNewBest);
    show(ui.hud, false);
    show(ui.hint, false);

    window.setTimeout(() => {
      if (state.mode === "gameover") show(ui.gameOver, true);
    }, 360);
  }

  function setThrusting(active) {
    if (state.mode === "playing") {
      state.thrusting = active;
      if (active) state.thrustVisual = THRUST_VISUAL_TAIL;
      if (active) {
        hintTimer = 0;
        show(ui.hint, false);
      }
    }
  }

  function spawnEvent() {
    const x = W + 100;
    const phase = state.eventIndex % 6;

    if (phase === 0 || phase === 3) {
      const y = phase === 0 ? random(570, 690) : random(330, 570);
      rescues.push({ x, y, progress: 0, rescued: false, missed: false, pulse: random(0, Math.PI * 2), animation: 0 });
      state.spawnDistance = random(300, 345);
    } else if (phase === 1) {
      const difficulty = core.difficultyAt(state.playTime).progress;
      const gap = 282 - difficulty * 54;
      const center = random(250 + gap / 2, GROUND_Y - 75 - gap / 2);
      obstacles.push({ type: "cliff", x, width: 76, top: center - gap / 2, bottom: center + gap / 2 });
      state.spawnDistance = random(330, 390);
    } else if (phase === 2) {
      const y = random(190, 545);
      obstacles.push({
        type: "wind",
        x,
        y,
        width: random(175, 215),
        height: random(170, 220),
        direction: state.eventIndex % 2 === 0 ? -1 : 1,
        phase: random(0, Math.PI * 2),
        entered: false,
      });
      state.spawnDistance = random(315, 370);
    } else if (phase === 4) {
      if (state.playTime >= 14) {
        const y = random(220, 620);
        const difficulty = core.difficultyAt(state.playTime).progress;
        obstacles.push({
          type: "birds",
          x,
          y,
          phase: random(0, Math.PI * 2),
          flightSpeed: 24 + difficulty * 34,
        });
        state.spawnDistance = random(300, 360);
      } else {
        const gap = 275;
        const center = random(315, 600);
        obstacles.push({ type: "cliff", x, width: 70, top: center - gap / 2, bottom: center + gap / 2 });
        state.spawnDistance = random(345, 390);
      }
    } else if (state.playTime > 24) {
      obstacles.push({
        type: "fog",
        x,
        y: random(250, 545),
        width: random(210, 255),
        height: random(185, 240),
        phase: random(0, Math.PI * 2),
        entered: false,
      });
      state.spawnDistance = random(330, 385);
    } else {
      const y = random(430, 650);
      rescues.push({ x, y, progress: 0, rescued: false, missed: false, pulse: random(0, Math.PI * 2), animation: 0 });
      state.spawnDistance = random(305, 350);
    }
    state.eventIndex += 1;
  }

  function spawnPickup() {
    pickups.push({
      type: state.pickupIndex % 2 === 0 ? "shield" : "fuel",
      x: W + 80,
      y: random(230, 640),
      phase: random(0, Math.PI * 2),
      collected: false,
    });
    state.pickupIndex += 1;
    state.pickupTimer = random(15, 19);
  }

  function update(dt) {
    state.time += dt;
    state.flash = Math.max(0, state.flash - dt);
    state.shake = Math.max(0, state.shake - dt);
    player.rotor += dt * (state.mode === "playing" ? (state.thrusting ? 52 : 34) : 12);
    state.thrustVisual = state.thrusting ? THRUST_VISUAL_TAIL : Math.max(0, state.thrustVisual - dt);

    updateParticles(dt);
    updatePopups(dt);

    if (state.mode !== "playing") {
      player.y = 364 + Math.sin(state.time * 1.8) * 7;
      player.tilt += (Math.sin(state.time * 1.4) * 0.025 - player.tilt) * Math.min(1, dt * 3);
      return;
    }

    state.playTime += dt;
    state.phaseNoticeTimer = Math.max(0, state.phaseNoticeTimer - dt);
    if (state.phaseNoticeTimer <= 0) show(ui.phaseNotice, false);
    state.invulnerable = Math.max(0, state.invulnerable - dt);
    if (state.shield) {
      state.shieldTimer = Math.max(0, state.shieldTimer - dt);
      if (state.shieldTimer <= 0) {
        state.shield = false;
        popups.push({ x: player.x, y: player.y - 44, text: "KALKAN SONA ERDİ", life: 1.05 });
        tone(190, 0.12, "triangle", 0.025);
      }
    }
    state.fuel = Math.max(0, state.fuel - dt * (state.thrusting ? 1.05 : 0.72));
    state.pickupTimer -= dt;
    if (state.pickupTimer <= 0) spawnPickup();
    const difficulty = core.difficultyAt(state.playTime);
    state.speed = difficulty.speed;
    const phase = core.phaseAt(state.playTime);
    if (phase.index > state.phase) {
      state.phase = phase.index;
      state.phaseNoticeTimer = 2.2;
      ui.phaseNotice.textContent = phase.label;
      show(ui.phaseNotice, true);
      tone(520 + phase.index * 90, 0.12, "triangle", 0.035);
    }
    state.distance += state.speed * dt;
    state.spawnDistance -= state.speed * dt;
    if (state.spawnDistance <= 0) spawnEvent();

    const gravity = 440;
    const lift = 860;
    player.vy += (gravity - (state.thrusting ? lift : 0)) * dt;
    player.vy = clamp(player.vy, -270, 315);
    player.y += player.vy * dt;
    const targetTilt = clamp(player.vy / 530, -0.3, 0.42);
    player.tilt += (targetTilt - player.tilt) * Math.min(1, dt * 6);
    updateRotorSound();

    for (const obstacle of obstacles) {
      const obstacleSpeed = obstacle.type === "birds" ? state.speed + (obstacle.flightSpeed || 0) : state.speed;
      obstacle.x -= obstacleSpeed * dt;
      if (obstacle.type === "birds") obstacle.phase += dt * 5;
      else if (obstacle.type === "wind") obstacle.phase += dt * 4.2;
      else if (obstacle.type === "fog") obstacle.phase += dt * 0.8;
    }
    updateSoftHazards(dt);
    for (const rescue of rescues) {
      rescue.x -= state.speed * dt;
      rescue.pulse += dt * 3;
      updateRescue(rescue, dt);
    }
    for (const pickup of pickups) {
      pickup.x -= state.speed * dt;
      pickup.phase += dt * 3.4;
      const dx = player.x - pickup.x;
      const dy = player.y - pickup.y;
      if (!pickup.collected && dx * dx + dy * dy < 31 * 31) collectPickup(pickup);
    }
    obstacles = obstacles.filter((item) => item.x > -130);
    rescues = rescues.filter((item) => item.x > -120);
    pickups = pickups.filter((item) => !item.collected && item.x > -80);

    hintTimer -= dt;
    if (hintTimer <= 0) show(ui.hint, false);

    if (state.fuel <= 0) {
      popups.push({ x: player.x, y: player.y - 46, text: "YAKIT BİTTİ", life: 1.2 });
      endGame();
    } else if (checkCollision()) {
      if (state.shield) absorbImpact();
      else endGame();
    }
    if (core.isFuelCritical(state.fuel) && !state.lowFuelAlerted) {
      state.lowFuelAlerted = true;
      warningTone();
      haptic([25, 35, 25]);
    }
    updateHud();
  }

  function updateSoftHazards(dt) {
    state.windForce = 0;
    state.fogExposure = 0;

    for (const obstacle of obstacles) {
      if (obstacle.type === "wind") {
        const zone = { x: obstacle.x, y: obstacle.y, w: obstacle.width, h: obstacle.height };
        const envelope = core.softZoneEnvelope(player.x, player.y, zone, 38);
        if (envelope <= 0) continue;

        const gust = obstacle.direction * (145 + Math.sin(obstacle.phase) * 58) * envelope;
        state.windForce += gust;
        player.vy = clamp(player.vy + gust * dt, -290, 330);
        player.tilt += obstacle.direction * envelope * 0.008;
        state.shake = Math.max(state.shake, envelope * 0.055);

        if (!obstacle.entered && envelope > 0.18) {
          obstacle.entered = true;
          popups.push({
            x: player.x + 18,
            y: player.y - 48,
            text: obstacle.direction < 0 ? "YÜKSELEN RÜZGÂR ↑" : "ALÇALAN RÜZGÂR ↓",
            life: 1.15,
          });
          tone(235, 0.1, "sine", 0.025);
          haptic(14);
        }
      } else if (obstacle.type === "fog") {
        const zone = { x: obstacle.x, y: obstacle.y, w: obstacle.width, h: obstacle.height };
        const exposure = core.softZoneEnvelope(player.x, player.y, zone, 48);
        state.fogExposure = Math.max(state.fogExposure, exposure);
        if (!obstacle.entered && exposure > 0.16) {
          obstacle.entered = true;
          popups.push({ x: player.x + 18, y: player.y - 48, text: "YOĞUN SİS • GÖRÜŞ AZALDI", life: 1.2 });
          tone(180, 0.14, "sine", 0.018);
        }
      }
    }
  }

  function collectPickup(pickup) {
    pickup.collected = true;
    pickupTone();
    if (pickup.type === "fuel") {
      state.fuel = Math.min(100, state.fuel + 36);
      if (!core.isFuelCritical(state.fuel)) state.lowFuelAlerted = false;
      popups.push({ x: pickup.x, y: pickup.y - 34, text: "YAKIT +36", life: 1.05 });
    } else {
      state.shield = true;
      state.shieldTimer = SHIELD_DURATION;
      popups.push({ x: pickup.x, y: pickup.y - 34, text: `KALKAN ${SHIELD_DURATION} SN`, life: 1.05 });
    }
    haptic(18);

    for (let i = 0; i < 12; i += 1) {
      particles.push({
        x: pickup.x,
        y: pickup.y,
        vx: random(-70, 70),
        vy: random(-85, 45),
        life: random(0.35, 0.75),
        maxLife: 0.75,
        color: pickup.type === "fuel" ? "#72e0a1" : "#7ddcff",
        size: random(2, 5),
      });
    }
  }

  function absorbImpact() {
    state.shield = false;
    state.shieldTimer = 0;
    state.invulnerable = 1.35;
    state.flash = 0.16;
    state.shake = 0.3;
    player.y = clamp(player.y, 48, GROUND_Y - 48);
    player.vy = -165;
    obstacles = obstacles.filter((obstacle) => Math.abs(obstacle.x - player.x) > 105);
    popups.push({ x: player.x, y: player.y - 44, text: "KALKAN KORUDU", life: 1.1 });
    pickupTone();
    haptic([45, 25, 45]);
  }

  function updateRescue(rescue, dt) {
    if (rescue.rescued) {
      rescue.animation = Math.max(0, rescue.animation - dt);
      return;
    }
    if (rescue.missed) return;

    if (core.isRescueMissed(rescue.x, player.x)) {
      rescue.missed = true;
      rescue.progress = 0;
      if (state.combo > 0) {
        state.combo = 0;
        popups.push({ x: player.x + 44, y: player.y - 50, text: "KOMBO KAYBI", life: 1.05 });
        missTone();
      }
      return;
    }
    const centerY = rescue.y - 40;
    const dx = player.x - rescue.x;
    const dy = player.y - centerY;
    const withinZone = dx * dx + dy * dy < 72 * 72;
    rescue.progress = core.advanceRescue(rescue.progress, withinZone, dt);

    if (rescue.progress >= 0.62) {
      rescue.rescued = true;
      rescue.animation = 0.62;
      state.rescued += 1;
      state.combo = Math.min(5, state.combo + 1);
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      const gained = 100 * state.combo;
      state.rescueScore += gained;
      rescueTone();
      haptic(24);
      popups.push({ x: rescue.x, y: centerY - 52, text: `KURTARILDI +${gained}`, life: 1.2 });

      for (let i = 0; i < 13; i += 1) {
        particles.push({
          x: rescue.x,
          y: centerY,
          vx: random(-75, 75),
          vy: random(-95, 45),
          life: random(0.45, 0.9),
          maxLife: 0.9,
          color: Math.random() > 0.35 ? "#ffd45b" : "#ffffff",
          size: random(2, 5),
        });
      }
    }
  }

  function updateParticles(dt) {
    for (const particle of particles) {
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 130 * dt;
    }
    particles = particles.filter((particle) => particle.life > 0);
  }

  function updatePopups(dt) {
    for (const popup of popups) {
      popup.life -= dt;
      popup.y -= 25 * dt;
    }
    popups = popups.filter((popup) => popup.life > 0);
  }

  function updateHud() {
    ui.score.textContent = score().toLocaleString("tr-TR");
    ui.rescued.textContent = String(state.rescued);
    ui.combo.textContent = `KOMBO ×${Math.max(1, state.combo)}`;
    ui.combo.classList.toggle("is-active", state.combo > 1);
    ui.fuelValue.textContent = String(Math.ceil(state.fuel));
    ui.fuelFill.style.transform = `scaleX(${state.fuel / 100})`;
    ui.fuelFill.classList.toggle("is-low", state.fuel < 25);
    ui.shieldStatus.classList.toggle("is-active", state.shield);
    ui.shieldStatus.textContent = state.shield ? `KALKAN ${Math.ceil(state.shieldTimer)} SN` : "KALKAN YOK";
    show(ui.fuelWarning, state.mode === "playing" && core.isFuelCritical(state.fuel));
  }

  function checkCollision() {
    if (state.invulnerable > 0) return false;
    const px = player.x;
    const py = player.y;
    const radius = 14;
    if (py - radius < 18 || py + radius > GROUND_Y) return true;

    for (const obstacle of obstacles) {
      if (obstacle.type === "cliff") {
        const topRect = { x: obstacle.x + 5, y: 0, w: obstacle.width - 10, h: obstacle.top };
        const bottomRect = { x: obstacle.x + 5, y: obstacle.bottom, w: obstacle.width - 10, h: GROUND_Y - obstacle.bottom };
        if (core.circleRectCollision(px, py, radius, topRect) || core.circleRectCollision(px, py, radius, bottomRect)) return true;
      } else if (obstacle.type === "birds") {
        const wave = Math.sin(obstacle.phase) * 14;
        const birdPositions = [[0, 0], [30, -15], [58, 8]];
        for (const [ox, oy] of birdPositions) {
          const dx = px - (obstacle.x + ox);
          const dy = py - (obstacle.y + oy + wave);
          if (dx * dx + dy * dy < 22 * 22) return true;
        }
      }
    }

    for (const rescue of rescues) {
      if (rescue.rescued) continue;
      const platform = { x: rescue.x - 31, y: rescue.y + 17, w: 62, h: 15 };
      if (core.circleRectCollision(px, py, radius, platform)) return true;
    }
    return false;
  }

  function draw() {
    ctx.save();
    if (state.shake > 0) ctx.translate(random(-5, 5) * state.shake * 2, random(-5, 5) * state.shake * 2);
    drawBackground();
    drawWorld();
    drawFogBanks();
    drawFog();
    drawParticles();
    drawPlayer();
    drawPopups();
    ctx.restore();

    if (state.flash > 0) {
      ctx.fillStyle = `rgba(255, 240, 205, ${state.flash * 2.4})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function drawBackground() {
    const night = state.mode === "playing" ? clamp((state.playTime - 28) / 62, 0, 1) : 0;
    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, "#55bde3");
    gradient.addColorStop(0.55, "#a5e0ed");
    gradient.addColorStop(1, "#d9ece2");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 236, 158, 0.74)";
    ctx.beginPath();
    ctx.arc(318, 132, 42, 0, Math.PI * 2);
    ctx.fill();

    const cloudOffset = -((state.time * 7 + state.distance * 0.035) % 520);
    for (let i = -1; i < 2; i += 1) {
      drawCloud(cloudOffset + i * 520 + 110, 190 + (i % 2) * 120, 0.85);
      drawCloud(cloudOffset + i * 520 + 340, 310 - (i % 2) * 70, 0.58);
    }

    const far = -((state.distance * 0.12) % 300);
    ctx.fillStyle = "#7db9bc";
    ctx.beginPath();
    ctx.moveTo(-100, GROUND_Y);
    for (let x = far - 300; x < W + 350; x += 150) {
      ctx.lineTo(x, 660);
      ctx.lineTo(x + 73, 520 + ((x / 150) % 2) * 42);
      ctx.lineTo(x + 150, 660);
    }
    ctx.lineTo(W + 100, GROUND_Y);
    ctx.closePath();
    ctx.fill();

    const near = -((state.distance * 0.29) % 250);
    ctx.fillStyle = "#4d8986";
    ctx.beginPath();
    ctx.moveTo(-100, GROUND_Y);
    for (let x = near - 250; x < W + 300; x += 125) {
      ctx.lineTo(x, 728);
      ctx.quadraticCurveTo(x + 58, 620 + ((x / 125) % 2) * 25, x + 125, 728);
    }
    ctx.lineTo(W + 100, GROUND_Y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#284f51";
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
    ctx.fillStyle = "rgba(173, 219, 187, 0.48)";
    ctx.fillRect(0, GROUND_Y, W, 4);

    if (night > 0) {
      ctx.fillStyle = `rgba(5, 18, 48, ${night * 0.72})`;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = night;
      ctx.fillStyle = "#eaf6ff";
      const stars = [[34, 116], [78, 225], [132, 92], [184, 174], [238, 78], [280, 260], [344, 205], [363, 76], [208, 318], [54, 365]];
      for (const [x, y] of stars) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#edf8ff";
      ctx.beginPath();
      ctx.arc(318, 132, 29, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(38, 70, 104, ${night})`;
      ctx.beginPath();
      ctx.arc(330, 121, 27, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255, 255, 255, 0.44)";
    ctx.beginPath();
    ctx.arc(-28, 5, 22, 0, Math.PI * 2);
    ctx.arc(0, -5, 30, 0, Math.PI * 2);
    ctx.arc(32, 7, 21, 0, Math.PI * 2);
    ctx.rect(-30, 5, 62, 23);
    ctx.fill();
    ctx.restore();
  }

  function drawFog() {
    if (state.mode !== "playing") return;
    const fog = clamp((state.playTime - 24) / 22, 0, 1);
    if (fog <= 0) return;

    const offset = -((state.distance * 0.46) % 520);
    ctx.save();
    ctx.globalAlpha = fog * 0.2;
    ctx.fillStyle = "#eaf8fb";
    for (let i = -1; i < 2; i += 1) {
      const x = offset + i * 520 + 180;
      const y = 430 + Math.sin(state.time * 0.35 + i) * 70;
      ctx.beginPath();
      ctx.ellipse(x, y, 170, 38, -0.08, 0, Math.PI * 2);
      ctx.ellipse(x + 118, y + 32, 135, 31, 0.06, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawWorld() {
    for (const rescue of rescues) drawRescue(rescue);
    for (const pickup of pickups) drawPickup(pickup);
    for (const obstacle of obstacles) {
      if (obstacle.type === "cliff") drawCliff(obstacle);
      else if (obstacle.type === "birds") drawBirds(obstacle);
      else if (obstacle.type === "wind") drawWindCorridor(obstacle);
    }
  }

  function drawCliff(obstacle) {
    const { x, width, top, bottom } = obstacle;
    ctx.fillStyle = "#234a50";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + width, 0);
    ctx.lineTo(x + width, top - 13);
    ctx.lineTo(x + width - 10, top - 2);
    ctx.lineTo(x + width - 24, top - 9);
    ctx.lineTo(x + width - 39, top + 2);
    ctx.lineTo(x + 20, top - 6);
    ctx.lineTo(x, top + 4);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, GROUND_Y);
    ctx.lineTo(x, bottom + 7);
    ctx.lineTo(x + 15, bottom - 3);
    ctx.lineTo(x + 31, bottom + 6);
    ctx.lineTo(x + 49, bottom - 2);
    ctx.lineTo(x + width, bottom + 8);
    ctx.lineTo(x + width, GROUND_Y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#5c8b72";
    ctx.fillRect(x + 4, top - 3, width - 8, 5);
    ctx.fillRect(x + 4, bottom + 1, width - 8, 5);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(x + 10, 0, 7, Math.max(0, top - 12));
    ctx.fillRect(x + 10, bottom + 12, 7, GROUND_Y - bottom - 12);
  }

  function drawBirds(obstacle) {
    const wave = Math.sin(obstacle.phase) * 14;
    const wing = Math.sin(obstacle.phase * 2.2) * 5;
    const positions = [[0, 0], [30, -15], [58, 8]];
    for (const [ox, oy] of positions) {
      ctx.save();
      ctx.translate(obstacle.x + ox, obstacle.y + oy + wave);
      ctx.strokeStyle = "#163b4a";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-10, wing);
      ctx.quadraticCurveTo(-4, -5, 0, 1);
      ctx.quadraticCurveTo(5, -5, 11, wing);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawWindCorridor(obstacle) {
    const { x, y, width, height, direction, phase } = obstacle;
    ctx.save();
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, "rgba(117, 222, 239, 0)");
    gradient.addColorStop(0.32, "rgba(117, 222, 239, 0.09)");
    gradient.addColorStop(0.68, "rgba(117, 222, 239, 0.13)");
    gradient.addColorStop(1, "rgba(117, 222, 239, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);

    ctx.lineCap = "round";
    for (let i = 0; i < 7; i += 1) {
      const progress = (i / 7 + state.time * 0.46) % 1;
      const streamX = x + progress * width;
      const baseY = y + 20 + (i % 5) * (height - 40) / 4;
      const drift = Math.sin(phase + i * 1.7) * 13;
      const endY = baseY + direction * (24 + (i % 3) * 9) + drift;
      const alpha = Math.sin(progress * Math.PI) * 0.5;
      ctx.strokeStyle = `rgba(220, 250, 255, ${alpha})`;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(streamX - 20, baseY);
      ctx.bezierCurveTo(streamX - 2, baseY - direction * 8, streamX + 13, endY - direction * 9, streamX + 28, endY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(streamX + 28, endY);
      ctx.lineTo(streamX + 20, endY - direction * 10);
      ctx.moveTo(streamX + 28, endY);
      ctx.lineTo(streamX + 34, endY - direction * 11);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(230, 252, 255, 0.76)";
    ctx.font = "800 10px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(direction < 0 ? "YÜKSELEN HAVA" : "ALÇALAN HAVA", x + width / 2, y + 16);
    ctx.restore();
  }

  function drawFogBanks() {
    for (const obstacle of obstacles) {
      if (obstacle.type !== "fog") continue;
      const { x, y, width, height, phase } = obstacle;
      ctx.save();
      const haze = ctx.createRadialGradient(
        x + width * 0.48,
        y + height * 0.48,
        12,
        x + width * 0.5,
        y + height * 0.5,
        width * 0.62,
      );
      haze.addColorStop(0, `rgba(232, 247, 249, ${0.58 + state.fogExposure * 0.14})`);
      haze.addColorStop(0.62, "rgba(222, 242, 246, 0.38)");
      haze.addColorStop(1, "rgba(222, 242, 246, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(x - 28, y - 24, width + 56, height + 48);

      ctx.fillStyle = "rgba(248, 254, 255, 0.3)";
      for (let i = 0; i < 5; i += 1) {
        const fogX = x + ((i * 53 + state.time * 11) % (width + 70)) - 35;
        const fogY = y + height * (0.2 + (i % 3) * 0.27) + Math.sin(phase + i) * 9;
        ctx.beginPath();
        ctx.ellipse(fogX, fogY, 68, 19, 0.04 * (i - 2), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawPickup(pickup) {
    const bob = Math.sin(pickup.phase) * 6;
    ctx.save();
    ctx.translate(pickup.x, pickup.y + bob);
    ctx.rotate(Math.sin(pickup.phase * 0.7) * 0.1);
    ctx.shadowColor = pickup.type === "fuel" ? "#72e0a1" : "#76d9ff";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "rgba(8, 39, 61, 0.88)";
    ctx.strokeStyle = pickup.type === "fuel" ? "#72e0a1" : "#76d9ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 23, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (pickup.type === "fuel") {
      ctx.fillStyle = "#72e0a1";
      ctx.beginPath();
      ctx.roundRect(-8, -11, 16, 23, 3);
      ctx.fill();
      ctx.strokeStyle = "#d8fff0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-3, -6);
      ctx.lineTo(4, -6);
      ctx.moveTo(7, -6);
      ctx.quadraticCurveTo(14, -3, 10, 7);
      ctx.stroke();
    } else {
      ctx.fillStyle = "rgba(118, 217, 255, 0.24)";
      ctx.strokeStyle = "#b9efff";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(12, -8);
      ctx.lineTo(9, 7);
      ctx.quadraticCurveTo(0, 15, -9, 7);
      ctx.lineTo(-12, -8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawRescue(rescue) {
    const zoneY = rescue.y - 40;
    const pulse = 1 + Math.sin(rescue.pulse) * 0.04;
    if (!rescue.rescued) {
      ctx.save();
      ctx.translate(rescue.x, zoneY);
      ctx.scale(pulse, pulse);
      ctx.strokeStyle = "rgba(255, 210, 76, 0.74)";
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 7]);
      ctx.beginPath();
      ctx.arc(0, 0, 74, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      if (rescue.progress > 0) {
        ctx.strokeStyle = "#fff1a7";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(0, 0, 64, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (rescue.progress / 0.62));
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.fillStyle = "#294e55";
    ctx.beginPath();
    ctx.roundRect(rescue.x - 31, rescue.y + 17, 62, 15, 4);
    ctx.fill();
    ctx.fillStyle = "#6fa17b";
    ctx.fillRect(rescue.x - 28, rescue.y + 17, 56, 4);

    if (!rescue.rescued) {
      drawPerson(rescue.x, rescue.y);
    } else if (rescue.animation > 0) {
      const progress = 1 - rescue.animation / 0.62;
      const eased = 1 - (1 - progress) * (1 - progress);
      const personX = rescue.x + (player.x - rescue.x) * eased;
      const personY = rescue.y + (player.y + 19 - rescue.y) * eased;
      ctx.strokeStyle = "rgba(225, 245, 250, 0.88)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(player.x - 2, player.y + 13);
      ctx.lineTo(personX, personY - 10);
      ctx.stroke();
      ctx.setLineDash([]);
      drawPerson(personX, personY, 1 - progress * 0.25);
    }
  }

  function drawPerson(x, y, alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "#163243";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y - 2);
    ctx.lineTo(x, y + 11);
    ctx.moveTo(x, y + 3);
    ctx.lineTo(x - 6, y + 8);
    ctx.moveTo(x, y + 3);
    ctx.lineTo(x + 7, y - 4);
    ctx.moveTo(x, y + 11);
    ctx.lineTo(x - 5, y + 17);
    ctx.moveTo(x, y + 11);
    ctx.lineTo(x + 5, y + 17);
    ctx.stroke();
    ctx.fillStyle = "#ffd45b";
    ctx.beginPath();
    ctx.arc(x, y - 8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ed7b3a";
    ctx.fillRect(x - 5, y - 1, 10, 11);
    ctx.restore();
  }

  // The generic helicopter is intentionally isolated here so a future approved
  // sprite can replace only this renderer without touching gameplay code.
  function drawPlayer() {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.tilt);

    if (state.shield || state.invulnerable > 0) {
      const pulse = 1 + Math.sin(state.time * 8) * 0.035;
      const shieldRatio = state.shield ? clamp(state.shieldTimer / SHIELD_DURATION, 0, 1) : 1;
      const expiryBlink = state.shield && state.shieldTimer < 3 ? 0.55 + Math.sin(state.time * 18) * 0.28 : 1;
      ctx.save();
      ctx.scale(pulse, pulse);
      ctx.strokeStyle = state.invulnerable > 0
        ? "rgba(255,255,255,0.72)"
        : `rgba(105, 220, 255, ${(0.38 + shieldRatio * 0.4) * expiryBlink})`;
      ctx.fillStyle = `rgba(105, 220, 255, ${0.045 + shieldRatio * 0.055})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(-10, 0, 62, 37, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    drawRotorWash();

    // Shadow keeps the compact silhouette readable against bright clouds.
    ctx.fillStyle = "rgba(13, 42, 57, 0.16)";
    ctx.beginPath();
    ctx.ellipse(-6, 22, 43, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail boom and stabilizers sit behind the cabin.
    const tailGradient = ctx.createLinearGradient(-61, -14, -20, 8);
    tailGradient.addColorStop(0, "#174e7e");
    tailGradient.addColorStop(1, "#2f88c8");
    ctx.fillStyle = tailGradient;
    ctx.beginPath();
    ctx.moveTo(-21, -7);
    ctx.lineTo(-57, -18);
    ctx.lineTo(-61, -11);
    ctx.lineTo(-27, 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#d8f3f7";
    ctx.beginPath();
    ctx.moveTo(-52, -16);
    ctx.lineTo(-60, -30);
    ctx.lineTo(-47, -18);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-50, -13);
    ctx.lineTo(-63, -6);
    ctx.lineTo(-48, -8);
    ctx.closePath();
    ctx.fill();

    // Fuselage uses a subtle gradient and a pale rescue stripe.
    const bodyGradient = ctx.createLinearGradient(-24, -15, 30, 17);
    bodyGradient.addColorStop(0, "#195b95");
    bodyGradient.addColorStop(0.55, "#247fbe");
    bodyGradient.addColorStop(1, "#45a1d1");
    ctx.fillStyle = bodyGradient;
    ctx.strokeStyle = "#123f63";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-13, -14);
    ctx.quadraticCurveTo(14, -18, 29, -3);
    ctx.quadraticCurveTo(35, 4, 25, 13);
    ctx.quadraticCurveTo(12, 21, -9, 17);
    ctx.quadraticCurveTo(-28, 14, -31, 3);
    ctx.quadraticCurveTo(-30, -8, -13, -14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(225, 247, 250, 0.88)";
    ctx.beginPath();
    ctx.moveTo(-28, 4);
    ctx.quadraticCurveTo(-2, 9, 28, 3);
    ctx.lineTo(27, 8);
    ctx.quadraticCurveTo(0, 14, -24, 10);
    ctx.closePath();
    ctx.fill();

    // Split cockpit glass gives the nose more depth without using a branded asset.
    ctx.fillStyle = "#102f48";
    ctx.beginPath();
    ctx.moveTo(5, -12);
    ctx.quadraticCurveTo(20, -10, 28, -2);
    ctx.quadraticCurveTo(30, 1, 27, 3);
    ctx.lineTo(7, 1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(210, 244, 250, 0.72)";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(14, -10);
    ctx.lineTo(13, 1);
    ctx.stroke();
    ctx.fillStyle = "rgba(184, 233, 245, 0.48)";
    ctx.beginPath();
    ctx.moveTo(8, -10);
    ctx.lineTo(13, -9);
    ctx.lineTo(8, -1);
    ctx.closePath();
    ctx.fill();

    // Cabin door, rescue badge, intake and anti-collision beacon.
    ctx.strokeStyle = "rgba(13, 54, 82, 0.58)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(-11, -10, 18, 23, 4);
    ctx.stroke();
    ctx.fillStyle = "#f4a340";
    ctx.beginPath();
    ctx.arc(-18, 1, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff5d6";
    ctx.fillRect(-21, -0.5, 6, 3);
    ctx.fillRect(-19.5, -2, 3, 6);
    ctx.fillStyle = "#153f5f";
    ctx.fillRect(-3, -8, 6, 2);
    ctx.fillStyle = "#ff6b48";
    ctx.beginPath();
    ctx.arc(-8, -15, 2.3, Math.PI, 0);
    ctx.fill();

    // Twin landing skids feel more structural than the former single line.
    ctx.strokeStyle = "#153347";
    ctx.lineWidth = 2.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-15, 15);
    ctx.lineTo(-12, 22);
    ctx.moveTo(14, 15);
    ctx.lineTo(17, 21);
    ctx.moveTo(-22, 22);
    ctx.quadraticCurveTo(-1, 25, 25, 21);
    ctx.stroke();

    // Tail rotor guard and three-blade rotor.
    ctx.strokeStyle = "#14364c";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(-58, -14, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.save();
    ctx.translate(-58, -14);
    ctx.rotate(player.rotor * 1.7);
    ctx.fillStyle = "#d7f1f5";
    for (let i = 0; i < 3; i += 1) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.moveTo(0, -1.4);
      ctx.quadraticCurveTo(6, -2.5, 9, 0);
      ctx.quadraticCurveTo(5, 2, 0, 1.4);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = "#f4a340";
    ctx.beginPath();
    ctx.arc(0, 0, 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Engine housing, mast and an elliptical side-view rotor disk.
    ctx.fillStyle = "#e1f4f6";
    ctx.beginPath();
    ctx.roundRect(-16, -18, 18, 6, 3);
    ctx.fill();
    ctx.strokeStyle = "#14364c";
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(-8, -18);
    ctx.lineTo(-8, -23);
    ctx.stroke();
    ctx.save();
    ctx.translate(-8, -23);
    ctx.strokeStyle = "#15374c";
    const rotorPower = state.mode === "playing" ? clamp(state.thrustVisual / THRUST_VISUAL_TAIL, 0, 1) : 0;
    ctx.fillStyle = `rgba(205, 238, 246, ${0.16 + rotorPower * 0.13})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 49 + rotorPower * 8, 4.3 + rotorPower * 1.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    const rotorX = Math.cos(player.rotor) * 49;
    const rotorY = Math.sin(player.rotor) * 4.2;
    const rotorX2 = Math.cos(player.rotor + Math.PI / 2) * 49;
    const rotorY2 = Math.sin(player.rotor + Math.PI / 2) * 4.2;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-rotorX, -rotorY);
    ctx.lineTo(rotorX, rotorY);
    ctx.moveTo(-rotorX2, -rotorY2);
    ctx.lineTo(rotorX2, rotorY2);
    ctx.stroke();
    ctx.fillStyle = "#f4a340";
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.restore();
  }

  function drawRotorWash() {
    if (state.mode !== "playing" || state.thrustVisual <= 0) return;

    ctx.save();
    ctx.rotate(-player.tilt);
    ctx.lineCap = "round";
    const visualPower = clamp(state.thrustVisual / THRUST_VISUAL_TAIL, 0, 1);
    for (let i = 0; i < 4; i += 1) {
      const progress = (state.time * 2.65 + i / 4) % 1;
      const y = 21 + progress * 55;
      const width = 22 + progress * 53;
      const curve = 3 + progress * 8;
      const alpha = (1 - progress) * 0.34 * visualPower;
      ctx.strokeStyle = `rgba(222, 248, 255, ${alpha})`;
      ctx.lineWidth = 2.2 - progress * 0.8;
      ctx.beginPath();
      ctx.moveTo(-width, y);
      ctx.bezierCurveTo(-width * 0.52, y + curve, width * 0.52, y + curve, width, y);
      ctx.stroke();
    }

    const pressure = 0.78 + Math.sin(state.time * 15) * 0.08;
    ctx.strokeStyle = `rgba(235, 252, 255, ${pressure * 0.3 * visualPower})`;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-35, 13);
    ctx.quadraticCurveTo(-17, 20, 0, 18);
    ctx.quadraticCurveTo(17, 20, 35, 13);
    ctx.stroke();
    ctx.restore();
  }

  function drawParticles() {
    for (const particle of particles) {
      ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawPopups() {
    ctx.textAlign = "center";
    ctx.font = "900 14px system-ui, sans-serif";
    for (const popup of popups) {
      ctx.globalAlpha = clamp(popup.life * 1.8, 0, 1);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(16, 48, 65, 0.48)";
      ctx.strokeText(popup.text, popup.x, popup.y);
      ctx.fillStyle = "#fff3a9";
      ctx.fillText(popup.text, popup.x, popup.y);
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.033);
    lastTime = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  document.querySelector("#startButton").addEventListener("click", () => {
    buttonTone();
    resetGame();
  });
  document.querySelector("#retryButton").addEventListener("click", () => {
    buttonTone();
    resetGame();
  });
  document.querySelector("#menuButton").addEventListener("click", () => {
    buttonTone();
    goToMenu();
  });
  ui.share.addEventListener("click", async () => {
    buttonTone();
    const finalScore = score().toLocaleString("tr-TR");
    const shareData = {
      title: "Blue Rescue",
      text: `Blue Rescue'da ${finalScore} puan yaptım ve ${state.rescued} kişiyi kurtardım. Rekorumu geçebilir misin?`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        ui.shareStatus.textContent = "PAYLAŞIMA HAZIR";
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        ui.shareStatus.textContent = "SONUÇ KOPYALANDI";
      }
    } catch (error) {
      if (error?.name !== "AbortError") ui.shareStatus.textContent = "PAYLAŞIM AÇILAMADI";
    }
  });
  ui.sound.addEventListener("click", () => {
    state.muted = !state.muted;
    ui.sound.textContent = state.muted ? "SES KAPALI" : "SES AÇIK";
    ui.sound.setAttribute("aria-label", state.muted ? "Sesi aç" : "Sesi kapat");
    if (!state.muted) buttonTone();
    if (state.muted) stopRotorSound();
    else if (state.mode === "playing") startRotorSound();
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
      event.preventDefault();
      if (!event.repeat) setThrusting(true);
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
      event.preventDefault();
      setThrusting(false);
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.code !== "Enter" || event.repeat) return;
    event.preventDefault();
    if (state.mode === "menu") document.querySelector("#startButton").click();
    else if (state.mode === "gameover") document.querySelector("#retryButton").click();
  });
  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    canvas.setPointerCapture?.(event.pointerId);
    setThrusting(true);
  });
  canvas.addEventListener("pointerup", (event) => {
    event.preventDefault();
    setThrusting(false);
  });
  canvas.addEventListener("pointercancel", () => setThrusting(false));
  window.addEventListener("blur", () => setThrusting(false));
  document.addEventListener("visibilitychange", () => {
    setThrusting(false);
    if (document.hidden) stopRotorSound();
    else if (state.mode === "playing") startRotorSound();
  });
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  ui.menuBest.textContent = state.best.toLocaleString("tr-TR");
  requestAnimationFrame(loop);
})();
