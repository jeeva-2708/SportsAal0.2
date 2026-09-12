import React, { useEffect, useRef } from 'react';
import './AtmosphericMist.css';

export default function AtmosphericMist() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Reduced density for thinner, wispy fog
    const particleCount = Math.min(Math.floor(width / 45), 28);
    const particles = [];

    // Offscreen canvas pre-rendering soft thin fog puff texture
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 280;
    cloudCanvas.height = 280;
    const cloudCtx = cloudCanvas.getContext('2d');
    const grad = cloudCtx.createRadialGradient(140, 140, 0, 140, 140, 140);
    grad.addColorStop(0, 'rgba(220, 225, 235, 0.16)');
    grad.addColorStop(0.35, 'rgba(170, 175, 185, 0.08)');
    grad.addColorStop(0.7, 'rgba(110, 115, 125, 0.02)');
    grad.addColorStop(1, 'rgba(10, 10, 10, 0)');
    cloudCtx.fillStyle = grad;
    cloudCtx.beginPath();
    cloudCtx.arc(140, 140, 140, 0, Math.PI * 2);
    cloudCtx.fill();

    class SmokeParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 80;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(0.25 + Math.random() * 0.35); // Rising slowly
        this.size = 180 + Math.random() * 200; // Thinner wispy cloud size
        this.alpha = 0;
        this.maxAlpha = 0.14 + Math.random() * 0.12; // Thinner fog opacity
        this.growth = 0.06 + Math.random() * 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.0012;
        this.life = 0;
        this.maxLife = 480 + Math.random() * 300;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += this.growth;
        this.rotation += this.vRot;
        this.life++;

        // Smooth fade-in and fade-out
        const progress = this.life / this.maxLife;
        if (progress < 0.22) {
          this.alpha = (progress / 0.22) * this.maxAlpha;
        } else if (progress > 0.7) {
          this.alpha = ((1 - progress) / 0.3) * this.maxAlpha;
        } else {
          this.alpha = this.maxAlpha;
        }

        if (this.life >= this.maxLife || this.y < -this.size) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.globalAlpha = this.alpha;
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.drawImage(
          cloudCanvas,
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size
        );
        context.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new SmokeParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render thin fog particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="atmospheric-mist-container" aria-hidden="true">
      <canvas ref={canvasRef} className="smoke-canvas" />
      <div className="smoke-bottom-base"></div>
    </div>
  );
}
