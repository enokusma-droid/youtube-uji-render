"""dm-001: 7 langkah digital marketing, whiteboard handanim 1920x1080, VO per kalimat.
Hasil: handanim/visual.mp4 + handanim/vo.wav (gabungan kalimat, jeda sama persis dengan timeline visual).
Jalankan dari akar repo: python proyek/dm-001/handanim/buat.py [snap [detik,...]]
"""
import json
import os
import subprocess
import sys
import time
import wave

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(HERE, "..", "..", "..", "pustaka", "handanim"))

import gambar as G  # noqa: E402
import templat as T  # noqa: E402

SR = 24000
AWAL = 0.5            # diam sebelum kalimat pertama
JEDA_KALIMAT = 0.15
JEDA_ADEGAN = 0.4
EKOR = 2.0            # diam setelah kalimat terakhir

NASKAH_PENUH = json.load(open(os.path.join(ROOT, "naskah.json"), encoding="utf-8"))
# adegan yang VO-nya belum ada dilewati (taruh di luar durasi video)
LEWATI = [sc["id"] for sc in NASKAH_PENUH if not all(os.path.exists(os.path.join(ROOT, "vo", f"{sc['id']}_{n}.wav")) for n in range(len(sc["lines"])))]
NASKAH = [sc for sc in NASKAH_PENUH if sc["id"] not in LEWATI]


def baca_pcm(p):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype=np.int16)


# ---------- timeline dari durasi wav per kalimat ----------
PCM, BEAT, ADEGAN = {}, {}, {}
t = AWAL
perkiraan = False
for ai, sc in enumerate(NASKAH):
    if ai:
        t += JEDA_ADEGAN
    a0 = t
    for n, line in enumerate(sc["lines"]):
        if n:
            t += JEDA_KALIMAT
        p = os.path.join(ROOT, "vo", f"{sc['id']}_{n}.wav")
        if os.path.exists(p):
            PCM[(sc["id"], n)] = baca_pcm(p)
            d = len(PCM[(sc["id"], n)]) / SR
        else:
            d = len(line) / 14.0
            perkiraan = True
        BEAT[(sc["id"], n)] = (t, d)
        t += d
    ADEGAN[sc["id"]] = (a0, t)
TOTAL = t + EKOR
for j, sid in enumerate(LEWATI):
    o = TOTAL + 100 + j * 60
    ADEGAN[sid] = (o, o + 50)
    for n in range(len(next(sc for sc in NASKAH_PENUH if sc["id"] == sid)["lines"])):
        BEAT[(sid, n)] = (o + n * 10, 8)
if LEWATI:
    print("DILEWATI (VO belum ada):", LEWATI)


def tulis_vo(path):
    buf = np.zeros(int(round(TOTAL * SR)), dtype=np.int16)
    for k, (st, d) in BEAT.items():
        if k not in PCM:
            continue
        x = PCM[k]
        i = int(round(st * SR))
        buf[i:i + len(x)] = x[: len(buf) - i]
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(buf.tobytes())


V = T.Video(1920, 1080, fps=24)


def mulai(sid, pudar=True):
    a0, a1 = ADEGAN[sid]
    a = V.adegan(a0, a1 + 0.02, pudar)
    judul = next(s["judul"] for s in NASKAH_PENUH if s["id"] == sid)
    b = lambda n: BEAT[(sid, n)]  # noqa: E731
    st, d = b(0)
    jd = min(1.6, d * 0.35)
    T.judul(a, judul, st - (0.3 if sid != "pembuka" else 0.4), jd + 0.3, y=28, size=84)
    return a, b, jd


def w(beat, mulai_=0.0, porsi=1.0, isi=0.88):
    """Jendela gambar di dalam satu kalimat: (t, d) mulai pada pecahan `mulai_`, sepanjang `porsi` dari 88% kalimat."""
    st, d = beat
    dd = d * isi
    return st + dd * mulai_, dd * porsi


def seq_dari(beat, jd):
    """Jendela kalimat pertama setelah judul selesai digambar."""
    st, d = beat
    return st + jd, max(0.6, d * 0.9 - jd)


