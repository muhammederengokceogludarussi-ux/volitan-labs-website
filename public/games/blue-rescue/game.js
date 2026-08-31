(() => {
  "use strict";

  const W = 390;
  const H = 844;
  const GROUND_Y = 806;
  const STORAGE_KEY = "blue-rescue-best";

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
    speed: 126,
    thrusting: false,
    spawnDistance: 320,
    eventIndex: 0,
    pickupTimer: 12,
    pickupIndex: 0,
    fuel: 100,
    shield: false,
    invulnerable: 0,
    shake: 0,
    flash: 0,
    muted: false,
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
  let lastTime = performance.now();
  let hintTimer = 0;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function score() {
    return Math.floor(state.distance / 10) + state.rescueScore;
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
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

  function resetGame() {
    state.mode = "playing";
    state.playTime = 0;
    state.distance = 0;
    state.rescueScore = 0;
    state.rescued = 0;
    state.combo = 0;
    state.bestCombo = 0;
    state.speed = 126;
    state.spawnDistance = 270;
    state.eventIndex = 0;
    state.pickupTimer = 12;
    state.pickupIndex = 0;
    state.fuel = 100;
    state.shield = false;
    state.invulnerable = 0;
    state.shake = 0;
    state.flash = 0;
    state.thrusting = false;
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
    updateHud();
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
  }

  function endGame() {
    if (state.mode !== "playing") return;
    state.mode = "gameover";
    state.thrusting = false;
    state.shake = 0.42;
    state.flash = 0.22;
    crashTone();

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
      if (active) {
        hintTimer = 0;
        show(ui.hint, false);
      }
    }
  }

  function spawnEvent() {
    const x = W + 100;
    const phase = state.eventIndex % 4;

    if (phase === 0 || phase === 2) {
      const y = phase === 0 ? random(570, 690) : random(330, 570);
      rescues.push({ x, y, progress: 0, rescued: false, pulse: random(0, Math.PI * 2), animation: 0 });
      state.spawnDistance = random(300, 345);
    } else if (phase === 1) {
      const difficulty = clamp(state.playTime / 70, 0, 1);
      const gap = 282 - difficulty * 54;
      const center = random(250 + gap / 2, GROUND_Y - 75 - gap / 2);
      obstacles.push({ type: "cliff", x, width: 76, top: center - gap / 2, bottom: center + gap / 2 });
      state.spawnDistance = random(330, 390);
    } else {
      if (state.playTime > 18) {
        const y = random(220, 620);
        obstacles.push({ type: "birds", x, y, phase: random(0, Math.PI * 2) });
        state.spawnDistance = random(300, 360);
      } else {
        const gap = 275;
        const center = random(315, 600);
        obstacles.push({ type: "cliff", x, width: 70, top: center - gap / 2, bottom: center + gap / 2 });
        state.spawnDistance = random(345, 390);
      }
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

    updateParticles(dt);
    updatePopups(dt);

    if (state.mode !== "playing") {
      player.y = 364 + Math.sin(state.time * 1.8) * 7;
      player.tilt += (Math.sin(state.time * 1.4) * 0.025 - player.tilt) * Math.min(1, dt * 3);
      return;
    }

    state.playTime += dt;
    state.invulnerable = Math.max(0, state.invulnerable - dt);
    state.fuel = Math.max(0, state.fuel - dt * (state.thrusting ? 1.05 : 0.72));
    state.pickupTimer -= dt;
    if (state.pickupTimer <= 0) spawnPickup();
    state.speed = Math.min(188, 126 + state.playTime * 0.72);
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

    for (const obstacle of obstacles) {
      obstacle.x -= state.speed * dt;
      if (obstacle.type === "birds") obstacle.phase += dt * 5;
    }
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
    updateHud();
  }

  function collectPickup(pickup) {
    pickup.collected = true;
    pickupTone();
    if (pickup.type === "fuel") {
      state.fuel = Math.min(100, state.fuel + 36);
      popups.push({ x: pickup.x, y: pickup.y - 34, text: "YAKIT +36", life: 1.05 });
    } else {
      state.shield = true;
      popups.push({ x: pickup.x, y: pickup.y - 34, text: "KALKAN HAZIR", life: 1.05 });
    }

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
    state.invulnerable = 1.35;
    state.flash = 0.16;
    state.shake = 0.3;
    player.y = clamp(player.y, 48, GROUND_Y - 48);
    player.vy = -165;
    obstacles = obstacles.filter((obstacle) => Math.abs(obstacle.x - player.x) > 105);
    popups.push({ x: player.x, y: player.y - 44, text: "KALKAN KORUDU", life: 1.1 });
    pickupTone();
  }

  function updateRescue(rescue, dt) {
    if (rescue.rescued) {
      rescue.animation = Math.max(0, rescue.animation - dt);
      return;
    }
    const centerY = rescue.y - 40;
    const dx = player.x - rescue.x;
    const dy = player.y - centerY;
    const withinZone = dx * dx + dy * dy < 72 * 72;
    rescue.progress = clamp(rescue.progress + dt * (withinZone ? 1 : -1.45), 0, 0.62);

    if (rescue.progress >= 0.62) {
      rescue.rescued = true;
      rescue.animation = 0.62;
      state.rescued += 1;
      state.combo = Math.min(5, state.combo + 1);
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      const gained = 100 * state.combo;
      state.rescueScore += gained;
      rescueTone();
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
  }

  function circleRectCollision(cx, cy, radius, rect) {
    const nearestX = clamp(cx, rect.x, rect.x + rect.w);
    const nearestY = clamp(cy, rect.y, rect.y + rect.h);
    const dx = cx - nearestX;
    const dy = cy - nearestY;
    return dx * dx + dy * dy < radius * radius;
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
        if (circleRectCollision(px, py, radius, topRect) || circleRectCollision(px, py, radius, bottomRect)) return true;
      } else {
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
      if (circleRectCollision(px, py, radius, platform)) return true;
    }
    return false;
  }

  function draw() {
    ctx.save();
    if (state.shake > 0) ctx.translate(random(-5, 5) * state.shake * 2, random(-5, 5) * state.shake * 2);
    drawBackground();
    drawWorld();
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

  function drawWorld() {
    for (const rescue of rescues) drawRescue(rescue);
    for (const pickup of pickups) drawPickup(pickup);
    for (const obstacle of obstacles) {
      if (obstacle.type === "cliff") drawCliff(obstacle);
      else drawBirds(obstacle);
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
      ctx.save();
      ctx.scale(pulse, pulse);
      ctx.strokeStyle = state.invulnerable > 0 ? "rgba(255,255,255,0.72)" : "rgba(105, 220, 255, 0.76)";
      ctx.fillStyle = "rgba(105, 220, 255, 0.09)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(-10, 0, 62, 37, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    if (state.mode === "playing" && state.thrusting) {
      ctx.save();
      ctx.strokeStyle = "rgba(222, 248, 255, 0.42)";
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      for (let i = 0; i < 5; i += 1) {
        const startX = -42 + i * 18;
        const sway = Math.sin(state.time * 12 + i * 1.7) * 8;
        ctx.beginPath();
        ctx.moveTo(startX, -16);
        ctx.bezierCurveTo(startX + sway * 0.25, 8, startX - sway, 30, startX + sway * 0.45, 52);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.strokeStyle = "#173347";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-13, 15);
    ctx.lineTo(-9, 21);
    ctx.lineTo(15, 21);
    ctx.lineTo(20, 16);
    ctx.stroke();

    ctx.fillStyle = "#1f6eaa";
    ctx.beginPath();
    ctx.moveTo(-12, -11);
    ctx.quadraticCurveTo(14, -16, 30, 0);
    ctx.quadraticCurveTo(23, 17, -7, 16);
    ctx.quadraticCurveTo(-27, 12, -27, 1);
    ctx.quadraticCurveTo(-25, -8, -12, -11);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#c7eff6";
    ctx.beginPath();
    ctx.moveTo(5, -10);
    ctx.quadraticCurveTo(20, -8, 27, 0);
    ctx.lineTo(7, 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#173a54";
    ctx.beginPath();
    ctx.moveTo(9, -8);
    ctx.quadraticCurveTo(20, -6, 25, -1);
    ctx.lineTo(10, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#2b79b6";
    ctx.beginPath();
    ctx.moveTo(-24, -2);
    ctx.lineTo(-53, -12);
    ctx.lineTo(-58, -7);
    ctx.lineTo(-29, 7);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#d9f3f7";
    ctx.fillRect(-54, -12, 14, 4);

    ctx.strokeStyle = "#173347";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-55, -8, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.save();
    ctx.translate(-55, -8);
    ctx.rotate(player.rotor * 1.5);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.moveTo(0, -10);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "#e6f6f8";
    ctx.fillRect(-9, -14, 4, 7);
    ctx.strokeStyle = "#15374c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-8, -15);
    ctx.lineTo(-8, -20);
    ctx.stroke();
    ctx.save();
    ctx.translate(-8, -20);
    ctx.strokeStyle = "#15374c";
    ctx.fillStyle = "rgba(205, 238, 246, 0.2)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 42, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    const rotorX = Math.cos(player.rotor) * 40;
    const rotorY = Math.sin(player.rotor) * 4.5;
    const rotorX2 = Math.cos(player.rotor + Math.PI / 2) * 40;
    const rotorY2 = Math.sin(player.rotor + Math.PI / 2) * 4.5;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-rotorX, -rotorY);
    ctx.lineTo(rotorX, rotorY);
    ctx.moveTo(-rotorX2, -rotorY2);
    ctx.lineTo(rotorX2, rotorY2);
    ctx.stroke();
    ctx.restore();
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
  ui.sound.addEventListener("click", () => {
    state.muted = !state.muted;
    ui.sound.textContent = state.muted ? "SES KAPALI" : "SES AÇIK";
    ui.sound.setAttribute("aria-label", state.muted ? "Sesi aç" : "Sesi kapat");
    if (!state.muted) buttonTone();
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
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  ui.menuBest.textContent = state.best.toLocaleString("tr-TR");
  requestAnimationFrame(loop);
})();
