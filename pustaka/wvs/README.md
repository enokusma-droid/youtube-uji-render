# Pustaka gambar whiteboard-video-skill

Gambar dan pola adegan yang bisa dipakai ulang untuk semua proyek `proyek/<kode>/wvs/`.
Lihat semua gambar sekaligus: `katalog.png`.

## Isi

| File | Isi |
|---|---|
| `gambar.js` | `G.*` pembangun path (mengembalikan string path atau objek bagian), `D.*` penggambar siap pakai (langsung `P()`/`T()` dengan warna dan pembagian waktu standar) |
| `templat.js` | `TPL.*` pola adegan: `judul`, `ikonBesar`, `kartu`, `duaKolom`, `daftar`, `statistik`, `tokohBalon`, `alur` |
| `rakit.js` | gabungkan `gambar.js` + `templat.js` + `adegan.js` proyek menjadi `scenes.js` |
| `katalog/` | papan katalog semua gambar (sumber `katalog.png`) |

## Cara pakai di proyek baru

1. Tulis `proyek/<kode>/wvs/adegan.js` (bukan `scenes.js`), isinya `window.SCENES = { idAdegan(A) { ... } }`. Contoh lengkap: `proyek/dm-001/wvs/adegan.js`.
2. Rakit: `node pustaka/wvs/rakit.js proyek/<kode>/wvs` lalu render seperti biasa (`make_audio.py`, `render.js <proj> sheet|full`).
3. Di CI langkah rakit sudah otomatis (render.yml). Proyek tanpa `adegan.js` (seo-001) memakai `scenes.js` miliknya apa adanya.

`scenes.js` hasil rakit jangan diedit; ubah `adegan.js` atau pustaka lalu rakit ulang.

## Ringkasan fungsi

- Tokoh: `D.wanita(x, yKaki, skala, pose, at, dur, {arah, baju})`. Pose: `berdiri`, `menunjuk`, `berpikir`, `senang`, `pegangHp`, `dadah`. Skala 1 = tinggi 380 px. `arah: -1` = cermin (menunjuk ke kiri). `G.orang`, `G.kerumunan` untuk ikon orang kecil.
- Perangkat: `G.laptop(x, y, w)` (`.bingkai`, `.alas`, `.layar`), `G.web(...)`, `G.hp(cx, cy, h)` (`.bingkai`, `.layar`), `G.feed(layar)`, `G.obrolan(layar)`, `G.kolomCari`, `G.browser`.
- Logo: `D.google(cx, cy, r, at)`, `D.whatsapp(cx, cy, r, at)`, `D.platform('ig'|'tiktok'|'yt'|'fb'|'in', cx, cy, r, at)`.
- Grafik: `D.grafik(x, y, w, h, 'naik'|'turun'|'datar'|'lonjakan'|'naikPelan', at)`, `D.batang(x, yDasar, nilai, at, dur, {bw, gap, hmax, c})`, `G.gauge`.
- Waktu: `D.kalender(x, y, w, h, at, dur, {kol, bar, judul})` + `G.selKalender(...)` untuk pusat sel, `G.jam`.
- Checklist: `TPL.daftar` (gaya `centang`, `nomor`, `titik`, `silang`; `mulai` = nomor awal), `G.kotakCentang`, `G.centang`, `G.tabel`.
- Pemasaran: `D.target(cx, cy, r, at, dur, {dart})`, `D.kacaPembesar`, `G.spider`, `G.email`, `D.megafon`, `G.balon`, `G.awanPikir`, `G.hati`, `D.bintang`, `G.perisai`, `G.lampu`, `G.kamera`, `G.hadiah`, `G.dokumen`, `G.corong`, `G.siklus`, `G.tangga`.
- Bisnis/uang: `D.toko`, `G.rumah`, `G.kantor`, `D.koin`, `G.tumpukanKoin`, `G.uang`, `G.kantongUang`, `G.brankas`, `D.kue`.
- Penanda: `D.lencana(n, ...)`, `D.centang`, `D.silang`, `D.coret` (X besar), `D.lingkari`, `D.garisBawah(bbox)`.
- Teks: `G.lebarTeks(teks, ukuran)`, `G.pasUkuran(teks, ukuran, lebarMaks)`.
- `TPL.judul(A, 'N. Judul')` otomatis membuat lencana angka bila judul diawali "N.", ukuran mengecil supaya muat.

## Aturan tata letak (sama dengan tool)

Judul di y 150, isi mulai y 260, semua di atas y 905 (teks keterangan 2 baris mulai ±y 930). Unsur di baris terakhir adegan harus selesai ±0,15 detik sebelum akhir baris (`render.js check` memberi WARN).

## Katalog

```
cd pustaka/wvs/katalog && node timeline.js && node ../rakit.js . && node <repo-tool>/scripts/render.js . sheet && cp previews/sheet.png ../katalog.png
```