# ===== pembuka =====
a, b, jd = mulai("pembuka")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.hp, (70, 210, 230, 380), t0, d0 * 0.45, label="media sosial", layar="sosmed")
T.ikon(a, G.grafik, (340, 230, 400, 360), t0 + d0 * 0.45, d0 * 0.55, label="penjualan sepi", label_c=G.MERAH, arah="turun")
t1, d1 = w(b(1))
T.ikon(a, G.wanita, (790, 260, 300, 540), t1, d1 * 0.5, pose="berpikir", baju=G.UNGU)
a.seq(T.teks_kotak("produk", 1130, 270, 300, 64)[0] + G.centang(1480, 300, 0.9), t1 + d1 * 0.5, d1 * 0.2)
a.seq(T.teks_kotak("cara memasarkan", 1130, 420, 420, 64, G.MERAH)[0] + G.tanya(1610, 440, 0.6), t1 + d1 * 0.7, d1 * 0.3)
t2, d2 = w(b(2))
a.seq(G.tangga(1240, 760, 0.75, 4, G.HIJAU), t2, d2 * 0.3)
a.seq(T.teks_kotak("7 langkah", 1080, 840, 650, 96, G.MERAH, maks_baris=1, rata="tengah", tebal=5)[0], t2 + d2 * 0.3, d2 * 0.35)
a.seq(G.coret_bawah(1180, 1640, 950, G.ORANYE), t2 + d2 * 0.65, d2 * 0.15)
a.seq(T.teks_kotak("bisa langsung diterapkan", 70, 860, 900, 56)[0], t2 + d2 * 0.8, d2 * 0.2)

# ===== 1. target =====
a, b, jd = mulai("target")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.target, (60, 200, 330, 330), t0, d0)
t1, d1 = w(b(1))
a.seq(G.kerumunan(1050, 290, 0.95, 7, sorot={2}), t1, d1 * 0.35)
for i, lab in enumerate(["umur", "lokasi", "pekerjaan", "masalah"]):
    x = 470 + i * 320
    a.seq([G.kotak(x, 420, 290, 90, G.BIRU, 3, r=20)] + T.teks_kotak(lab, x + 15, 440, 260, 52, G.BIRU, maks_baris=1, rata="tengah")[0],
          t1 + d1 * (0.35 + i * 0.16), d1 * 0.16)
t2, d2 = w(b(2))
T.ikon(a, G.megafon, (60, 600, 330, 230), t2, d2 * 0.45)
a.seq(T.teks_kotak("pesan yang tepat", 410, 660, 420, 64, G.HIJAU)[0] + G.centang(560, 860, 1.1), t2 + d2 * 0.45, d2 * 0.55)
t3, d3 = w(b(3))
T.ikon(a, G.kue, (900, 600, 240, 300), t3, d3 * 0.3)
T.ikon(a, G.wanita, (1170, 560, 200, 420), t3 + d3 * 0.3, d3 * 0.35, pose="senang", baju=G.HIJAU)
a.seq(T.teks_kotak("ibu bekerja, butuh kue untuk acara keluarga", 1390, 640, 360, 50, maks_baris=4)[0], t3 + d3 * 0.65, d3 * 0.35)

# ===== 2. website =====
a, b, jd = mulai("website")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.rumah, (60, 190, 400, 400), t0, d0, label="rumah digital", label_c=G.MERAH)
t1, d1 = w(b(1))
T.dua_kolom(a, (560, 190, 1160, 400), ("media sosial: aturan berubah", G.logo_platform, {"nama": "instagram"}),
            ("website: milikmu", G.gembok, {}), t1, d1)
t2, d2 = w(b(2))
for i in range(3):
    a.seq(G.bintang(130 + i * 140, 690, 0.65), t2 + i * d2 * 0.15, d2 * 0.15)
a.seq(T.teks_kotak("lebih terpercaya", 60, 790, 460, 64, G.ORANYE)[0], t2 + d2 * 0.5, d2 * 0.5)
t3, d3 = w(b(3))
T.ikon(a, G.laptop, (560, 630, 470, 300), t3, d3 * 0.25, layar="web")
butir = ["siapa kamu", "apa yang kamu jual", "bukti dari pelanggan", "tombol hubungi"]
T.daftar_langkah(a, (1080, 610, 650, 360), butir, [(t3 + d3 * (0.25 + i * 0.1875), d3 * 0.1875) for i in range(4)], size=50)

