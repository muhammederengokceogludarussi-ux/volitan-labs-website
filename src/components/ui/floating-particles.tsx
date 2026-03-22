"use client";

import { useMemo } from "react";

const PARTICLE_COUNT = 18;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${randomBetween(5, 95)}%`,
        size: randomBetween(1, 3),
        duration: randomBetween(15, 35),
        delay: randomBetween(0, 20),
        opacity: randomBetween(0.1, 0.3),
        drift: randomBetween(-40, 40),
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle absolute rounded-full bg-accent-primary"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--particle-duration": `${p.duration}s`,
            "--particle-delay": `${p.delay}s`,
            "--particle-opacity": p.opacity,
            "--particle-drift": `${p.drift}px`,
            "--particle-size": `${p.size}px`,
            animation: `float-up ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
