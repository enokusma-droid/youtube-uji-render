"""Mesin + templat adegan whiteboard handanim (dipakai ulang lintas proyek).

Isi:
- Video: pembungkus Scene 1920x1080 + render streaming (frame statis dipakai ulang = lebih cepat) + snapshot PNG.
- Adegan: kumpulan gambar satu adegan; digambar berurutan (satu tangan/spidol pada satu waktu), lalu pudar di akhir.
- SketchTangan: animasi sketsa + tangan memegang spidol yang mengikuti ujung goresan.
- teks_kotak: teks yang dipas ke lebar kotak (bungkus kata, kecilkan huruf, maks N baris) supaya tidak terpotong.
- Templat pola adegan: judul, judul_ikon, ikon, dua_kolom, daftar_langkah, statistik, tokoh_balon.
"""
import functools
import math

import cairo
import imageio.v2 as imageio
import numpy as np
from fontTools.ttLib import TTFont as _TTFont

import handanim.primitives.text as _ha_text
from handanim.animations import FadeOutAnimation, SketchAnimation
from handanim.core import Scene
from handanim.core.draw_ops import OpsSet
from handanim.core.utils import cairo_surface_to_numpy
from handanim.primitives import Text

import gambar as G

# Text handanim memuat ulang file font untuk SETIAP huruf; cache supaya build adegan cepat.
_ha_text.TTFont = functools.lru_cache(maxsize=16)(_TTFont)

W_DUNIA, H_DUNIA = 1777.0, 1000.0
SKALA_HURUF = 1.25  # font tulisan tangan (Feasibly) x-height kecil: ukuran diminta dikali ini


# ---------- tangan + spidol ----------
def _tangan_opsset(s=1.0):
    """Tangan kanan memegang spidol; ujung spidol di (0, 0), tangan ke kanan bawah."""
    ux, uy = 0.5, 0.866  # arah sumbu spidol (ke kanan bawah)
    vx, vy = -uy, ux

    def P(pts):
        return [(s * (u * ux + v * vx), s * (u * uy + v * vy)) for u, v in pts]

    def ellip_pts(cu, cv, ru, rv, n=18):
        return [(cu + ru * math.cos(2 * math.pi * i / n), cv + rv * math.sin(2 * math.pi * i / n)) for i in range(n)]

    skin, garis_ = G.KULIT, (0.35, 0.22, 0.15)
    parts = []

    def blok(pts, fill_c, line_c=garis_, w=2.5):
        parts.append(G.poli(P(pts), c=fill_c, w=1, fill=G.isi(fill_c, pola="solid"), sk=G.SK_HALUS))
        parts.append(G.poli(P(pts), c=line_c, w=w, sk=G.SK_HALUS))

    blok([(250, 95), (255, -15), (480, -25), (470, 125)], (0.25, 0.42, 0.75))            # lengan baju
    blok([(18, -5), (40, -9), (205, -10), (205, 10), (40, 9), (18, 5)], (0.15, 0.15, 0.18))  # badan spidol
    blok([(0, 0), (18, -5), (18, 5)], (0.15, 0.15, 0.18))                                   # ujung
    blok([(150, -11), (205, -11), (205, 11), (150, 11)], G.MERAH)                           # pita warna
    blok(ellip_pts(165, 38, 105, 70), skin)                                                  # telapak
    blok(ellip_pts(80, 16, 30, 14), skin)                                                    # telunjuk
    blok(ellip_pts(105, -16, 42, 14), skin)                                                  # ibu jari
    blok(ellip_pts(110, 52, 26, 13), skin)                                                   # jari tengah tertekuk
    ops = OpsSet(initial_set=[])
    for d in parts:
        ops.extend(d.draw())
    return ops


_TANGAN = None


def tangan_ops():
    global _TANGAN
    if _TANGAN is None:
        _TANGAN = _tangan_opsset(0.75)
    return _TANGAN


class SketchTangan(SketchAnimation):
    """SketchAnimation + gambar tangan/spidol di titik goresan terakhir selama progres < 1."""

    def _apply(self, opsset, progress):
        out = super()._apply(opsset, progress)
        if 0 < progress < 1 and self.data.get("tangan", True):
            try:
                x, y = out.get_current_point()
            except Exception:
                return out
            if x is None:
                return out
            h = OpsSet(initial_set=list(tangan_ops().opsset))
            h.translate(x, y)
            out.extend(h)
        return out