# ===== 3. SEO =====
a, b, jd = mulai("seo")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.google, (70, 200, 560, 200), t0, d0 * 0.7)
T.ikon(a, G.laba_laba, (650, 180, 240, 240), t0 + d0 * 0.7, d0 * 0.3)
t1, d1 = w(b(1))
T.ikon(a, G.laptop, (60, 450, 440, 330), t1, d1 * 0.35, label="artikel menjawab pertanyaan", label_size=40, layar="seo")
T.ikon(a, G.kaca_pembesar, (560, 470, 300, 300), t1 + d1 * 0.35, d1 * 0.65, label="kata kunci yang dicari", label_size=40, label_c=G.BIRU)
t2, d2 = w(b(2))
T.ikon(a, G.grafik, (980, 200, 380, 330), t2, d2 * 0.55, arah="naik")
T.ikon(a, G.jam, (1420, 200, 300, 330), t2 + d2 * 0.55, d2 * 0.45, label="setiap hari")
t3, d3 = w(b(3))
T.statistik(a, (960, 620, 780, 330), "1 artikel", "mendatangkan pelanggan bertahun-tahun", t3, d3, c=G.HIJAU, fn=G.email)

# ===== 4. konten =====
a, b, jd = mulai("konten")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.wanita, (50, 180, 220, 380), t0, d0 * 0.6, pose="hp", baju=G.ORANYE)
T.ikon(a, G.hp, (290, 220, 170, 300), t0 + d0 * 0.6, d0 * 0.4, layar="sosmed")
t1, d1 = w(b(1))
for i, (lab, fn) in enumerate([("tips", G.bintang), ("cerita pelanggan", G.hati), ("di balik layar", G.toko)]):
    T.ikon(a, fn, (560 + i * 400, 190, 340, 330), t1 + i * d1 / 3, d1 / 3, label=lab, label_c=G.BIRU)
t2, d2 = w(b(2))
T.dua_kolom(a, (60, 560, 860, 400), ("10 konten lalu berhenti", G.grafik, {"arah": "turun"}),
            ("3 konten seminggu, rutin", G.checklist, {"n": 3}), t2, d2, label_size=42)
t3, d3 = w(b(3))
T.ikon(a, G.kalender, (990, 580, 280, 360), t3, d3 * 0.3, hari=["Sen", "Sel", "Rab", "Kam"], tandai=(0, 2))
T.daftar_langkah(a, (1300, 590, 440, 350), ["Senin: tips", "Rabu: cerita", "Jumat: di balik layar"],
                 [(t3 + d3 * (0.3 + i * 0.233), d3 * 0.233) for i in range(3)], size=48)

# ===== 5. platform =====
a, b, jd = mulai("platform")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.wanita, (50, 190, 260, 500), t0, d0, pose="berpikir", baju=G.BIRU, rok=G.HITAM)
t1, d1 = w(b(1))
for i, nm in enumerate(["instagram", "tiktok", "facebook", "youtube", "linkedin"]):
    T.ikon(a, G.logo_platform, (360 + i * 275, 200, 210, 190), t1 + i * d1 * 0.12, d1 * 0.12, nama=nm)
a.seq(T.teks_kotak("di mana pelangganmu berkumpul?", 380, 420, 1340, 62, G.MERAH, maks_baris=1, rata="tengah")[0], t1 + d1 * 0.6, d1 * 0.4)
t2, d2 = w(b(2))
T.ikon(a, G.target, (340, 560, 300, 300), t2, d2 * 0.45, panah_=True)
a.seq(T.teks_kotak("fokus 1 atau 2 platform dulu", 660, 640, 420, 58, G.HIJAU, maks_baris=2)[0], t2 + d2 * 0.45, d2 * 0.55)
t3, d3 = w(b(3))
T.dua_kolom(a, (1110, 540, 630, 420), ("anak muda", G.logo_platform, {"nama": "tiktok"}),
            ("perusahaan", G.logo_platform, {"nama": "linkedin"}), t3, d3, tanda=(None, None), vs=False, label_size=44)

