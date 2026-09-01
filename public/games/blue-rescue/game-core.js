(function exposeBlueRescueCore(root, factory) {
  const core = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = core;
  }

  if (root) {
    root.BlueRescueCore = core;
  }
})(typeof globalThis === "object" ? globalThis : this, () => {
  "use strict";

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function calculateScore(distance, rescueScore) {
    return Math.floor(Math.max(0, distance) / 10) + Math.max(0, rescueScore);
  }

  function difficultyAt(playTime) {
    const safeTime = Math.max(0, playTime);
    return {
      progress: clamp(safeTime / 90, 0, 1),
      speed: Math.min(292, 138 + safeTime * 1.38),
    };
  }

  function phaseAt(playTime) {
    const safeTime = Math.max(0, playTime);
    if (safeTime >= 58) return { index: 3, label: "KRİTİK UÇUŞ" };
    if (safeTime >= 30) return { index: 2, label: "VOLKANİK HAT" };
    if (safeTime >= 12) return { index: 1, label: "TEMPO ARTIYOR" };
    return { index: 0, label: "YEŞİL VADİ" };
  }

  function rescueHoldTimeAt(speed, baseTime = 0.62, baseSpeed = 138) {
    const safeSpeed = Math.max(baseSpeed, speed || baseSpeed);
    return clamp(baseTime * (baseSpeed / safeSpeed), 0.32, baseTime);
  }

  function isFuelCritical(fuel) {
    return fuel > 0 && fuel < 25;
  }

  function advanceRescue(progress, withinZone, deltaTime, holdTime = 0.62) {
    const direction = withinZone ? 1 : -1.45;
    return clamp(progress + Math.max(0, deltaTime) * direction, 0, holdTime);
  }

  function isRescueMissed(rescueX, playerX, rescueRadius = 74) {
    return rescueX + rescueRadius < playerX;
  }

  function circleRectCollision(cx, cy, radius, rect) {
    const nearestX = clamp(cx, rect.x, rect.x + rect.w);
    const nearestY = clamp(cy, rect.y, rect.y + rect.h);
    const dx = cx - nearestX;
    const dy = cy - nearestY;
    return dx * dx + dy * dy < radius * radius;
  }

  function softZoneEnvelope(px, py, zone, feather = 36) {
    const safeFeather = Math.max(1, feather);
    const left = clamp((px - zone.x) / safeFeather, 0, 1);
    const right = clamp((zone.x + zone.w - px) / safeFeather, 0, 1);
    const top = clamp((py - zone.y) / safeFeather, 0, 1);
    const bottom = clamp((zone.y + zone.h - py) / safeFeather, 0, 1);
    return Math.min(left, right, top, bottom);
  }

  return {
    advanceRescue,
    calculateScore,
    circleRectCollision,
    clamp,
    difficultyAt,
    isRescueMissed,
    isFuelCritical,
    phaseAt,
    rescueHoldTimeAt,
    softZoneEnvelope,
  };
});
