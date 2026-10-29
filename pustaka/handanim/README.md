# Pustaka handanim (whiteboard)

Gambar dan pola adegan yang bisa dipakai ulang untuk video whiteboard handanim. Contoh lengkap: `proyek/dm-001/handanim/buat.py`.

## Isi
- `gambar.py`: ikon dengan pola `nama(cx, cy, s=1.0, ...) -> list[Drawable]`. (cx, cy) adalah titik tengah dalam koordinat dunia (x 0..1777, y 0..1000). Ukuran nominal ada di `UKURAN`.
  Tokoh `wanita(pose=berdiri|menunjuk|berpikir|senang|hp, baju=, rok=, hadap=1|-1)`, `orang_kecil`, `kerumunan(sorot=)`,
  `laptop(layar=web|grafik|seo)`, `hp(layar=chat|sosmed|wa)`, `google`, `whatsapp`, `logo_platform(nama=instagram|tiktok|linkedin|facebook|youtube)`,
  `grafik(arah=naik|turun)`, `kalender(tandai=, hari=)`, `target`, `checklist(n=, centang_=)`, `kaca_pembesar`, `laba_laba`, `email`, `megafon`, `toko(label=)`,
  `koin`, `tumpukan_koin`, `jam`, `rumah(label=)`, `tabel`, `hati`, `bintang`, `tangga`, `gembok`, `kue`, `uang`, `bola_viral`, `roda_gigi`,
  `balon_kata`, `balon_pikir`, `centang`, `silang`, `tanya`, `coret_bawah`, `lingkari`. Warna: `HITAM BIRU MERAH HIJAU ORANYE KUNING UNGU ABU ...`.
- `templat.py`: mesin + pola adegan.
  - `Video(1920, 1080, fps=24)`: `adegan(t0, t1, pudar=True)`, `commit()`, `snapshot(detik, png)`, `render(mp4, total)`.
    Render streaming: frame yang sama dengan frame sebelumnya tidak digambar ulang.
  - `Adegan.seq(drawables, t, d)` menggambar berurutan. Tangan + spidol (`SketchTangan`) MATI secara default (owner 18 Okt: "memperjelek, terkesan maksa"); hanya nyala dengan `Video(tangan=True)`, jangan dipakai. Semua isi adegan memudar di `t1`.
  - `teks_kotak(teks, x, y, lebar, size, maks_baris=2, rata=kiri|tengah)`: membungkus dan mengecilkan huruf supaya tidak terpotong.
  - Pola adegan: `judul` (judul "N. teks" jadi lencana nomor), `ikon` (ikon dipas ke kotak + label), `judul_ikon`, `dua_kolom` (perbandingan dengan silang/centang),
    `daftar_langkah` (checklist per butir, waktu per butir), `statistik` (angka besar + keterangan), `tokoh_balon` (wanita + balon kata/awan pikiran).
- `katalog.py`: menulis `katalog.png`, satu lembar berisi semua gambar untuk dicek.

## Cara pakai
```python
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "pustaka", "handanim"))
import gambar as G, templat as T

V = T.Video(1920, 1080, fps=24)
a = V.adegan(0.0, 6.0)
T.judul(a, "1. Tentukan target", 0.0, 1.2)
T.ikon(a, G.target, (60, 200, 330, 330), 1.2, 1.5, label="target")
T.tokoh_balon(a, (900, 560, 840, 410), "Halo!", 2.8, 2.5, pose="senang")
V.commit()
V.snapshot(5.5, "cek.png")      # cek tata letak dulu, cepat
V.render("visual.mp4", 6.0)
```
Selaraskan waktu dengan VO: hitung awal dan durasi tiap kalimat dari wav, lalu beri setiap kalimat satu "beat" gambar (lihat `BEAT` di dm-001).
Satu tangan pada satu waktu: jadwalkan `seq` antar-beat berurutan, jangan tumpang tindih.

## Catatan
- Font tulisan tangan = Feasibly (font pertama handanim). Tinggi huruf kecilnya kecil, jadi `teks_kotak` mengalikan ukuran dengan `SKALA_HURUF = 1.25`.
- `RoundedRectangle` bawaan handanim memakai radius pecahan + Curve yang melenceng; `G.kotak(..., r=)` membuat sudut bulat sendiri.
- Text bawaan memuat ulang file font untuk setiap huruf; `templat.py` memasang cache supaya membangun adegan cepat.
- Jalankan katalog: `python pustaka/handanim/katalog.py`.