# ===== 6. kontak =====
a, b, jd = mulai("kontak")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.whatsapp, (70, 200, 240, 240), t0, d0 * 0.5)
T.ikon(a, G.email, (350, 230, 260, 190), t0 + d0 * 0.5, d0 * 0.5)
t1, d1 = w(b(1))
T.ikon(a, G.checklist, (720, 180, 240, 330), t1, d1 * 0.4, label="panduan gratis", label_c=G.HIJAU, label_size=42, centang_=0)
a.seq([G.panah((1000, 330), (1180, 330), G.ORANYE, 6), G.panah((1180, 380), (1000, 380), G.ORANYE, 6)], t1 + d1 * 0.4, d1 * 0.2)
T.ikon(a, G.hp, (1230, 180, 200, 330), t1 + d1 * 0.6, d1 * 0.4, label="nomor WA / email", label_size=40, layar="wa")
t2, d2 = w(b(2))
T.ikon(a, G.gembok, (70, 580, 200, 260), t2, d2 * 0.35)
a.seq(T.teks_kotak("aset milikmu, tanpa bergantung algoritma", 300, 640, 520, 56, maks_baris=3)[0], t2 + d2 * 0.35, d2 * 0.65)
t3, d3 = w(b(3))
T.tokoh_balon(a, (900, 560, 840, 410), "pesan bermanfaat, bukan hanya promosi", t3, d3, pose="senang", baju=G.HIJAU, size=48)

# ===== 7. iklan =====
a, b, jd = mulai("iklan")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.megafon, (60, 200, 330, 240), t0, d0 * 0.55)
T.ikon(a, G.uang, (420, 240, 240, 140), t0 + d0 * 0.55, d0 * 0.45)
t1, d1 = w(b(1))
T.ikon(a, G.koin, (720, 190, 200, 260), t1, d1 * 0.15, label="kecil", label_size=40)
for i, (v, n) in enumerate([("A", "2 pesan"), ("B", "9 pesan"), ("C", "4 pesan")]):
    x = 960 + i * 260
    items = [G.kotak(x, 200, 220, 170, G.HITAM, 4, r=14), G.teks(v, x + 85, 225, 100, G.BIRU, 5)]
    items += T.teks_kotak(n, x, 390, 220, 48, G.HIJAU if v == "B" else G.HITAM, maks_baris=1, rata="tengah")[0]
    a.seq(items, t1 + d1 * (0.15 + i * 0.22), d1 * 0.22)
a.seq(G.lingkari(1350, 330, 330, 330, G.MERAH, 5), t1 + d1 * 0.82, d1 * 0.18)
t2, d2 = w(b(2))
T.ikon(a, G.grafik, (60, 560, 400, 360), t2, d2 * 0.6, label="besarkan yang terbukti", label_c=G.HIJAU, arah="naik")
T.ikon(a, G.tumpukan_koin, (490, 620, 220, 260), t2 + d2 * 0.6, d2 * 0.4)
t3, d3 = w(b(3))
T.ikon(a, G.kalender, (820, 580, 280, 330), t3, d3 * 0.25, label="hari pertama", label_size=40, tandai=(0,))
T.ikon(a, G.uang, (1140, 620, 260, 160), t3 + d3 * 0.25, d3 * 0.2)
a.seq(G.silang(1270, 700, 1.4), t3 + d3 * 0.45, d3 * 0.1)
a.seq(T.teks_kotak("jangan langsung anggaran besar", 1130, 820, 610, 50, G.MERAH, maks_baris=2)[0], t3 + d3 * 0.55, d3 * 0.45)

