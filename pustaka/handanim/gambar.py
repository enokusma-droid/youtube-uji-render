"""Pustaka gambar whiteboard untuk handanim (dipakai ulang lintas proyek).

Konvensi: setiap fungsi ikon `nama(cx, cy, s=1.0, ...) -> list[Drawable]`.
(cx, cy) = titik tengah ikon di koordinat dunia scene (x 0..1777, y 0..1000 untuk 16:9).
Ukuran nominal pada s=1 tercatat di UKURAN (lebar, tinggi). Urutan list = urutan digambar.
"""
import math

from handanim.core import FillStyle, SketchStyle, StrokeStyle
from handanim.primitives import Arrow, Circle, Curve, Ellipse, Line, LinearPath, Polygon, Rectangle, Text

# ---------- warna ----------
HITAM = (0.1, 0.1, 0.12)
BIRU = (0.12, 0.35, 0.85)
MERAH = (0.85, 0.18, 0.15)
HIJAU = (0.1, 0.6, 0.25)
ORANYE = (0.95, 0.55, 0.1)
KUNING = (0.95, 0.75, 0.1)
UNGU = (0.5, 0.25, 0.7)
ABU = (0.55, 0.55, 0.6)
ABU_MUDA = (0.8, 0.8, 0.84)
KULIT = (0.98, 0.84, 0.7)
RAMBUT = (0.28, 0.16, 0.1)
PINK = (0.95, 0.5, 0.6)
WA = (0.15, 0.7, 0.35)

SK = SketchStyle(roughness=1.2)
SK_HALUS = SketchStyle(roughness=0.5, disable_multi_stroke=True)


def st(c=HITAM, w=3):
    return StrokeStyle(color=c, width=w)


def isi(c, gap=10, pola="hachure", sudut=45):
    return FillStyle(color=c, hachure_gap=gap, fill_pattern=pola, hachure_angle=sudut)


def _p(cx, cy, s, pts):
    return [(cx + x * s, cy + y * s) for x, y in pts]


