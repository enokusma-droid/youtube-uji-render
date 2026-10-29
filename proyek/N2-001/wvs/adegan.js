// N2-001 "Toko Kelontong Ramai, Kok Uang di Laci Selalu Kurang?" 12 adegan, 16:9. Pustaka pustaka/wvs (G/D/TPL).
// Palet brand Buku Kas Juragan (config.json): RED = oranye aksen, GREEN = teal-hijau, BLUE = teal muda.
window.SCENES = {
  // 0 Toko kelontong ramai dari pagi sampai malam, kok uang di laci selalu kurang?
  // 1 Misalnya omzet sebuah toko dua juta rupiah sehari, tapi pemiliknya tetap harus menambal stok dari uang sendiri.
  // 2 Biasanya penyebabnya bukan nasib buruk, melainkan tiga angka yang tidak pernah dicatat.
  // 3 Enam menit ke depan, kita hitung satu per satu, lengkap dengan contoh angkanya.
  // 4 Di akhir, kamu akan tahu cara menutup bocornya dengan buku tulis biasa.
  pembuka(A) {
    TPL.judul(A, 'Ramai tapi uang kurang?', { c: RED });
    D.toko(300, 660, 300, A(0, .02), .8, { nama: 'TOKO' });
    P(G.kerumunan(640, 600, 4, 105, .62), A(0, .3), .5, { c: BLUE });
    P(rect(1000, 400, 380, 170, 2), A(0, .55), .3, { fill: BLUE, fillOp: .05 });
    P(rect(1030, 430, 320, 60, 1.5) + circ(1190, 515, 9), A(0, .65), .25);
    T('laci', 1190, 640, 52, A(0, .75), .2, { c: GRAY });
    T('?', 1190, 380, 110, A(0, .85), .2, { c: RED });
    P(G.uang(1700, 400, 220), A(1, .2), .35, { c: GREEN, fill: GREEN, fillOp: .1 });
    T('2 juta / hari', 1700, 520, 54, A(1, .45), .3, { c: GREEN });
    D.wanita(1700, 900, .72, 'berpikir', A(1, .5), .8, { baju: GOLD });
    D.lencana(3, 270, 800, 62, A(2, .15), .4, { c: RED });
    T('angka yang tidak dicatat', 380, 820, 56, A(2, .4), .5, { anchor: 'start', c: RED });
    P(G.jam(1160, 790, 62), A(3, .2), .4, { c: BLUE });
    T('6 menit', 1260, 815, 56, A(3, .5), .3, { anchor: 'start', c: BLUE });
    P(G.dokumen(1400, 300, 150, 190, 5), A(4, .15), .4, { fill: GOLD, fillOp: .12 });
    T('buku tulis', 1475, 540, 46, A(4, .5), .3, { c: GRAY });
  },

  // 0 Warung dan toko kelontong bukan usaha kecil yang bisa dianggap remeh.
  // 1 Menurut Kementerian Perdagangan pada Februari 2026, toko kelontong menguasai lebih dari 98 persen ekosistem ritel di Indonesia.
  // 2 Namun asosiasi pedagang memperkirakan jumlahnya tinggal sekitar 3,9 juta pada akhir 2025, turun dari 6,1 juta pada tahun 2007.
  // 3 Menteri Perdagangan membantah bahwa minimarket jadi penyebab utamanya.
  // 4 Jadi, mari kita lihat apa yang terjadi di dalam tokonya sendiri.
  fakta(A) {
    TPL.judul(A, 'Warung masih tulang punggung');
    D.toko(300, 640, 320, A(0, .1), .8, { nama: 'WARUNG' });
    T('lebih dari', 900, 335, 46, A(1, .1), .3, { c: GRAY });
    TPL.statistik(A, { x: 900, y: 490, angka: '98%', label: 'ekosistem ritel', at: A(1, .2), warna: GREEN, r: 125 });
    D.batang(1220, 740, [6.1, 3.9], A(2, .15), .8, { bw: 120, gap: 60, hmax: 300, c: RED });
    T('6,1 juta', 1340, 425, 46, A(2, .45), .3, { c: INK });
    T('3,9 juta', 1520, 533, 46, A(2, .7), .3, { c: RED });
    T('2007', 1340, 800, 46, A(2, .35), .2, { c: GRAY });
    T('2025', 1520, 800, 46, A(2, .6), .2, { c: GRAY });
    P(G.kantor(220, 890, 100, 150), A(3, .1), .4, { c: BLUE });
    T('minimarket', 340, 820, 56, A(3, .3), .4, { anchor: 'start', c: BLUE });
    D.silang(690, 800, 34, A(3, .6), .25);
    T('bukan penyebab utama', 340, 895, 44, A(3, .72), .3, { anchor: 'start', c: RED });
    D.kacaPembesar(1000, 790, 50, A(4, .3), .35);
  },

  // 0 Pertama, pisahkan dua kata yang sering dianggap sama: omzet dan untung.
  // 1 Omzet adalah semua uang yang masuk ke laci dari pembeli.
  // 2 Untung adalah sisa uang setelah kamu mengganti modal barang yang terjual dan membayar pengeluaran toko.
  // 3 Laci yang penuh membuat pemilik merasa kaya, padahal sebagian besar isinya harus kembali ke pemasok.
  // 4 Apalagi banyak barang sembako dijual dengan selisih yang kecil.
  omzet(A) {
    TPL.judul(A, 'Omzet bukan untung');
    T('omzet', 520, 395, 96, A(0, .1), .4, { c: BLUE });
    T('untung', 1240, 395, 96, A(0, .35), .4, { c: GREEN });
    D.silang(880, 365, 44, A(0, .65), .25);
    TPL.duaKolom(A, { x0: 110, x1: 1150, y0: 450, y1: 905, vs: true,
      kiri: { judul: 'semua uang masuk', warna: BLUE, at: A(1, .05), ukuran: 52,
        gambar: (cx, cy, at) => P(G.tumpukanKoin(cx, cy + 90, 8, 60), at, .6, { c: GOLD, fill: GOLD, fillOp: .3 }) },
      kanan: { judul: 'sisa setelah modal', warna: GREEN, at: A(2, .1), ukuran: 52,
        gambar: (cx, cy, at) => P(G.tumpukanKoin(cx, cy + 90, 2, 60), at, .5, { c: GOLD, fill: GOLD, fillOp: .3 }) } });
    P(G.uang(1380, 480, 200), A(3, .05), .35, { c: GREEN, fill: GREEN, fillOp: .1 });
    P(arrow(1490, 480, 1560, 480), A(3, .4), .15, { c: RED, w: 8 });
    D.toko(1690, 660, 200, A(3, .5), .6, { nama: 'PEMASOK' });
    D.grafik(1250, 730, 520, 130, 'datar', A(4, .15), .5, { c: RED });
    T('selisih tipis', 1510, 900, 54, A(4, .55), .3, { c: RED });
  },

  // 0 Mari pakai contoh. Anggap omzet harian toko dua juta rupiah.
  // 1 Misalnya modal barang yang terjual hari itu 1,76 juta rupiah.
  // 2 Sisanya, 240 ribu rupiah, adalah untung kotor per hari.
  // 3 Kalikan 30 hari, untung kotor sebulan hanya 7,2 juta rupiah, padahal omzetnya 60 juta.
  // 4 Jadi yang benar-benar tersisa dari omzet hanya sekitar 12 persen.
  modal(A) {
    TPL.judul(A, '1. Hitung modal barang');
    T('omzet harian', 150, 350, 62, A(0, .1), .4, { anchor: 'start' });
    T('2 juta', 1020, 350, 66, A(0, .5), .35, { anchor: 'end', c: BLUE });
    T('modal barang', 150, 465, 62, A(1, .1), .4, { anchor: 'start' });
    T('1,76 juta', 1020, 465, 66, A(1, .5), .35, { anchor: 'end', c: RED });
    P(line(150, 510, 1020, 510, 1), A(2, .02), .2, { w: 5 });
    T('untung kotor', 150, 600, 62, A(2, .15), .4, { anchor: 'start' });
    T('240 ribu', 1020, 600, 66, A(2, .55), .35, { anchor: 'end', c: GREEN });
    T('x 30 hari', 150, 715, 62, A(3, .08), .35, { anchor: 'start', c: GRAY });
    T('7,2 juta', 1020, 715, 66, A(3, .35), .35, { anchor: 'end', c: GREEN });
    D.batang(1150, 800, [60, 7.2], A(3, .45), .7, { bw: 150, gap: 70, hmax: 380, c: BLUE });
    T('omzet 60 juta', 1295, 855, 46, A(3, .75), .3, { c: BLUE });
    T('untung kotor', 1515, 725, 42, A(3, .85), .1, { c: GREEN });
    TPL.statistik(A, { x: 1700, y: 400, angka: '12%', label: 'tersisa', at: A(4, .15), warna: RED, r: 115 });
  },

  // 0 Dari untung kotor itu, masih ada pengeluaran yang jalan terus tiap bulan.
  // 1 Misalnya listrik dan kulkas 600 ribu rupiah, kantong plastik dan nota 300 ribu rupiah, serta gaji satu penjaga toko 1,5 juta rupiah.
  // 2 Totalnya 2,4 juta rupiah, sehingga untung bersih tinggal 4,8 juta rupiah per bulan.
  // 3 Angka 4,8 juta inilah yang aman diambil pemilik. Bukan isi laci.
  tetap(A) {
    TPL.judul(A, '2. Kurangi pengeluaran tetap');
    D.kalender(150, 290, 280, 230, A(0, .1), .8, { kol: 5, bar: 3, judul: 'BULAN', c: RED });
    TPL.daftar(A, { x: 520, y: 340, gap: 100, ukuran: 54, gaya: 'titik', maks: 900, kotak: 30,
      items: [{ teks: 'listrik dan kulkas  600 ribu', at: A(1, .12) }, { teks: 'plastik dan nota  300 ribu', at: A(1, .4) }, { teks: 'gaji penjaga  1,5 juta', at: A(1, .68) }] });
    P(line(520, 620, 1420, 620, 1), A(2, .03), .2, { w: 5 });
    T('total 2,4 juta', 520, 700, 58, A(2, .1), .4, { anchor: 'start', c: RED });
    T('untung bersih 4,8 juta', 520, 810, 66, A(2, .5), .55, { anchor: 'start', c: GREEN });
    P(G.kantongUang(1650, 520, 1.3), A(3, .1), .4, { c: GOLD, fill: GOLD, fillOp: .3 });
    D.centang(1750, 400, 30, A(3, .35), .2);
    T('aman diambil', 1650, 700, 48, A(3, .45), .3, { c: GREEN });
    T('bukan isi laci', 1650, 850, 50, A(3, .65), .3, { c: RED });
    D.silang(1480, 835, 26, A(3, .8), .15);
  },

  // 0 Sekarang bagian yang paling sering terjadi.
  // 1 Pemilik mengambil uang dari laci kapan saja: untuk jajan anak, bensin, rokok, atau makan siang.
  // 2 Misalnya rata-rata 250 ribu rupiah per hari, berarti 7,5 juta rupiah dalam sebulan.
  // 3 Padahal untung bersih toko cuma 4,8 juta rupiah.
  // 4 Tidak ada yang mencatat, jadi tidak ada yang sadar.
  laci(A) {
    TPL.judul(A, '3. Ambil dari laci');
    D.wanita(230, 900, .85, 'menunjuk', A(0, .15), .8, { baju: RED });
    P(rect(560, 300, 420, 200, 2), A(1, .05), .3, { fill: BLUE, fillOp: .05 });
    P(rect(590, 335, 360, 70, 1.5) + circ(770, 450, 10), A(1, .12), .25);
    P(arrow(1000, 400, 1110, 400), A(1, .25), .12, { c: RED, w: 8 });
    TPL.daftar(A, { x: 1140, y: 380, gap: 95, ukuran: 56, gaya: 'titik', maks: 640, kotak: 30,
      items: [{ teks: 'jajan anak', at: A(1, .35) }, { teks: 'bensin', at: A(1, .5) }, { teks: 'rokok', at: A(1, .65) }, { teks: 'makan siang', at: A(1, .8) }] });
    T('diambil 7,5 juta', 770, 640, 70, A(2, .3), .6, { c: RED });
    T('untung bersih cuma 4,8 juta', 770, 740, 54, A(3, .1), .6, { c: GREEN });
    P(G.dokumen(1400, 700, 150, 190, 4), A(4, .1), .35);
    D.coret(1475, 795, 75, A(4, .45), .25);
    T('tidak dicatat', 1590, 805, 48, A(4, .55), .3, { anchor: 'start', c: GRAY });
  },

  // 0 Selisihnya 2,7 juta rupiah tiap bulan, dan uang itu diambil dari modal barang.
  // 1 Dalam empat bulan, hilang 10,8 juta rupiah dari uang belanja stok.
  // 2 Pelan-pelan rak makin kosong, barang laris sering habis, dan pembeli pindah ke toko sebelah.
  // 3 Tokonya tetap terlihat ramai, tetapi laci tidak lagi cukup untuk kulakan.
  selisih(A) {
    TPL.judul(A, 'Selisihnya menggerus modal');
    D.batang(180, 640, [7.5, 4.8], A(0, .1), .6, { bw: 140, gap: 60, hmax: 340, c: RED });
    T('diambil', 320, 700, 44, A(0, .35), .2, { c: RED });
    T('untung bersih', 520, 700, 44, A(0, .5), .2, { c: GREEN });
    T('selisih 2,7 juta', 400, 770, 56, A(0, .7), .3, { c: RED });
    [4, 3, 2, 1].forEach((n, i) => P(G.tumpukanKoin(800 + i * 130, 600, n * 2, 48), A(1, .1 + i * .12), .3, { c: GOLD, fill: GOLD, fillOp: .3 }));
    T('4 bulan', 960, 330, 56, A(1, .1), .3, { c: GRAY });
    T('hilang 10,8 juta', 960, 700, 62, A(1, .6), .45, { c: RED });
    P(G.tabel(1330, 290, 420, 260, 3, 3), A(2, .05), .4);
    T('rak kosong', 1540, 610, 52, A(2, .3), .3, { c: RED });
    P(G.kerumunan(1400, 760, 3, 70, .5), A(2, .5), .3, { c: BLUE });
    P(arrow(1565, 760, 1625, 760), A(2, .7), .12, { c: GRAY, w: 6 });
    D.toko(1730, 880, 150, A(2, .75), .45);
    P(rect(760, 760, 340, 130, 2), A(3, .1), .3, { fill: BLUE, fillOp: .05 });
    T('laci', 930, 840, 50, A(3, .3), .2, { c: GRAY });
    T('kulakan?', 1190, 840, 60, A(3, .5), .3, { anchor: 'start', c: RED });
  },

  // 0 Ada satu lagi yang diam-diam menahan uang, yaitu bon pelanggan.
  // 1 Misalnya ada 20 pelanggan yang berutang masing-masing 50 ribu rupiah.
  // 2 Totalnya satu juta rupiah, dan uang itu tidak ada di laci meski barangnya sudah keluar.
  // 3 Barang sudah dibeli dari pemasok, tetapi uangnya belum kembali, jadi kulakan berikutnya terasa kurang.
  // 4 Catat bon di halaman terpisah, lengkap dengan nama dan tanggal, lalu ingatkan dengan sopan tiap akhir pekan.
  bon(A) {
    TPL.judul(A, 'Uang yang tertahan di bon');
    P(G.dokumen(190, 290, 200, 260, 5), A(0, .15), .5, { fill: GOLD, fillOp: .12 });
    T('BON', 290, 610, 56, A(0, .65), .3, { c: RED });
    P(G.kerumunan(560, 350, 5, 110, .55), A(1, .1), .4, { c: BLUE });
    P(G.kerumunan(560, 490, 5, 110, .55), A(1, .35), .4, { c: BLUE });
    T('20 pelanggan x 50 ribu', 790, 640, 52, A(1, .65), .45, { c: GRAY });
    T('1 juta', 1500, 450, 130, A(2, .1), .5, { c: RED });
    T('tertahan, bukan di laci', 1500, 540, 52, A(2, .5), .45, { c: RED });
    TPL.alur(A, { x: 190, y: 700, w: 420, h: 110, gap: 100, ukuran: 50, items: [
      { teks: 'barang keluar', at: A(3, .1), warna: BLUE }, { teks: 'uang belum balik', at: A(3, .4), warna: RED }, { teks: 'kulakan kurang', at: A(3, .7), warna: RED }] });
    D.centang(300, 868, 24, A(4, .15), .2);
    T('catat nama dan tanggal, ingatkan tiap pekan', 345, 885, 50, A(4, .2), .8, { anchor: 'start', c: GREEN });
  },

  // 0 Cara paling sederhana menutup bocor adalah menggaji diri sendiri.
  // 1 Saran ini juga ada di situs edukasi Otoritas Jasa Keuangan: ambil dana usaha secara teratur, seperti menerima gaji.
  // 2 Dari untung bersih 4,8 juta, misalnya tetapkan gaji pemilik 3,5 juta rupiah per bulan.
  // 3 Ambil sekali seminggu, sekitar 875 ribu rupiah, jangan tiap kali butuh.
  // 4 Sisanya 1,3 juta rupiah ditinggal di kantong toko sebagai cadangan stok.
  gaji(A) {
    TPL.judul(A, 'Gaji pemilik itu tetap');
    D.wanita(230, 900, .9, 'senang', A(0, .15), .8, { baju: GOLD });
    P(rect(520, 270, 200, 100, 2), A(1, .05), .3, { c: BLUE, fill: BLUE, fillOp: .08 });
    T('OJK', 620, 345, 70, A(1, .2), .25, { c: BLUE });
    T('saran resmi', 750, 345, 56, A(1, .3), .3, { anchor: 'start' });
    T('ambil dana usaha secara teratur', 520, 450, 52, A(1, .55), .6, { anchor: 'start', c: GRAY });
    D.batang(1330, 600, [4.8, 3.5], A(2, .15), .6, { bw: 120, gap: 60, hmax: 220, c: GREEN });
    T('4,8 juta', 1450, 365, 44, A(2, .5), .25, { c: INK });
    T('3,5 juta', 1630, 425, 44, A(2, .65), .25, { c: GREEN });
    T('untung', 1450, 655, 44, A(2, .55), .2, { c: GRAY });
    T('gaji', 1630, 655, 44, A(2, .7), .2, { c: GREEN });
    D.kalender(520, 560, 380, 260, A(3, .08), .5, { kol: 7, bar: 4, judul: 'MINGGU', c: RED });
    T('875 ribu', 1060, 650, 100, A(3, .35), .45, { c: GREEN });
    T('sekali seminggu', 1060, 730, 52, A(3, .6), .35, { c: GRAY });
    P(G.kantongUang(1400, 790, .9), A(4, .1), .35, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('1,3 juta', 1510, 775, 64, A(4, .3), .3, { anchor: 'start', c: GREEN });
    T('cadangan stok', 1510, 845, 48, A(4, .5), .3, { anchor: 'start', c: GRAY });
  },

  // 0 Lalu, catat tiga angka tiap malam sebelum menutup toko.
  // 1 Angka pertama adalah omzet hari itu dari hitungan uang di laci.
  // 2 Angka kedua adalah uang yang kamu ambil, dan angka ketiga adalah bon baru serta bon yang lunas.
  // 3 Cukup satu halaman buku tulis, tidak perlu rumus rumit.
  // 4 Bank Indonesia juga menyediakan aplikasi pencatatan bernama Si Apik untuk pelaku UMKM, bila kamu lebih suka lewat ponsel.
  // 5 Dalam seminggu pertama, selisih seperti tadi sudah terlihat, bukan setelah modal habis.
  catat(A) {
    TPL.judul(A, 'Catat tiga angka tiap malam');
    P(G.jam(230, 440, 90), A(0, .2), .5, { c: BLUE });
    T('tiap malam', 230, 610, 50, A(0, .6), .3, { c: GRAY });
    TPL.daftar(A, { x: 520, y: 400, gap: 120, ukuran: 62, gaya: 'nomor', maks: 800, kotak: 72,
      items: [{ teks: 'omzet hari itu', at: A(1, .2) }, { teks: 'uang yang diambil', at: A(2, .15) }, { teks: 'bon baru dan lunas', at: A(2, .6) }] });
    P(G.dokumen(1450, 290, 240, 320, 6), A(3, .1), .5, { fill: GOLD, fillOp: .12 });
    T('1 halaman', 1570, 670, 50, A(3, .6), .3, { c: GRAY });
    const h = G.hp(220, 800, 190);
    P(h.bingkai, A(4, .05), .3);
    P(G.feed(h.layar), A(4, .05) + .3, .25, { c: BLUE, w: 3 });
    T('aplikasi Si Apik', 340, 790, 52, A(4, .35), .4, { anchor: 'start', c: BLUE });
    T('dari Bank Indonesia', 340, 855, 44, A(4, .6), .35, { anchor: 'start', c: GRAY });
    D.kalender(1000, 720, 260, 170, A(5, .08), .5, { kol: 7, bar: 3 });
    T('1 minggu', 1420, 810, 60, A(5, .4), .3, { c: GREEN, anchor: 'start' });
    D.centang(1740, 780, 34, A(5, .6), .2);
  },

  // 0 Soal ini bukan masalah satu toko saja.
  // 1 Data pemerintah mencatat sekitar 65 juta UMKM di Indonesia, yang menyumbang sekitar 60 persen produk domestik bruto.
  // 2 Sementara survei OJK dan BPS tahun 2025 mencatat indeks literasi keuangan nasional 66,46 persen.
  // 3 Artinya masih ada ruang besar untuk belajar mengatur uang usaha, dan kamu sudah mulai hari ini.
  umkm(A) {
    TPL.judul(A, 'Kamu tidak sendirian');
    [0, 1, 2].forEach(i => D.toko(250 + i * 250, 540, 150, A(0, .1 + i * .25), .5));
    TPL.statistik(A, { x: 1130, y: 430, angka: '65', label: 'juta UMKM', at: A(1, .1), warna: BLUE, r: 125 });
    TPL.statistik(A, { x: 1590, y: 430, angka: '60%', label: 'dari PDB', at: A(1, .5), warna: GREEN, r: 125 });
    T('literasi keuangan 2025: 66,46%', 960, 735, 58, A(2, .1), .6, { c: INK });
    P(rect(520, 780, 900, 60, 2), A(2, .4), .3);
    P(rect(520, 780, 598, 60, 1), A(2, .6), .35, { c: BLUE, fill: BLUE, fillOp: .35 });
    D.wanita(220, 900, .8, 'senang', A(3, .15), .8, { baju: BLUE });
    T('mulai hari ini', 1650, 860, 54, A(3, .55), .35, { c: GREEN });
  },

  // 0 Jadi, kenapa toko kelontong yang ramai bisa tetap kurang uang di laci?
  // 1 Karena omzet dianggap untung, uang pribadi ikut keluar dari laci, dan bon menahan uang yang seharusnya berputar.
  // 2 Hitung untung bersih, tetapkan gaji pemilik, dan catat tiga angka tiap malam.
  // 3 Dengan begitu, toko yang ramai benar-benar menghasilkan, bukan sekadar sibuk.
  // 4 Buku kas satu halaman dan kalkulator HPP gratis ada di deskripsi, tinggal salin.
  // 5 Kalau video ini berguna, langganan Buku Kas Juragan, lalu lanjut ke video soal cara menghitung HPP tiap barang.
  penutup(A) {
    TPL.judul(A, 'Ringkasan', { c: GREEN });
    D.toko(300, 520, 280, A(0, .05), .7, { nama: 'RAMAI' });
    T('?', 300, 640, 110, A(0, .6), .2, { c: RED });
    TPL.daftar(A, { x: 640, y: 330, gap: 110, ukuran: 56, gaya: 'silang', maks: 1000, kotak: 52,
      items: [{ teks: 'omzet dianggap untung', at: A(1, .15) }, { teks: 'uang pribadi dari laci', at: A(1, .45) }, { teks: 'bon menahan uang', at: A(1, .75) }] });
    TPL.daftar(A, { x: 640, y: 700, gap: 90, ukuran: 56, gaya: 'centang', maks: 1000, kotak: 52,
      items: [{ teks: 'hitung untung bersih', at: A(2, .1) }, { teks: 'gaji pemilik tetap', at: A(2, .4) }, { teks: 'catat 3 angka tiap malam', at: A(2, .7) }] });
    D.grafik(110, 720, 440, 170, 'naik', A(3, .15), .7, { c: GREEN });
    P(G.dokumen(1640, 290, 150, 190, 5), A(4, .1), .4, { fill: GOLD, fillOp: .12 });
    T('buku kas gratis', 1715, 540, 40, A(4, .4), .25, { c: GRAY });
    T('+ kalkulator HPP', 1715, 590, 40, A(4, .55), .25, { c: GRAY });
    P(rect(1520, 740, 340, 110, 2), A(5, .4), .3, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Langganan', 1690, 818, 64, A(5, .5), .3, { c: RED });
  },
};
