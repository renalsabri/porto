const waveBands = Array.from(document.querySelectorAll('.wave-band'));

if (waveBands.length) {
  const width = 1920;
  const height = 1000;
  const configs = [
    { baseY: 620, amplitude: 80, frequency: 0.012, speed: 0.95, phase: 0.0 },
    { baseY: 680, amplitude: 50, frequency: 0.010, speed: 0.78, phase: 1.1 },
    { baseY: 760, amplitude: 40, frequency: 0.014, speed: 1.15, phase: 1.8 }
  ];

  function buildWavePath(config, time) {
    const points = [];
    const steps = 140;

    for (let i = 0; i <= steps; i += 1) {
      const x = (i / steps) * width;
      const wave = Math.sin((x / width) * Math.PI * 2.8 - time * config.speed + config.phase) * config.amplitude + Math.sin((x / width) * Math.PI * 4.4 - time * config.speed * 0.7 + config.phase * 0.9) * (config.amplitude * 0.28);
      const y = config.baseY + wave;
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }

    return `${points.join(' ')} L ${width} ${height} L 0 ${height} Z`;
  }

  function animate(time) {
    waveBands.forEach((band, index) => {
      band.setAttribute('d', buildWavePath(configs[index], time * 0.001));
    });

    requestAnimationFrame(animate);
  }

  waveBands.forEach((band, index) => {
    band.setAttribute('d', buildWavePath(configs[index], 0));
  });

  requestAnimationFrame(animate);
  
  // Real-time Clock Logic
  function updateClock() {
      const clockElement = document.getElementById('real-time-clock');
      if (clockElement) {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          
          // Formats as HH.MM (e.g., 13.00)
          clockElement.textContent = `${hours}.${minutes}`;
      }
  }

  // Update immediately, then set interval for every 1000ms (1 second)
  updateClock();
  setInterval(updateClock, 1000);
  
}
