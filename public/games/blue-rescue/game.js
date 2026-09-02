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
    shell: document.querySelector("#gameShell"),
    menu: document.querySelector("#menu"),
    gameOver: document.querySelector("#gameOver"),
    hud: document.querySelector("#hud"),
    hint: document.querySelector("#hint"),
    score: document.querySelector("#scoreValue"),
    rescued: document.querySelector("#rescuedValue"),
    comboBadge: document.querySelector("#comboBadge"),
    comboValue: document.querySelector("#comboValue"),
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
    soundLabel: document.querySelector("#soundLabel"),
    share: document.querySelector("#shareButton"),
    shareStatus: document.querySelector("#shareStatus"),
    phaseNotice: document.querySelector("#phaseNotice"),
    fuelWarning: document.querySelector("#fuelWarning"),
    missionTransition: document.querySelector("#missionTransition"),
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
    biome: 0,
    biomeTransition: 0,
    turbulence: 0,
    hitStop: 0,
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
  let musicBus = null;
  let musicFilter = null;
  let musicTimer = null;
  let musicStep = 0;
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
    element.setAttribute("aria-hidden", String(!visible));
    if (element.matches(".screen-card")) element.inert = !visible;
  }

  function pulseClass(element, className, duration = 380) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
    window.setTimeout(() => element.classList.remove(className), duration);
  }

  function setSceneMode(mode) {
    ui.shell.classList.toggle("is-menu", mode === "menu");
    ui.shell.classList.toggle("is-playing", mode === "playing");
    ui.shell.classList.toggle("is-gameover", mode === "gameover");
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
      ui.soundLabel.textContent = "SES KAPALI";
      ui.sound.classList.add("is-muted");
    }
  }

  const AMBIENT_CHORDS = [
    [130.81, 196, 261.63, 329.63],
    [110, 164.81, 220, 293.66],
    [146.83, 220, 293.66, 369.99],
    [123.47, 185, 246.94, 311.13],
  ];

  function scheduleAmbientChord() {
    if (state.muted || state.mode !== "playing" || !audioContext || !musicBus || !musicFilter) return;
    const chord = AMBIENT_CHORDS[musicStep % AMBIENT_CHORDS.length];
    const start = audioContext.currentTime + 0.04;
    const duration = 5.2;

    for (let i = 0; i < chord.length; i += 1) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = i === 0 ? "sine" : "triangle";
      oscillator.frequency.value = chord[i] * (i === 0 ? 0.5 : 1);
      oscillator.detune.value = i % 2 === 0 ? -4 : 4;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(i === 0 ? 0.022 : 0.011, start + 1.25);
      gain.gain.setValueAtTime(i === 0 ? 0.022 : 0.011, start + 3.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain).connect(musicFilter);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.05);
    }

    if (musicStep % 2 === 0) {
      const bell = audioContext.createOscillator();
      const bellGain = audioContext.createGain();
      bell.type = "sine";
      bell.frequency.value = chord[3] * 2;
      bellGain.gain.setValueAtTime(0.0001, start + 0.65);
      bellGain.gain.exponentialRampToValueAtTime(0.012, start + 0.69);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, start + 2.25);
      bell.connect(bellGain).connect(musicFilter);
      bell.start(start + 0.65);
      bell.stop(start + 2.3);
    }

    musicStep += 1;
    musicTimer = window.setTimeout(scheduleAmbientChord, 3900);
  }

  function startAmbientMusic() {
    if (state.muted || state.mode !== "playing" || musicBus) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      audioContext.resume?.();
      musicBus = audioContext.createGain();
      musicFilter = audioContext.createBiquadFilter();
      musicFilter.type = "lowpass";
      musicFilter.frequency.value = 1050;
      musicFilter.Q.value = 0.55;
      musicBus.gain.value = 0.0001;
      musicFilter.connect(musicBus).connect(audioContext.destination);
      musicBus.gain.exponentialRampToValueAtTime(0.62, audioContext.currentTime + 1.2);
      scheduleAmbientChord();
    } catch {
      musicBus = null;
      musicFilter = null;
    }
  }

  function stopAmbientMusic() {
    if (musicTimer) window.clearTimeout(musicTimer);
    musicTimer = null;
    if (!audioContext || !musicBus) {
      musicBus = null;
      musicFilter = null;
      return;
    }
    const oldBus = musicBus;
    oldBus.gain.cancelScheduledValues(audioContext.currentTime);
    oldBus.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.16);
    window.setTimeout(() => oldBus.disconnect(), 900);
    musicBus = null;
    musicFilter = null;
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
    setSceneMode("playing");
    pulseClass(ui.shell, "is-launching", 660);
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
    state.biome = 0;
    state.biomeTransition = 0;
    state.turbulence = 0;
    state.hitStop = 0;
    state.thrusting = false;
    state.thrustVisual = 0;
    player.x = 94;
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
    startAmbientMusic();
  }

  function goToMenu() {
    state.mode = "menu";
    setSceneMode("menu");
    state.thrusting = false;
    player.x = 205;
    player.y = 370;
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
    stopAmbientMusic();
  }

  function endGame() {
    if (state.mode !== "playing") return;
    state.mode = "gameover";
    setSceneMode("gameover");
    state.thrusting = false;
    state.hitStop = 0.085;
    state.shake = 0.55;
    state.flash = 0.22;
    crashTone();
    haptic([80, 40, 120]);
    stopRotorSound();
    stopAmbientMusic();
    pulseClass(ui.shell, "is-crashing", 330);

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
    }, 420);
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
      rescues.push(createRescueTarget(x, y));
      state.spawnDistance = random(300, 345);
    } else if (phase === 1) {
      const difficulty = core.difficultyAt(state.playTime).progress;
      const gap = 282 - difficulty * 54;
      const center = random(250 + gap / 2, GROUND_Y - 75 - gap / 2);
      obstacles.push({ type: "cliff", x, width: 76, top: center - gap / 2, bottom: center + gap / 2, biome: state.biome });
      state.spawnDistance = random(330, 390);
    } else if (phase === 2) {
      const y = random(190, 545);
      obstacles.push({
        type: "wind",
        x,
        y,
        width: random(175, 215),
        height: random(170, 220),
        phase: random(0, Math.PI * 2),
        seed: random(0, Math.PI * 2),
        entered: false,
      });
      state.spawnDistance = random(315, 370);
    } else if (phase === 4) {
      if (state.playTime >= 12) {
        const y = random(220, 620);
        const difficulty = core.difficultyAt(state.playTime).progress;
        const species = state.biome >= 1 ? "bats" : "birds";
        obstacles.push({
          type: "birds",
          species,
          x,
          y,
          phase: random(0, Math.PI * 2),
          flightSpeed: (species === "bats" ? 54 : 28) + difficulty * 54,
        });
        state.spawnDistance = random(300, 360);
      } else {
        const gap = 275;
        const center = random(315, 600);
        obstacles.push({ type: "cliff", x, width: 70, top: center - gap / 2, bottom: center + gap / 2, biome: state.biome });
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
      rescues.push(createRescueTarget(x, y));
      state.spawnDistance = random(305, 350);
    }
    state.eventIndex += 1;
  }

  function createRescueTarget(x, y) {
    return {
      x,
      y,
      progress: 0,
      rescued: false,
      missed: false,
      pulse: random(0, Math.PI * 2),
      animation: 0,
      variant: Math.floor(random(0, 5)),
      pose: random(0, Math.PI * 2),
    };
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
    if (state.hitStop > 0) {
      state.hitStop = Math.max(0, state.hitStop - dt);
      return;
    }
    state.flash = Math.max(0, state.flash - dt);
    state.shake = Math.max(0, state.shake - dt);
    state.biomeTransition = Math.max(0, state.biomeTransition - dt);
    state.turbulence = Math.max(0, state.turbulence - dt * 1.8);
    player.rotor += dt * (state.mode === "playing" ? (state.thrusting ? 52 : 34) : 12);
    state.thrustVisual = state.thrusting ? THRUST_VISUAL_TAIL : Math.max(0, state.thrustVisual - dt);

    updateParticles(dt);
    updatePopups(dt);

    if (state.mode !== "playing") {
      if (state.mode === "menu") {
        player.x += (205 - player.x) * Math.min(1, dt * 3.2);
        player.y = 370 + Math.sin(state.time * 1.8) * 7;
        player.tilt += (Math.sin(state.time * 1.4) * 0.025 - player.tilt) * Math.min(1, dt * 3);
      }
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
      if (phase.index >= 2 && state.biome === 0) {
        state.biome = 1;
        state.biomeTransition = 1.3;
      }
      state.phaseNoticeTimer = phase.index >= 2 ? 2.8 : 2.2;
      ui.phaseNotice.textContent = phase.label;
      ui.phaseNotice.classList.toggle("is-volcanic", phase.index >= 2);
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
      if (obstacle.type === "birds") obstacle.phase += dt * (obstacle.species === "bats" ? 8.2 : 5.2);
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
    let fogTarget = 0;

    for (const obstacle of obstacles) {
      if (obstacle.type === "wind") {
        const zone = { x: obstacle.x, y: obstacle.y, w: obstacle.width, h: obstacle.height };
        const envelope = core.softZoneEnvelope(player.x, player.y, zone, 38);
        if (envelope <= 0) continue;

        const gustWave = Math.sin(obstacle.phase * 1.7 + obstacle.seed) + Math.sin(obstacle.phase * 4.1 - obstacle.seed) * 0.48;
        const gust = gustWave * 165 * envelope;
        state.windForce += gust;
        player.vy = clamp(player.vy + gust * dt, -290, 330);
        player.tilt += Math.sin(obstacle.phase * 3.2 + obstacle.seed) * envelope * 0.024;
        state.shake = Math.max(state.shake, envelope * 0.075);
        state.turbulence = Math.max(state.turbulence, envelope);

        if (!obstacle.entered && envelope > 0.18) {
          obstacle.entered = true;
          popups.push({
            x: player.x + 18,
            y: player.y - 48,
            text: "TÜRBÜLANS • DENGEYİ KORU",
            life: 1.15,
          });
          tone(235, 0.1, "sine", 0.025);
          haptic(14);
        }
      } else if (obstacle.type === "fog") {
        const zone = { x: obstacle.x, y: obstacle.y, w: obstacle.width, h: obstacle.height };
        const exposure = core.softZoneEnvelope(player.x, player.y, zone, 48);
        fogTarget = Math.max(fogTarget, exposure);
        if (!obstacle.entered && exposure > 0.16) {
          obstacle.entered = true;
          popups.push({ x: player.x + 18, y: player.y - 48, text: "YOĞUN SİS • GÖRÜŞ AZALDI", life: 1.2 });
          tone(180, 0.14, "sine", 0.018);
        }
      }
    }
    const fogResponse = fogTarget > state.fogExposure ? 4.8 : 1.45;
    state.fogExposure += (fogTarget - state.fogExposure) * Math.min(1, dt * fogResponse);
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
    const holdTime = core.rescueHoldTimeAt(state.speed);
    rescue.holdTime = holdTime;
    rescue.progress = core.advanceRescue(rescue.progress, withinZone, dt, holdTime);

    if (rescue.progress >= holdTime) {
      rescue.rescued = true;
      rescue.animation = 0.62;
      state.rescued += 1;
      state.combo = Math.min(5, state.combo + 1);
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      const gained = 100 * state.combo;
      state.rescueScore += gained;
      rescueTone();
      haptic(24);
      pulseClass(ui.comboBadge, "is-pulsing", 440);
      pulseClass(ui.score, "is-punching", 380);
      pulseClass(ui.rescued, "is-punching", 380);
      pulseClass(ui.shell, "is-rescue", 360);
      popups.push({ x: rescue.x, y: centerY - 48, text: "KURTARILDI!", score: gained, kind: "rescue", life: 1.35, maxLife: 1.35 });

      for (let i = 0; i < 18; i += 1) {
        particles.push({
          x: rescue.x,
          y: centerY,
          vx: random(-75, 75),
          vy: random(-95, 45),
          life: random(0.45, 0.9),
          maxLife: 0.9,
          color: Math.random() > 0.64 ? "#ffffff" : Math.random() > 0.45 ? "#dff46a" : "#63e889",
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
    ui.comboValue.textContent = `×${Math.max(1, state.combo)}`;
    ui.comboBadge.setAttribute("aria-label", `Kombo çarpanı ${Math.max(1, state.combo)}`);
    ui.comboBadge.classList.toggle("is-active", state.combo > 1);
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
    drawSpeedLines();
    drawWorld();
    drawFogBanks();
    drawParticles();
    drawPlayer();
    drawFogExposureOverlay();
    drawPopups();
    drawBiomeTransition();
    ctx.restore();

    if (state.flash > 0) {
      ctx.fillStyle = `rgba(255, 240, 205, ${state.flash * 2.4})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function smoothstep(value) {
    const t = clamp(value, 0, 1);
    return t * t * (3 - 2 * t);
  }

  function mixRgb(from, to, amount) {
    const t = clamp(amount, 0, 1);
    return `rgb(${Math.round(from[0] + (to[0] - from[0]) * t)}, ${Math.round(from[1] + (to[1] - from[1]) * t)}, ${Math.round(from[2] + (to[2] - from[2]) * t)})`;
  }

  function drawBackground() {
    const elapsed = state.mode === "playing" ? state.playTime : 12 + state.time * 0.12;
    const cycle = ((elapsed + 12) % 80) / 80;
    const sunUp = cycle < 0.5;
    const celestialProgress = sunUp ? cycle / 0.5 : (cycle - 0.5) / 0.5;
    const dayLight = sunUp ? clamp(Math.sin(celestialProgress * Math.PI) * 1.18, 0, 1) : 0;
    const night = 1 - dayLight;
    const volcanic = state.mode === "playing" ? smoothstep((state.playTime - 28.5) / 3.5) : 0;
    const dayTop = mixRgb([10, 20, 49], [74, 185, 226], dayLight);
    const dayBottom = mixRgb([43, 54, 77], [205, 235, 226], dayLight);
    const topColor = volcanic ? mixRgb([74, 185, 226], [111, 50, 65], volcanic * (0.58 + night * 0.32)) : dayTop;
    const bottomColor = volcanic ? mixRgb([205, 235, 226], [198, 95, 63], volcanic * (0.48 + night * 0.28)) : dayBottom;
    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, volcanic ? mixRgb([10, 20, 49], [111, 50, 65], volcanic * 0.72 + dayLight * 0.18) : dayTop);
    gradient.addColorStop(0.58, topColor);
    gradient.addColorStop(1, bottomColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    if (night > 0.25) {
      const stars = [[34, 116], [78, 225], [132, 92], [184, 174], [238, 78], [280, 260], [344, 205], [363, 76], [208, 318], [54, 365], [109, 301], [319, 342]];
      ctx.save();
      ctx.globalAlpha = smoothstep((night - 0.24) / 0.6);
      ctx.fillStyle = "#eaf7ff";
      for (let i = 0; i < stars.length; i += 1) {
        const [x, y] = stars[i];
        const twinkle = 0.55 + Math.sin(state.time * 2.2 + i * 1.7) * 0.35;
        ctx.globalAlpha = smoothstep((night - 0.24) / 0.6) * twinkle;
        ctx.beginPath();
        ctx.arc(x, y, i % 4 === 0 ? 1.7 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    const celestialX = -28 + celestialProgress * (W + 56);
    const celestialY = 610 - Math.sin(celestialProgress * Math.PI) * 505;
    const celestialAlpha = clamp(Math.sin(celestialProgress * Math.PI) * 1.4, 0, 1);
    ctx.save();
    ctx.globalAlpha = celestialAlpha;
    if (sunUp) {
      const sunGlow = ctx.createRadialGradient(celestialX, celestialY, 8, celestialX, celestialY, 62);
      sunGlow.addColorStop(0, "rgba(255, 245, 174, 0.95)");
      sunGlow.addColorStop(0.38, "rgba(255, 199, 84, 0.38)");
      sunGlow.addColorStop(1, "rgba(255, 183, 65, 0)");
      ctx.fillStyle = sunGlow;
      ctx.fillRect(celestialX - 64, celestialY - 64, 128, 128);
      ctx.fillStyle = volcanic ? "#ffc166" : "#fff0a6";
      ctx.beginPath();
      ctx.arc(celestialX, celestialY, 27, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const moonGlow = ctx.createRadialGradient(celestialX, celestialY, 8, celestialX, celestialY, 52);
      moonGlow.addColorStop(0, "rgba(226, 244, 255, 0.82)");
      moonGlow.addColorStop(0.5, "rgba(164, 205, 235, 0.2)");
      moonGlow.addColorStop(1, "rgba(130, 184, 225, 0)");
      ctx.fillStyle = moonGlow;
      ctx.fillRect(celestialX - 55, celestialY - 55, 110, 110);
      ctx.fillStyle = "#e5f2f4";
      ctx.beginPath();
      ctx.arc(celestialX, celestialY, 23, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(143, 170, 181, 0.24)";
      ctx.beginPath();
      ctx.arc(celestialX - 7, celestialY - 5, 5, 0, Math.PI * 2);
      ctx.arc(celestialX + 8, celestialY + 7, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const cloudOffset = -((state.time * 7 + state.distance * 0.035) % 520);
    ctx.save();
    ctx.globalAlpha = 0.38 + dayLight * 0.62;
    for (let i = -1; i < 2; i += 1) {
      drawCloud(cloudOffset + i * 520 + 110, 190 + (i % 2) * 120, 0.85);
      drawCloud(cloudOffset + i * 520 + 340, 310 - (i % 2) * 70, 0.58);
    }
    ctx.restore();

    const far = -((state.distance * 0.12) % 300);
    const near = -((state.distance * 0.29) % 250);
    drawValleyMountains(far, near, 1 - volcanic);
    drawVolcanicMountains(far, near, volcanic);

    ctx.fillStyle = mixRgb([40, 79, 81], [52, 39, 44], volcanic);
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
    ctx.fillStyle = volcanic ? "rgba(255, 126, 62, 0.66)" : "rgba(173, 219, 187, 0.48)";
    ctx.fillRect(0, GROUND_Y, W, volcanic ? 5 : 4);
  }

  function drawValleyMountains(far, near, alpha) {
    if (alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;
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
    ctx.restore();
  }

  function drawVolcanicMountains(far, near, alpha) {
    if (alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#5a4a51";
    ctx.beginPath();
    ctx.moveTo(-120, GROUND_Y);
    for (let x = far - 300; x < W + 360; x += 150) {
      ctx.lineTo(x, 690);
      ctx.lineTo(x + 42, 565);
      ctx.lineTo(x + 64, 585);
      ctx.lineTo(x + 79, 532);
      ctx.lineTo(x + 96, 584);
      ctx.lineTo(x + 150, 690);
    }
    ctx.lineTo(W + 120, GROUND_Y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#352f38";
    ctx.beginPath();
    ctx.moveTo(-100, GROUND_Y);
    for (let x = near - 250; x < W + 300; x += 125) {
      ctx.lineTo(x, 744);
      ctx.lineTo(x + 38, 636);
      ctx.lineTo(x + 59, 653);
      ctx.lineTo(x + 76, 611);
      ctx.lineTo(x + 94, 660);
      ctx.lineTo(x + 125, 744);
    }
    ctx.lineTo(W + 100, GROUND_Y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 112, 49, 0.78)";
    ctx.lineWidth = 3;
    for (let x = near - 180; x < W + 180; x += 125) {
      ctx.beginPath();
      ctx.moveTo(x + 75, 621);
      ctx.lineTo(x + 68, 666);
      ctx.lineTo(x + 78, 694);
      ctx.lineTo(x + 70, 735);
      ctx.stroke();
    }
    ctx.restore();
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

  function drawSpeedLines() {
    if (state.mode !== "playing") return;
    const intensity = clamp((state.speed - 184) / 108, 0, 1);
    if (intensity <= 0) return;
    ctx.save();
    ctx.lineCap = "round";
    for (let i = 0; i < 13; i += 1) {
      const lane = (i * 71 + 29) % 730;
      const travel = (state.distance * (0.62 + (i % 3) * 0.12) + i * 97) % (W + 150);
      const x = W + 60 - travel;
      const length = 12 + intensity * (24 + (i % 4) * 6);
      ctx.globalAlpha = intensity * (0.08 + (i % 3) * 0.035);
      ctx.strokeStyle = "#e9fbff";
      ctx.lineWidth = 1 + (i % 2) * 0.6;
      ctx.beginPath();
      ctx.moveTo(x, 70 + lane);
      ctx.lineTo(x - length, 70 + lane);
      ctx.stroke();
    }
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

  function drawFogExposureOverlay() {
    const intensity = smoothstep(state.fogExposure);
    if (intensity <= 0.015) return;
    ctx.save();

    const veil = ctx.createRadialGradient(player.x, player.y, 34, player.x, player.y, 210);
    veil.addColorStop(0, `rgba(203, 218, 220, ${intensity * 0.15})`);
    veil.addColorStop(0.28, `rgba(190, 208, 212, ${intensity * 0.46})`);
    veil.addColorStop(1, `rgba(119, 142, 151, ${intensity * 0.82})`);
    ctx.fillStyle = veil;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = `rgba(235, 244, 244, ${intensity * 0.24})`;
    for (let i = 0; i < 11; i += 1) {
      const x = ((state.time * (18 + (i % 3) * 5) + i * 83) % (W + 190)) - 95;
      const y = 90 + ((i * 79) % 670) + Math.sin(state.time * 0.8 + i) * 24;
      ctx.beginPath();
      ctx.ellipse(x, y, 105 + (i % 3) * 24, 24 + (i % 2) * 9, -0.05, 0, Math.PI * 2);
      ctx.fill();
    }

    const vignette = ctx.createRadialGradient(W / 2, H / 2, 160, W / 2, H / 2, 430);
    vignette.addColorStop(0, "rgba(42, 59, 67, 0)");
    vignette.addColorStop(1, `rgba(35, 50, 58, ${intensity * 0.42})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawBiomeTransition() {
    if (state.biomeTransition <= 0) return;
    const progress = 1 - state.biomeTransition / 1.3;
    const alpha = Math.sin(progress * Math.PI);
    ctx.save();
    const wash = ctx.createLinearGradient(0, 0, W, H);
    wash.addColorStop(0, `rgba(255, 207, 105, ${alpha * 0.2})`);
    wash.addColorStop(0.55, `rgba(210, 78, 58, ${alpha * 0.31})`);
    wash.addColorStop(1, `rgba(67, 31, 47, ${alpha * 0.22})`);
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `rgba(255, 232, 174, ${alpha * 0.34})`;
    ctx.lineWidth = 2;
    for (let i = 0; i < 7; i += 1) {
      const y = 150 + i * 86;
      const reach = progress * (W + 80) - i * 17;
      ctx.beginPath();
      ctx.moveTo(W, y);
      ctx.lineTo(W - reach, y + 18);
      ctx.stroke();
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
    const volcanic = obstacle.biome === 1;
    ctx.fillStyle = volcanic ? "#3b3035" : "#234a50";
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

    ctx.fillStyle = volcanic ? "#8a493a" : "#5c8b72";
    ctx.fillRect(x + 4, top - 3, width - 8, 5);
    ctx.fillRect(x + 4, bottom + 1, width - 8, 5);
    ctx.fillStyle = volcanic ? "rgba(255, 129, 63, 0.12)" : "rgba(255,255,255,0.08)";
    ctx.fillRect(x + 10, 0, 7, Math.max(0, top - 12));
    ctx.fillRect(x + 10, bottom + 12, 7, GROUND_Y - bottom - 12);
    if (volcanic) {
      const flicker = 0.56 + Math.sin(state.time * 8 + x * 0.03) * 0.18;
      ctx.strokeStyle = `rgba(255, 111, 48, ${flicker})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 30, 0);
      ctx.lineTo(x + 35, Math.max(20, top * 0.42));
      ctx.lineTo(x + 29, Math.max(30, top * 0.66));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + width - 25, bottom + 12);
      ctx.lineTo(x + width - 31, bottom + 58);
      ctx.lineTo(x + width - 24, Math.min(GROUND_Y, bottom + 96));
      ctx.stroke();
    }
  }

  function drawBirds(obstacle) {
    const isBat = obstacle.species === "bats";
    const wave = Math.sin(obstacle.phase) * (isBat ? 10 : 14);
    const wing = Math.sin(obstacle.phase * 2.2) * (isBat ? 7 : 5);
    const positions = [[0, 0], [30, -15], [58, 8]];
    for (const [ox, oy] of positions) {
      ctx.save();
      ctx.translate(obstacle.x + ox, obstacle.y + oy + wave);
      if (isBat) {
        ctx.fillStyle = "#211b2c";
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.quadraticCurveTo(-7, -10 - wing, -14, -4 + wing);
        ctx.lineTo(-9, 3);
        ctx.lineTo(-4, 0);
        ctx.quadraticCurveTo(-2, 7, 0, 9);
        ctx.quadraticCurveTo(2, 7, 4, 0);
        ctx.lineTo(9, 3);
        ctx.lineTo(14, -4 + wing);
        ctx.quadraticCurveTo(7, -10 - wing, 0, -2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#ffb35d";
        ctx.beginPath();
        ctx.arc(-2.5, -2, 1, 0, Math.PI * 2);
        ctx.arc(2.5, -2, 1, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = "#183d4d";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-10, wing);
        ctx.quadraticCurveTo(-4, -5, 0, 1);
        ctx.quadraticCurveTo(5, -5, 11, wing);
        ctx.stroke();
        ctx.fillStyle = "#f5d06c";
        ctx.beginPath();
        ctx.arc(0, 1, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawWindCorridor(obstacle) {
    const { x, y, width, height, phase, seed } = obstacle;
    ctx.save();
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, "rgba(117, 222, 239, 0)");
    gradient.addColorStop(0.32, "rgba(117, 222, 239, 0.12)");
    gradient.addColorStop(0.68, "rgba(117, 222, 239, 0.18)");
    gradient.addColorStop(1, "rgba(117, 222, 239, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);

    ctx.lineCap = "round";
    for (let i = 0; i < 7; i += 1) {
      const progress = (i / 7 + state.time * 0.46) % 1;
      const streamX = x + progress * width;
      const baseY = y + 20 + (i % 5) * (height - 40) / 4;
      const drift = Math.sin(phase * 1.8 + seed + i * 1.7) * (17 + (i % 3) * 4);
      const endY = baseY + drift;
      const alpha = Math.sin(progress * Math.PI) * 0.5;
      ctx.strokeStyle = `rgba(220, 250, 255, ${alpha})`;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(streamX - 28, baseY);
      ctx.bezierCurveTo(streamX - 9, baseY - drift * 0.72, streamX + 10, endY + drift * 0.42, streamX + 31, endY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(streamX + 35, endY, 7 + (i % 2) * 3, phase + i, phase + i + Math.PI * 1.55);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(230, 252, 255, 0.76)";
    ctx.font = "800 10px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("TÜRBÜLANS", x + width / 2, y + 16);
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
      haze.addColorStop(0, `rgba(194, 211, 216, ${0.7 + state.fogExposure * 0.12})`);
      haze.addColorStop(0.62, "rgba(163, 185, 193, 0.52)");
      haze.addColorStop(1, "rgba(222, 242, 246, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(x - 28, y - 24, width + 56, height + 48);

      ctx.fillStyle = "rgba(232, 241, 242, 0.46)";
      for (let i = 0; i < 5; i += 1) {
        const fogX = x + ((i * 53 + state.time * 11) % (width + 70)) - 35;
        const fogY = y + height * (0.2 + (i % 3) * 0.27) + Math.sin(phase + i) * 9;
        ctx.beginPath();
        ctx.ellipse(fogX, fogY, 68, 19, 0.04 * (i - 2), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(33, 57, 67, 0.7)";
      ctx.font = "900 9px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("SİS BANKASI", x + width / 2, y + 18);
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
      const rescueGlow = ctx.createRadialGradient(0, 0, 18, 0, 0, 78);
      rescueGlow.addColorStop(0, "rgba(255, 224, 105, 0.08)");
      rescueGlow.addColorStop(0.72, "rgba(255, 202, 62, 0.035)");
      rescueGlow.addColorStop(1, "rgba(255, 202, 62, 0)");
      ctx.fillStyle = rescueGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 78, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 210, 76, 0.74)";
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 7]);
      ctx.lineDashOffset = -state.time * 28;
      ctx.beginPath();
      ctx.arc(0, 0, 74, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.35 + Math.sin(state.time * 4 + rescue.pose) * 0.12;
      ctx.strokeStyle = "#fff2ad";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 57 + Math.sin(state.time * 3 + rescue.pose) * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (rescue.progress > 0) {
        ctx.strokeStyle = "#fff1a7";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(0, 0, 64, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (rescue.progress / (rescue.holdTime || 0.62)));
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.fillStyle = state.biome ? "#453a3d" : "#294e55";
    ctx.beginPath();
    ctx.roundRect(rescue.x - 31, rescue.y + 17, 62, 15, 4);
    ctx.fill();
    ctx.fillStyle = state.biome ? "#d26b43" : "#6fa17b";
    ctx.fillRect(rescue.x - 28, rescue.y + 17, 56, 4);
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    for (let stripe = -24; stripe < 24; stripe += 12) {
      ctx.fillRect(rescue.x + stripe, rescue.y + 19, 6, 2);
    }

    if (!rescue.rescued) {
      drawPerson(rescue.x, rescue.y, 1, rescue.variant, rescue.pose);
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
      drawPerson(personX, personY, 1 - progress * 0.25, rescue.variant, rescue.pose);
    }
  }

  function drawPerson(x, y, alpha = 1, variant = 0, pose = 0) {
    const skinTones = ["#f2bd8f", "#d9966c", "#8b5a43", "#f0c9a5", "#b97855"];
    const shirtColors = ["#f58a3c", "#ffd257", "#35a8b8", "#ed6f78", "#8fc35e"];
    const pantsColors = ["#17394c", "#32465a", "#203b46", "#403746", "#21425a"];
    const skin = skinTones[variant % skinTones.length];
    const shirt = shirtColors[variant % shirtColors.length];
    const pants = pantsColors[variant % pantsColors.length];
    const scale = variant === 4 ? 0.88 : 1;
    const bob = Math.sin(state.time * 3.2 + pose) * 0.8;
    const wave = Math.sin(state.time * 6.2 + pose) * 3.2;
    ctx.save();
    ctx.translate(x, y + bob + (1 - scale) * 17);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;

    ctx.strokeStyle = pants;
    ctx.lineWidth = 3.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-2, 9);
    ctx.lineTo(-5, 17);
    ctx.moveTo(2, 9);
    ctx.lineTo(5, 17);
    ctx.stroke();

    if (variant === 2) {
      ctx.fillStyle = "#304b59";
      ctx.beginPath();
      ctx.roundRect(-8, -2, 5, 11, 2);
      ctx.fill();
    }

    ctx.fillStyle = shirt;
    ctx.beginPath();
    ctx.roundRect(-5.5, -3, 11, 14, 3);
    ctx.fill();
    if (variant === 1 || variant === 3) {
      ctx.fillStyle = "rgba(255,255,255,0.68)";
      ctx.fillRect(-5, 2, 10, 2.5);
    }

    ctx.strokeStyle = skin;
    ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(-8, 7 + wave * 0.25);
    ctx.moveTo(4, 0);
    ctx.lineTo(8, -7 + wave);
    ctx.stroke();

    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(0, -10, 5.8, 0, Math.PI * 2);
    ctx.fill();

    if (variant === 0 || variant === 2) {
      ctx.fillStyle = variant === 0 ? "#3a2b28" : "#1f2f38";
      ctx.beginPath();
      ctx.arc(0, -11.5, 5.8, Math.PI, Math.PI * 2);
      ctx.fill();
    } else if (variant === 1) {
      ctx.fillStyle = "#f4c541";
      ctx.beginPath();
      ctx.arc(0, -11, 6.7, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(1, -11, 8, 2);
    } else if (variant === 3) {
      ctx.strokeStyle = "#6d394a";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(0, -10, 6.5, Math.PI * 0.12, Math.PI * 0.88, true);
      ctx.stroke();
    } else {
      ctx.fillStyle = "#36506a";
      ctx.beginPath();
      ctx.arc(0, -12, 5.6, Math.PI, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#173243";
    ctx.beginPath();
    ctx.arc(2, -10, 0.75, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // The generic helicopter is intentionally isolated here so a future approved
  // sprite can replace only this renderer without touching gameplay code.
  function drawPlayer() {
    const flightBob = state.mode === "playing" ? Math.sin(state.time * 8.5) * 0.65 : Math.sin(state.time * 2) * 2.2;
    const turbulenceX = Math.sin(state.time * 23) * state.turbulence * 2.6;
    const turbulenceY = Math.sin(state.time * 31 + 0.8) * state.turbulence * 2.1;
    ctx.save();
    ctx.translate(player.x + turbulenceX, player.y + flightBob + turbulenceY);
    if (state.mode === "menu") ctx.scale(1.45, 1.45);
    ctx.rotate(player.tilt + Math.sin(state.time * 19) * state.turbulence * 0.035);

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

    const cycle = (((state.mode === "playing" ? state.playTime : 12) + 12) % 80) / 80;
    if (state.mode === "playing" && cycle >= 0.5) {
      const beam = ctx.createLinearGradient(27, 4, 102, 104);
      beam.addColorStop(0, "rgba(255, 245, 183, 0.26)");
      beam.addColorStop(1, "rgba(255, 245, 183, 0)");
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(25, 2);
      ctx.lineTo(96, 72);
      ctx.lineTo(67, 91);
      ctx.closePath();
      ctx.fill();
    }

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
    ctx.globalAlpha = 0.45 + Math.sin(state.time * 7.5) * 0.4;
    ctx.arc(-8, -15, 2.3, Math.PI, 0);
    ctx.fill();
    ctx.globalAlpha = 1;

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

    for (const side of [-1, 1]) {
      const swirl = (state.time * 3.1) % 1;
      const x = side * (31 + swirl * 34);
      const y = 30 + swirl * 38;
      ctx.strokeStyle = `rgba(218, 246, 252, ${(1 - swirl) * 0.2 * visualPower})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 7 + swirl * 5, side > 0 ? Math.PI * 0.2 : Math.PI * 0.8, side > 0 ? Math.PI * 1.55 : Math.PI * -0.55, side < 0);
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
      ctx.save();
      ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size > 3.5 ? 8 : 3;
      ctx.beginPath();
      if (particle.size > 4.1) {
        ctx.moveTo(particle.x, particle.y - particle.size);
        ctx.lineTo(particle.x + particle.size * 0.55, particle.y);
        ctx.lineTo(particle.x, particle.y + particle.size);
        ctx.lineTo(particle.x - particle.size * 0.55, particle.y);
        ctx.closePath();
      } else {
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function drawPopups() {
    ctx.textAlign = "center";
    for (const popup of popups) {
      const maxLife = popup.maxLife || 1.2;
      const entrance = clamp((maxLife - popup.life) * 6, 0, 1);
      const scale = popup.kind === "rescue" ? 0.62 + entrance * 0.38 : 0.78 + entrance * 0.22;
      ctx.save();
      ctx.translate(popup.x, popup.y);
      ctx.scale(scale, scale);
      ctx.globalAlpha = clamp(popup.life * 1.8, 0, 1);

      if (popup.kind === "rescue") {
        const burst = clamp(entrance * (popup.life / maxLife) * 1.7, 0, 1);
        ctx.save();
        ctx.globalAlpha *= burst * 0.62;
        ctx.strokeStyle = "#dff46a";
        ctx.lineWidth = 2.5;
        for (let ray = 0; ray < 12; ray += 1) {
          const angle = (Math.PI * 2 * ray) / 12 + state.time * 0.12;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 36, Math.sin(angle) * 25);
          ctx.lineTo(Math.cos(angle) * 54, Math.sin(angle) * 39);
          ctx.stroke();
        }
        ctx.restore();

        ctx.font = "900 20px 'Barlow Condensed', 'Arial Narrow', sans-serif";
        ctx.lineWidth = 7;
        ctx.strokeStyle = "rgba(4, 60, 47, 0.88)";
        ctx.strokeText(popup.text, 0, -3);
        ctx.fillStyle = "#bdf05d";
        ctx.fillText(popup.text, 0, -3);
        ctx.font = "900 24px 'Barlow Condensed', 'Arial Narrow', sans-serif";
        ctx.lineWidth = 7;
        ctx.strokeText(`+${popup.score}`, 0, 20);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`+${popup.score}`, 0, 20);
      } else {
        ctx.font = "900 15px 'Barlow Condensed', 'Arial Narrow', sans-serif";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(16, 48, 65, 0.56)";
        ctx.strokeText(popup.text, 0, 0);
        ctx.fillStyle = "#fff3a9";
        ctx.fillText(popup.text, 0, 0);
      }
      ctx.restore();
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
    ui.soundLabel.textContent = state.muted ? "SES KAPALI" : "SES AÇIK";
    ui.sound.classList.toggle("is-muted", state.muted);
    ui.sound.setAttribute("aria-label", state.muted ? "Sesi aç" : "Sesi kapat");
    if (!state.muted) buttonTone();
    if (state.muted) {
      stopRotorSound();
      stopAmbientMusic();
    } else if (state.mode === "playing") {
      startRotorSound();
      startAmbientMusic();
    }
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
    if (document.hidden) {
      stopRotorSound();
      stopAmbientMusic();
    } else if (state.mode === "playing") {
      startRotorSound();
      startAmbientMusic();
    }
  });
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  player.x = 205;
  player.y = 370;
  setSceneMode("menu");
  show(ui.menu, true);
  show(ui.gameOver, false);
  show(ui.hud, false);
  show(ui.hint, false);
  show(ui.phaseNotice, false);
  show(ui.fuelWarning, false);
  ui.menuBest.textContent = state.best.toLocaleString("tr-TR");
  requestAnimationFrame(loop);
})();
