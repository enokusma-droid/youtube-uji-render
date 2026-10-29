// Bikin timeline.json palsu (tanpa audio) untuk katalog: tiap papan 1 baris 8 detik.
const fs = require('fs'), path = require('path');
const ids = ['tokoh', 'perangkat', 'grafik', 'pemasaran', 'bisnis', 'templat'];
let t = 0; const scenes = [];
for (const id of ids) { scenes.push({ id, start: t, end: t + 9, lines: [{ text: '', start: t + .2, end: t + 8.2 }] }); t += 9; }
fs.writeFileSync(path.join(__dirname, 'timeline.json'), JSON.stringify({ total: t, scenes }, null, 1));
fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify({ name: 'katalog', captions: false, pen: false,
  palette: { ink: '#1f2328', blue: '#3b5bdb', gold: '#e0a106', red: '#d6453b', green: '#2f9a58', gray: '#6b7079', paper: '#fbfbf8', paperCenter: '#ffffff', paperEdge: '#f1f0ea' } }, null, 1));