# ---------- teks yang dipas ke kotak ----------
@functools.lru_cache(maxsize=4096)
def lebar_teks(s, size):
    return Text(text=s, position=(0, 0), font_size=size)._measure_text_width(s)


def _bungkus(s, size, w):
    lines, cur = [], []
    for word in s.split(" "):
        cand = " ".join(cur + [word])
        if cur and lebar_teks(cand, size) > w:
            lines.append(" ".join(cur))
            cur = [word]
        else:
            cur.append(word)
    if cur:
        lines.append(" ".join(cur))
    return lines


def teks_kotak(s, x, y, w, size=60, c=G.HITAM, maks_baris=2, rata="kiri", min_size=26, jarak=1.25, tebal=3):
    """Pecah `s` jadi baris yang muat di lebar `w` (huruf dikecilkan bila perlu).
    Hasil: (list[Text] satu per baris, tinggi total, ukuran huruf terpakai)."""
    size = int(size * SKALA_HURUF)
    min_size = int(min_size * SKALA_HURUF)
    while True:
        lines = _bungkus(s, size, w)
        if (len(lines) <= maks_baris and all(lebar_teks(l, size) <= w for l in lines)) or size <= min_size:
            break
        size -= 2
    out = []
    for i, ln in enumerate(lines):
        lw = lebar_teks(ln, size)
        xx = x + (w - lw) / 2 if rata == "tengah" else (x + w - lw if rata == "kanan" else x)
        out.append(G.teks(ln, xx, y + i * size * jarak, size, c, tebal))
    return out, len(lines) * size * jarak, size


# ---------- adegan ----------
class Adegan:
    def __init__(self, video, t0, t1, pudar=True):
        self.v, self.t0, self.t1, self.pudar = video, t0, t1, pudar
        self.items = []

    def add(self, drawables, t, d):
        """Semua `drawables` digambar paralel dalam [t, t+d] (pakai seq untuk berurutan)."""
        for dr in drawables:
            self.items.append((dr, t, d))

    def seq(self, drawables, t, d, tangan=True):
        """Gambar berurutan dalam [t, t+d]; jatah waktu ~ jumlah huruf untuk Text, 1 untuk bentuk lain."""
        if not drawables:
            return
        bobot = [max(1.0, len(dr.text) * 0.12) if isinstance(dr, Text) else 1.0 for dr in drawables]
        tot = sum(bobot)
        cur = t
        for dr, b in zip(drawables, bobot):
            dd = d * b / tot
            self.items.append((dr, cur, max(dd, 0.08), tangan))
            cur += dd

    def commit(self):
        sc = self.v.scene
        for it in self.items:
            dr, st, d = it[0], it[1], it[2]
            tangan = it[3] if len(it) > 3 else False
            d = max(0.08, min(d, self.t1 - 0.05 - st))
            sc.add(SketchTangan(start_time=st, duration=d, data={"tangan": tangan and self.v.tangan}), drawable=dr)
            if self.pudar:
                sc.add(FadeOutAnimation(start_time=self.t1, duration=0.3), drawable=dr)


class Video:
    def __init__(self, width=1920, height=1080, fps=24, tangan=False, seed=7):  # owner 18 Okt: tangan+spidol memperjelek, default mati
        np.random.seed(seed)
        self.scene = Scene(width=width, height=height, fps=fps)
        self.fps, self.tangan = fps, tangan
        self.adegan_list = []

    def adegan(self, t0, t1, pudar=True):
        a = Adegan(self, t0, t1, pudar)
        self.adegan_list.append(a)
        return a

    def commit(self):
        for a in self.adegan_list:
            a.commit()

    # --- render ---
    def _frame_ops(self, ti, mapping, active):
        sc = self.scene
        sc.frame_cache.reset()
        frame = OpsSet(initial_set=[])
        sig = []
        for oid in active:
            ep = sc.get_object_event_and_progress(oid, ti, mapping)
            if not ep:
                continue
            sig.append((oid, tuple(round(float(p), 4) for _, p in ep)))
            frame.extend(sc.get_animated_opsset_at_time(oid, ti, ep, mapping))
        return frame, tuple(sig)

    def _gambar(self, frame):
        sc = self.scene
        surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, sc.width, sc.height)
        ctx = cairo.Context(surf)
        ctx.set_source_rgb(*sc.background_color)
        ctx.paint()
        sc.viewport.apply_to_context(ctx)
        frame.render(ctx)
        return surf

    def snapshot(self, t, path):
        """Simpan PNG frame pada detik t (cepat: hanya menghitung frame itu)."""
        sc = self.scene
        _, mapping = sc.find_key_frames()
        ti = int(round(t * self.fps))
        frame, _ = self._frame_ops(ti, mapping, sc.get_active_objects(ti / self.fps))
        self._gambar(frame).write_to_png(path)

    def render(self, path, total):
        """Render MP4 streaming; frame yang identik dengan sebelumnya tidak digambar ulang."""
        from tqdm import tqdm
        sc = self.scene
        _, mapping = sc.find_key_frames()
        n = int(round(total * self.fps))
        prev_sig, prev_img = None, None
        with imageio.get_writer(path, fps=self.fps, codec="libx264", quality=8, macro_block_size=8) as wr:
            for ti in tqdm(range(n), desc="render", mininterval=5):
                active = sc.get_active_objects(ti / self.fps)
                frame, sig = self._frame_ops(ti, mapping, active)
                if sig != prev_sig or prev_img is None:
                    prev_img = cairo_surface_to_numpy(self._gambar(frame))
                    prev_sig = sig
                wr.append_data(prev_img)


