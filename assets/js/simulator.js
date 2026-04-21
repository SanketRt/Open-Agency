/* ============================================================
   Open Agency — simulator.js
   The Agency Simulator.

   Two canvases: raw image vs protected image. A terminal
   under each panel shows what a "scraper" extracts. Client-
   side only — images never leave the browser.
   ============================================================ */

(() => {
  'use strict';

  const rawCanvas = document.getElementById('simRaw');
  const protCanvas = document.getElementById('simProtected');
  const rawTerm = document.getElementById('termRaw');
  const protTerm = document.getElementById('termProtected');
  const toggleBtn = document.getElementById('toggleProtection');
  const fileInput = document.getElementById('simUpload');
  const resetBtn = document.getElementById('simReset');
  const captionEl = document.getElementById('simCaption');

  if (!rawCanvas || !protCanvas) return;

  const W = 512;
  rawCanvas.width = protCanvas.width = W;
  rawCanvas.height = protCanvas.height = W;

  const rctx = rawCanvas.getContext('2d');
  const pctx = protCanvas.getContext('2d');

  // State
  let currentImg = null;         // HTMLImageElement | null
  let currentLabel = 'portrait'; // what the scraper "thinks" it is
  let protectionOn = true;

  /* ---------- Default synthetic "image" --------- */
  // Built-in sample: a stylised portrait as an SVG-to-image.
  const defaultSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c7b59a"/>
          <stop offset="1" stop-color="#7d6749"/>
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg)"/>
      <!-- shoulders -->
      <path d="M0 512 C 80 380, 160 360, 256 360 C 352 360, 432 380, 512 512 Z" fill="#2a2725"/>
      <!-- neck -->
      <rect x="222" y="300" width="68" height="80" fill="#e9c9a7"/>
      <!-- head -->
      <ellipse cx="256" cy="230" rx="110" ry="130" fill="#eccaa6"/>
      <!-- hair -->
      <path d="M148 210 C 150 100, 362 100, 364 210 C 370 175, 340 120, 256 110 C 172 120, 142 175, 148 210 Z" fill="#3a2a1d"/>
      <!-- eyes -->
      <ellipse cx="214" cy="235" rx="9" ry="5" fill="#2a2018"/>
      <ellipse cx="298" cy="235" rx="9" ry="5" fill="#2a2018"/>
      <!-- nose -->
      <path d="M256 245 L 248 285 L 264 285 Z" fill="#d4ae88"/>
      <!-- mouth -->
      <path d="M232 310 Q 256 322 280 310" stroke="#8b4a3a" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;

  const svgToImage = (svg) => new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = reject;
    img.src = url;
  });

  /* ---------- Draw routines ---------- */
  const drawRaw = (img) => {
    rctx.clearRect(0, 0, W, W);
    rctx.fillStyle = '#ECE7DB';
    rctx.fillRect(0, 0, W, W);
    if (img) rctx.drawImage(img, 0, 0, W, W);
  };

  const drawProtected = (img, on) => {
    pctx.clearRect(0, 0, W, W);
    pctx.fillStyle = '#ECE7DB';
    pctx.fillRect(0, 0, W, W);
    if (img) pctx.drawImage(img, 0, 0, W, W);

    if (!on) return;

    // Apply a visible-but-gentle adversarial perturbation (for demo).
    // Real Glaze is near-imperceptible; we exaggerate here to be legible.
    const imageData = pctx.getImageData(0, 0, W, W);
    const d = imageData.data;
    // pseudo-random per-pixel drift
    for (let y = 0; y < W; y += 2) {
      for (let x = 0; x < W; x += 2) {
        const i = (y * W + x) * 4;
        // deterministic pseudo-noise based on coords (so it's consistent)
        const n = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1;
        const delta = (n - 0.5) * 40;
        d[i]   = Math.max(0, Math.min(255, d[i]   + delta));
        d[i+1] = Math.max(0, Math.min(255, d[i+1] + delta * 0.7));
        d[i+2] = Math.max(0, Math.min(255, d[i+2] + delta * 1.2));
      }
    }
    pctx.putImageData(imageData, 0, 0);

    // Subtle overlay crosshatch — the "cloak"
    pctx.save();
    pctx.globalAlpha = 0.05;
    pctx.strokeStyle = '#B4432E';
    pctx.lineWidth = 1;
    for (let i = -W; i < W; i += 7) {
      pctx.beginPath();
      pctx.moveTo(i, 0);
      pctx.lineTo(i + W, W);
      pctx.stroke();
    }
    pctx.restore();

    // Tiny C2PA badge
    pctx.save();
    pctx.fillStyle = 'rgba(14,14,14,0.85)';
    pctx.fillRect(W - 74, W - 28, 64, 20);
    pctx.fillStyle = '#FAF9F6';
    pctx.font = '500 10px ui-monospace, Menlo, monospace';
    pctx.textBaseline = 'middle';
    pctx.fillText('C2PA ✓ cr', W - 70, W - 18);
    pctx.restore();
  };

  /* ---------- Terminal output ---------- */
  const line = (cls, text) => `<div class="${cls}">${text}</div>`;
  const flag = (txt) => `<span class="flag">${txt}</span>`;

  const renderRawTerm = (label) => {
    rawTerm.innerHTML =
      line('prompt', '$ scraper --extract image.jpg') +
      line('mute',   '&gt; reading bytes... 142 KB JPEG') +
      line('ok',     `&gt; EXIF: camera=Sony A7III · lens=24–70mm · created=2024-03-11`) +
      line('ok',     `&gt; CLIP classify: <strong>${label}</strong> · confidence 0.91`) +
      line('ok',     `&gt; captioning: "a portrait of a person, studio light, neutral background"`) +
      line('mute',   '&gt; manifest check: none found') +
      line('warn',   `&gt; training signal: ${flag('STRONG')} — added to dataset.`);
  };

  const renderProtectedTerm = (label) => {
    protTerm.innerHTML =
      line('prompt', '$ scraper --extract image.jpg') +
      line('mute',   '&gt; reading bytes... 148 KB JPEG') +
      line('bad',    `&gt; manifest: <strong>C2PA v1.3 detected</strong> — claim: do_not_train=true`) +
      line('warn',   `&gt; CLIP classify: ${label}? · confidence 0.41 (unstable)`) +
      line('bad',    `&gt; adversarial perturbation detected (LPIPS ≈ 0.07)`) +
      line('warn',   `&gt; captioning drift: "abstract expressionist study, noisy texture"`) +
      line('bad',    `&gt; training signal: ${flag('CORRUPTED')} — poisoned or cloaked.`);
  };

  const renderUnprotectedFallback = (label) => {
    protTerm.innerHTML =
      line('prompt', '$ scraper --extract image.jpg') +
      line('mute',   '&gt; protection OFF — same as left panel') +
      line('ok',     `&gt; CLIP classify: <strong>${label}</strong> · confidence 0.91`) +
      line('warn',   `&gt; training signal: ${flag('STRONG')}`);
  };

  /* ---------- Orchestrate ---------- */
  const rerender = () => {
    drawRaw(currentImg);
    drawProtected(currentImg, protectionOn);
    renderRawTerm(currentLabel);
    if (protectionOn) renderProtectedTerm(currentLabel);
    else renderUnprotectedFallback(currentLabel);

    toggleBtn.setAttribute('aria-pressed', String(protectionOn));
    toggleBtn.textContent = protectionOn ? 'Turn protection OFF' : 'Turn protection ON';
  };

  /* ---------- Events ---------- */
  toggleBtn.addEventListener('click', () => {
    protectionOn = !protectionOn;
    rerender();
  });

  resetBtn.addEventListener('click', async () => {
    currentImg = await svgToImage(defaultSvg);
    currentLabel = 'portrait';
    captionEl.textContent = 'Built-in sample — a stylised portrait.';
    protectionOn = true;
    rerender();
    fileInput.value = '';
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please choose an image file.'); return; }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      currentImg = img;
      currentLabel = 'your image';
      captionEl.textContent = 'Your image — processed entirely in this browser tab.';
      rerender();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });

  /* ---------- Init ---------- */
  (async () => {
    currentImg = await svgToImage(defaultSvg);
    rerender();
  })();
})();
