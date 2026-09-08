"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
}

export function InteractiveSynapse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    setCanvasSize();

    let width = canvas.width;
    let height = canvas.height;

    // Palet renkleri
    const dotColor = "rgba(74, 66, 59, 0.4)"; // #4A423B
    const lineColor = "rgba(168, 155, 141, "; // #A89B8D

    // Ekran boyutuna göre parçacık sayısı
    const particleCount = Math.floor((width * height) / 13000);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: Math.random() * 1.5 + 1.2,
      });
    }

    // Mouse Etkileşim Koordinatları
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150, // Etki çapı
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const onResize = () => {
      setCanvasSize();
      width = canvas.width;
      height = canvas.height;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.6;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Nokta çizimi
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        // Parçacıklar arası bağlantı çizgileri
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const connDx = p.x - p2.x;
          const connDy = p.y - p2.y;
          const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

          const maxDist = 115;
          if (connDist < maxDist) {
            const alpha = (1 - connDist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Mouse ile yakınındaki sinapslar arasındaki bağ
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(74, 66, 59, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}