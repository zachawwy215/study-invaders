/* ============================================
   Shared animated starfield background.
   Expects a <canvas id="starfield"> on the page.
   ============================================ */
(function(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.floor((canvas.width * canvas.height) / 4000);
    stars = Array.from({length: count}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.15 + 0.02,
      twinklePhase: Math.random() * Math.PI * 2
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  let t = 0;
  function draw(){
    ctx.fillStyle = '#0a0b1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(const s of stars){
      const twinkle = reducedMotion ? 1 : (Math.sin(t * 0.02 + s.twinklePhase) * 0.35 + 0.65);
      ctx.globalAlpha = twinkle;
      ctx.fillStyle = '#e9e6f7';
      ctx.fillRect(s.x, s.y, s.r, s.r);
      if(!reducedMotion){
        s.y += s.speed;
        if(s.y > canvas.height){ s.y = 0; s.x = Math.random() * canvas.width; }
      }
    }
    ctx.globalAlpha = 1;
    t++;
    requestAnimationFrame(draw);
  }
  draw();
})();
