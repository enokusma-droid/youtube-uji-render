// N2-004 "Kenapa Toko Bangunan Sepi Tapi Tidak Pernah Tutup?" 12 adegan, 16:9. Pustaka pustaka/wvs (G/D/TPL).
// Palet brand Buku Kas Juragan (config.json): RED = oranye aksen, GREEN = teal-hijau, BLUE = teal muda.
// Semua angka toko (15 pembeli, Rp800 ribu, margin 7%, piutang 40%, dst.) adalah permisalan.
window.SCENES = {
  // 0 Bayangkan toko bangunan di pinggir jalan yang hanya didatangi sekitar lima belas pembeli sehari.
  // 1 Tidak ada antrean di kasir, dan rak-raknya tampak sama dari tahun ke tahun.
  // 2 Namun pemiliknya tetap membuka pintu besi itu setiap pagi, bertahun-tahun.
  // 3 Kenapa toko bangunan sepi tapi tidak pernah tutup?
  // 4 Jawabannya ada di empat hal: nilai belanja, margin, perputaran stok, dan satu jebakan yang bisa merobohkannya.
  // 5 Kita hitung satu per satu dengan angka permisalan, lalu kamu bisa memeriksa usahamu sendiri.
  buka(A) {
    TPL.judul(A, 'Sepi tapi bertahan', { c: RED });
    D.toko(260, 780, 340, A(0, .05), .8, { nama: 'MATERIAL' });
    P(G.kerumunan(640, 800, 3, 100, .6), A(0, .45), .45, { c: BLUE });
    T('15 pembeli sehari', 1250, 380, 64, A(0, .5), .4, { c: BLUE });
    T('tanpa antrean di kasir', 1250, 470, 52, A(1, .1), .4, { c: GRAY });
    T('rak itu-itu saja', 1250, 550, 52, A(1, .5), .3, { c: GRAY });
    T('tetap buka tiap pagi', 1250, 650, 56, A(2, .15), .4, { c: GREEN });
    D.centang(1650, 635, 28, A(2, .7), .2);
    T('sepi tapi tidak tutup?', 1250, 780, 66, A(3, .05), .6, { c: RED });
    [1, 2, 3, 4].forEach((n, i) => D.lencana(n, 220 + i * 130, 880, 45, A(4, .1 + i * .25), .3, { c: RED }));
    T('empat hal', 1250, 890, 52, A(4, .7), .3, { c: RED });
    D.kacaPembesar(1700, 880, 50, A(5, .2), .35);
  },

  // 0 Mulai dari nilai belanja, karena di sinilah toko bangunan berbeda dari warung.
  // 1 Anggap warung kelontong dilewati seratus dua puluh pembeli sehari, dan masing-masing belanja dua puluh lima ribu rupiah.
  // 2 Hasilnya tiga juta rupiah per hari.
  // 3 Sekarang anggap toko bangunan hanya dikunjungi lima belas pembeli, tetapi tiap orang membawa pulang semen, pasir, dan cat senilai delapan ratus ribu rupiah.
  // 4 Hasilnya dua belas juta rupiah per hari, empat kali lipat warung yang terlihat jauh lebih ramai.
  // 5 Jadi sepi di mata tidak sama dengan kecil di buku.
  nilai(A) {
    TPL.judul(A, 'Sepi bukan berarti kecil');
    T('nilai belanja', 960, 330, 60, A(0, .15), .5, { c: GRAY });
    D.toko(300, 700, 230, A(1, .05), .6, { nama: 'WARUNG' });
    T('120 pembeli', 480, 770, 50, A(1, .4), .3);
    T('x Rp25 ribu', 480, 830, 50, A(1, .7), .3, { c: BLUE });
    T('Rp3 juta / hari', 480, 895, 56, A(2, .1), .4, { c: GREEN });
    D.toko(1260, 700, 230, A(3, .05), .6, { nama: 'MATERIAL' });
    T('15 pembeli', 1440, 770, 50, A(3, .35), .3);
    T('x Rp800 ribu', 1440, 830, 50, A(3, .7), .3, { c: BLUE });
    T('Rp12 juta / hari', 1440, 895, 56, A(4, .1), .4, { c: GREEN });
    T('4x', 960, 600, 110, A(4, .45), .3, { c: RED });
    T('sepi di mata, besar di buku', 960, 440, 52, A(5, .1), .6, { c: RED });
  },

  // 0 Barang yang dijual toko bangunan juga bukan barang musiman.
  // 1 Asosiasi Perusahaan Semen Seluruh Indonesia mencatat penjualan semen domestik Januari sampai Juni 2026 sekitar 30,71 juta ton.
  // 2 Angka itu naik 10,5 persen dari 27,78 juta ton pada periode yang sama tahun lalu.
  // 3 Semen Indonesia menyebut penjualan ritel menyumbang 70 persen dari pendapatannya pada semester pertama 2026.
  // 4 Meski begitu, ketua asosiasi mengingatkan bahwa pertumbuhan ini belum menunjukkan pemulihan permintaan yang kuat secara struktural.
  semen(A) {
    TPL.judul(A, 'Kebutuhan terus mengalir');
    T('bukan barang musiman', 1000, 320, 54, A(0, .1), .5, { c: GRAY });
    D.batang(200, 780, [27.78, 30.71], A(1, .1), .7, { bw: 170, gap: 90, hmax: 360, c: BLUE });
    T('Jan-Jun 2025', 285, 840, 40, A(1, .5), .2, { c: GRAY });
    T('Jan-Jun 2026', 545, 840, 40, A(1, .6), .2, { c: BLUE });
    T('30,71 juta ton', 545, 395, 46, A(1, .75), .2, { c: BLUE });
    T('27,78', 285, 430, 46, A(2, .05), .2, { c: GRAY });
    T('+10,5%', 960, 560, 100, A(2, .4), .3, { c: GREEN });
    TPL.statistik(A, { x: 1500, y: 450, angka: '70%', label: 'pendapatan dari ritel', at: A(3, .15), warna: RED, r: 125, ukuranLabel: 46 });
    T('(Semen Indonesia, sem. I 2026)', 1500, 710, 38, A(3, .7), .2, { c: GRAY });
    T('belum pulih kuat secara struktural (asosiasi)', 960, 905, 48, A(4, .1), .8, { c: RED });
  },

  // 0 Berikutnya margin, dan di sini ceritanya terbalik dari bayangan banyak orang.
  // 1 Sebuah artikel Accounting Plus tahun 2026 menulis bahwa margin toko bangunan hanya sekitar 5 sampai 10 persen untuk material pokok seperti semen dan besi.
  // 2 Misalnya margin rata-rata tujuh persen dari omzet dua belas juta rupiah, maka keuntungan kotor harian sekitar delapan ratus empat puluh ribu rupiah.
  // 3 Barang kecil seperti baut, lem, dan kuas biasanya bisa dijual dengan margin lebih tebal, misalnya dua puluh persen.
  margin(A) {
    TPL.judul(A, 'Margin tipis, volume besar', { c: RED });
    T('margin', 480, 350, 62, A(0, .15), .4, { c: GRAY });
    T('5-10%', 480, 500, 150, A(1, .3), .4, { c: RED });
    P(rect(200, 560, 560, 60, 2), A(1, .65), .3, { c: GRAY });
    P(rect(200, 560, 56, 60, 1), A(1, .8), .25, { c: RED, fill: RED, fillOp: .45 });
    T('material pokok: semen, besi', 480, 700, 48, A(1, .9), .1, { c: GRAY });
    T('Rp12 juta x 7%', 1330, 350, 62, A(2, .1), .4);
    P(line(1330 - 200, 400, 1330 + 200, 400, 1), A(2, .45), .2, { w: 5 });
    T('Rp840 ribu', 1330, 500, 88, A(2, .55), .3, { c: GREEN });
    T('untung kotor / hari', 1330, 570, 46, A(2, .8), .15, { c: GRAY });
    T('baut, lem, kuas', 1330, 720, 52, A(3, .1), .35, { c: BLUE });
    T('misalnya 20%', 1330, 810, 64, A(3, .45), .3, { c: GREEN });
    D.centang(1700, 795, 26, A(3, .85), .1);
  },

  // 0 Margin tipis hanya bisa hidup kalau stok berputar teratur.
  // 1 Ukurannya disebut perputaran persediaan, yaitu harga pokok penjualan dibagi nilai persediaan rata-rata.
  // 2 Situs Kledo menulis bahwa untuk sebagian besar bisnis ritel, rasio dua sampai empat dianggap ideal, dan rasio satu atau kurang menandakan stok berlebih.
  // 3 Misalnya harga pokok setahun tiga ratus juta rupiah, sedangkan rata-rata stok di rak seratus juta rupiah.
  // 4 Perputarannya tiga kali setahun, atau stok rata-rata habis dan diganti setiap sekitar seratus dua puluh hari.
  putar(A) {
    TPL.judul(A, 'Stok harus berputar');
    T('margin tipis butuh stok berputar', 960, 290, 52, A(0, .1), .6, { c: GRAY });
    T('HPP', 400, 400, 80, A(1, .1), .3, { c: RED });
    P(line(200, 440, 600, 440, 1), A(1, .4), .2, { w: 6 });
    T('stok rata-rata', 400, 510, 58, A(1, .55), .3, { c: BLUE });
    T('=', 710, 460, 90, A(1, .8), .1, { c: GRAY });
    T('putaran', 930, 460, 70, A(1, .85), .1, { c: GREEN });
    T('ideal: 2 sampai 4', 1500, 400, 60, A(2, .15), .4, { c: GREEN });
    T('1 atau kurang: stok berlebih', 1500, 490, 50, A(2, .55), .5, { c: RED });
    T('HPP Rp300 juta', 400, 680, 56, A(3, .1), .35, { c: RED });
    T('stok Rp100 juta', 400, 760, 56, A(3, .5), .35, { c: BLUE });
    T('3 kali setahun', 1200, 700, 84, A(4, .1), .4, { c: GREEN });
    P(G.jam(1650, 700, 70), A(4, .55), .3, { c: BLUE });
    T('sekitar 120 hari', 1300, 800, 54, A(4, .65), .3, { c: GRAY });
  },

  // 0 Stok toko bangunan punya satu keuntungan: sebagian besar tidak basi.
  // 1 Paku, pipa, keramik, dan besi bisa menunggu pembeli berbulan-bulan tanpa busuk seperti sayur.
  // 2 Tetapi barang tertentu tetap punya batas, misalnya semen yang menggumpal kalau lembap, dan cat yang mengering.
  // 3 Misalnya satu zak semen seharga tujuh puluh ribu rupiah untung lima ribu, maka satu zak rusak menghapus untung empat belas zak.
  tahan(A) {
    TPL.judul(A, 'Barang yang tidak basi', { c: GREEN });
    T('tidak basi', 960, 300, 56, A(0, .15), .4, { c: GREEN });
    P(rect(180, 400, 360, 70, 2), A(1, .05), .3, { c: BLUE, fill: BLUE, fillOp: .08 });
    T('pipa', 360, 450, 40, A(1, .2), .15, { c: BLUE });
    P(G.tabel(600, 380, 200, 160, 2, 2), A(1, .3), .3);
    T('keramik', 700, 585, 40, A(1, .45), .15, { c: GRAY });
    P(rect(880, 400, 260, 40, 1) + rect(880, 460, 260, 40, 1), A(1, .55), .3, { c: GRAY });
    T('besi', 1010, 550, 40, A(1, .7), .15, { c: GRAY });
    D.centang(1400, 480, 40, A(1, .85), .15);
    P(rect(220, 700, 160, 200, 3), A(2, .1), .35, { c: GRAY, fill: GRAY, fillOp: .15 });
    T('semen', 300, 810, 42, A(2, .3), .15, { c: GRAY });
    T('lembap = menggumpal', 640, 790, 48, A(2, .5), .4, { anchor: 'start', c: RED });
    T('cat mengering', 640, 860, 48, A(2, .8), .2, { anchor: 'start', c: RED });
    T('zak Rp70 ribu, untung Rp5 ribu', 1450, 700, 46, A(3, .1), .5, { c: BLUE });
    D.silang(1100, 810, 34, A(3, .45), .15);
    T('1 zak rusak = 14 zak hilang', 1450, 830, 56, A(3, .55), .5, { c: RED });
  },

  // 0 Hal lain yang menopang toko sepi adalah pelanggan yang kembali.
  // 1 Satu tukang atau kontraktor langganan bisa menangani beberapa proyek dalam sebulan, dan kebutuhannya sering dibeli dari toko yang sama.
  // 2 Misalnya lima tukang langganan, masing-masing belanja sekitar empat juta rupiah per bulan.
  // 3 Mereka kembali karena sudah kenal harga, tahu barang selalu ada, dan toko mau mengantar.
  // 4 Tetapi pelanggan seperti ini hampir selalu meminta satu hal: boleh dibayar nanti.
  langganan(A) {
    TPL.judul(A, 'Pelanggan yang kembali');
    TPL.tokohBalon(A, { x: 300, y: 905, s: .68, pose: 'berdiri', at: A(0, .1), baju: GOLD,
      balon: { teks: 'boleh dibayar nanti?', x: 330, y: 500, ukuran: 46, at: A(4, .1), warna: RED } });
    T('langganan tukang dan kontraktor', 1150, 320, 52, A(0, .35), .5, { c: GRAY });
    D.kalender(700, 380, 520, 230, A(1, .15), .5, { kol: 7, bar: 3, judul: 'PROYEK TIAP BULAN', c: BLUE });
    P(G.kerumunan(1350, 480, 5, 105, .62), A(2, .1), .4, { c: BLUE });
    T('5 tukang x Rp4 juta', 1570, 640, 52, A(2, .5), .3, { c: GREEN });
    TPL.daftar(A, { x: 700, y: 760, gap: 70, ukuran: 46, maks: 800, kotak: 40,
      items: [{ teks: 'kenal harga', at: A(3, .1) }, { teks: 'barang selalu ada', at: A(3, .4) }, { teks: 'toko mau mengantar', at: A(3, .7) }] });
  },

  // 0 Accounting Plus menulis bahwa jika piutang tidak tercatat, arus kas bisa tercekik meskipun buku penjualan menunjukkan angka besar.
  // 1 Misalnya toko tadi buka dua puluh enam hari sebulan dengan omzet dua belas juta rupiah per hari.
  // 2 Omzet sebulan tiga ratus dua belas juta rupiah, dan empat puluh persennya dibayar tempo tiga puluh hari.
  // 3 Berarti sekitar seratus dua puluh lima juta rupiah tertahan di tangan pelanggan.
  // 4 Sebagai pembanding, keuntungan kotor sebulan pada margin tujuh persen hanya sekitar dua puluh dua juta rupiah.
  // 5 Satu pelanggan besar yang telat bayar bisa menghapus untung berbulan-bulan.
  piutang(A) {
    TPL.judul(A, 'Jebakan: bayar nanti', { c: RED });
    P(G.dokumen(150, 290, 200, 260, 6), A(0, .05), .5, { fill: GOLD, fillOp: .12 });
    T('piutang tidak tercatat', 450, 600, 46, A(0, .3), .4, { c: GRAY });
    T('arus kas tercekik', 450, 670, 56, A(0, .6), .4, { c: RED });
    T('26 hari x Rp12 juta', 1400, 330, 52, A(1, .15), .5);
    T('= Rp312 juta / bulan', 1400, 410, 58, A(2, .05), .4, { c: BLUE });
    T('40% tempo 30 hari', 1400, 490, 50, A(2, .5), .4, { c: GRAY });
    T('Rp125 juta', 1400, 620, 100, A(3, .1), .35, { c: RED });
    T('tertahan di pelanggan', 1400, 690, 46, A(3, .55), .3, { c: GRAY });
    T('untung kotor 7%:', 1400, 790, 48, A(4, .1), .3, { c: GRAY });
    T('sekitar Rp22 juta', 1400, 870, 66, A(4, .45), .3, { c: GREEN });
    T('1 pelanggan telat bayar', 450, 790, 54, A(5, .1), .4, { c: RED });
    T('untung berbulan-bulan hilang', 450, 860, 50, A(5, .5), .4, { c: RED });
  },

  // 0 Masalahnya, stok dan piutang itu biasanya dibiayai oleh uang pemilik sendiri.
  // 1 Survei Industri Mikro dan Kecil Badan Pusat Statistik 2025 mencatat 91,41 persen pelaku memakai modal yang sepenuhnya milik sendiri.
  // 2 Data itu untuk industri mikro dan kecil, bukan khusus toko bangunan, tetapi gambarannya relevan sebagai pengingat.
  // 3 Di antara usaha yang mengalami kesulitan, 69,85 persen menyebut permodalan sebagai kendala.
  modal(A) {
    TPL.judul(A, 'Modal sendiri');
    P(G.brankas(250, 440, 200), A(0, .1), .45);
    T('stok + piutang', 250, 640, 50, A(0, .45), .3, { c: BLUE });
    T('pakai uang pemilik', 250, 705, 46, A(0, .75), .3, { c: GRAY });
    TPL.statistik(A, { x: 800, y: 460, angka: '91,41%', label: 'modal sendiri', at: A(1, .2), warna: BLUE, r: 125, ukuranLabel: 50 });
    T('(BPS 2025)', 800, 715, 40, A(1, .75), .2, { c: GRAY });
    T('data industri mikro-kecil,', 960, 830, 46, A(2, .1), .5, { c: GRAY });
    T('bukan khusus toko bangunan', 960, 890, 46, A(2, .5), .4, { c: GRAY });
    TPL.statistik(A, { x: 1500, y: 460, angka: '69,85%', label: 'sebut modal kendala', at: A(3, .15), warna: RED, r: 125, ukuranLabel: 50 });
    T('(dari yang kesulitan)', 1500, 715, 40, A(3, .75), .2, { c: GRAY });
  },

  // 0 Cara memeriksanya sederhana, dan cukup tiga angka tiap minggu.
  // 1 Pertama, pisahkan catatan barang pokok dan barang kecil, lalu lihat margin masing-masing.
  // 2 Kedua, hitung perputaran stok per kelompok barang, dan tandai yang belum bergerak dua bulan.
  // 3 Ketiga, buat daftar umur piutang: siapa berutang, berapa, dan sudah berapa hari.
  // 4 Tulis juga saldo kas mingguan, karena uang tunai yang bisa dipakai kulakan hanya yang benar-benar ada.
  ukur(A) {
    TPL.judul(A, 'Tiga angka tiap minggu', { c: GREEN });
    T('cukup tiga angka', 960, 300, 56, A(0, .15), .5, { c: GRAY });
    TPL.daftar(A, { x: 250, y: 440, gap: 130, ukuran: 56, gaya: 'nomor', maks: 1500,
      items: [{ teks: 'margin: pokok vs barang kecil', at: A(1, .1) }, { teks: 'perputaran stok per kelompok', at: A(2, .1) }, { teks: 'umur piutang: siapa, berapa, berapa hari', at: A(3, .1) }] });
    P(G.kantongUang(1650, 450, .7), A(4, .1), .4, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('+ saldo kas mingguan', 960, 880, 60, A(4, .3), .5, { c: GREEN });
  },

  // 0 Setelah angkanya terlihat, atur aturan mainnya.
  // 1 Tetapkan batas tempo yang jelas, misalnya empat belas hari, dan tulis di nota.
  // 2 Minta uang muka untuk pesanan besar, supaya toko tidak menalangi seluruh barang.
  // 3 Tetapkan batas total utang per pelanggan, dan hentikan tempo baru sebelum yang lama lunas.
  // 4 Jangan menambah stok barang yang sudah dua bulan tidak bergerak.
  aturan(A) {
    TPL.judul(A, 'Aturan main tempo');
    T('atur aturan mainnya', 960, 300, 56, A(0, .15), .5, { c: GRAY });
    TPL.daftar(A, { x: 200, y: 440, gap: 120, ukuran: 54, maks: 1150,
      items: [{ teks: 'tempo 14 hari, tulis di nota', at: A(1, .1) }, { teks: 'uang muka pesanan besar', at: A(2, .1) }, { teks: 'batas utang per pelanggan', at: A(3, .1) }, { teks: 'stok diam 2 bulan: jangan tambah', at: A(4, .1) }] });
    P(G.dokumen(1500, 400, 220, 280, 6), A(1, .45), .5, { fill: GOLD, fillOp: .12 });
    T('NOTA', 1610, 520, 48, A(1, .75), .2, { c: GRAY });
    T('14 hari', 1610, 600, 52, A(1, .9), .1, { c: RED });
  },

  // 0 Jadi, kenapa toko bangunan sepi tapi tidak pernah tutup?
  // 1 Karena sepinya hanya di pintu, sedangkan nilai belanja per pembeli besar.
  // 2 Margin tipis dikali volume tetap menghasilkan, selama stok berputar dan pelanggan setia kembali.
  // 3 Toko bisa goyah bukan karena sepi, melainkan karena uangnya tertahan di piutang dan stok yang tidak bergerak.
  // 4 Karena itu pantau kas tiap minggu, catat umur piutang, dan hitung perputaran stok.
  // 5 Tabel kas mingguan siap salin ada di deskripsi.
  // 6 Kalau video ini berguna, langganan Buku Kas Juragan, lalu lanjut ke video tentang cara menghitung HPP.
  jawab(A) {
    TPL.judul(A, 'Jawabannya', { c: GREEN });
    T('kenapa sepi tapi tidak tutup?', 960, 290, 62, A(0, .1), .6, { c: RED });
    T('nilai belanja per pembeli besar', 140, 400, 50, A(1, .15), .5, { anchor: 'start', c: GREEN });
    T('margin tipis x volume tetap jalan', 140, 490, 50, A(2, .1), .6, { anchor: 'start', c: BLUE });
    T('uang tertahan di piutang dan stok', 140, 580, 50, A(3, .1), .6, { anchor: 'start', c: RED });
    D.silang(1050, 565, 28, A(3, .8), .15);
    TPL.daftar(A, { x: 1150, y: 420, gap: 90, ukuran: 44, maks: 700, kotak: 44,
      items: [{ teks: 'pantau kas mingguan', at: A(4, .1) }, { teks: 'catat umur piutang', at: A(4, .4) }, { teks: 'hitung perputaran stok', at: A(4, .7) }] });
    P(G.tabel(1130, 700, 260, 190, 4, 4), A(5, .1), .4, { fill: GOLD, fillOp: .1 });
    T('tabel kas mingguan', 1440, 770, 42, A(5, .4), .25, { anchor: 'start', c: GRAY });
    T('di deskripsi', 1440, 830, 42, A(5, .6), .2, { anchor: 'start', c: GRAY });
    P(rect(140, 700, 440, 110, 2), A(6, .3), .3, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Langganan', 360, 775, 60, A(6, .4), .3, { c: RED });
    T('lanjut: cara menghitung HPP', 360, 880, 44, A(6, .75), .3, { c: GRAY });
  },
};
