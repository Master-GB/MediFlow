import { useEffect, useRef } from 'react';

const WaveAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave parameters
    let time = 0;
    const wave = {
      y: 0.8,  // Vertical position (50% from top)
      length: 0.01,
      amplitude: 20,
      frequency: 0.01
    };

    const colors = [
      { r: 59, g: 130, b: 246, a: 0.6 },  // blue-500
      { r: 6, g: 182, b: 212, a: 0.4 },   // cyan-400
      { r: 139, g: 92, b: 246, a: 0.3 }   // purple-500
    ];

    const animate = () => {
      if (!ctx) return;

      // Clear with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.03;

      // Draw multiple waves
      colors.forEach((color, index) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Calculate wave y position based on canvas height
        const waveY = canvas.height * wave.y - (index * 15);

        // Draw wave
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.length + time + (index * 2)) *
            (wave.amplitude * (index + 1) / 2) *
            Math.sin(time * 0.5) +
            waveY;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        // Draw the wave
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.7,
        zIndex: 1
      }}
    />
  );
};

export default WaveAnimation;