def _busur(cx, cy, r, a0, a1, n=14, s=1.0):
    """Titik-titik busur (derajat, 0 = kanan, 90 = bawah)."""
    return [(cx + r * s * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
             cy + r * s * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]


def garis(a, b, c=HITAM, w=3, sk=SK):
    return Line(start=a, end=b, stroke_style=st(c, w), sketch_style=sk)


def kurva(pts, c=HITAM, w=3, sk=SK):
    return Curve(points=pts, stroke_style=st(c, w), sketch_style=sk)


def poli(pts, c=HITAM, w=3, fill=None, sk=SK):
    return Polygon(points=pts, stroke_style=st(c, w), sketch_style=sk, fill_style=fill)


def kotak(x, y, w, h, c=HITAM, lw=3, fill=None, r=0, sk=SK):
    if r:  # r dalam satuan dunia (RoundedRectangle bawaan memakai pecahan + Curve yang melenceng)
        r = min(r, w / 2, h / 2)
        pts = []
        for ccx, ccy, a0 in [(x + w - r, y + r, -90), (x + w - r, y + h - r, 0), (x + r, y + h - r, 90), (x + r, y + r, 180)]:
            pts += _busur(ccx, ccy, r, a0, a0 + 90, 4)
        return Polygon(points=pts, stroke_style=st(c, lw), sketch_style=sk, fill_style=fill)
    return Rectangle(top_left=(x, y), width=w, height=h, stroke_style=st(c, lw), sketch_style=sk, fill_style=fill)


def lingkaran(cx, cy, r, c=HITAM, w=3, fill=None, sk=SK):
    return Circle(center=(cx, cy), radius=r, stroke_style=st(c, w), sketch_style=sk, fill_style=fill)


def elips(cx, cy, w, h, c=HITAM, lw=3, fill=None, sk=SK):
    return Ellipse(center=(cx, cy), width=w, height=h, stroke_style=st(c, lw), sketch_style=sk, fill_style=fill)


def panah(a, b, c=HITAM, w=5, kepala=30):
    return Arrow(start_point=a, end_point=b, arrow_head_size=kepala, stroke_style=st(c, w), sketch_style=SK)


def lebar_huruf(s, size):
    return Text(text=s, position=(0, 0), font_size=size)._measure_text_width(s)


def teks(s, x, y, size, c=HITAM, w=3):
    """Teks satu baris; (x, y) = kiri ATAS kotak teks (bukan baseline)."""
    return Text(text=s, position=(x, y + size * 0.75), font_size=size, stroke_style=st(c, w), sketch_style=SK)


# ---------- tanda kecil ----------
def centang(cx, cy, s=1.0, c=HIJAU, w=6):
    return [LinearPath(points=_p(cx, cy, s, [(-45, 0), (-15, 35), (45, -40)]), stroke_style=st(c, w), sketch_style=SK)]


def silang(cx, cy, s=1.0, c=MERAH, w=6):
    return [garis(*_p(cx, cy, s, [(-40, -40), (40, 40)]), c=c, w=w), garis(*_p(cx, cy, s, [(40, -40), (-40, 40)]), c=c, w=w)]


def tanya(cx, cy, s=1.0, c=MERAH):
    return [teks("?", cx - 35 * s, cy - 80 * s, int(160 * s), c, 5)]


def bintang(cx, cy, s=1.0, c=KUNING):
    pts = []
    for i in range(10):
        r = 90 if i % 2 == 0 else 38
        a = math.radians(-90 + i * 36)
        pts.append((r * math.cos(a), r * math.sin(a)))
    return [poli(_p(cx, cy, s, pts), c=ORANYE, w=3, fill=isi(c, 7))]


def coret_bawah(x0, x1, y, c=MERAH, w=5):
    """Garis bawah bergelombang untuk menegaskan kata."""
    n = 8
    pts = [(x0 + (x1 - x0) * i / n, y + (4 if i % 2 else -4)) for i in range(n + 1)]
    return [kurva(pts, c, w)]


def lingkari(cx, cy, w, h, c=MERAH, lw=4):
    return [elips(cx, cy, w, h, c, lw)]


# ---------- tokoh wanita ----------
def wanita(cx, cy, s=1.0, pose="berdiri", baju=MERAH, rok=BIRU, hadap=1):
    """Tokoh wanita: rambut panjang + poni, wajah (mata, senyum, pipi), blus, rok, tangan, sepatu.
    Ukuran nominal 220 x 420; (cx, cy) = tengah badan. pose: berdiri | menunjuk | berpikir | senang | hp.
    hadap=-1 mencerminkan pose ke kiri (mis. menunjuk ke kiri)."""
    hx, hy = cx, cy - 150 * s

    def P(pts):
        return [(hx + hadap * x * s, hy + y * s) for x, y in pts]

    def pt(x, y):
        return (hx + hadap * x * s, hy + y * s)

    out = []
    # rambut belakang (helai samping), digambar dulu
    out.append(poli(P([(-40, -12), (-58, 30), (-62, 90), (-36, 98), (-42, 45), (-36, 8)]), c=RAMBUT, w=3, fill=isi(RAMBUT, 5, sudut=80)))
    out.append(poli(P([(40, -12), (58, 30), (62, 90), (36, 98), (42, 45), (36, 8)]), c=RAMBUT, w=3, fill=isi(RAMBUT, 5, sudut=100)))
    # kepala
    out.append(lingkaran(hx, hy, 42 * s, HITAM, 3, sk=SK_HALUS))
    # rambut atas + poni
    cap = [(48 * math.cos(math.radians(a)), 48 * math.sin(math.radians(a))) for a in range(195, 346, 15)]
    cap += [(26, -24), (12, -14), (-6, -26), (-24, -16), (-46, -12)]
    out.append(poli(P(cap), c=RAMBUT, w=3, fill=isi(RAMBUT, 5, sudut=30)))
    # wajah
    mata_y = 2 if pose == "berpikir" else 6
    for ex in (-15, 15):
        out.append(lingkaran(*pt(ex, mata_y), 4.5 * s, HITAM, 2, fill=isi(HITAM, pola="solid"), sk=SK_HALUS))
    out.append(lingkaran(*pt(-26, 20), 6 * s, PINK, 2, fill=isi(PINK, 3), sk=SK_HALUS))
    out.append(lingkaran(*pt(26, 20), 6 * s, PINK, 2, fill=isi(PINK, 3), sk=SK_HALUS))
    if pose == "senang":
        out.append(poli(P([(-14, 20), (14, 20), (8, 31), (0, 33), (-8, 31)]), c=HITAM, w=2, fill=isi(MERAH, 3), sk=SK_HALUS))
    elif pose == "berpikir":
        out.append(kurva(P([(-8, 26), (4, 25), (12, 22)]), HITAM, 2, SK_HALUS))
    else:
        out.append(kurva(P([(-13, 20), (0, 28), (13, 20)]), HITAM, 3, SK_HALUS))
    # leher + blus
    out.append(garis(pt(-8, 41), pt(-8, 56), HITAM, 3, SK_HALUS))
    out.append(garis(pt(8, 41), pt(8, 56), HITAM, 3, SK_HALUS))
    out.append(poli(P([(-46, 60), (46, 60), (36, 172), (-36, 172)]), c=HITAM, w=3, fill=isi(baju, 9)))
    out.append(LinearPath(points=P([(-16, 60), (0, 84), (16, 60)]), stroke_style=st(HITAM, 3), sketch_style=SK_HALUS))
    # rok
    out.append(poli(P([(-36, 172), (36, 172), (62, 262), (-62, 262)]), c=HITAM, w=3, fill=isi(rok, 9, sudut=-45)))
    # kaki + sepatu
    out.append(garis(pt(-20, 262), pt(-22, 335), HITAM, 4))
    out.append(garis(pt(20, 262), pt(22, 335), HITAM, 4))
    out.append(elips(*pt(-28, 340), 30 * s, 13 * s, HITAM, 2, fill=isi(HITAM, pola="solid"), sk=SK_HALUS))
    out.append(elips(*pt(28, 340), 30 * s, 13 * s, HITAM, 2, fill=isi(HITAM, pola="solid"), sk=SK_HALUS))

    def lengan(pts, tangan_r=10):
        out.append(kurva(P(pts), HITAM, 4))
        out.append(lingkaran(*pt(*pts[-1]), tangan_r * s, HITAM, 2, fill=isi(KULIT, pola="solid"), sk=SK_HALUS))

    if pose == "menunjuk":
        lengan([(-44, 68), (-60, 130), (-56, 190)])
        lengan([(44, 68), (110, 40), (168, 12)])
        out.append(garis(pt(176, 8), pt(204, -6), HITAM, 4))
    elif pose == "berpikir":
        lengan([(-44, 68), (-30, 140), (30, 150)])
        lengan([(44, 68), (72, 135), (22, 48)], 9)
        for i, (bx, by, r) in enumerate([(62, -60, 6), (82, -86, 9), (108, -118, 13)]):
            out.append(lingkaran(*pt(bx, by), r * s, ABU, 2))
    elif pose == "senang":
        lengan([(-44, 68), (-84, 12), (-100, -48)])
        lengan([(44, 68), (84, 12), (100, -48)])
    elif pose == "hp":
        lengan([(-44, 68), (-60, 130), (-56, 190)])
        lengan([(44, 68), (64, 140), (34, 112)])
        out.append(kotak(hx + hadap * 14 * s - (24 * s if hadap < 0 else 0), hy + 76 * s, 24 * s, 40 * s, HITAM, 3, fill=isi(BIRU, 4), r=0))
    else:
        lengan([(-44, 68), (-62, 130), (-58, 190)])
        lengan([(44, 68), (62, 130), (58, 190)])
    return out


def orang_kecil(cx, cy, s=1.0, c=ABU, wanita_=False):
    """Siluet orang kecil (kepala + bahu) untuk kerumunan/audiens. Ukuran 80 x 110."""
    out = [lingkaran(cx, cy - 25 * s, 20 * s, c, 3)]
    if wanita_:
        out.append(kurva(_p(cx, cy, s, [(-20, -32), (-26, -10), (-22, 2)]), c, 3))
        out.append(kurva(_p(cx, cy, s, [(20, -32), (26, -10), (22, 2)]), c, 3))
    out.append(kurva(_p(cx, cy, s, [(-38, 50), (-32, 10), (0, 2), (32, 10), (38, 50)]), c, 3))
    return out


def kerumunan(cx, cy, s=1.0, n=7, sorot=None):
    """Barisan orang kecil; indeks `sorot` digambar berwarna (target terpilih). Lebar ~ n*85."""
    out = []
    x0 = cx - (n - 1) * 42 * s
    for i in range(n):
        c = MERAH if sorot is not None and i in sorot else ABU
        out += orang_kecil(x0 + i * 84 * s, cy + (8 if i % 2 else 0) * s, s, c, wanita_=(i % 2 == 0))
    return out


# ---------- perangkat ----------
def laptop(cx, cy, s=1.0, layar="web"):
    """Laptop 320 x 190. layar: web | grafik | seo | kosong."""
    out = [kotak(cx - 120 * s, cy - 95 * s, 240 * s, 150 * s, HITAM, 4, r=10 * s)]
    out.append(poli(_p(cx, cy, s, [(-150, 58), (150, 58), (165, 92), (-165, 92)]), c=HITAM, w=4, fill=isi(ABU, 12)))
    x0, y0 = cx - 105 * s, cy - 80 * s
    if layar == "web":
        out.append(kotak(x0, y0, 210 * s, 26 * s, BIRU, 3, fill=isi(BIRU, 6)))
        out.append(kotak(x0, y0 + 36 * s, 90 * s, 70 * s, ORANYE, 3, fill=isi(ORANYE, 10)))
        for i in range(3):
            out.append(garis((x0 + 105 * s, y0 + (46 + i * 22) * s), (x0 + (205 - i * 25) * s, y0 + (46 + i * 22) * s), ABU, 3))
    elif layar == "grafik":
        out.append(LinearPath(points=[(x0 + 10 * s, y0 + 10 * s), (x0 + 10 * s, y0 + 115 * s), (x0 + 200 * s, y0 + 115 * s)], stroke_style=st(HITAM, 3), sketch_style=SK))
        out.append(LinearPath(points=_p(x0, y0, s, [(20, 100), (70, 80), (110, 88), (150, 45), (195, 20)]), stroke_style=st(HIJAU, 5), sketch_style=SK))
    elif layar == "seo":
        out.append(kotak(x0 + 15 * s, y0 + 8 * s, 180 * s, 26 * s, HITAM, 3, r=12 * s))
        for i in range(3):
            yy = y0 + (50 + i * 24) * s
            out.append(garis((x0 + 15 * s, yy), (x0 + 120 * s, yy), BIRU if i == 0 else ABU, 4))
    return out


def hp(cx, cy, s=1.0, layar="chat"):
    """Ponsel 120 x 220. layar: chat | sosmed | wa | kosong."""
    out = [kotak(cx - 60 * s, cy - 110 * s, 120 * s, 220 * s, HITAM, 4, r=18 * s)]
    out.append(garis((cx - 15 * s, cy - 96 * s), (cx + 15 * s, cy - 96 * s), HITAM, 3))
    out.append(lingkaran(cx, cy + 92 * s, 8 * s, HITAM, 2))
    if layar == "chat" or layar == "wa":
        c = WA if layar == "wa" else BIRU
        out.append(kotak(cx - 45 * s, cy - 75 * s, 65 * s, 28 * s, c, 3, fill=isi(c, 6), r=8 * s))
        out.append(kotak(cx - 20 * s, cy - 35 * s, 65 * s, 28 * s, ABU, 3, r=8 * s))
        out.append(kotak(cx - 45 * s, cy + 5 * s, 75 * s, 28 * s, c, 3, fill=isi(c, 6), r=8 * s))
        out.append(kotak(cx - 10 * s, cy + 45 * s, 55 * s, 24 * s, ABU, 3, r=8 * s))
    elif layar == "sosmed":
        out.append(kotak(cx - 45 * s, cy - 78 * s, 90 * s, 80 * s, ORANYE, 3, fill=isi(ORANYE, 10)))
        out += hati(cx - 28 * s, cy + 28 * s, 0.22 * s)
        for i in range(2):
            out.append(garis((cx - 45 * s, cy + (52 + i * 18) * s), (cx + (45 - i * 30) * s, cy + (52 + i * 18) * s), ABU, 3))
    return out


def hati(cx, cy, s=1.0, c=MERAH):
    """Hati 200 x 180."""
    pts = []
    for i in range(25):
        t = math.pi * 2 * i / 24
        x = 16 * math.sin(t) ** 3
        y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
        pts.append((x * 6, y * 6))
    return [poli(_p(cx, cy, s, pts), c=c, w=3, fill=isi(c, 6))]


# ---------- logo sederhana ----------
def google(cx, cy, s=1.0, kata=True):
    """Logo G berwarna (busur 4 warna + palang) dan kata 'Google'. Ikon 160 x 160, dengan kata 420 x 160."""
    gx = cx - (130 * s if kata else 0)
    out = []
    r = 70
    for a0, a1, c in [(-40, 40, BIRU), (40, 140, HIJAU), (140, 215, KUNING), (215, 320, MERAH)]:
        out.append(kurva(_busur(gx, cy, r, a0, a1, 10, s), c, 16))
    out.append(garis((gx + 8 * s, cy), (gx + 72 * s, cy), BIRU, 16))
    if kata:
        x = gx + 100 * s
        size = int(95 * s)
        for ch, c in zip("Google", [BIRU, MERAH, KUNING, BIRU, HIJAU, MERAH]):
            out.append(teks(ch, x, cy - 60 * s, size, c, 4))
            x += lebar_huruf(ch, size) + 4 * s
    return out


def whatsapp(cx, cy, s=1.0):
    """Logo WhatsApp: balon bulat hijau + ekor + gagang telepon. 180 x 180."""
    out = [lingkaran(cx, cy, 80 * s, WA, 7)]
    out.append(poli(_p(cx, cy, s, [(-62, 48), (-82, 86), (-38, 70)]), c=WA, w=6, fill=isi(WA, 5)))
    out.append(kurva(_p(cx, cy, s, [(-30, -38), (-38, -10), (-18, 22), (14, 40), (38, 34)]), WA, 14))
    out.append(lingkaran(cx - 30 * s, cy - 40 * s, 10 * s, WA, 3, fill=isi(WA, pola="solid")))
    out.append(lingkaran(cx + 40 * s, cy + 32 * s, 10 * s, WA, 3, fill=isi(WA, pola="solid")))
    return out


def logo_platform(cx, cy, s=1.0, nama="instagram"):
    """Logo platform 150 x 150: instagram | tiktok | linkedin | facebook | youtube."""
    out = []
    if nama == "instagram":
        out.append(kotak(cx - 70 * s, cy - 70 * s, 140 * s, 140 * s, UNGU, 7, r=38 * s))
        out.append(lingkaran(cx, cy, 34 * s, PINK, 7))
        out.append(lingkaran(cx + 42 * s, cy - 42 * s, 7 * s, ORANYE, 3, fill=isi(ORANYE, pola="solid")))
    elif nama == "tiktok":
        out.append(kotak(cx - 70 * s, cy - 70 * s, 140 * s, 140 * s, HITAM, 5, r=30 * s, fill=isi(HITAM, 12)))
        out.append(garis((cx + 8 * s, cy - 48 * s), (cx + 8 * s, cy + 22 * s), (0.1, 0.8, 0.85), 14))
        out.append(kurva(_busur(cx - 12 * s, cy + 22 * s, 20, 0, 270, 10, s), MERAH, 12))
        out.append(kurva(_p(cx, cy, s, [(8, -48), (20, -28), (42, -20)]), (0.1, 0.8, 0.85), 10))
    elif nama == "linkedin":
        out.append(kotak(cx - 70 * s, cy - 70 * s, 140 * s, 140 * s, BIRU, 5, r=16 * s, fill=isi(BIRU, pola="solid")))
        out.append(teks("in", cx - 45 * s, cy - 58 * s, int(110 * s), (1, 1, 1), 7))
    elif nama == "facebook":
        out.append(lingkaran(cx, cy, 70 * s, BIRU, 5, fill=isi(BIRU, pola="solid")))
        out.append(teks("f", cx - 18 * s, cy - 62 * s, int(130 * s), (1, 1, 1), 8))
    elif nama == "youtube":
        out.append(kotak(cx - 80 * s, cy - 55 * s, 160 * s, 110 * s, MERAH, 5, r=28 * s, fill=isi(MERAH, pola="solid")))
        out.append(poli(_p(cx, cy, s, [(-20, -28), (34, 0), (-20, 28)]), c=(1, 1, 1), w=4, fill=isi((1, 1, 1), pola="solid")))
    return out


# ---------- benda ----------
def grafik(cx, cy, s=1.0, arah="naik"):
    """Grafik batang + garis tren. 300 x 240. arah: naik | turun."""
    out = [LinearPath(points=_p(cx, cy, s, [(-140, -120), (-140, 110), (150, 110)]), stroke_style=st(HITAM, 4), sketch_style=SK)]
    tinggi = [50, 90, 130, 185] if arah == "naik" else [185, 130, 85, 45]
    c = HIJAU if arah == "naik" else MERAH
    for i, h in enumerate(tinggi):
        x = -115 + i * 65
        out.append(kotak(cx + x * s, cy + (110 - h) * s, 42 * s, h * s, HITAM, 3, fill=isi(c, 9)))
    if arah == "naik":
        out.append(panah(_p(cx, cy, s, [(-120, 40)])[0], _p(cx, cy, s, [(140, -130)])[0], ORANYE, 6, 30 * s))
    else:
        out.append(panah(_p(cx, cy, s, [(-120, -130)])[0], _p(cx, cy, s, [(140, 30)])[0], MERAH, 6, 30 * s))
    return out


def kalender(cx, cy, s=1.0, tandai=(2, 8), hari=None):
    """Kalender 260 x 240; `tandai` = indeks kotak tanggal (0..11) yang dilingkari.
    `hari` = daftar label kolom opsional (maks 4 huruf, 4 kolom)."""
    x0, y0 = cx - 130 * s, cy - 110 * s
    out = [kotak(x0, y0, 260 * s, 230 * s, HITAM, 4, r=8 * s)]
    out.append(kotak(x0, y0, 260 * s, 50 * s, MERAH, 3, fill=isi(MERAH, pola="solid")))
    for rx in (60, 200):
        out.append(garis((x0 + rx * s, y0 - 20 * s), (x0 + rx * s, y0 + 18 * s), HITAM, 6))
    for k in range(12):
        col, row = k % 4, k // 4
        bx, by = x0 + (18 + col * 60) * s, y0 + (68 + row * 52) * s
        out.append(kotak(bx, by, 44 * s, 38 * s, ABU, 2))
        if k in tandai:
            out.append(elips(bx + 22 * s, by + 19 * s, 62 * s, 54 * s, MERAH, 4))
    if hari:
        for i, h in enumerate(hari[:4]):
            out.append(teks(h, x0 + (18 + i * 60) * s, y0 + 8 * s, int(30 * s), (1, 1, 1), 3))
    return out


def target(cx, cy, s=1.0, panah_=True):
    """Papan sasaran 3 cincin + anak panah. 260 x 260."""
    out = []
    for r, c, f in [(115, MERAH, None), (78, HITAM, None), (40, MERAH, isi(MERAH, 7))]:
        out.append(lingkaran(cx, cy, r * s, c, 5, fill=f))
    if panah_:
        out.append(panah((cx + 150 * s, cy - 150 * s), (cx + 8 * s, cy - 8 * s), HITAM, 6, 34 * s))
        out.append(poli(_p(cx, cy, s, [(150, -150), (170, -175), (180, -140)]), c=ORANYE, w=3, fill=isi(ORANYE, 5)))
    return out


def checklist(cx, cy, s=1.0, n=3, centang_=None):
    """Papan klip dengan n baris kotak + garis; `centang_` = jumlah baris dicentang (default semua). 220 x 280."""
    centang_ = n if centang_ is None else centang_
    x0, y0 = cx - 110 * s, cy - 130 * s
    out = [kotak(x0, y0, 220 * s, 270 * s, HITAM, 4, r=12 * s)]
    out.append(kotak(cx - 45 * s, y0 - 18 * s, 90 * s, 34 * s, HITAM, 3, fill=isi(ABU, 6), r=8 * s))
    gap = 200 / max(n, 1)
    for i in range(n):
        yy = y0 + (45 + i * gap) * s
        out.append(kotak(x0 + 22 * s, yy, 36 * s, 36 * s, HITAM, 3))
        out.append(garis((x0 + 75 * s, yy + 18 * s), (x0 + 195 * s, yy + 18 * s), ABU, 4))
        if i < centang_:
            out += centang(x0 + 42 * s, yy + 16 * s, 0.55 * s, HIJAU, 5)
    return out


def kaca_pembesar(cx, cy, s=1.0, c=HITAM):
    """Kaca pembesar 220 x 220; lensa di kiri atas."""
    out = [lingkaran(cx - 30 * s, cy - 30 * s, 70 * s, c, 7)]
    out.append(kurva(_busur(cx - 30 * s, cy - 30 * s, 48, 200, 250, 6, s), ABU, 4))
    out.append(garis((cx + 22 * s, cy + 22 * s), (cx + 95 * s, cy + 95 * s), c, 18))
    return out


def laba_laba(cx, cy, s=1.0):
    """Laba-laba perayap Google (crawler) menggantung di benang. 260 x 260."""
    out = [garis((cx, cy - 130 * s), (cx, cy - 40 * s), ABU, 2)]
    out.append(lingkaran(cx, cy + 10 * s, 45 * s, HITAM, 4, fill=isi(HITAM, 6)))
    out.append(lingkaran(cx, cy - 40 * s, 22 * s, HITAM, 4, fill=isi(HITAM, 5)))
    for ex in (-8, 8):
        out.append(lingkaran(cx + ex * s, cy - 44 * s, 5 * s, (1, 1, 1), 2, fill=isi((1, 1, 1), pola="solid"), sk=SK_HALUS))
    for k in range(4):
        for sg in (-1, 1):
            a = math.radians(-35 + k * 25)
            p1 = (cx + sg * 40 * s * math.cos(a), cy + 10 * s + 40 * s * math.sin(a))
            p2 = (cx + sg * 95 * s * math.cos(a), cy + 10 * s + 70 * s * math.sin(a) - 30 * s)
            p3 = (cx + sg * 125 * s * math.cos(a), cy + 10 * s + 95 * s * math.sin(a) + 10 * s)
            out.append(kurva([p1, p2, p3], HITAM, 4))
    return out


def email(cx, cy, s=1.0, c=BIRU):
    """Amplop 240 x 160."""
    x0, y0 = cx - 120 * s, cy - 80 * s
    out = [kotak(x0, y0, 240 * s, 160 * s, c, 5)]
    out.append(LinearPath(points=[(x0, y0), (cx, cy + 10 * s), (x0 + 240 * s, y0)], stroke_style=st(c, 5), sketch_style=SK))
    out.append(garis((x0, y0 + 160 * s), (cx - 35 * s, cy - 10 * s), c, 3))
    out.append(garis((x0 + 240 * s, y0 + 160 * s), (cx + 35 * s, cy - 10 * s), c, 3))
    return out


def megafon(cx, cy, s=1.0, c=ORANYE):
    """Megafon menghadap kanan + gelombang suara. 280 x 200."""
    out = [poli(_p(cx, cy, s, [(-110, -25), (20, -85), (20, 85), (-110, 25)]), c=HITAM, w=4, fill=isi(c, 9))]
    out.append(kotak(cx - 135 * s, cy - 28 * s, 28 * s, 56 * s, HITAM, 4, fill=isi(ABU, 6)))
    out.append(poli(_p(cx, cy, s, [(-80, 20), (-55, 20), (-45, 80), (-70, 80)]), c=HITAM, w=4))
    for r in (40, 75):
        out.append(kurva(_busur(cx + 30 * s, cy, r, -45, 45, 8, s), HITAM, 4))
    return out


def toko(cx, cy, s=1.0, label="TOKO"):
    """Etalase toko: tenda bergaris, pintu, jendela, papan nama. 300 x 280."""
    x0, y0 = cx - 140 * s, cy - 130 * s
    out = [kotak(x0 + 10 * s, y0 + 70 * s, 260 * s, 190 * s, HITAM, 4)]
    for i in range(5):
        c = MERAH if i % 2 == 0 else (1, 1, 1)
        xa = x0 + i * 56 * s
        out.append(poli([(xa, y0 + 20 * s), (xa + 56 * s, y0 + 20 * s), (xa + 56 * s, y0 + 70 * s), (xa, y0 + 70 * s)], c=HITAM, w=3, fill=isi(c, 6) if i % 2 == 0 else None))
    out.append(kotak(x0 + 30 * s, y0 + 100 * s, 90 * s, 160 * s, HITAM, 3))
    out.append(lingkaran(x0 + 105 * s, y0 + 185 * s, 6 * s, HITAM, 2))
    out.append(kotak(x0 + 150 * s, y0 + 100 * s, 100 * s, 80 * s, BIRU, 3, fill=isi(BIRU, 14)))
    out.append(kotak(x0 + 60 * s, y0 - 30 * s, 160 * s, 46 * s, HITAM, 3))
    out.append(teks(label, x0 + 85 * s, y0 - 24 * s, int(38 * s), HITAM, 3))
    return out


def koin(cx, cy, s=1.0):
    """Koin emas 'Rp'. 140 x 140."""
    return [lingkaran(cx, cy, 68 * s, ORANYE, 5, fill=isi(KUNING, 8)),
            lingkaran(cx, cy, 50 * s, ORANYE, 3),
            teks("Rp", cx - 34 * s, cy - 30 * s, int(55 * s), HITAM, 4)]


def tumpukan_koin(cx, cy, s=1.0, n=3):
    out = []
    for i in range(n):
        out.append(elips(cx, cy + (40 - i * 26) * s, 150 * s, 50 * s, ORANYE, 4, fill=isi(KUNING, 8)))
    out.append(teks("Rp", cx - 30 * s, cy - 50 * s - (n - 3) * 26 * s, int(48 * s), HITAM, 4))
    return out


def jam(cx, cy, s=1.0, jarum=(60, 150)):
    """Jam dinding 200 x 200; jarum = (sudut menit, sudut jam) derajat dari arah jam 12."""
    out = [lingkaran(cx, cy, 95 * s, HITAM, 5)]
    for k in range(12):
        a = math.radians(k * 30)
        r0 = 78 if k % 3 else 70
        out.append(garis((cx + r0 * s * math.sin(a), cy - r0 * s * math.cos(a)), (cx + 88 * s * math.sin(a), cy - 88 * s * math.cos(a)), HITAM, 3))
    for ang, ln, w in [(jarum[0], 70, 4), (jarum[1], 45, 7)]:
        a = math.radians(ang)
        out.append(garis((cx, cy), (cx + ln * s * math.sin(a), cy - ln * s * math.cos(a)), MERAH if w == 4 else HITAM, w))
    return out


def rumah(cx, cy, s=1.0, label="www"):
    """Rumah digital: atap, dinding, pintu, jendela, label di atap. 280 x 260."""
    out = [poli(_p(cx, cy, s, [(-140, -20), (0, -130), (140, -20)]), c=HITAM, w=4, fill=isi(MERAH, 10))]
    out.append(kotak(cx - 110 * s, cy - 20 * s, 220 * s, 150 * s, HITAM, 4))
    out.append(kotak(cx - 30 * s, cy + 40 * s, 60 * s, 90 * s, HITAM, 3, fill=isi(ORANYE, 8)))
    out.append(kotak(cx - 95 * s, cy + 5 * s, 50 * s, 45 * s, BIRU, 3, fill=isi(BIRU, 12)))
    out.append(kotak(cx + 45 * s, cy + 5 * s, 50 * s, 45 * s, BIRU, 3, fill=isi(BIRU, 12)))
    if label:
        out.append(teks(label, cx - 34 * s, cy - 80 * s, int(40 * s), HITAM, 4))
    return out


def tabel(cx, cy, s=1.0, kolom=4, baris=4):
    """Lembar tabel/spreadsheet 300 x 220 dengan header hijau."""
    w, h = 300, 220
    x0, y0 = cx - w / 2 * s, cy - h / 2 * s
    out = [kotak(x0, y0, w * s, h * s, HITAM, 4)]
    out.append(kotak(x0, y0, w * s, (h / baris) * s, HIJAU, 3, fill=isi(HIJAU, 7)))
    for i in range(1, baris):
        out.append(garis((x0, y0 + i * h / baris * s), (x0 + w * s, y0 + i * h / baris * s), ABU, 3))
    for j in range(1, kolom):
        out.append(garis((x0 + j * w / kolom * s, y0), (x0 + j * w / kolom * s, y0 + h * s), ABU, 3))
    return out


def balon_kata(x, y, w, h, ekor=None, c=HITAM):
    """Balon kata kotak membulat; ekor = titik ujung ekor (x, y) atau None."""
    out = [kotak(x, y, w, h, c, 4, r=24)]
    if ekor:
        bx = min(max(ekor[0], x + 40), x + w - 80)
        by = y + h if ekor[1] > y + h / 2 else y
        out.append(LinearPath(points=[(bx, by), ekor, (bx + 45, by)], stroke_style=st(c, 4), sketch_style=SK))
    return out


def balon_pikir(cx, cy, w, h, c=ABU):
    """Awan pikiran (elips bergelombang)."""
    out = []
    n = 9
    for i in range(n):
        a = math.radians(i * 360 / n)
        out.append(elips(cx + w * 0.42 * math.cos(a), cy + h * 0.38 * math.sin(a), w * 0.36, h * 0.42, c, 3))
    return out


def tangga(cx, cy, s=1.0, n=4, c=BIRU):
    """Anak tangga naik (langkah demi langkah). 320 x 240."""
    pts = [(-160, 120)]
    for i in range(n):
        x = -160 + i * 320 / n
        y = 120 - (i + 1) * 240 / n
        pts += [(x, y), (x + 320 / n, y)]
    pts.append((160, 120))
    return [LinearPath(points=_p(cx, cy, s, pts), stroke_style=st(c, 6), sketch_style=SK)]


def gembok(cx, cy, s=1.0):
    """Gembok (aset aman / milik sendiri). 160 x 200."""
    return [kurva(_busur(cx, cy - 20 * s, 48, 180, 360, 12, s), HITAM, 9),
            kotak(cx - 70 * s, cy - 20 * s, 140 * s, 110 * s, HITAM, 4, fill=isi(KUNING, 8), r=12 * s),
            lingkaran(cx, cy + 25 * s, 12 * s, HITAM, 3, fill=isi(HITAM, pola="solid"))]


def kue(cx, cy, s=1.0):
    """Kue ulang tahun dua tingkat + lilin. 220 x 220."""
    return [kotak(cx - 100 * s, cy + 10 * s, 200 * s, 90 * s, HITAM, 4, fill=isi(PINK, 9)),
            kotak(cx - 65 * s, cy - 60 * s, 130 * s, 70 * s, HITAM, 4, fill=isi(ORANYE, 9, sudut=-45)),
            kurva(_p(cx, cy, s, [(-100, 30), (-60, 45), (-20, 28), (20, 45), (60, 28), (100, 40)]), (1, 1, 1), 5),
            garis((cx, cy - 60 * s), (cx, cy - 100 * s), BIRU, 6),
            elips(cx, cy - 112 * s, 14 * s, 22 * s, ORANYE, 3, fill=isi(KUNING, pola="solid"))]


def uang(cx, cy, s=1.0):
    """Uang kertas 240 x 120."""
    return [kotak(cx - 120 * s, cy - 60 * s, 240 * s, 120 * s, HIJAU, 4, fill=isi(HIJAU, 14)),
            lingkaran(cx, cy, 36 * s, HIJAU, 4),
            teks("Rp", cx - 26 * s, cy - 22 * s, int(40 * s), HITAM, 3)]


def bola_viral(cx, cy, s=1.0):
    """Ledakan/kembang api 'viral' (sekali meledak lalu hilang). 240 x 240."""
    out = []
    for k in range(10):
        a = math.radians(k * 36)
        out.append(garis((cx + 35 * s * math.cos(a), cy + 35 * s * math.sin(a)), (cx + 110 * s * math.cos(a), cy + 110 * s * math.sin(a)), ORANYE if k % 2 else MERAH, 5))
    out.append(lingkaran(cx, cy, 22 * s, KUNING, 4, fill=isi(KUNING, 5)))
    return out


def roda_gigi(cx, cy, s=1.0, c=ABU):
    """Roda gigi (sistem berjalan). 220 x 220."""
    pts = []
    for i in range(32):
        r = 100 if (i // 2) % 2 == 0 else 78
        a = math.radians(i * 360 / 32)
        pts.append((r * math.cos(a), r * math.sin(a)))
    return [poli(_p(cx, cy, s, pts), c=HITAM, w=4, fill=isi(c, 10)), lingkaran(cx, cy, 32 * s, HITAM, 4)]


# ukuran nominal (lebar, tinggi) pada s=1, dipakai templat untuk menskalakan ikon ke kotak
UKURAN = {
    wanita: (230, 420), laptop: (330, 190), hp: (120, 220), google: (440, 160), whatsapp: (180, 180),
    logo_platform: (160, 150), grafik: (300, 250), kalender: (260, 260), target: (300, 300),
    checklist: (220, 290), kaca_pembesar: (230, 230), laba_laba: (260, 260), email: (240, 160),
    megafon: (280, 200), toko: (290, 290), koin: (140, 140), tumpukan_koin: (150, 160), jam: (200, 200),
    rumah: (280, 260), tabel: (300, 220), hati: (200, 180), bintang: (180, 180), kerumunan: (600, 120),
    tangga: (320, 240), gembok: (160, 200), kue: (220, 230), uang: (240, 120), bola_viral: (240, 240),
    roda_gigi: (220, 220),
}

KATALOG = [
    ("wanita berdiri", lambda x, y, s: wanita(x, y, s, "berdiri")),
    ("wanita menunjuk", lambda x, y, s: wanita(x, y, s, "menunjuk", baju=HIJAU)),
    ("wanita berpikir", lambda x, y, s: wanita(x, y, s, "berpikir", baju=UNGU)),
    ("wanita senang", lambda x, y, s: wanita(x, y, s, "senang", baju=ORANYE)),
    ("wanita pegang hp", lambda x, y, s: wanita(x, y, s, "hp", baju=BIRU, rok=HITAM)),
    ("laptop web", lambda x, y, s: laptop(x, y, s, "web")),
    ("laptop grafik", lambda x, y, s: laptop(x, y, s, "grafik")),
    ("hp chat", lambda x, y, s: hp(x, y, s, "chat")),
    ("hp sosmed", lambda x, y, s: hp(x, y, s, "sosmed")),
    ("google", lambda x, y, s: google(x, y, s)),
    ("whatsapp", whatsapp),
    ("instagram", lambda x, y, s: logo_platform(x, y, s, "instagram")),
    ("tiktok", lambda x, y, s: logo_platform(x, y, s, "tiktok")),
    ("linkedin", lambda x, y, s: logo_platform(x, y, s, "linkedin")),
    ("facebook", lambda x, y, s: logo_platform(x, y, s, "facebook")),
    ("youtube", lambda x, y, s: logo_platform(x, y, s, "youtube")),
    ("grafik naik", lambda x, y, s: grafik(x, y, s, "naik")),
    ("grafik turun", lambda x, y, s: grafik(x, y, s, "turun")),
    ("kalender", kalender), ("target", target), ("checklist", checklist), ("kaca pembesar", kaca_pembesar),
    ("laba-laba google", laba_laba), ("email", email), ("megafon", megafon), ("toko", toko), ("koin", koin),
    ("tumpukan koin", tumpukan_koin), ("jam", jam), ("rumah", rumah), ("tabel", tabel), ("hati", hati),
    ("bintang", bintang), ("tangga", tangga), ("gembok", gembok), ("kue", kue), ("uang", uang),
    ("viral", bola_viral), ("roda gigi", roda_gigi),
    ("kerumunan", lambda x, y, s: kerumunan(x, y, s * 0.45, 7, sorot={2, 4})),
    ("centang/silang/?", lambda x, y, s: centang(x - 80 * s, y, s) + silang(x + 10 * s, y, s * 0.8) + tanya(x + 95 * s, y, s * 0.7)),
]