# ---------- templat ----------
def kotak_ikon(fn, box, **kw):
    """Skala ikon `fn` (dari gambar.py) supaya muat di box=(x, y, w, h); kembalikan list Drawable."""
    x, y, w, h = box
    nw, nh = G.UKURAN.get(getattr(fn, "__wrapped__", fn), (200, 200))
    s = min(w / nw, h / nh)
    return fn(x + w / 2, y + h / 2, s, **kw)


def judul(a, s, t, d, y=40, size=88, c=G.BIRU):
    """Judul adegan di atas. 'N. teks' -> lencana nomor bulat + teks. Kembalikan y bawah judul."""
    items = []
    nomor = None
    if len(s) > 2 and s[0].isdigit() and s[1:3] == ". ":
        nomor, s = s[0], s[3:]
    lw_max = 1500 if nomor else 1640
    lines, hgt, sz = teks_kotak(s, 0, y, lw_max, size, c, maks_baris=1, min_size=50, tebal=4)
    lw = lebar_teks(s, sz)
    total_w = lw + (sz * 1.5 if nomor else 0)
    x0 = (W_DUNIA - total_w) / 2
    if nomor:
        r = sz * 0.62
        items.append(G.lingkaran(x0 + r, y + sz * 0.5, r, G.MERAH, 5, fill=G.isi(G.MERAH, 7)))
        items.append(G.teks(nomor, x0 + r - sz * 0.25, y + sz * 0.02, int(sz * 0.95), G.HITAM, 5))
        x0 += sz * 1.5
    items.append(G.teks(s, x0, y, sz, c, 4))
    items += G.coret_bawah(x0, x0 + lw, y + sz * 1.15, G.ORANYE, 4)
    a.seq(items, t, d)
    return y + sz * 1.3


def ikon(a, fn, box, t, d, label=None, label_c=G.HITAM, label_size=46, **kw):
    """Ikon dipas ke box + label opsional di bawahnya (label mengambil ~22% tinggi box)."""
    x, y, w, h = box
    items = []
    if label:
        _, lh, _ = teks_kotak(label, x - 20, y, w + 40, label_size, label_c, maks_baris=2, rata="tengah", min_size=28)
        ih = h - lh - 15
        items += kotak_ikon(fn, (x, y, w, ih), **kw)
        lab, _, _ = teks_kotak(label, x - 20, y + ih + 15, w + 40, label_size, label_c, maks_baris=2, rata="tengah", min_size=28)
        items += lab
    else:
        items += kotak_ikon(fn, box, **kw)
    a.seq(items, t, d)


def judul_ikon(a, s, fn, t, d, sub=None, c=G.BIRU, **kw):
    """Pola: judul besar di tengah + satu ikon besar di bawahnya + subjudul opsional."""
    lines, hgt, _ = teks_kotak(s, 120, 90, 1537, 110, c, maks_baris=2, rata="tengah", tebal=5)
    a.seq(lines, t, d * 0.45)
    yb = 90 + hgt + 30
    rest = 960 - yb - (90 if sub else 0)
    a.seq(kotak_ikon(fn, (588, yb, 600, rest), **kw), t + d * 0.45, d * 0.4)
    if sub:
        sl, _, _ = teks_kotak(sub, 200, 960 - 80, 1377, 60, G.HITAM, maks_baris=1, rata="tengah")
        a.seq(sl, t + d * 0.85, d * 0.15)


