/*
  This is based on work done by Jake Albaugh (https://twitter.com/jake_albaugh/status/1118611365508337665)
*/

const bars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
const auditCtx = new AudioContext();
const analyser = auditCtx.createAnalyser();
analyser.fftSize = 32;
const data = new Uint8Array(16);

function setupVisualizer() {
  setTimeout(setupVisualizer, 40);
  analyser.getByteFrequencyData(data);
  const s = [];
  data.forEach(v => s.push(bars[Math.floor((v / 255) * 8)]));
  location.hash = document.title = s.join('');
}

navigator.mediaDevices.getUserMedia({ audio: true }).then(source => {
  auditCtx.createMediaStreamSource(source).connect(analyser);
  setupVisualizer();
});
