// N2-003 "Omzet 10 Juta Tapi Kas Kosong: Ke Mana Uangnya Pergi?" 14 adegan, 16:9. Pustaka pustaka/wvs (G/D/TPL).
// Palet brand Buku Kas Juragan (config.json): RED = oranye aksen, GREEN = teal-hijau, BLUE = teal muda.
// Contoh toko pakaian: penjualan 10 jt, modal terjual 4 jt, rutin 2 jt, untung buku 4 jt, kas awal 2 jt -> kas akhir 0,5 jt.
window.SCENES = {
  // 0 Sepuluh juta rupiah masuk ke catatan penjualan bulan ini, tetapi saldo kas tinggal lima ratus ribu.
  // 1 Pemiliknya bingung, karena tokonya ramai dan buku penjualannya penuh.
  // 2 Ke mana uangnya pergi?
  // 3 Jawabannya ada di tiga tempat yang tidak terlihat dari angka omzet.
  // 4 Kita telusuri satu per satu dengan contoh angka, lalu kamu bisa memeriksa usahamu sendiri.
  buka(A) {
    TPL.judul(A, 'Kas tinggal 500 ribu?', { c: RED });
    P(G.dokumen(150, 290, 200, 260, 6), A(0, .05), .5, { fill: GOLD, fillOp: .12 });
    T('catatan penjualan', 250, 600, 46, A(0, .3), .4, { c: GRAY });
    T('10 juta', 700, 450, 96, A(0, .35), .4, { c: GREEN });
    P(arrow(1000, 430, 1250, 430), A(0, .6), .2, { c: GRAY, w: 7 });
    P(G.brankas(1500, 440, 250), A(0, .65), .35);
    T('500 ribu', 1500, 650, 88, A(0, .85), .15, { c: RED });
    D.wanita(960, 905, .68, 'berpikir', A(1, .1), .8, { baju: GOLD });
    T('ramai, buku penuh', 1500, 880, 50, A(1, .55), .3, { c: GRAY });
    T('ke mana uangnya pergi?', 960, 620, 70, A(2, .05), .6, { c: RED });
    [1, 2, 3].forEach((n, i) => D.lencana(n, 330 + i * 130, 790, 50, A(3, .1 + i * .22), .3, { c: RED }));
    T('tiga tempat', 330, 910, 44, A(3, .78), .15, { anchor: 'start', c: RED });
    D.kacaPembesar(1480, 780, 55, A(4, .15), .35);
    T('telusuri', 1700, 800, 50, A(4, .5), .3, { anchor: 'start', c: BLUE });
  },

  // 0 Mari mulai dari satu hal yang sering tertukar: untung dan kas.
  // 1 Untung adalah hasil hitungan di atas kertas, yaitu penjualan dikurangi modal barang dan biaya.
  // 2 Kas adalah uang yang benar-benar ada di tanganmu atau di rekening hari ini.
  // 3 Keduanya bisa berbeda jauh, dan yang bisa dipakai membayar gaji dan kulakan hanya kas.
  // 4 Usaha yang untung di kertas tetap bisa berhenti kalau kasnya habis.
  beda(A) {
    TPL.judul(A, 'Untung bukan kas');
    T('untung', 480, 360, 96, A(0, .1), .35, { c: BLUE });
    T('kas', 1440, 360, 96, A(0, .45), .3, { c: GREEN });
    P(line(900, 330, 1020, 330, 1) + line(900, 385, 1020, 385, 1) + line(930, 420, 990, 290, 1), A(0, .75), .2, { c: RED, w: 8 });
    P(G.dokumen(330, 430, 300, 330, 6), A(1, .05), .5, { fill: BLUE, fillOp: .08 });
    T('penjualan - modal - biaya', 480, 830, 52, A(1, .5), .5, { c: GRAY });
    P(G.kantongUang(1440, 600, 1.6), A(2, .05), .5, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('uang yang ada hari ini', 1440, 830, 52, A(2, .55), .4, { c: GRAY });
    T('hanya kas yang bisa', 1440, 890, 48, A(3, .35), .3, { c: GREEN });
    T('bayar gaji dan kulakan', 960, 520, 60, A(3, .05), .6, { c: GREEN });
    T('kas habis,', 960, 610, 64, A(4, .1), .3, { c: RED });
    T('usaha berhenti', 960, 690, 64, A(4, .4), .35, { c: RED });
    D.silang(960, 770, 34, A(4, .7), .2);
  },

  // 0 Anggap sebuah toko pakaian mencatat penjualan sepuluh juta rupiah selama sebulan.
  // 1 Modal pakaian yang terjual empat juta rupiah, dan biaya rutin seperti sewa, listrik, dan gaji dua juta rupiah.
  // 2 Jadi di buku, untung bulan ini empat juta rupiah.
  // 3 Misalnya kas di awal bulan dua juta rupiah.
  // 4 Pemilik berharap kas akhir bulan sekitar enam juta rupiah.
  // 5 Nyatanya, saldo kas hanya lima ratus ribu rupiah.
  contoh(A) {
    TPL.judul(A, 'Contoh: toko pakaian');
    D.toko(290, 760, 330, A(0, .05), .8, { nama: 'PAKAIAN' });
    T('penjualan', 600, 340, 58, A(0, .3), .3, { anchor: 'start' });
    T('10 juta', 1260, 340, 62, A(0, .55), .3, { anchor: 'end', c: BLUE });
    T('modal terjual', 600, 440, 58, A(1, .1), .3, { anchor: 'start' });
    T('4 juta', 1260, 440, 62, A(1, .3), .3, { anchor: 'end', c: RED });
    T('biaya rutin', 600, 540, 58, A(1, .5), .3, { anchor: 'start' });
    T('2 juta', 1260, 540, 62, A(1, .7), .3, { anchor: 'end', c: RED });
    P(line(600, 590, 1260, 590, 1), A(2, .02), .2, { w: 5 });
    T('untung di buku', 600, 690, 62, A(2, .1), .4, { anchor: 'start' });
    T('4 juta', 1260, 690, 70, A(2, .5), .3, { anchor: 'end', c: GREEN });
    P(rect(1380, 290, 470, 150, 2), A(3, .05), .3, { c: BLUE, fill: BLUE, fillOp: .06 });
    T('kas awal', 1420, 395, 54, A(3, .2), .3, { anchor: 'start', c: BLUE });
    T('2 juta', 1810, 395, 62, A(3, .5), .3, { anchor: 'end', c: BLUE });
    P(rect(1380, 480, 470, 150, 2), A(4, .05), .3, { c: GREEN, fill: GREEN, fillOp: .06 });
    T('harapan', 1420, 585, 54, A(4, .2), .3, { anchor: 'start', c: GREEN });
    T('6 juta', 1810, 585, 62, A(4, .5), .3, { anchor: 'end', c: GREEN });
    P(rect(1380, 670, 470, 150, 2), A(5, .05), .3, { c: RED, fill: RED, fillOp: .1 });
    T('nyatanya', 1420, 775, 54, A(5, .2), .3, { anchor: 'start', c: RED });
    T('0,5 juta', 1810, 775, 62, A(5, .5), .3, { anchor: 'end', c: RED });
  },

  // 0 Selisihnya lima setengah juta rupiah, dan uang sebanyak itu tidak hilang.
  // 1 Uang itu berpindah bentuk, dan bentuk barunya tidak bisa dipakai membayar tagihan.
  // 2 Ada tiga perpindahan, dan kita bahas berurutan.
  selisih(A) {
    TPL.judul(A, 'Selisih 5,5 juta', { c: RED });
    D.batang(150, 800, [6, 0.5], A(0, .05), .6, { bw: 170, gap: 90, hmax: 420, c: BLUE });
    T('harapan', 335, 860, 46, A(0, .3), .2, { c: GREEN });
    T('nyata', 595, 860, 46, A(0, .45), .2, { c: RED });
    T('6 juta', 335, 330, 50, A(0, .35), .2, { c: GREEN });
    T('0,5', 595, 700, 50, A(0, .5), .2, { c: RED });
    T('selisih 5,5 juta', 1180, 400, 70, A(0, .55), .4, { c: RED });
    T('tidak hilang', 1180, 480, 54, A(0, .85), .15, { c: GRAY });
    P(G.uang(1000, 640, 190), A(1, .1), .35, { c: GREEN, fill: GREEN, fillOp: .1 });
    P(arrow(1130, 640, 1250, 640), A(1, .4), .2, { c: GRAY, w: 7 });
    T('berubah bentuk', 1180, 740, 52, A(1, .55), .35, { c: GRAY });
    P(G.dokumen(1330, 560, 100, 130, 3), A(2, .1), .3, { fill: GOLD, fillOp: .12 });
    P(G.tabel(1490, 570, 130, 110, 3, 3), A(2, .35), .3);
    P(rect(1690, 565, 110, 125, 2) + line(1745, 565, 1745, 690, 1), A(2, .6), .3);
    [1, 2, 3].forEach((n, i) => D.lencana(n, 1380 + i * 160, 790, 38, A(2, .2 + i * .25), .25, { c: RED }));
  },

  // 0 Pertama, tiga juta rupiah dari penjualan itu berupa pesanan seragam yang baru dibayar bulan depan.
  // 1 Di buku penjualan angkanya sudah tertulis, tetapi di kas uangnya belum masuk.
  // 2 Sementara itu, sewa dan gaji tetap jatuh tempo bulan ini.
  // 3 Jadi uang tunai yang masuk bukan sepuluh juta, melainkan hanya tujuh juta rupiah.
  // 4 Semakin banyak penjualan bertempo, semakin lebar jarak antara omzet dan kas.
  tagihan(A) {
    TPL.judul(A, '1. Tagihan belum dibayar');
    P(G.dokumen(150, 290, 210, 280, 6), A(0, .05), .5, { fill: GOLD, fillOp: .12 });
    T('pesanan seragam', 255, 620, 44, A(0, .3), .3, { c: GRAY });
    T('3 juta', 255, 710, 84, A(0, .45), .3, { c: RED });
    D.kalender(520, 290, 420, 280, A(0, .6), .35, { kol: 7, bar: 4, judul: 'BULAN DEPAN', c: BLUE });
    P(rect(1100, 300, 700, 110, 2), A(1, .05), .3, { c: GREEN, fill: GREEN, fillOp: .06 });
    T('buku: sudah tertulis', 1140, 375, 52, A(1, .15), .35, { anchor: 'start', c: GREEN });
    D.centang(1750, 355, 28, A(1, .45), .2);
    P(rect(1100, 450, 700, 110, 2), A(1, .55), .3, { c: RED, fill: RED, fillOp: .08 });
    T('kas: belum masuk', 1140, 525, 52, A(1, .65), .35, { anchor: 'start', c: RED });
    D.silang(1750, 505, 28, A(1, .9), .08);
    P(G.jam(260, 800, 75), A(2, .1), .4, { c: BLUE });
    T('sewa dan gaji jatuh tempo', 380, 790, 52, A(2, .3), .5, { anchor: 'start', c: BLUE });
    T('bulan ini', 380, 855, 52, A(2, .65), .25, { anchor: 'start', c: RED });
    T('10 juta', 1210, 790, 72, A(3, .1), .3, { c: GRAY });
    D.coret(1210, 765, 55, A(3, .35), .2);
    T('7 juta', 1590, 790, 96, A(3, .5), .3, { c: GREEN });
    T('uang tunai masuk', 1590, 720, 46, A(3, .75), .2, { c: GRAY });
    P(arrow(1130, 850, 1690, 850), A(4, .2), .4, { c: RED, w: 7 });
    T('jarak 3 juta', 1410, 905, 46, A(4, .6), .3, { c: RED });
  },

  // 0 Kedua, pemilik mendapat diskon kalau kulakan dalam jumlah besar, sehingga ia belanja pakaian lima setengah juta rupiah.
  // 1 Padahal pakaian yang terjual bulan itu hanya bernilai empat juta rupiah.
  // 2 Selisih satu setengah juta rupiah sekarang tergantung di rak sebagai pakaian.
  // 3 Uangnya tidak hilang, tetapi baru kembali menjadi uang kalau pakaian itu laku.
  // 4 Stok yang lambat laku adalah uang yang tertidur.
  stok(A) {
    TPL.judul(A, '2. Stok kebanyakan');
    D.toko(260, 640, 240, A(0, .03), .7, { nama: 'PEMASOK' });
    T('diskon grosir', 260, 760, 46, A(0, .3), .3, { c: GRAY });
    P(arrow(420, 520, 620, 520), A(0, .5), .2, { c: GRAY, w: 7 });
    P(G.tabel(650, 330, 440, 300, 4, 3), A(0, .6), .4);
    T('5,5 juta', 870, 720, 84, A(0, .85), .1, { c: RED });
    D.batang(1230, 700, [5.5, 4], A(1, .1), .6, { bw: 130, gap: 70, hmax: 300, c: BLUE });
    T('kulakan', 1365, 760, 42, A(1, .35), .2, { c: GRAY });
    T('terjual', 1565, 760, 42, A(1, .5), .2, { c: GRAY });
    T('5,5', 1365, 380, 48, A(1, .4), .2, { c: RED });
    T('4', 1565, 530, 48, A(1, .6), .2, { c: BLUE });
    P(line(1490, 450, 1650, 450, 1), A(2, .05), .2, { c: RED, w: 6 });
    T('1,5 juta di rak', 1710, 400, 52, A(2, .2), .5, { c: RED });
    P(arrow(950, 640, 1100, 800), A(3, .1), .2, { c: GRAY, w: 6 });
    D.koin(1180, 830, 46, A(3, .3), .3);
    T('uang lagi kalau laku', 1250, 845, 52, A(3, .55), .35, { anchor: 'start', c: GREEN });
    T('z', 760, 300, 54, A(4, .1), .15, { c: BLUE });
    T('z', 810, 270, 70, A(4, .25), .15, { c: BLUE });
    T('Z', 870, 235, 90, A(4, .4), .15, { c: BLUE });
    T('uang yang tertidur', 600, 880, 56, A(4, .55), .3, { c: BLUE });
  },

  // 0 Ketiga, pemilik membeli etalase dan gantungan baru seharga satu juta rupiah.
  // 1 Pembelian peralatan mengeluarkan kas hari ini, padahal manfaatnya dipakai bertahun-tahun.
  // 2 Karena itu ia tidak langsung mengurangi untung bulanan, tetapi kasnya langsung berkurang.
  // 3 Kalau kamu hanya melihat untung, pengeluaran seperti ini tidak terlihat.
  // 4 Kalau kamu melihat kas, bekasnya langsung ketahuan.
  etalase(A) {
    TPL.judul(A, '3. Peralatan baru');
    P(rect(170, 300, 400, 380, 2) + rect(200, 330, 340, 320, 1) + line(200, 440, 540, 440, 1) + line(200, 545, 540, 545, 1), A(0, .05), .5, { c: BLUE, fill: BLUE, fillOp: .06 });
    [250, 330, 410, 490].forEach((x, i) => P(line(x, 330, x, 345, 1) + line(x - 22, 395, x, 345, 1) + line(x + 22, 395, x, 345, 1), A(0, .5 + i * .1), .15, { c: GRAY, w: 5 }));
    T('etalase baru', 370, 750, 52, A(0, .55), .3, { c: GRAY });
    T('1 juta', 370, 850, 80, A(0, .8), .15, { c: RED });
    P(G.kantongUang(780, 420, .9), A(1, .05), .4, { c: GOLD, fill: GOLD, fillOp: .3 });
    P(arrow(880, 420, 1050, 420), A(1, .3), .2, { c: RED, w: 7 });
    T('kas keluar hari ini', 1080, 435, 52, A(1, .4), .35, { anchor: 'start', c: RED });
    D.kalender(700, 560, 700, 190, A(1, .6), .3, { kol: 12, bar: 3, judul: 'BERTAHUN-TAHUN', c: BLUE });
    T('untung bulanan tidak langsung turun', 1100, 830, 52, A(2, .1), .6, { c: BLUE });
    T('tetapi kas langsung berkurang', 1100, 890, 52, A(2, .5), .5, { c: RED });
    T('untung saja: tidak terlihat', 1640, 340, 46, A(3, .2), .5, { c: GRAY });
    D.silang(1640, 410, 30, A(3, .7), .2);
    D.kacaPembesar(1640, 540, 50, A(4, .1), .35, { c: GREEN });
    T('kas: ketahuan', 1640, 690, 50, A(4, .5), .3, { c: GREEN });
  },

  // 0 Sekarang susun semuanya jadi satu jembatan, dari untung ke perubahan kas.
  // 1 Mulai dari untung empat juta rupiah.
  // 2 Kurangi tagihan yang belum dibayar tiga juta, sisanya satu juta.
  // 3 Kurangi stok berlebih satu setengah juta, jadi minus lima ratus ribu.
  // 4 Kurangi etalase satu juta, hasilnya minus satu setengah juta rupiah.
  // 5 Itulah penurunan kas dari dua juta menjadi lima ratus ribu, walaupun bukunya untung.
  jembatan(A) {
    TPL.judul(A, 'Dari untung ke kas');
    P(line(150, 700, 1330, 700, 1), A(0, .1), .5, { c: GRAY, w: 5 });
    T('0', 120, 715, 40, A(0, .5), .15, { c: GRAY });
    P(rect(200, 380, 190, 320, 1.5), A(1, .1), .45, { c: BLUE, fill: BLUE, fillOp: .3 });
    T('untung', 295, 780, 46, A(1, .45), .2, { c: BLUE });
    T('+4', 295, 350, 62, A(1, .55), .2, { c: BLUE });
    P(rect(460, 380, 190, 240, 1.5), A(2, .1), .45, { c: RED, fill: RED, fillOp: .3 });
    T('tagihan', 555, 780, 46, A(2, .45), .2, { c: RED });
    T('-3', 555, 350, 62, A(2, .55), .2, { c: RED });
    T('sisa +1', 555, 840, 46, A(2, .8), .1, { c: GRAY });
    P(rect(720, 620, 190, 120, 1.5), A(3, .1), .4, { c: RED, fill: RED, fillOp: .3 });
    T('stok', 815, 780, 46, A(3, .45), .2, { c: RED });
    T('-1,5', 815, 590, 62, A(3, .5), .2, { c: RED });
    T('menjadi -0,5', 815, 840, 46, A(3, .8), .1, { c: GRAY });
    P(rect(980, 740, 190, 80, 1.5), A(4, .1), .4, { c: RED, fill: RED, fillOp: .3 });
    T('etalase', 1075, 880, 46, A(4, .4), .2, { c: RED });
    T('-1', 1250, 800, 62, A(4, .5), .2, { c: RED });
    P(rect(1440, 700, 190, 120, 1.5), A(5, .1), .4, { c: GREEN, fill: GREEN, fillOp: .25 });
    T('kas -1,5', 1535, 660, 60, A(5, .35), .2, { c: GREEN });
    T('2 juta', 1700, 380, 62, A(5, .5), .2, { c: GRAY });
    P(arrow(1700, 400, 1700, 470), A(5, .6), .15, { c: GRAY, w: 6 });
    T('0,5 juta', 1700, 560, 62, A(5, .75), .15, { c: RED });
  },

  // 0 Masalah ini bukan hanya milik satu toko.
  // 1 Pada 11 Agustus 2026, Otoritas Jasa Keuangan menyebut hanya 3,51 persen UMKM yang punya laporan keuangan.
  // 2 Artikel Direktorat Jenderal Perbendaharaan menulis bahwa sebagian pelaku usaha sudah mencatat uang masuk dan keluar, tetapi sebagian lain belum mencatat sama sekali.
  // 3 Sementara survei Badan Pusat Statistik 2025 mencatat sekitar 61 persen industri mikro dan kecil mengalami kesulitan usaha.
  // 4 Dari kelompok itu, hampir 70 persen menyebut permodalan sebagai masalah utamanya.
  // 5 Mengelola kas dengan rapi membantu modal yang ada bekerja lebih lama.
  data(A) {
    TPL.judul(A, 'Banyak usaha belum mencatat');
    [0, 1, 2].forEach(i => D.toko(210 + i * 190, 880, 120, A(0, .1 + i * .25), .45));
    TPL.statistik(A, { x: 520, y: 450, angka: '3,51%', label: 'UMKM punya', at: A(1, .2), warna: RED, r: 135 });
    T('laporan keuangan (OJK)', 520, 750, 46, A(1, .65), .3, { c: GRAY });
    P(G.dokumen(780, 330, 150, 190, 4), A(2, .1), .35, { fill: GOLD, fillOp: .12 });
    D.centang(855, 570, 28, A(2, .3), .2);
    T('mencatat', 855, 650, 44, A(2, .4), .2, { c: GREEN });
    P(G.dokumen(1080, 330, 150, 190, 4), A(2, .55), .35);
    D.coret(1155, 425, 50, A(2, .75), .2);
    T('belum mencatat', 1155, 650, 44, A(2, .85), .1, { c: RED });
    TPL.statistik(A, { x: 1590, y: 440, angka: '61%', label: 'industri mikro-kecil', at: A(3, .15), warna: BLUE, r: 120, ukuranLabel: 46 });
    T('kesulitan usaha (BPS 2025)', 1590, 700, 44, A(3, .65), .25, { c: GRAY });
    T('hampir 70%: permodalan', 1590, 790, 54, A(4, .15), .5, { c: RED });
    P(G.kantongUang(1000, 810, .55), A(5, .1), .3, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('kas rapi, modal bekerja lebih lama', 1180, 850, 52, A(5, .25), .6, { anchor: 'start', c: GREEN });
  },

  // 0 BPS juga mencatat lebih dari 91 persen usaha mikro dan kecil memakai modal yang sepenuhnya milik sendiri.
  // 1 Artinya, kalau kas bocor, tidak ada cadangan lain yang menutupnya.
  // 2 Tempat usaha dan peralatan di banyak usaha juga masih menyatu dengan aset rumah tangga pemilik.
  // 3 Maka satu salah urus kas di usaha bisa terasa sampai ke dapur rumah.
  modal(A) {
    TPL.judul(A, 'Modal sendiri');
    for (let i = 0; i < 10; i++) {
      const x = 230 + i * 162;
      P(G.kantongUang(x, 440, .62), A(0, .05 + i * .06), .25, i < 9 ? { c: GOLD, fill: GOLD, fillOp: .35 } : { c: GRAY });
    }
    T('lebih dari 91% modalnya milik sendiri', 960, 620, 62, A(0, .7), .3, { c: BLUE });
    P(G.brankas(300, 790, 150), A(1, .1), .35);
    D.silang(300, 790, 60, A(1, .45), .2);
    T('tidak ada cadangan lain', 420, 810, 52, A(1, .5), .4, { anchor: 'start', c: RED });
    P(G.rumah(1430, 900, 150), A(2, .15), .4, { c: GREEN });
    D.toko(1690, 900, 170, A(2, .4), .45);
    T('satu atap', 1560, 720, 50, A(2, .7), .2, { c: GRAY });
    P(arrow(1625, 860, 1560, 860), A(3, .1), .15, { c: RED, w: 7 });
    T('terasa sampai dapur', 1100, 880, 52, A(3, .3), .5, { c: RED });
  },

  // 0 Cara pertama untuk mencegahnya adalah membuat tabel kas mingguan.
  // 1 Tulis empat kolom: saldo awal, uang masuk, uang keluar, dan saldo akhir.
  // 2 Saldo akhir minggu ini menjadi saldo awal minggu depan.
  // 3 Isi uang masuk hanya ketika uangnya benar-benar diterima, bukan ketika pesanan dicatat.
  // 4 Isi uang keluar saat dibayar, termasuk kulakan, peralatan, dan tagihan yang jatuh tempo.
  // 5 Dengan tabel ini, kamu melihat minggu mana yang kasnya tipis sebelum kejadian.
  mingguan(A) {
    TPL.judul(A, 'Cara 1: tabel kas mingguan');
    P(G.tabel(280, 280, 1400, 450, 4, 5), A(0, .1), .8);
    const cx = [455, 805, 1155, 1505], cy = r => 280 + 45 + r * 90;
    ['saldo awal', 'uang masuk', 'uang keluar', 'saldo akhir'].forEach((h, i) => T(h, cx[i], cy(0) + 14, 46, A(1, .1 + i * .2), .25, { c: [BLUE, GREEN, RED, BLUE][i] }));
    ['M1', 'M2', 'M3', 'M4'].forEach((m, i) => T(m, 240, cy(i + 1) + 14, 44, A(1, .75 + i * .05), .12, { anchor: 'end', c: GRAY }));
    const awal = ['2', '1,7', '1,3', '0,7'], masuk = ['1,5', '1,8', '1,7', '2,0'], keluar = ['1,8', '2,2', '2,3', '2,2'], akhir = ['1,7', '1,3', '0,7', '0,5'];
    awal.forEach((v, r) => T(v, cx[0], cy(r + 1) + 14, 46, A(2, .1 + r * .08), .15, { c: BLUE }));
    akhir.forEach((v, r) => T(v, cx[3], cy(r + 1) + 14, 46, A(2, .3 + r * .08), .15, { c: BLUE }));
    D.lingkari(cx[3], cy(1) + 4, 70, 38, A(2, .6), .25, BLUE);
    D.lingkari(cx[0], cy(2) + 4, 70, 38, A(2, .78), .25, BLUE);
    masuk.forEach((v, r) => T(v, cx[1], cy(r + 1) + 14, 46, A(3, .3 + r * .15), .15, { c: GREEN }));
    D.centang(1790, 560, 30, A(3, .85), .1);
    keluar.forEach((v, r) => T(v, cx[2], cy(r + 1) + 14, 46, A(4, .3 + r * .15), .15, { c: RED }));
    T('angka dalam juta rupiah', 960, 800, 44, A(1, .9), .1, { c: GRAY });
    D.lingkari(cx[3], cy(3) + 4, 70, 38, A(5, .1), .3, RED);
    T('minggu 3: kas mulai tipis', 960, 880, 62, A(5, .4), .5, { c: RED });
  },

  // 0 Cara kedua adalah menyimpan kas cadangan, minimal biaya rutin untuk dua minggu.
  // 1 Dalam contoh tadi, biaya rutin dua juta sebulan, jadi cadangannya sekitar satu juta rupiah.
  // 2 Dengan kas lima ratus ribu, toko ini sudah berada di bawah batas itu.
  // 3 Cara ketiga, sebelum belanja besar, ajukan tiga pertanyaan.
  // 4 Kapan barang ini terjual, berapa kas yang tersisa setelah membayar, dan apa yang jatuh tempo minggu depan?
  // 5 Kalau jawabannya belum jelas, tunda atau kurangi jumlah belanjanya.
  cadangan(A) {
    TPL.judul(A, 'Cara 2 dan 3');
    P(G.kantongUang(230, 410, 1.1), A(0, .1), .45, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('kas cadangan', 230, 570, 50, A(0, .5), .3, { c: GRAY });
    T('2 minggu biaya rutin', 230, 630, 44, A(0, .75), .15, { c: BLUE });
    T('rutin 2 juta / bulan', 700, 340, 54, A(1, .1), .4, { anchor: 'start' });
    T('cadangan sekitar 1 juta', 700, 440, 60, A(1, .5), .5, { anchor: 'start', c: GREEN });
    D.batang(1330, 600, [1, 0.5], A(2, .1), .5, { bw: 150, gap: 70, hmax: 200, c: BLUE });
    T('batas', 1475, 650, 42, A(2, .35), .15, { c: GRAY });
    T('kas', 1695, 650, 42, A(2, .45), .15, { c: RED });
    T('1', 1475, 380, 50, A(2, .5), .15, { c: GREEN });
    T('0,5', 1695, 480, 50, A(2, .65), .15, { c: RED });
    D.lencana(3, 230, 770, 50, A(3, .1), .35, { c: RED });
    T('3 pertanyaan sebelum belanja besar', 330, 790, 54, A(3, .3), .6, { anchor: 'start', c: RED });
    T('kapan terjual?', 450, 850, 50, A(4, .1), .3, { c: INK });
    T('kas sisa berapa?', 960, 850, 50, A(4, .4), .3, { c: INK });
    T('apa yang jatuh tempo?', 1440, 850, 50, A(4, .7), .3, { c: INK });
    T('ragu? tunda atau kurangi belanja', 960, 912, 50, A(5, .1), .6, { c: GRAY });
  },

  // 0 Alatnya tidak perlu rumit.
  // 1 Artikel Direktorat Jenderal Kekayaan Negara tahun 2023 menyebut buku kas untuk uang masuk dan keluar, serta buku persediaan untuk barang.
  // 2 Untuk usaha kecil dengan transaksi sedikit, pencatatan masukan tunggal yang mirip rekening koran dinilai cocok.
  // 3 Bank Indonesia juga menyediakan aplikasi SIAPIK yang bisa menghasilkan laporan arus kas.
  // 4 Pilih satu yang sanggup kamu isi tiap minggu, karena catatan yang rajin lebih berguna daripada yang sempurna.
  alat(A) {
    TPL.judul(A, 'Alat pencatatan');
    T('tidak perlu rumit', 960, 290, 56, A(0, .1), .5, { c: GRAY });
    P(G.dokumen(150, 360, 150, 200, 5), A(1, .05), .35, { fill: GOLD, fillOp: .12 });
    T('buku kas', 225, 620, 46, A(1, .35), .2, { c: BLUE });
    P(G.dokumen(380, 360, 150, 200, 5), A(1, .55), .35, { fill: GOLD, fillOp: .12 });
    T('buku persediaan', 455, 620, 40, A(1, .8), .15, { c: BLUE });
    P(G.tabel(720, 360, 480, 220, 3, 4), A(2, .1), .45);
    ['tanggal', 'masuk', 'keluar'].forEach((h, i) => T(h, 800 + i * 160, 405, 38, A(2, .35 + i * .12), .15, { c: GRAY }));
    T('masukan tunggal, mirip rekening koran', 960, 650, 46, A(2, .55), .4, { c: GRAY });
    const h = G.hp(1560, 470, 330);
    P(h.bingkai, A(3, .05), .3);
    P(G.feed(h.layar), A(3, .3), .25, { c: BLUE, w: 3 });
    T('SIAPIK', 1560, 705, 56, A(3, .35), .25, { c: BLUE });
    T('laporan arus kas (BI)', 1560, 775, 44, A(3, .6), .25, { c: GRAY });
    T('rajin lebih berguna dari sempurna', 700, 860, 58, A(4, .15), .6, { c: GREEN });
    D.centang(1260, 840, 30, A(4, .75), .15);
  },

  // 0 Jadi, ke mana uangnya pergi?
  // 1 Ke tagihan yang belum dibayar, ke pakaian di rak, dan ke etalase baru.
  // 2 Omzet sepuluh juta tidak salah, tetapi omzet bukan kas.
  // 3 Pantau kas tiap minggu, simpan cadangan, dan ajukan tiga pertanyaan sebelum belanja besar.
  // 4 Tabel kas mingguan siap salin ada di deskripsi.
  // 5 Kalau video ini berguna, langganan Buku Kas Juragan, lalu lanjut ke video tentang cara menghitung HPP.
  penutup(A) {
    TPL.judul(A, 'Ringkasan', { c: GREEN });
    T('ke mana uangnya pergi?', 560, 300, 62, A(0, .1), .6, { c: RED });
    P(G.dokumen(180, 380, 130, 170, 4), A(1, .05), .3, { fill: GOLD, fillOp: .12 });
    T('tagihan', 245, 620, 42, A(1, .25), .15, { c: GRAY });
    P(G.tabel(450, 390, 170, 150, 3, 3), A(1, .4), .3);
    T('stok di rak', 535, 620, 42, A(1, .55), .15, { c: GRAY });
    P(rect(760, 385, 130, 160, 2) + line(825, 385, 825, 545, 1), A(1, .7), .3);
    T('etalase', 825, 620, 42, A(1, .85), .1, { c: GRAY });
    T('omzet', 330, 770, 70, A(2, .1), .3, { c: BLUE });
    P(line(480, 745, 600, 745, 1) + line(480, 790, 600, 790, 1) + line(510, 820, 570, 710, 1), A(2, .4), .2, { c: RED, w: 8 });
    T('kas', 700, 770, 70, A(2, .55), .3, { c: GREEN });
    TPL.daftar(A, { x: 1060, y: 340, gap: 100, ukuran: 54, gaya: 'centang', maks: 800, kotak: 48,
      items: [{ teks: 'pantau kas tiap minggu', at: A(3, .1) }, { teks: 'simpan kas cadangan', at: A(3, .4) }, { teks: '3 pertanyaan belanja', at: A(3, .7) }] });
    P(G.tabel(1090, 600, 260, 190, 4, 4), A(4, .1), .4, { fill: GOLD, fillOp: .1 });
    T('tabel kas', 1450, 670, 46, A(4, .45), .25, { anchor: 'start', c: GRAY });
    T('mingguan gratis', 1450, 730, 46, A(4, .6), .25, { anchor: 'start', c: GRAY });
    P(rect(1530, 770, 340, 100, 2), A(5, .4), .3, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Langganan', 1700, 837, 60, A(5, .5), .3, { c: RED });
  },
};
