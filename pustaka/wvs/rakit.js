#!/usr/bin/env node
// Rakit scenes.js untuk whiteboard-video-skill: gambar.js + templat.js + <proj>/adegan.js -> <proj>/scenes.js
// Pakai: node pustaka/wvs/rakit.js <folder wvs proyek>
// Proyek tanpa adegan.js (mis. seo-001 lama) dibiarkan: scenes.js miliknya dipakai apa adanya.
const fs = require('fs'), path = require('path');
const proj = path.resolve(process.argv[2] || '.');
const src = path.join(proj, 'adegan.js');
if (!fs.existsSync(src)) { console.log('rakit: tidak ada adegan.js di', proj, '(scenes.js dipakai apa adanya)'); process.exit(0); }
const part = f => `// ===== ${path.basename(f)} =====\n` + fs.readFileSync(f, 'utf8') + '\n';
const out = '// FILE HASIL RAKIT (jangan diedit). Sumber: pustaka/wvs/gambar.js + templat.js + adegan.js\n' +
  part(path.join(__dirname, 'gambar.js')) + part(path.join(__dirname, 'templat.js')) + part(src);
fs.writeFileSync(path.join(proj, 'scenes.js'), out);
console.log('rakit: scenes.js', (out.length / 1024).toFixed(1), 'KB');
