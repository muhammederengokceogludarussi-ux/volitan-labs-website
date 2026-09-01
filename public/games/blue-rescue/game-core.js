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
      progress: clamp(safeTime / 70, 0, 1),
      speed: Math.min(202, 138 + safeTime * 0.78),
    };
  }

  function phaseAt(playTime) {
    const safeTime = Math.max(0, playTime);
    if (safeTime >= 45) return { index: 2, label: "ZOR BÖLGE" };
    if (safeTime >= 20) return { index: 1, label: "TEMPO ARTIYOR" };
    return { index: 0, label: "SAKİN BAŞLANGIÇ" };
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

  return {
    advanceRescue,
    calculateScore,
    circleRectCollision,
    clamp,
    difficultyAt,
    isRescueMissed,
    isFuelCritical,
    phaseAt,
  };
});