def dua_kolom(a, box, kiri, kanan, t, d, tanda=("x", "v"), vs=True, label_size=48):
    """Pola perbandingan: kiri=(label, fn, kw) vs kanan=(label, fn, kw); tanda silang/centang di pojok."""
    x, y, w, h = box
    cw = w * 0.42
    for i, (lab, fn, kw) in enumerate([kiri, kanan]):
        cx0 = x + (0 if i == 0 else w - cw)
        tt = t + i * d * 0.5
        ikon(a, fn, (cx0, y, cw, h), tt, d * 0.38, label=lab, label_size=label_size, **kw)
        m = tanda[i]
        if m:
            f = G.silang if m == "x" else G.centang
            a.seq(f(cx0 + cw + 5, y + 10, 0.75), tt + d * 0.38, d * 0.1)
    if vs:
        a.seq([G.teks("vs", x + w / 2 - 55, y + h / 2 - 80, 130, G.MERAH, 6)], t + d * 0.42, d * 0.08)


def daftar_langkah(a, box, butir, waktu, size=54, nomor=False, warna=G.HITAM, nomor_awal=1):
    """Pola daftar: tiap butir = kotak centang + teks; waktu = [(t, d)] per butir."""
    x, y, w, h = box
    n = len(butir)
    rh = h / n
    for i, (s, (t, d)) in enumerate(zip(butir, waktu)):
        yy = y + i * rh
        bs = min(rh * 0.6, 70)
        items = [G.kotak(x, yy + (rh - bs) / 2, bs, bs, G.HITAM, 4)]
        lab = (f"{i + nomor_awal}. " if nomor else "") + s
        lines, lh, _ = teks_kotak(lab, x + bs + 30, yy + (rh - min(size * 1.25, rh * 0.8)) / 2, w - bs - 30, min(size, rh * 0.62), warna, maks_baris=1)
        items += lines
        items += G.centang(x + bs * 0.5, yy + rh / 2, bs / 90, G.HIJAU, 6)
        a.seq(items, t, d)


def statistik(a, box, angka, label, t, d, c=G.MERAH, fn=None, **kw):
    """Pola angka besar + keterangan (+ ikon kecil opsional di kiri)."""
    x, y, w, h = box
    if fn:
        a.seq(kotak_ikon(fn, (x, y, h, h), **kw), t, d * 0.3)
        x, w = x + h + 30, w - h - 30
        t, d = t + d * 0.3, d * 0.7
    nl, nh, _ = teks_kotak(angka, x, y, w, min(h * 0.6, 220), c, maks_baris=1, tebal=6)
    a.seq(nl, t, d * 0.45)
    ll, _, _ = teks_kotak(label, x, y + nh + 5, w, 52, G.HITAM, maks_baris=2)
    a.seq(ll, t + d * 0.45, d * 0.55)


def tokoh_balon(a, box, s, t, d, pose="berdiri", sisi="kiri", baju=G.MERAH, size=52, pikir=False):
    """Pola tokoh wanita + balon kata (atau awan pikiran) berisi teks yang dipas."""
    x, y, w, h = box
    tw = min(w * 0.32, h * 0.55)
    tx = x if sisi == "kiri" else x + w - tw
    tokoh = kotak_ikon(G.wanita, (tx, y + h * 0.05, tw, h * 0.95), pose=pose, baju=baju, hadap=1 if sisi == "kiri" else -1)
    a.seq(tokoh, t, d * 0.5)
    bx = x + tw + 20 if sisi == "kiri" else x
    bw = w - tw - 20
    bh = h * 0.42
    lines, lh, _ = teks_kotak(s, bx + 35, y + 30, bw - 70, size, G.HITAM, maks_baris=3, rata="tengah")
    bh = max(bh, lh + 60)
    ekor = (tx + tw * (0.7 if sisi == "kiri" else 0.3), y + h * 0.08)
    if pikir:
        balon = G.balon_pikir(bx + bw / 2, y + bh / 2, bw, bh)
    else:
        balon = G.balon_kata(bx, y, bw, bh, ekor=ekor)
    a.seq(balon, t + d * 0.5, d * 0.15)
    a.seq(lines, t + d * 0.65, d * 0.35)