# ===== ukur hasil =====
a, b, jd = mulai("ukur")
t0, d0 = seq_dari(b(0), jd)
T.ikon(a, G.kaca_pembesar, (60, 200, 250, 250), t0, d0 * 0.4)
T.ikon(a, G.laptop, (330, 210, 420, 260), t0 + d0 * 0.4, d0 * 0.6, layar="grafik")
t1, d1 = w(b(1))
for i, (lab, fn, kw) in enumerate([("pengunjung", G.kerumunan, {"n": 3, "sorot": {1}}), ("pesan masuk", G.whatsapp, {}), ("penjualan", G.koin, {})]):
    box = (800 + i * 320, 190, 280, 290) if fn is not G.kerumunan else (800 + i * 320 - 160, 190, 600, 290)
    T.ikon(a, fn, box, t1 + i * d1 / 3, d1 / 3, label=lab, label_c=G.BIRU, label_size=44, **kw)
t2, d2 = w(b(2))
T.dua_kolom(a, (60, 560, 860, 400), ("tambah", G.grafik, {"arah": "naik"}), ("hentikan", G.grafik, {"arah": "turun"}),
            t2, d2, tanda=("v", "x"), vs=False)
t3, d3 = w(b(3))
T.ikon(a, G.tabel, (990, 600, 360, 280), t3, d3 * 0.5)
a.seq(T.teks_kotak("1 tabel sederhana, isi tiap minggu", 1380, 620, 360, 50, maks_baris=4)[0], t3 + d3 * 0.5, d3 * 0.5)

# ===== ringkas =====
a, b, jd = mulai("ringkas")
t0, d0 = seq_dari(b(0), jd)
butir = ["target yang jelas", "website", "SEO", "konten konsisten", "platform tepat", "kumpulkan kontak", "iklan terukur"]
per = d0 / 7
T.daftar_langkah(a, (120, 190, 700, 680), butir[:4], [(t0 + i * per, per) for i in range(4)], size=56, nomor=True)
T.daftar_langkah(a, (960, 190, 700, 510), butir[4:], [(t0 + (4 + i) * per, per) for i in range(3)], size=56, nomor=True, nomor_awal=5)
t1, d1 = w(b(1))
a.seq(G.tangga(1100, 830, 0.55, 4, G.HIJAU), t1, d1 * 0.3)
a.seq(T.teks_kotak("satu per satu", 1300, 790, 440, 70, G.MERAH, maks_baris=1)[0], t1 + d1 * 0.3, d1 * 0.7)

# ===== penutup =====
a, b, jd = mulai("penutup", pudar=False)
t0, d0 = seq_dari(b(0), jd)
T.dua_kolom(a, (60, 230, 1060, 620), ("viral sekali", G.bola_viral, {}), ("sistem yang berjalan terus", G.roda_gigi, {}), t0, d0)
t1, d1 = w(b(1))
T.ikon(a, G.wanita, (1260, 190, 300, 540), t1, d1 * 0.4, pose="senang", baju=G.MERAH)
a.seq([G.kotak(1120, 760, 600, 170, G.MERAH, 5, r=40, fill=G.isi(G.MERAH, 14))] +
      T.teks_kotak("Ikuti channel ini", 1150, 800, 540, 76, G.HITAM, maks_baris=1, rata="tengah", tebal=5)[0], t1 + d1 * 0.4, d1 * 0.5)

V.commit()


if __name__ == "__main__":
    os.makedirs(HERE, exist_ok=True)
    print(f"total {TOTAL:.2f} dtk, {len(BEAT)} kalimat" + (" (DURASI PERKIRAAN: wav belum lengkap)" if perkiraan else ""))
    if len(sys.argv) > 1 and sys.argv[1] == "snap":
        if len(sys.argv) > 2:
            waktu = [float(x) for x in sys.argv[2].split(",")]
        else:
            waktu = [ADEGAN[s["id"]][1] - 0.05 for s in NASKAH]
        os.makedirs(os.path.join(HERE, "snap"), exist_ok=True)
        for i, tt in enumerate(waktu):
            p = os.path.join(HERE, "snap", f"snap_{i:02d}_{tt:.1f}.png")
            V.snapshot(tt, p)
            print(p)
    else:
        if perkiraan:
            sys.exit("wav VO belum lengkap; render dibatalkan")
        tulis_vo(os.path.join(HERE, "vo.wav"))
        t_mulai = time.time()
        V.render(os.path.join(HERE, "visual.mp4"), TOTAL)
        print(f"render selesai {time.time() - t_mulai:.0f} dtk")
