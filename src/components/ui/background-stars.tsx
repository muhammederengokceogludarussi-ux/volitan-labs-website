"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundStarsProps {
  className?: string;
  color?: "cyan" | "purple" | "amber";
  density?: number;
  /** When true, uses position:fixed to cover the entire viewport with scroll parallax */
  fixed?: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number; // 1-3, affects scroll speed & mouse parallax
  color: [number, number, number];
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
}

const ACCENT_COLORS: Record<string, [number, number, number]> = {
  cyan: [155, 123, 240],
  purple: [0, 200, 240],
  amber: [232, 145, 10],
};

function generateStars(
  count: number,
  accent: [number, number, number]
): Star[] {
  return Array.from({ length: count }, () => {
    const roll = Math.random();
    let color: [number, number, number];
    if (roll < 0.75) {
      const r = 215 + Math.random() * 40;
      const g = 220 + Math.random() * 35;
      const b = 235 + Math.random() * 20;
      color = [r, g, b];
    } else if (roll < 0.9) {
      color = [accent[0], accent[1], accent[2]];
    } else {
      color = [
        175 + Math.random() * 45,
        155 + Math.random() * 45,
        225 + Math.random() * 30,
      ];
    }

    return {
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.3,
      baseOpacity: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 2 + 0.5,
      twinklePhase: Math.random() * Math.PI * 2,
      depth: Math.ceil(Math.random() * 3),
      color,
    };
  });
}

export function BackgroundStars({
  className,
  color = "cyan",
  density = 80,
  fixed = false,
}: BackgroundStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const timeRef = useRef(0);
  const nextShootRef = useRef(4 + Math.random() * 8);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const accent = ACCENT_COLORS[color] ?? ACCENT_COLORS.cyan;

    const resize = () => {
      const w = fixed ? window.innerWidth : container.getBoundingClientRect().width;
      const h = fixed ? window.innerHeight : container.getBoundingClientRect().height;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    starsRef.current = generateStars(density, accent);

    const onMouseMove = (e: MouseEvent) => {
      if (fixed) {
        mouseRef.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        };
      } else {
        const rect = container.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      }
    };

    if (!fixed) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(container);
      (container as any).__bgObserver = observer;
    } else {
      visibleRef.current = true;
    }

    let lastTime = performance.now();

    const animate = (now: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current) {
        lastTime = now;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      timeRef.current += dt;
      const t = timeRef.current;

      const w = fixed ? window.innerWidth : container.getBoundingClientRect().width;
      const h = fixed ? window.innerHeight : container.getBoundingClientRect().height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;
      const mousePxX = mouseRef.current.x * w;
      const mousePxY = mouseRef.current.y * h;

      // Scroll offset for fixed mode — each depth layer scrolls at a different speed
      const scrollY = fixed ? window.scrollY : 0;

      // --- Draw stars ---
      for (const star of starsRef.current) {
        const parallax = star.depth * 6;
        const sx = star.x * w + mx * parallax;

        let sy: number;
        if (fixed) {
          // Scroll parallax: depth 1 scrolls slowest, depth 3 fastest
          // Stars wrap around viewport height for seamless looping
          const scrollSpeed = 0.08 + star.depth * 0.04; // 0.12, 0.16, 0.20
          const rawY = star.y * h - scrollY * scrollSpeed + my * parallax;
          sy = ((rawY % h) + h) % h;
        } else {
          sy = star.y * h + my * parallax;
        }

        // Twinkle
        const twinkle =
          Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;

        // Brighter near mouse
        const dx = sx - mousePxX;
        const dy = sy - mousePxY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = dist < 120 ? 1 + (1 - dist / 120) * 0.8 : 1;

        const alpha = Math.min(star.baseOpacity * twinkle * proximity, 1);
        const [r, g, b] = star.color;

        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        // Soft glow for larger stars or mouse-proximate stars
        if (star.size > 1 || proximity > 1.2) {
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // --- Shooting stars ---
      if (t > nextShootRef.current) {
        nextShootRef.current = t + 3 + Math.random() * 5; // More frequent (3-8s)
        const angle = Math.PI / 5 + (Math.random() - 0.5) * 0.4;
        const speed = 120 + Math.random() * 80; // Slower (120-200)
        shootingRef.current.push({
          x: Math.random() * w * 0.8,
          y: Math.random() * h * 0.4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: 70 + Math.random() * 50,
          life: 0,
          maxLife: 1.2 + Math.random() * 0.8, // Longer life (1.2-2s)
        });
      }

      shootingRef.current = shootingRef.current.filter((s) => {
        s.life += dt;
        if (s.life >= s.maxLife) return false;

        const progress = s.life / s.maxLife;
        const fade =
          progress < 0.2
            ? progress / 0.2
            : progress > 0.7
              ? (1 - progress) / 0.3
              : 1;
        const a = fade * 0.5;

        const cx = s.x + s.vx * s.life;
        const cy = s.y + s.vy * s.life;
        const mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const tx = cx - (s.vx / mag) * s.length;
        const ty = cy - (s.vy / mag) * s.length;

        const grad = ctx.createLinearGradient(tx, ty, cx, cy);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.6, `rgba(200,230,255,${a * 0.3})`);
        grad.addColorStop(1, `rgba(255,255,255,${a})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        return true;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      if ((container as any).__bgObserver) {
        (container as any).__bgObserver.disconnect();
        delete (container as any).__bgObserver;
      }
    };
  }, [color, density, fixed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none overflow-hidden",
        fixed ? "fixed inset-0 z-0" : "absolute inset-0",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
