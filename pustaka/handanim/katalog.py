"""Lembar katalog semua gambar pustaka -> katalog.png (satu PNG, untuk dicek mata).
Jalankan: python pustaka/handanim/katalog.py [keluaran.png]
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import cairo  # noqa: E402
from handanim.core.draw_ops import OpsSet  # noqa: E402

import gambar as G  # noqa: E402
import templat as T  # noqa: E402

KOL, SEL_W, SEL_H = 7, 360, 400
items = G.KATALOG + [("tangan + spidol", None)]
baris = (len(items) + KOL - 1) // KOL
W, H = KOL * SEL_W, baris * SEL_H

surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H)
ctx = cairo.Context(surf)
ctx.set_source_rgb(1, 1, 1)
ctx.paint()
ops = OpsSet(initial_set=[])
for i, (nama, fn) in enumerate(items):
    cx = (i % KOL) * SEL_W + SEL_W / 2
    cy = (i // KOL) * SEL_H + SEL_H / 2 - 30
    if fn is None:
        h = OpsSet(initial_set=list(T.tangan_ops().opsset))
        h.translate(cx - 120, cy - 110)
        ops.extend(h)
        ops.extend(G.lingkaran(cx - 120, cy - 110, 5, G.MERAH, 3).draw())
    else:
        uji = OpsSet(initial_set=[])
        for dr in fn(0, 0, 1.0):
            uji.extend(dr.draw())
        bb = uji.get_bbox()
        s = min(300 / bb.width, 290 / bb.height, 1.3)
        mx, my = (bb.min_x + bb.max_x) / 2 * s, (bb.min_y + bb.max_y) / 2 * s
        for dr in fn(cx - mx, cy - my, s):
            ops.extend(dr.draw())
    lw = T.lebar_teks(nama, 34)
    ops.extend(G.teks(nama, cx - lw / 2, (i // KOL + 1) * SEL_H - 55, 34, G.HITAM, 2).draw())
    ops.extend(G.kotak((i % KOL) * SEL_W + 6, (i // KOL) * SEL_H + 6, SEL_W - 12, SEL_H - 12, G.ABU_MUDA, 1).draw())
ops.render(ctx)
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "katalog.png")
surf.write_to_png(out)
print("katalog:", out, f"{len(items)} gambar")
