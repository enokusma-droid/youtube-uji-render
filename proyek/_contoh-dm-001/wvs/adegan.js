// dm-001 "7 langkah digital marketing untuk bisnis kecil". 11 adegan, 16:9.
// Memakai pustaka/wvs (G = gambar, D = penggambar, TPL = templat). scenes.js dibuat oleh pustaka/wvs/rakit.js.
// Komentar tiap adegan = kalimat narasi (indeks baris dipakai di A(baris, fraksi)).
window.SCENES = {
  // 0 Banyak bisnis kecil sudah punya akun media sosial, tapi penjualannya tetap sepi.
  // 1 Masalahnya sering bukan di produk, tapi di cara memasarkannya secara digital.
  // 2 Di video ini, ada tujuh langkah digital marketing yang bisa langsung kamu terapkan.
  pembuka(A) {
    TPL.judul(A, 'Penjualan tetap sepi?', { c: RED });
    D.toko(290, 560, 270, A(0, .08), .7, { nama: 'TOKO' });
    const h = G.hp(565, 440, 250);
    P(h.bingkai, A(0, .38), .3);
    P(G.feed(h.layar), A(0, .38) + .3, .25, { c: BLUE, w: 4 });
    P(G.hati(660, 330, 26), A(0, .5), .15, { c: RED, fill: RED, fillOp: .5, w: 5 });
    D.grafik(170, 640, 460, 190, 'datar', A(0, .68), .5);
    T('penjualan sepi', 400, 900, 54, A(0, .8), .3, { c: RED });
    // produk oke, cara memasarkan yang bermasalah
    D.kue(980, 470, 210, A(1, .12), .5);
    T('produk', 960, 545, 56, A(1, .27), .25);
    D.centang(1085, 527, 28, A(1, .35));
    D.megafon(950, 735, .7, A(1, .55), .5);
    T('?', 1175, 780, 130, A(1, .7), .2, { c: RED });
    T('cara memasarkan', 975, 895, 52, A(1, .78), .35);
    // tujuh langkah
    D.wanita(1330, 900, .95, 'menunjuk', A(2, 0), .9, { baju: GREEN });
    D.lencana(7, 1690, 390, 100, A(2, .42), .45);
    T('langkah', 1690, 570, 66, A(2, .55), .3);
    T('digital marketing', 1660, 660, 50, A(2, .68), .35, { c: BLUE });
  },

  // 0 Langkah pertama, tentukan siapa target pelangganmu.
  // 1 Bukan semua orang, tapi satu kelompok yang jelas: umur, lokasi, pekerjaan, dan masalah yang mereka hadapi.
  // 2 Semakin jelas targetnya, semakin mudah kamu membuat pesan yang tepat.
  // 3 Contohnya, toko kue rumahan bisa menargetkan ibu bekerja di sekitar kota yang butuh kue untuk acara keluarga.
  target(A) {
    TPL.judul(A, '1. Tentukan target pelanggan');
    D.target(330, 450, 150, A(0, .4), .75, { dart: true });
    T('semua orang', 345, 680, 50, A(1, 0), .3, { c: GRAY });
    P(G.kerumunan(160, 790, 5, 92, .55), A(1, .05), .4);
    D.coret(345, 800, 80, A(1, .17), .25);
    // kartu persona
    P(rect(760, 270, 560, 540, 2), A(1, .27), .3, { fill: BLUE, fillOp: .04 });
    T('kelompok jelas', 1040, 340, 58, A(1, .33), .3, { c: BLUE });
    TPL.daftar(A, { x: 800, y: 450, gap: 95, ukuran: 56, gaya: 'titik', maks: 360, kotak: 30,
      items: [{ teks: 'umur', at: A(1, .55) }, { teks: 'lokasi', at: A(1, .64) }, { teks: 'pekerjaan', at: A(1, .73) }, { teks: 'masalah', at: A(1, .85) }] });
    D.wanita(1215, 790, .6, 'berpikir', A(1, .4), .7, { baju: GOLD });
    // pesan tepat
    P(arrow(1340, 450, 1405, 450), A(2, .35), .2, { c: GREEN, w: 8 });
    P(G.balon(1460, 380, 370, 130, 'kiriSamping'), A(2, .5), .3, { c: GREEN, fill: GREEN, fillOp: .08 });
    T('pesan tepat', 1645, 467, 64, A(2, .68), .35, { c: GREEN });
    // contoh: toko kue rumahan -> ibu bekerja
    D.kue(1470, 880, 150, A(3, .18), .45);
    T('toko kue', 1470, 700, 46, A(3, .3), .25, { c: GRAY });
    P(arrow(1570, 800, 1655, 800), A(3, .45), .15, { c: GRAY, w: 6 });
    D.wanita(1750, 900, .58, 'berdiri', A(3, .5), .6, { baju: RED });
    T('ibu bekerja', 1740, 650, 46, A(3, .66), .25, { c: RED });
  },

  // 0 Langkah kedua, punya rumah digital sendiri, yaitu website.
  // 1 Aturan media sosial bisa berubah kapan saja, tapi website sepenuhnya milikmu.
  // 2 Website juga membuat bisnismu terlihat lebih terpercaya di mata calon pelanggan.
  // 3 Cukup mulai dari halaman sederhana: siapa kamu, apa yang kamu jual, bukti dari pelanggan, dan tombol untuk menghubungi.
  website(A) {
    TPL.judul(A, '2. Punya website sendiri');
    P(G.rumah(260, 560, 210), A(0, .3), .45, { c: GREEN, fill: GREEN, fillOp: .12 });
    T('rumah digital', 260, 635, 54, A(0, .45), .3, { c: GREEN });
    P(arrow(400, 440, 500, 440), A(0, .6), .15, { c: GRAY, w: 6 });
    const l = G.laptop(560, 280, 460);
    P(l.bingkai + l.alas, A(0, .66), .45);
    P(G.web(l.layar.x, l.layar.y, l.layar.w, l.layar.h), A(0, .66) + .45, .4, { c: BLUE, w: 4 });
    // aturan medsos berubah vs milikmu
    const h = G.hp(240, 795, 190);
    P(h.bingkai, A(1, .05), .25);
    P(G.feed(h.layar), A(1, .05) + .25, .2, { c: BLUE, w: 3 });
    T('aturan bisa berubah', 350, 790, 50, A(1, .25), .4, { anchor: 'start', c: RED });
    D.silang(750, 772, 24, A(1, .45));
    T('milikmu', 800, 705, 64, A(1, .7), .3, { c: GREEN });
    D.centang(940, 685, 30, A(1, .8));
    // terpercaya
    P(G.perisai(1220, 390, 95), A(2, .35), .35, { c: GREEN, fill: GREEN, fillOp: .15 });
    P(G.centang(1180, 345, 80), A(2, .35) + .35, .15, { c: GREEN, w: 10 });
    D.bintang(1560, 350, 36, 5, 82, A(2, .55), .4);
    T('terpercaya', 1560, 460, 62, A(2, .7), .3, { c: GREEN });
    // halaman sederhana
    TPL.daftar(A, { x: 1130, y: 600, gap: 86, ukuran: 54, maks: 680, kotak: 48,
      items: [{ teks: 'siapa kamu', at: A(3, .3) }, { teks: 'apa yang kamu jual', at: A(3, .45) },
        { teks: 'bukti dari pelanggan', at: A(3, .62) }, { teks: 'tombol hubungi', at: A(3, .78) }] });
  },

  // 0 Langkah ketiga, optimalkan website untuk Google dengan SEO.
  // 1 Tulis artikel yang menjawab pertanyaan calon pelanggan, dengan kata kunci yang benar-benar mereka cari.
  // 2 Hasilnya memang tidak instan, tapi pengunjung dari Google datang terus setiap hari.
  // 3 Satu artikel yang bagus bisa mendatangkan calon pelanggan selama bertahun-tahun, tanpa perlu kamu promosikan ulang.
  seo(A) {
    TPL.judul(A, '3. SEO: muncul di Google');
    D.google(240, 370, 90, A(0, .42), .55);
    P(G.kolomCari(400, 320, 980, 100), A(0, .62), .4, { fill: BLUE, fillOp: .04 });
    T('SEO', 1600, 405, 120, A(0, .82), .35, { c: BLUE });
    // artikel + pertanyaan + kata kunci
    P(G.dokumen(140, 520, 200, 260), A(1, .08), .4, { fill: GOLD, fillOp: .1 });
    T('artikel', 240, 850, 56, A(1, .18), .25);
    D.wanita(520, 890, .82, 'berpikir', A(1, .26), .7, { baju: BLUE });
    P(G.awanPikir(670, 500, 62, 46, 570, 580), A(1, .45), .25);
    T('?', 670, 528, 80, A(1, .5), .15, { c: RED });
    T('kue ulang tahun terdekat', 490, 392, 56, A(1, .68), .6, { anchor: 'start', c: BLUE });
    // tidak instan, tapi datang terus
    D.grafik(830, 540, 460, 270, 'naikPelan', A(2, .1), .7);
    T('tidak instan', 980, 580, 48, A(2, .3), .3, { c: RED });
    P(G.kerumunan(1320, 690, 3, 58, .42), A(2, .55), .35, { c: GREEN });
    T('pengunjung tiap hari', 1080, 885, 52, A(2, .72), .4, { c: GREEN });
    // bertahun-tahun
    ['2026', '2027', '2028'].forEach((y, i) => { D.kalender(1500 + i * 120, 580, 100, 100, A(3, .4 + i * .08), .25, { kol: 4, bar: 2 }); T(y, 1550 + i * 120, 730, 42, A(3, .4 + i * .08) + .25, .1, { c: GRAY }); });
    T('bertahun-tahun', 1660, 810, 54, A(3, .7), .3, { c: GREEN });
  },

  // 0 Langkah keempat, buat konten secara konsisten.
  // 1 Pilih dua atau tiga jenis konten, misalnya tips, cerita pelanggan, dan di balik layar.
  // 2 Lebih baik tiga konten seminggu tapi rutin, daripada sepuluh konten lalu berhenti sebulan.
  // 3 Buat jadwal sederhana, misalnya Senin tips, Rabu cerita pelanggan, dan Jumat di balik layar.
  konten(A) {
    TPL.judul(A, '4. Konten yang konsisten');
    const h = G.hp(240, 420, 250);
    P(h.bingkai, A(0, .35), .3);
    P(G.feed(h.layar), A(0, .35) + .3, .25, { c: BLUE, w: 4 });
    P(G.siklus(240, 420, 168), A(0, .65), .35, { c: GREEN, w: 6 });
    const ik = [
      ['tips', (cx, cy, at) => P(G.lampu(cx, cy - 10, 40), at, .35, { c: GOLD, w: 6 })],
      ['cerita', (cx, cy, at) => { P(G.balon(cx - 60, cy - 50, 120, 70, 'kiri'), at, .2, { c: BLUE, w: 5 }); D.bintang(cx, cy - 15, 14, 3, 34, at + .2, .15); }],
      ['balik layar', (cx, cy, at) => P(G.kamera(cx, cy, 120), at, .35, { w: 6 })],
    ];
    ik.forEach(([lab, g], i) => TPL.kartu(A, { x: 470 + i * 230, y: 280, w: 190, h: 160, gambar: g, label: lab, at: A(1, [.4, .58, .8][i]), ukuran: 46 }));
    // 3 rutin vs 10 lalu berhenti
    TPL.duaKolom(A, { x0: 110, x1: 1130, y0: 600, y1: 905, vs: true,
      kiri: { judul: '3 seminggu, rutin', warna: GREEN, at: A(2, .08), ukuran: 54,
        gambar: (cx, cy, at) => D.batang(cx - 175, cy + 95, [3, 3, 3, 3, 3], at, .45, { bw: 44, gap: 20, hmax: 110, c: GREEN }) },
      kanan: { judul: '10 lalu berhenti', warna: RED, at: A(2, .55), ukuran: 54,
        gambar: (cx, cy, at) => D.batang(cx - 175, cy + 95, [10, .3, .3, .3, .3], at, .45, { bw: 44, gap: 20, hmax: 110, c: RED }) } });
    // jadwal
    const kx = 1230, ky = 300, kw = 590, kh = 470;
    D.kalender(kx, ky, kw, kh, A(3, .05), .55, { judul: 'JADWAL' });
    ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].forEach((d, i) => { const c = G.selKalender(kx, ky, kw, kh, i, 0); T(d, c.x, c.y + 14, 40, A(3, .2) + i * .05, .05, { c: [0, 2, 4].includes(i) ? INK : GRAY }); });
    const sel = c => G.selKalender(kx, ky, kw, kh, c, 1);
    let c = sel(0); P(G.lampu(c.x, c.y - 8, 24), A(3, .45), .25, { c: GOLD, w: 5 });
    c = sel(2); P(G.balon(c.x - 32, c.y - 26, 64, 40, 'kiri'), A(3, .66), .2, { c: BLUE, w: 5 });
    c = sel(4); P(G.kamera(c.x, c.y, 64), A(3, .84), .2, { w: 5 });
    for (const k of [0, 2, 4]) for (const r of [2, 3]) { const q = G.selKalender(kx, ky, kw, kh, k, r); P(icon.tick(q.x, q.y, 22), A(3, .55) + k * .04 + r * .03, .08, { c: GREEN, w: 5 }); }
  },

  // 0 Langkah kelima, pilih platform media sosial yang tepat.
  // 1 Tidak perlu ada di semua platform. Cari tahu di mana target pelangganmu paling sering berkumpul.
  // 2 Fokus di satu atau dua platform dulu, lalu kuasai dengan baik.
  // 3 Bisnis untuk anak muda mungkin cocok di TikTok, sedangkan jasa untuk perusahaan lebih cocok di LinkedIn.
  platform(A) {
    TPL.judul(A, '5. Pilih platform yang tepat');
    const xs = [360, 660, 960, 1260, 1560], nm = ['ig', 'fb', 'yt', 'tiktok', 'in'];
    nm.forEach((n, i) => D.platform(n, xs[i], 350, 70, A(0, .3 + i * .1), .3));
    [0, 1, 2].forEach(i => D.silang(xs[i], 480, 26, A(1, .12 + i * .06), .2));
    // cari tahu tempat berkumpul
    D.wanita(960, 900, .8, 'menunjuk', A(1, .4), .7, { arah: -1, baju: RED });
    D.kacaPembesar(762, 594, 40, A(1, .55), .3);
    P(G.kerumunan(1205, 520, 3, 55, .4), A(1, .72), .3, { c: GREEN });
    P(G.kerumunan(1505, 520, 3, 55, .4), A(1, .82), .3, { c: GREEN });
    // fokus 1-2
    D.lingkari(1260, 350, 112, 100, A(2, .2), .35);
    D.lingkari(1560, 350, 112, 100, A(2, .32), .35);
    T('fokus 1 atau 2', 1410, 635, 56, A(2, .55), .4, { c: GREEN });
    // anak muda -> TikTok ; perusahaan -> LinkedIn
    P(G.kerumunan(170, 790, 3, 72, .5), A(3, .08), .35);
    T('anak muda', 245, 905, 48, A(3, .18), .25);
    P(arrow(390, 790, 470, 790), A(3, .3), .15, { c: GRAY, w: 6 });
    D.platform('tiktok', 545, 790, 55, A(3, .36), .3);
    P(G.kantor(1340, 845, 110, 165), A(3, .6), .35, { c: BLUE });
    T('perusahaan', 1340, 900, 44, A(3, .67), .2, { c: BLUE });
    P(arrow(1430, 780, 1520, 780), A(3, .75), .15, { c: GRAY, w: 6 });
    D.platform('in', 1600, 780, 55, A(3, .8), .3);
  },

  // 0 Langkah keenam, kumpulkan kontak calon pelanggan.
  // 1 Tawarkan sesuatu yang bermanfaat, misalnya panduan gratis, sebagai ganti nomor WhatsApp atau email mereka.
  // 2 Kontak ini adalah aset yang bisa kamu hubungi kapan saja, tanpa bergantung pada algoritma.
  // 3 Kirim pesan yang bermanfaat secara rutin, bukan hanya promosi, supaya mereka tetap ingat dengan bisnismu.
  kontak(A) {
    TPL.judul(A, '6. Kumpulkan kontak');
    D.wanita(210, 900, 1, 'pegangHp', A(0, .3), .8, { baju: BLUE });
    P(rect(350, 290, 290, 330, 2), A(0, .55), .25, { fill: GOLD, fillOp: .08 });
    let rows = ''; [360, 450, 540].forEach(y => { rows += circ(392, y, 22) + line(430, y - 8, 600, y - 8, 1) + line(430, y + 14, 560, y + 14, 1); });
    P(rows, A(0, .55) + .25, .45, { w: 5 });
    // panduan gratis <-> WhatsApp / email
    P(G.hadiah(800, 410, 150), A(1, .3), .35, { c: RED, fill: RED, fillOp: .15 });
    T('panduan gratis', 800, 590, 50, A(1, .4), .3, { c: RED });
    P(arrow(905, 380, 1000, 380), A(1, .53), .12, { c: GREEN, w: 7 });
    P(arrow(1000, 450, 905, 450), A(1, .58), .12, { c: GRAY, w: 7 });
    D.whatsapp(1085, 410, 58, A(1, .66), .35);
    P(G.email(1250, 410, 140), A(1, .82), .25, { c: BLUE, fill: BLUE, fillOp: .08 });
    // aset, kapan saja, tanpa algoritma
    P(G.jam(1420, 330, 48), A(2, .55), .3, { c: BLUE });
    P(G.brankas(1620, 390, 200), A(2, .15), .4, { c: GOLD, fill: GOLD, fillOp: .1 });
    T('aset', 1620, 560, 66, A(2, .3), .25, { c: GOLD });
    const b = T('algoritma', 1600, 640, 52, A(2, .78), .25, { c: GRAY });
    P(line(b.x - 8, b.y + b.height * .55, b.x + b.width + 8, b.y + b.height * .55, 1), A(2, .78) + .25, .12, { c: RED, w: 7 });
    // pesan rutin, bukan hanya promosi
    const bl = [['tips', GREEN, 720, A(3, .12)], ['cerita', BLUE, 1010, A(3, .3)], ['promo', GRAY, 1300, A(3, .62)]];
    bl.forEach(([t, c, x, at]) => {
      P(G.balon(x, 720, 250, 100, 'kiri'), at, .25, { c, fill: c, fillOp: .08 });
      T(t, x + 125, 790, 58, at + .25, .2, { c });
    });
    D.centang(970, 718, 22, A(3, .2), .15);
    D.centang(1260, 718, 22, A(3, .38), .15);
    P(G.hati(1700, 770, 48), A(3, .8), .25, { c: RED, fill: RED, fillOp: .45 });
  },

  // 0 Langkah ketujuh, gunakan iklan berbayar dengan bijak.
  // 1 Mulai dari anggaran kecil, uji beberapa versi iklan, lalu lihat mana yang paling banyak menghasilkan pesan masuk.
  // 2 Iklan yang terbukti berhasil, baru kamu besarkan anggarannya.
  // 3 Jangan langsung menghabiskan anggaran besar di hari pertama, karena kamu belum tahu iklan mana yang benar-benar bekerja.
  iklan(A) {
    TPL.judul(A, '7. Iklan yang terukur');
    D.megafon(290, 400, .85, A(0, .35), .55);
    D.koin(210, 580, 42, A(0, .62), .3);
    D.koin(320, 580, 42, A(0, .7), .3);
    // anggaran kecil, uji A B C, lihat pesan masuk
    D.koin(620, 330, 34, A(1, .1), .25);
    T('kecil', 620, 420, 46, A(1, .16), .2, { c: GRAY });
    ['A', 'B', 'C'].forEach((k, i) => {
      const x = 760 + i * 200, at = A(1, .32 + i * .07);
      P(rect(x, 280, 160, 190, 2), at, .2, { c: BLUE, fill: BLUE, fillOp: .05 });
      T(k, x + 80, 410, 110, at + .2, .15, { c: BLUE });
    });
    let bars = ''; [70, 210, 40].forEach((hh, i) => { bars += rect(800 + i * 200, 760 - hh, 80, hh, 1.5); });
    P(line(740, 760, 1340, 760, 1), A(1, .62), .1);
    P(bars, A(1, .62) + .1, .35, { c: GREEN, fill: GREEN, fillOp: .3 });
    D.whatsapp(1300, 600, 36, A(1, .8), .3);
    T('pesan masuk', 1040, 830, 50, A(1, .86), .3, { c: GREEN });
    // terbukti -> besarkan anggaran
    D.lingkari(1040, 375, 112, 120, A(2, .18), .3);
    D.centang(1120, 268, 28, A(2, .3), .2);
    [2, 4, 7].forEach((n, i) => P(G.tumpukanKoin(1480 + i * 130, 760, n, 46), A(2, .45 + i * .08), .25, { c: GOLD, fill: GOLD, fillOp: .3 }));
    P(arrow(1440, 560, 1760, 340), A(2, .7), .2, { c: GREEN, w: 9 });
    T('besarkan anggaran', 1610, 850, 52, A(2, .78), .3, { c: GREEN });
    // jangan habiskan di hari pertama
    P(G.kantongUang(240, 800, .9), A(3, .2), .3, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('Rp', 240, 830, 56, A(3, .2) + .3, .1);
    D.kalender(400, 690, 190, 170, A(3, .4), .35, { kol: 4, bar: 2 });
    T('HARI 1', 495, 805, 52, A(3, .48), .2, { c: RED });
    D.coret(400, 780, 115, A(3, .58), .25);
    T('?', 650, 850, 120, A(3, .8), .2, { c: RED });
  },

  // 0 Setelah semua berjalan, jangan lupa ukur hasilnya.
  // 1 Pantau angka penting seperti jumlah pengunjung, pesan masuk, dan penjualan setiap minggu.
  // 2 Dari data inilah kamu tahu langkah mana yang perlu ditambah, dan mana yang perlu dihentikan.
  // 3 Tidak perlu alat yang rumit. Satu lembar tabel sederhana yang diisi setiap minggu sudah cukup untuk memulai.
  ukur(A) {
    TPL.judul(A, 'Ukur hasilnya');
    D.wanita(240, 900, 1, 'menunjuk', A(0, .35), .8, { baju: GREEN });
    const kartu = [
      ['pengunjung', (cx, cy, at) => P(G.kerumunan(cx - 70, cy + 10, 3, 70, .5), at, .3)],
      ['pesan masuk', (cx, cy, at) => D.whatsapp(cx, cy, 52, at, .3)],
      ['penjualan', (cx, cy, at) => D.koin(cx, cy, 55, at, .3)],
    ];
    kartu.forEach(([lab, g], i) => TPL.kartu(A, { x: 560 + i * 430, y: 270, w: 300, h: 200, gambar: g, label: lab, at: A(1, [.4, .58, .76][i]), ukuran: 54 }));
    // ditambah vs dihentikan
    TPL.duaKolom(A, { x0: 520, x1: 1140, y0: 620, y1: 905,
      kiri: { judul: 'tambah', warna: GREEN, at: A(2, .45), gambar: (cx, cy, at) => P(arrow(cx, cy + 75, cx, cy - 55), at, .2, { c: GREEN, w: 14 }) },
      kanan: { judul: 'hentikan', warna: RED, at: A(2, .78), gambar: (cx, cy, at) => D.silang(cx, cy + 10, 55, at, .2) } });
    // tabel sederhana
    P(G.tabel(1230, 640, 570, 250, 4, 4), A(3, .45), .45);
    let isi = '';
    for (let r = 1; r < 4; r++) for (let c = 0; c < 4; c++) { const x = 1230 + c * 142.5 + 28, y = 640 + r * 62.5 + 31; isi += line(x, y, x + 60 + ((r + c) % 3) * 15, y, 1.5); }
    P(isi, A(3, .68), .35, { c: BLUE, w: 5 });
    T('Minggu', 1301, 690, 40, A(3, .62), .1, { c: GRAY });
  },

  // 0 Jadi, tujuh langkahnya adalah: target yang jelas, website, SEO, konten yang konsisten, platform yang tepat, kumpulkan kontak, dan iklan yang terukur.
  // 1 Jalankan satu per satu, jangan sekaligus.
  ringkas(A) {
    TPL.judul(A, '7 langkah');
    const it = ['Target jelas', 'Website', 'SEO', 'Konten konsisten', 'Platform tepat', 'Kumpulkan kontak', 'Iklan terukur'];
    const fr = [.2, .3, .36, .43, .58, .72, .86];
    TPL.daftar(A, { x: 140, y: 330, gap: 140, ukuran: 62, gaya: 'nomor', maks: 580, kotak: 76, items: it.slice(0, 4).map((t, i) => ({ teks: t, at: A(0, fr[i]) })) });
    TPL.daftar(A, { x: 760, y: 330, gap: 140, ukuran: 62, gaya: 'nomor', maks: 600, kotak: 76, mulai: 5, items: it.slice(4).map((t, i) => ({ teks: t, at: A(0, fr[i + 4]) })) });
    // satu per satu
    P(G.tangga(1400, 880, 4, 100, 105), A(1, .02), .35);
    D.wanita(1450, 775, .6, 'senang', A(1, .15), .7, { baju: GOLD });
    T('satu per satu', 1620, 330, 62, A(1, .55), .3, { c: GREEN });
  },

  // 0 Digital marketing bukan soal viral sekali, tapi soal sistem yang berjalan terus.
  // 1 Kalau video ini bermanfaat, ikuti channel ini untuk tips digital marketing berikutnya.
  penutup(A) {
    TPL.judul(A, 'Bangun sistemnya');
    D.grafik(150, 300, 430, 260, 'lonjakan', A(0, .2), .5, { c: RED });
    T('viral sekali', 365, 640, 58, A(0, .36), .3, { c: RED });
    D.silang(560, 300, 30, A(0, .45), .2);
    P(G.siklus(1000, 460, 170), A(0, .58), .4, { c: GREEN, w: 8 });
    T('sistem', 1000, 482, 66, A(0, .7), .25, { c: GREEN });
    D.google(1000, 290, 28, A(0, .78), .25);
    D.whatsapp(1150, 540, 28, A(0, .84), .2);
    D.koin(850, 540, 28, A(0, .9), .2);
    T('berjalan terus', 1000, 720, 56, A(0, .95), .3, { c: GREEN });
    // ikuti
    D.wanita(1710, 880, .95, 'senang', A(1, .05), .8, { baju: RED });
    P(rect(1220, 700, 330, 120, 2), A(1, .5), .25, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Ikuti', 1385, 790, 92, A(1, .5) + .25, .2, { c: RED });
    T('tips digital marketing', 1400, 900, 50, A(1, .72), .3, { c: GRAY });
  },
};
