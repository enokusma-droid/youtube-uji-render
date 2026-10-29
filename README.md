# youtube-uji-render

Render video whiteboard (gambar dari kode, tanpa AI) untuk channel YouTube uji, di GitHub Actions.
Mesin: [whiteboard-video-skill](https://github.com/Matteoikarieth96/whiteboard-video-skill) dan [handanim](https://github.com/subroy13/handanim) (versi dikunci di workflow).

- `proyek/<kode>/` : `naskah.json`, `kanal.txt`, `wvs/` (adegan), `handanim/` (opsional), `vo/` (WAV dibuat di PC sebelum render).
- `pustaka/` : pustaka gambar & templat adegan. Contoh proyek lengkap: `proyek/_contoh-dm-001/`.
- Render: `bash alat/render.sh <kode> whiteboard-video-skill` → hasil ke penyimpanan S3 (kunci di Actions secrets, tidak ada di repo).
