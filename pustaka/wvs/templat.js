// Templat pola adegan whiteboard-video-skill. Butuh gambar.js (G, D) dimuat lebih dulu.
// Semua templat menerima A (fungsi waktu adegan) dan objek opsi; waktu tiap unsur diatur lewat `at`.
var TPL = {};
(function () {
  // Judul papan. "3. SEO: muncul di Google" -> lencana 3 + "SEO: muncul di Google".
  // Teks lain ditulis apa adanya. Ukuran otomatis mengecil supaya muat. Mengembalikan bbox teks.
  TPL.judul = (A, judul, o = {}) => {
    const at = o.at ?? A(0, 0), y = o.y ?? 150, maks = o.maks ?? 1640;
    const m = /^(\d+)\.\s*(.+)$/.exec(judul);
    if (m) {
      const r = 50, teks = m[2], z = G.pasUkuran(teks, o.ukuran || 96, maks - 2 * r - 30);
      const wT = G.lebarTeks(teks, z), total = 2 * r + 28 + wT, x0 = 960 - total / 2;
      D.lencana(m[1], x0 + r, y - z * .3, r, at, .4);
      const b = T(teks, x0 + 2 * r + 28, y, z, at + .4, o.dur || .6, { anchor: 'start' });
      if (o.garis !== false) D.garisBawah(b, at + .4 + (o.dur || .6), .25);
      return b;
    }
    const z = G.pasUkuran(judul, o.ukuran || 104, maks);
    const b = T(judul, 960, y, z, at, o.dur || .7, { c: o.c || INK });
    if (o.garis !== false) D.garisBawah(b, at + (o.dur || .7), .25);
    return b;
  };

  // Ikon besar di tengah + label di bawahnya. gambar(cx, cy, at) menggambar ikonnya.
  TPL.ikonBesar = (A, { cx = 960, cy = 520, gambar, at, label, labelY, ukuran = 64, warna = INK, atLabel }) => {
    gambar(cx, cy, at);
    if (label) T(label, cx, labelY ?? cy + 300, ukuran, atLabel ?? at + .8, .4, { c: warna });
  };

  // Kartu: kotak + ikon di dalam + label di bawah kotak.
  TPL.kartu = (A, { x, y, w, h, gambar, label, at, warna = INK, ukuran = 52, isi = null }) => {
    P(rect(x, y, w, h, 2), at, .3, { c: warna, fill: isi || warna, fillOp: isi ? .08 : 0 });
    gambar(x + w / 2, y + h / 2, at + .3);
    if (label) { const z = G.pasUkuran(label, ukuran, w + 40); T(label, x + w / 2, y + h + z + 6, z, at + .75, .3, { c: warna }); }
  };

  // Perbandingan dua kolom. kiri/kanan: { judul, warna, at, gambar(cx, cy, at), catatan }
  TPL.duaKolom = (A, { x0 = 120, x1 = 1800, y0 = 270, y1 = 900, kiri, kanan, garis = true, vs = false, atGaris }) => {
    const mid = (x0 + x1) / 2, cl = (x0 + mid) / 2, cr = (mid + x1) / 2;
    if (garis) P(line(mid, y0 + 10, mid, y1 - 10, 2), atGaris ?? kiri.at - .2, .2, { c: GRAY, w: 4 });
    if (vs) { const a = (atGaris ?? kiri.at - .2) + .2; P(circ(mid, (y0 + y1) / 2, 44), a, .2, { c: GRAY, fill: '#fff', fillOp: 1, w: 4 }); T('vs', mid, (y0 + y1) / 2 + 14, 46, a + .2, .15, { c: GRAY }); }
    for (const [k, cx] of [[kiri, cl], [kanan, cr]]) {
      if (!k) continue;
      const z = G.pasUkuran(k.judul, k.ukuran || 64, (x1 - x0) / 2 - 60);
      T(k.judul, cx, y0 + z, z, k.at, .45, { c: k.warna || INK });
      if (k.gambar) k.gambar(cx, (y0 + z + 30 + y1) / 2, k.at + .5);
      if (k.catatan) T(k.catatan, cx, y1 - 10, 48, k.atCatatan ?? k.at + 1.1, .35, { c: k.warnaCatatan || GRAY });
    }
  };

  // Daftar langkah / checklist. items: [{ teks, at, ok }] ; gaya: centang | nomor | titik | silang ; mulai = nomor awal
  TPL.daftar = (A, { x, y, gap = 92, ukuran = 58, items, gaya = 'centang', warna = INK, maks = 900, kotak = 54, mulai = 1 }) => {
    items.forEach((it, i) => {
      const yy = y + i * gap, z = G.pasUkuran(it.teks, ukuran, maks - kotak - 30);
      if (gaya === 'nomor') D.lencana(i + mulai, x + kotak / 2, yy - z * .3, kotak / 2, it.at, .3);
      else if (gaya === 'titik') P(circ(x + kotak / 2, yy - z * .3, 10), it.at, .12, { c: warna, fill: warna, fillOp: .8 });
      else {
        P(G.kotakCentang(x, yy - z * .3 - kotak / 2, kotak), it.at, .15);
        const ok = it.ok !== false && gaya !== 'silang';
        P(ok ? G.centang(x, yy - z * .3 - kotak / 2, kotak) : G.silang(x + kotak / 2, yy - z * .3, kotak * .32), it.at + .15, .12, { c: ok ? GREEN : RED, w: 9 });
      }
      T(it.teks, x + kotak + 26, yy, z, it.at + .27, it.dur || .35, { anchor: 'start', c: it.c || warna });
    });
  };

  // Angka / statistik besar dengan lingkaran + label di bawah.
  TPL.statistik = (A, { x, y, angka, label, at, warna = GOLD, r = 110, ukuranLabel = 54 }) => {
    P(circ(x, y, r), at, .4, { c: warna, fill: warna, fillOp: .25, w: 8 });
    T(String(angka), x, y + r * .42, r * 1.25, at + .4, .3, { c: INK });
    if (label) T(label, x, y + r + 20 + ukuranLabel, ukuranLabel, at + .7, .3, { c: GRAY });
  };

  // Tokoh wanita + balon kata. Balon dibuat pas mengelilingi teks.
  // balon: { teks, x, y (tengah balon), ukuran, ekor, at, warna }
  TPL.tokohBalon = (A, { x, y, s = 1, pose = 'berdiri', arah = 1, at, baju, balon }) => {
    D.wanita(x, y, s, pose, at, .9, { arah, baju });
    if (balon) {
      const z = balon.ukuran || 54, wT = G.lebarTeks(balon.teks, z), w = wT + 56, h = z + 44;
      const bx = balon.x - w / 2, by = balon.y - h / 2;
      P(G.balon(bx, by, w, h, balon.ekor || (balon.x > x ? 'kiri' : 'kanan')), balon.at, .3, { c: balon.warna || INK, fill: balon.warna || BLUE, fillOp: .06 });
      T(balon.teks, balon.x, by + h / 2 + z * .33, z, balon.at + .3, .45, { c: balon.warna || INK });
    }
  };

  // Alur kotak berpanah kiri ke kanan. items: [{ teks, at, warna }]
  TPL.alur = (A, { x, y, w = 300, h = 110, gap = 90, items, ukuran = 50 }) => {
    items.forEach((it, i) => {
      const bx = x + i * (w + gap);
      if (i) P(arrow(bx - gap + 12, y + h / 2, bx - 12, y + h / 2), it.at - .2, .2, { c: GRAY, w: 6 });
      P(rect(bx, y, w, h, 2), it.at, .25, { c: it.warna || INK, fill: it.warna || BLUE, fillOp: .07 });
      const z = G.pasUkuran(it.teks, ukuran, w - 30);
      T(it.teks, bx + w / 2, y + h / 2 + z * .33, z, it.at + .25, .3, { c: it.warna || INK });
    });
  };
})();
