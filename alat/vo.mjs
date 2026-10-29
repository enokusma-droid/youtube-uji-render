// VO per kalimat dari proyek/<kode>/naskah.json → proyek/<kode>/vo/<id>_<n>.wav (lewati yang sudah ada).
// Suara = channel/<slug>/brand.json vo.voice + vo.gaya (slug di proyek/<kode>/kanal.txt). Pakai: node alat/vo.mjs <kode> [paralel=4]
// Juga menyalin wav ke proyek/<kode>/wvs/audio/ bila folder wvs ada.
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";

const [, , kode, par = "4"] = process.argv;
if (!kode) { console.error("pakai: node alat/vo.mjs <kode> [paralel]"); process.exit(1); }
const P = path.resolve("proyek", kode);
const TTS = path.resolve("../alat/vo/tts.mjs"); // dijalankan dari E:\youtube-proyekender-wb
const slug = fs.readFileSync(path.join(P, "kanal.txt"), "utf8").trim();
const vo = JSON.parse(fs.readFileSync(path.resolve("../channel", slug, "brand.json"), "utf8")).vo;
if (!vo?.voice) { console.error(`brand.json ${slug} belum punya vo.voice`); process.exit(1); }
const naskah = JSON.parse(fs.readFileSync(path.join(P, "naskah.json"), "utf8"));
fs.mkdirSync(path.join(P, "vo"), { recursive: true });

const antre = [];
for (const s of naskah) s.lines.forEach((t, n) => {
  if (/[—–]|(tanpa|tidak) (maksa|paksa)/i.test(t)) { console.error(`LARANGAN di ${s.id}_${n}: ${t}`); process.exit(1); }
  const b = path.join(P, "vo", `${s.id}_${n}`);
  fs.writeFileSync(b + ".txt", t);
  if (!fs.existsSync(b + ".wav")) antre.push(b);
});
console.log(`${antre.length} kalimat perlu TTS`);

const jalan = (b) => new Promise((ok) => execFile("node", [TTS, b + ".txt", b + ".wav", "--voice", vo.voice, "--gaya", vo.gaya || ""], { maxBuffer: 1e7 }, (e, so, se) => {
  fs.writeFileSync(b + ".log", so + se);
  console.log(e ? `GAGAL ${path.basename(b)} (lihat .log)` : `ok ${path.basename(b)}`); ok(!e);
}));
let gagal = 0;
await Promise.all(Array.from({ length: +par }, async () => { while (antre.length) if (!(await jalan(antre.shift()))) gagal++; }));

const wvs = path.join(P, "wvs");
if (fs.existsSync(wvs)) {
  fs.mkdirSync(path.join(wvs, "audio"), { recursive: true });
  for (const f of fs.readdirSync(path.join(P, "vo"))) if (/^[^.]+_\d+\.wav$/.test(f)) fs.copyFileSync(path.join(P, "vo", f), path.join(wvs, "audio", f));
}
const ada = naskah.flatMap((s) => s.lines.map((_, n) => `${s.id}_${n}`)).filter((k) => fs.existsSync(path.join(P, "vo", k + ".wav"))).length;
const total = naskah.reduce((a, s) => a + s.lines.length, 0);
console.log(`VO ${ada}/${total}${gagal ? ` · ${gagal} gagal (kuota TTS? cek log tts-worker, ulangi nanti)` : ""}`);
process.exit(ada === total ? 0 : 2);
