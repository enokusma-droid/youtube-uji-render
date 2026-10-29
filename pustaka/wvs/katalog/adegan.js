// Katalog semua gambar pustaka (untuk dicek mata). Render: lihat README.md bagian "Katalog".
// Tiap papan 1 baris narasi palsu 8 detik; gambar dibagi rata di sepanjang baris.
function lab(s, x, y, at) { T(s, x, y, 40, at, .2, { c: GRAY }); }
window.SCENES = {
  tokoh(A) {
    T('Tokoh wanita: 6 pose', 960, 120, 80, A(0, 0), .4);
    const poses = ['berdiri', 'menunjuk', 'berpikir', 'senang', 'pegangHp', 'dadah'];
    poses.forEach((p, i) => { const x = 200 + i * 300; D.wanita(x, 800, 1.1, p, A(0, .05 + i * .14), .9, { baju: [BLUE, RED, GREEN, GOLD, BLUE, RED][i] }); lab(p, x, 880, A(0, .1 + i * .14)); });
  },
  perangkat(A) {
    T('Perangkat, logo, platform', 960, 120, 80, A(0, 0), .4);
    const l = G.laptop(120, 230, 380); P(l.bingkai + l.alas, A(0, .03), .4); P(G.web(l.layar.x, l.layar.y, l.layar.w, l.layar.h), A(0, .07), .3, { c: BLUE, w: 4 }); lab('laptop + web', 310, 560, A(0, .1));
    const h = G.hp(700, 380, 300); P(h.bingkai, A(0, .12), .3); P(G.feed(h.layar), A(0, .15), .3, { c: BLUE, w: 4 }); lab('hp + feed', 700, 580, A(0, .17));
    const h2 = G.hp(900, 380, 300); P(h2.bingkai, A(0, .19), .3); P(G.obrolan(h2.layar), A(0, .22), .3, { c: GREEN, w: 4 }); lab('hp + obrolan', 900, 580, A(0, .24));
    D.google(1160, 380, 100, A(0, .26), .5); lab('google', 1160, 560, A(0, .3));
    D.whatsapp(1420, 380, 95, A(0, .32), .5); lab('whatsapp', 1420, 560, A(0, .36));
    P(G.kolomCari(1560, 330, 260, 90), A(0, .38), .3); lab('kolomCari', 1690, 470, A(0, .4));
    ['ig', 'tiktok', 'yt', 'fb', 'in'].forEach((n, i) => { D.platform(n, 200 + i * 230, 760, 70, A(0, .44 + i * .06), .3); lab(n, 200 + i * 230, 890, A(0, .46 + i * .06)); });
    P(G.browser(1280, 660, 520, 240), A(0, .78), .4); lab('browser', 1540, 940, A(0, .8));
  },
  grafik(A) {
    T('Grafik, kalender, jam, checklist', 960, 120, 80, A(0, 0), .4);
    ['naik', 'turun', 'datar', 'lonjakan', 'naikPelan'].forEach((j, i) => { D.grafik(110 + i * 350, 230, 280, 200, j, A(0, .03 + i * .06), .4); lab(j, 250 + i * 350, 480, A(0, .05 + i * .06)); });
    D.batang(110, 800, [2, 3, 5, 4], A(0, .35), .4, { bw: 50, gap: 22, hmax: 220 }); lab('batang', 230, 860, A(0, .37));
    P(G.gauge(560, 780, 150), A(0, .4), .4); lab('gauge', 560, 860, A(0, .42));
    const k = D.kalender(780, 560, 380, 280, A(0, .45), .5, { judul: 'MINGGU' }); const c = G.selKalender(780, 560, 380, 280, 2, 1); D.lingkari(c.x, c.y, 30, 26, A(0, .52)); lab('kalender', 970, 890, A(0, .54));
    P(G.jam(1310, 700, 110), A(0, .58), .4); lab('jam', 1310, 870, A(0, .6));
    TPL.daftar(A, { x: 1500, y: 620, gap: 90, ukuran: 46, maks: 340, kotak: 44, items: [{ teks: 'centang', at: A(0, .64) }, { teks: 'silang', at: A(0, .7), ok: false }, { teks: 'tabel', at: A(0, .76) }] });
    P(G.tabel(1500, 820, 300, 90, 4, 2), A(0, .82), .3, { w: 4 });
  },
  pemasaran(A) {
    T('Target, pesan, pemasaran', 960, 120, 80, A(0, 0), .4);
    D.target(220, 330, 110, A(0, .02), .5, { dart: true }); lab('target + dart', 220, 490, A(0, .05));
    D.kacaPembesar(520, 320, 90, A(0, .08), .4); lab('kacaPembesar', 560, 490, A(0, .1));
    P(G.spider(820, 380, .75), A(0, .12), .5, { c: BLUE }); lab('spider', 820, 490, A(0, .15));
    P(G.email(1070, 340, 200), A(0, .17), .3, { c: BLUE, fill: BLUE, fillOp: .08 }); lab('email', 1070, 490, A(0, .19));
    D.megafon(1340, 340, .8, A(0, .21), .5); lab('megafon', 1340, 490, A(0, .24));
    P(G.balon(1540, 260, 260, 120, 'kiri'), A(0, .26), .3); lab('balon', 1670, 490, A(0, .28));
    P(G.awanPikir(220, 640, 120, 70, 150, 760), A(0, .3), .3); lab('awanPikir', 220, 860, A(0, .32));
    P(G.hati(450, 650, 70), A(0, .34), .3, { c: RED, fill: RED, fillOp: .4 }); lab('hati', 450, 860, A(0, .36));
    D.bintang(680, 650, 34, 3, 80, A(0, .38), .3); lab('bintang', 680, 860, A(0, .4));
    P(G.perisai(900, 650, 90), A(0, .42), .3, { c: GREEN, fill: GREEN, fillOp: .15 }); lab('perisai', 900, 860, A(0, .44));
    P(G.lampu(1100, 640, 70), A(0, .46), .3, { c: GOLD }); lab('lampu', 1100, 860, A(0, .48));
    P(G.kamera(1300, 660, 170), A(0, .5), .3); lab('kamera', 1300, 860, A(0, .52));
    P(G.hadiah(1500, 650, 150), A(0, .54), .3, { c: RED, fill: RED, fillOp: .15 }); lab('hadiah', 1500, 860, A(0, .56));
    P(G.corong(1720, 640, 200), A(0, .58), .3, { c: BLUE }); lab('corong', 1720, 860, A(0, .6));
  },
  bisnis(A) {
    T('Bangunan, uang, produk, lain-lain', 960, 120, 80, A(0, 0), .4);
    D.toko(220, 480, 260, A(0, .02), .5, { nama: 'TOKO' }); lab('toko', 220, 540, A(0, .05));
    P(G.rumah(520, 480, 200), A(0, .08), .4, { c: GREEN }); lab('rumah', 520, 540, A(0, .1));
    P(G.kantor(780, 480, 180, 280), A(0, .12), .4, { c: BLUE }); lab('kantor', 780, 540, A(0, .14));
    D.koin(1000, 400, 60, A(0, .16), .3); lab('koin', 1000, 540, A(0, .18));
    P(G.tumpukanKoin(1160, 470, 6, 60), A(0, .2), .3, { c: GOLD, fill: GOLD, fillOp: .3 }); lab('tumpukanKoin', 1160, 540, A(0, .22));
    P(G.uang(1400, 400, 220), A(0, .24), .3, { c: GREEN, fill: GREEN, fillOp: .15 }); lab('uang', 1400, 540, A(0, .26));
    P(G.kantongUang(1680, 390, 1), A(0, .28), .3, { c: GOLD, fill: GOLD, fillOp: .25 }); lab('kantongUang', 1680, 540, A(0, .3));
    P(G.brankas(220, 730, 200), A(0, .34), .4); lab('brankas', 220, 900, A(0, .36));
    D.kue(500, 820, 200, A(0, .4), .4); lab('kue', 500, 900, A(0, .42));
    P(G.dokumen(680, 620, 160, 210), A(0, .46), .3); lab('dokumen', 760, 900, A(0, .48));
    P(G.siklus(1000, 720, 110), A(0, .52), .4, { c: GREEN }); lab('siklus', 1000, 900, A(0, .54));
    P(G.tangga(1160, 840, 4, 70, 50), A(0, .58), .3); lab('tangga', 1300, 900, A(0, .6));
    P(G.kerumunan(1500, 720, 4, 80, .55), A(0, .64), .4); lab('kerumunan', 1620, 900, A(0, .66));
    D.lencana(7, 1800, 640, 50, A(0, .7)); D.centang(1800, 760, 36, A(0, .74)); D.silang(1800, 850, 36, A(0, .78));
  },
  templat(A) {
    T('Templat', 960, 110, 80, A(0, 0), .4);
    TPL.duaKolom(A, { x0: 80, x1: 900, y0: 180, y1: 560, vs: true,
      kiri: { judul: 'duaKolom kiri', warna: RED, at: A(0, .05), gambar: (cx, cy, at) => D.grafik(cx - 140, cy - 90, 280, 180, 'datar', at, .4) },
      kanan: { judul: 'kanan', warna: GREEN, at: A(0, .15), gambar: (cx, cy, at) => D.grafik(cx - 140, cy - 90, 280, 180, 'naik', at, .4) } });
    TPL.daftar(A, { x: 1000, y: 250, gap: 80, ukuran: 50, maks: 400, kotak: 46, gaya: 'nomor', items: [{ teks: 'daftar nomor', at: A(0, .3) }, { teks: 'langkah dua', at: A(0, .34) }] });
    TPL.statistik(A, { x: 1640, y: 320, angka: '3x', label: 'statistik', at: A(0, .4), r: 90 });
    TPL.tokohBalon(A, { x: 200, y: 930, s: .85, pose: 'menunjuk', at: A(0, .5), baju: GREEN, balon: { teks: 'tokohBalon', x: 520, y: 630, at: A(0, .6) } });
    TPL.alur(A, { x: 800, y: 700, w: 280, h: 100, gap: 70, items: [{ teks: 'alur satu', at: A(0, .7) }, { teks: 'dua', at: A(0, .76) }, { teks: 'tiga', at: A(0, .82), warna: GREEN }] });
  },
};
