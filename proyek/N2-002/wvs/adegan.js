// N2-002 "Warung Makan Ramai Tapi Bangkrut: 4 Biang Keroknya" 13 adegan, 16:9. Pustaka pustaka/wvs (G/D/TPL).
// Beda dari N2-001: tokoh + balon, kartu, ikon besar, alur, gauge, tangga, siklus, brankas; tanpa daftar centang berderet.
window.SCENES = {
  // 0 Jam makan siang, kursi penuh, piring tidak berhenti keluar dari dapur.
  // 1 Tapi akhir bulan, pemiliknya malah menjual motor untuk menutup belanja bahan.
  // 2 Kenapa warung makan yang ramai bisa bangkrut?
  // 3 Ada empat biang kerok, dan semuanya bisa kamu hitung sendiri hari ini.
  // 4 Kita pakai contoh sepiring nasi ayam, lengkap dengan angkanya, lalu di akhir kamu bisa memeriksa warungmu sendiri.
  pembuka(A) {
    TPL.judul(A, 'Ramai tapi bangkrut?', { c: RED });
    [0, 1, 2].forEach(i => {
      const x = 130 + i * 290;
      P(rect(x, 400, 200, 40, 2), A(0, .05 + i * .12), .3, { fill: GOLD, fillOp: .2 });
      P(line(x + 25, 440, x + 25, 520, 1) + line(x + 175, 440, x + 175, 520, 1), A(0, .1 + i * .12), .2);
      P(G.piring(x + 100, 385, 20), A(0, .2 + i * .12), .2, { c: BLUE });
    });
    P(G.kerumunan(220, 340, 3, 290, .55), A(0, .5), .5, { c: BLUE });
    T('meja penuh', 520, 600, 56, A(0, .75), .3, { c: GRAY });
    P(G.mobil(1380, 520, 380), A(1, .08), .7, { c: BLUE, fill: BLUE, fillOp: .08 });
    T('DIJUAL', 1380, 700, 66, A(1, .6), .3, { c: RED });
    TPL.tokohBalon(A, { x: 250, y: 905, s: .62, pose: 'berpikir', at: A(2, .02), baju: GOLD,
      balon: { teks: 'Kenapa bisa bangkrut?', x: 760, y: 800, ukuran: 54, at: A(2, .25), warna: RED } });
    [1, 2, 3, 4].forEach((n, i) => D.lencana(n, 1130 + i * 150, 790, 52, A(3, .1 + i * .15), .3, { c: RED }));
    T('empat biang kerok', 1430, 900, 54, A(3, .65), .3, { c: RED });
    P(G.piring(1700, 440, 95), A(4, .1), .6, { c: GOLD, w: 6, fill: GOLD, fillOp: .12 });
    T('nasi ayam', 1700, 620, 54, A(4, .5), .3, { c: INK });
  },

  // 0 Biang kerok pertama adalah harga jual yang ditentukan dengan menebak, bukan dengan menghitung.
  // 1 Harga pokok penjualan, disingkat HPP, adalah modal barang yang benar-benar terpakai untuk menjual sesuatu.
  // 2 Rumusnya, menurut sebuah artikel edukasi wirausaha: persediaan awal ditambah pembelian bersih, lalu dikurangi persediaan akhir.
  // 3 Artikel itu mengingatkan, harga jual tidak boleh asal-asalan supaya bisnis terhindar dari kerugian.
  // 4 Di dapur warung, artinya semua bahan satu piring harus ikut dihitung, bukan hanya ayamnya.
  hpp(A) {
    TPL.judul(A, '1. Harga jual asal tebak');
    P(G.awanPikir(480, 480, 190, 110, 380, 640), A(0, .1), .5, { c: GRAY });
    T('Rp ?', 480, 515, 100, A(0, .5), .35, { c: RED });
    D.silang(920, 480, 46, A(0, .85), .2);
    T('HPP', 1330, 400, 120, A(1, .1), .4, { c: BLUE });
    T('modal barang yang terpakai', 1330, 490, 52, A(1, .45), .5, { c: GRAY });
    TPL.alur(A, { x: 130, y: 740, w: 360, h: 110, gap: 90, ukuran: 46, items: [
      { teks: 'stok awal', at: A(2, .05), warna: BLUE }, { teks: '+ pembelian', at: A(2, .3), warna: BLUE },
      { teks: '- stok akhir', at: A(2, .55), warna: RED }, { teks: '= HPP', at: A(2, .8), warna: GREEN }] });
    P(G.perisai(1330, 590, 70), A(3, .2), .4, { c: GREEN, fill: GREEN, fillOp: .12 });
    T('hindari rugi', 1330, 705, 46, A(3, .5), .3, { c: GREEN });
    P(G.piring(1730, 400, 70), A(4, .1), .4, { c: GOLD, w: 6 });
    T('semua bahan', 1730, 540, 44, A(4, .4), .3, { c: GRAY });
  },

  // 0 Mari pakai contoh. Misalnya sepiring nasi ayam dijual 15 ribu rupiah.
  // 1 Ayamnya 6 ribu, beras 1.500, sayur dan sambal 1.500, jadi bahan makanan 9 ribu rupiah, ditambah minyak dan gas 1.500.
  // 2 Bahan makanan saja sudah 60 persen dari harga jual.
  // 3 Sebagai pembanding, perangkat lunak akuntansi Accurate menulis bahwa sebagian besar pengelola restoran menjaga biaya makanan antara 28 dan 35 persen dari pendapatan.
  // 4 Setelah minyak dan gas, modal satu piring 10.500 rupiah, sehingga sisanya cuma 4.500 rupiah untuk sewa, listrik, gaji, dan untung.
  piring(A) {
    TPL.judul(A, 'Hitung sepiring nasi ayam');
    P(G.piring(300, 560, 150), A(0, .1), .8, { c: GOLD, w: 7, fill: GOLD, fillOp: .12 });
    T('Rp 15.000', 300, 790, 84, A(0, .55), .4, { c: GREEN });
    const baris = [['ayam', '6.000'], ['beras', '1.500'], ['sayur + sambal', '1.500'], ['minyak + gas', '1.500']];
    baris.forEach(([k, v], i) => {
      T(k, 700, 360 + i * 88, 56, A(1, .08 + i * .2), .3, { anchor: 'start', c: INK });
      T(v, 1180, 360 + i * 88, 56, A(1, .14 + i * .2), .3, { anchor: 'end', c: RED });
    });
    TPL.statistik(A, { x: 1580, y: 400, angka: '60%', label: 'bahan makanan', at: A(2, .1), warna: RED, r: 100 });
    const gx = 1580, gy = 770;
    P(G.gauge(gx, gy, 140), A(3, .1), .6, { c: GRAY, w: 6 });
    P(rect(gx - 160 + 160 * .38 * 1.0, gy - 40, 100, 40, 1), A(3, .5), .3, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('28 - 35%', gx, gy + 60, 52, A(3, .55), .3, { c: GREEN });
    T('pembanding restoran', gx, gy + 110, 42, A(3, .7), .3, { c: GRAY });
    P(arrow(gx + 120, gy - 20, gx + 20, gy - 110), A(3, .8), .15, { c: RED, w: 7 });
    T('modal 10.500', 700, 785, 62, A(4, .1), .4, { anchor: 'start', c: RED });
    T('sisa 4.500', 700, 880, 62, A(4, .45), .4, { anchor: 'start', c: GREEN });
  },

  // 0 Sekarang kalikan. Anggap warung ini menjual 80 piring sehari.
  // 1 Omzet sehari 1,2 juta rupiah, dan sisa setelah modal piring 360 ribu rupiah.
  // 2 Dalam 30 hari, sisa itu 10,8 juta rupiah, padahal omzet sebulannya 36 juta rupiah.
  // 3 Dari 10,8 juta itu masih harus dibayar sewa, listrik, dan gaji pegawai. Misalnya 9 juta rupiah, sehingga tinggal 1,8 juta rupiah, dan angka itu belum memuat biaya kecil maupun gaji pemilik.
  // 4 Warung tampak ramai, tetapi hitungannya sudah mepet sejak harga ditetapkan.
  kalikan(A) {
    TPL.judul(A, 'Kalikan satu bulan');
    P(G.kerumunan(250, 420, 4, 110, .6), A(0, .1), .5, { c: BLUE });
    T('80 piring / hari', 500, 600, 64, A(0, .5), .4, { c: BLUE });
    TPL.kartu(A, { x: 150, y: 680, w: 340, h: 180, at: A(1, .05), warna: BLUE, isi: BLUE, label: '',
      gambar: (cx, cy, at) => { T('omzet 1,2 juta', cx, cy - 5, 54, at, .3, { c: BLUE }); T('per hari', cx, cy + 55, 44, at + .2, .2, { c: GRAY }); } });
    TPL.kartu(A, { x: 600, y: 680, w: 340, h: 180, at: A(1, .45), warna: GREEN, isi: GREEN, label: '',
      gambar: (cx, cy, at) => { T('sisa 360 ribu', cx, cy - 5, 54, at, .3, { c: GREEN }); T('per hari', cx, cy + 55, 44, at + .2, .2, { c: GRAY }); } });
    D.kalender(1000, 290, 300, 210, A(2, .08), .5, { kol: 7, bar: 4 });
    T('30 hari', 1150, 570, 54, A(2, .35), .3, { c: GRAY });
    D.batang(1450, 600, [36, 10.8], A(2, .45), .6, { bw: 100, gap: 40, hmax: 280, c: BLUE });
    T('36 juta', 1500, 305, 46, A(2, .75), .2, { c: BLUE });
    T('10,8', 1640, 500, 46, A(2, .85), .2, { c: GREEN });
    T('- 9 juta', 1130, 740, 58, A(3, .15), .3, { anchor: 'start', c: RED });
    T('sewa, listrik, gaji', 1130, 800, 42, A(3, .2), .3, { anchor: 'start', c: GRAY });
    T('= 1,8 juta', 1130, 885, 66, A(3, .55), .4, { anchor: 'start', c: GREEN });
    D.silang(1650, 800, 40, A(4, .2), .3);
  },

  // 0 Biang kerok kedua adalah porsi yang tidak seragam.
  // 1 Satu piring dapat ayam besar, piring lain dapat nasi segunung, tergantung siapa yang menyendok.
  // 2 Misalnya setiap piring kelebihan nasi dan sayur senilai seribu rupiah.
  // 3 Dikali 80 piring dan 30 hari, bocornya 2,4 juta rupiah sebulan.
  // 4 Solusinya sederhana: tentukan satu porsi standar sekali saja, lalu pakai gayung atau cetakan yang sama setiap hari.
  porsi(A) {
    TPL.judul(A, '2. Porsi tidak seragam');
    [0, 1, 2].forEach(i => {
      const r = [70, 110, 85][i], cx = 330 + i * 380;
      P(G.piring(cx, 480, r), A(1, .05 + i * .25), .5, { c: GOLD, w: 6, fill: GOLD, fillOp: .1 + i * .06 });
    });
    T('kecil', 330, 640, 46, A(1, .45), .2, { c: GRAY });
    T('segunung', 710, 640, 46, A(1, .65), .2, { c: RED });
    T('sedang', 1090, 640, 46, A(1, .85), .2, { c: GRAY });
    P(G.koin(1500, 460, 70), A(2, .1), .4, { c: GOLD, fill: GOLD, fillOp: .3 });
    T('+ Rp 1.000', 1500, 610, 62, A(2, .45), .4, { c: RED });
    T('x 80 x 30', 330, 800, 60, A(3, .1), .35, { anchor: 'start', c: GRAY });
    T('= 2,4 juta bocor', 800, 800, 70, A(3, .45), .5, { anchor: 'start', c: RED });
    P(G.perisai(1730, 440, 70), A(4, .1), .4, { c: GREEN, fill: GREEN, fillOp: .12 });
    D.centang(1730, 440, 28, A(4, .45), .2);
    T('1 porsi standar', 1500, 880, 56, A(4, .35), .5, { c: GREEN });
  },

  // 0 Masih di biang kerok kedua, yaitu masakan yang terbuang.
  // 1 Kajian Bappenas yang dikutip Katadata mencatat sampah makanan sisa konsumsi di Indonesia antara 5 dan 19 juta ton per tahun selama 2000 sampai 2019.
  // 2 Dapur warung punya versi kecilnya: nasi sisa, sayur layu, dan ayam yang tidak laku sampai malam.
  // 3 Misalnya tiap hari terbuang bahan senilai 50 ribu rupiah, itu 1,5 juta rupiah sebulan.
  // 4 Masak bertahap, catat sisa tiap malam, dan jual menu sisa lebih awal dengan harga promo.
  sisa(A) {
    TPL.judul(A, 'Masakan yang terbuang');
    P(G.corong(300, 500, 260), A(0, .1), .6, { c: GRAY });
    P(G.piring(300, 380, 60), A(0, .5), .3, { c: GOLD });
    P(arrow(300, 640, 300, 760), A(0, .75), .15, { c: RED, w: 8 });
    T('sampah', 300, 830, 52, A(0, .85), .1, { c: RED });
    TPL.statistik(A, { x: 900, y: 460, angka: '5-19', label: 'juta ton / tahun', at: A(1, .15), warna: RED, r: 125 });
    T('sisa konsumsi 2000-2019', 900, 735, 46, A(1, .6), .3, { c: GRAY });
    T('sumber: Bappenas via Katadata', 900, 800, 40, A(1, .75), .2, { c: GRAY });
    TPL.kartu(A, { x: 1330, y: 300, w: 220, h: 200, at: A(2, .1), warna: BLUE, label: 'nasi sisa', ukuran: 42,
      gambar: (cx, cy, at) => P(G.piring(cx, cy, 55), at, .3, { c: BLUE }) });
    TPL.kartu(A, { x: 1600, y: 300, w: 220, h: 200, at: A(2, .45), warna: GREEN, label: 'sayur layu', ukuran: 42,
      gambar: (cx, cy, at) => P(G.hati(cx, cy, 45), at, .3, { c: GREEN }) });
    T('50 ribu x 30 = 1,5 juta', 1460, 740, 54, A(3, .2), .5, { c: RED });
    P(G.jam(1460, 860, 38), A(4, .1), .3, { c: BLUE });
    T('masak bertahap', 1590, 880, 46, A(4, .35), .3, { anchor: 'start', c: GREEN });
  },

  // 0 Biang kerok ketiga: harga bahan naik turun, tetapi harga menu tidak pernah disesuaikan.
  // 1 Panel Harga Badan Pangan Nasional, yang dilansir Antara, mencatat cabai rawit merah di tingkat konsumen Rp67.171 per kilogram pada 15 Juli 2025.
  // 2 Pada 22 Agustus 2025, harganya turun menjadi Rp43.148 per kilogram, selisih lebih dari 24 ribu rupiah dalam kurang dari enam minggu.
  // 3 Misalnya warung memakai 2 kilogram cabai sehari, selisih itu mengubah modal harian sampai 48 ribu rupiah.
  // 4 Jadi cek harga bahan utama tiap minggu, dan hitung ulang HPP bila selisihnya sudah terasa.
  cabai(A) {
    TPL.judul(A, '3. Harga bahan naik turun');
    TPL.duaKolom(A, { x0: 110, x1: 1300, y0: 270, y1: 760, vs: false,
      kiri: { judul: '15 Juli 2025', warna: RED, at: A(1, .05), ukuran: 56, catatan: 'Rp67.171 / kg', warnaCatatan: RED, atCatatan: A(1, .5),
        gambar: (cx, cy, at) => P(G.hati(cx, cy, 70), at, .4, { c: RED, fill: RED, fillOp: .25 }) },
      kanan: { judul: '22 Agustus 2025', warna: GREEN, at: A(2, .05), ukuran: 56, catatan: 'Rp43.148 / kg', warnaCatatan: GREEN, atCatatan: A(2, .4),
        gambar: (cx, cy, at) => P(G.hati(cx, cy, 70), at, .4, { c: GREEN, fill: GREEN, fillOp: .15 }) } });
    T('cabai rawit merah', 705, 840, 50, A(1, .75), .4, { c: GRAY });
    D.grafik(1380, 640, 440, 200, 'turun', A(2, .45), .6, { c: RED });
    T('- 24 ribu', 1600, 330, 76, A(2, .7), .3, { c: RED });
    T('2 kg x 24 ribu', 1600, 480, 54, A(3, .15), .4, { c: GRAY });
    T('= 48 ribu / hari', 1600, 560, 60, A(3, .5), .4, { c: RED });
    D.centang(1480, 850, 30, A(4, .1), .2);
    T('cek tiap minggu', 1540, 865, 52, A(4, .3), .3, { anchor: 'start', c: GREEN });
  },

  // 0 Biang kerok keempat adalah biaya kecil yang tidak pernah masuk hitungan.
  // 1 Plastik pembungkus, es batu, sabun cuci piring, parkir pasar, dan air galon, semuanya terasa kecil.
  // 2 Misalnya totalnya 80 ribu rupiah sehari, atau 2,4 juta rupiah sebulan.
  // 3 Catat tiap pengeluaran sekecil apa pun di satu halaman buku, lalu jumlahkan tiap minggu.
  kecil(A) {
    TPL.judul(A, '4. Biaya kecil yang lolos');
    P(G.brankas(380, 560, 330), A(0, .1), .8, { c: GOLD, fill: GOLD, fillOp: .1 });
    T('tak terlihat', 380, 800, 52, A(0, .75), .3, { c: GRAY });
    const it = ['plastik', 'es batu', 'sabun', 'parkir', 'galon'];
    it.forEach((t, i) => {
      const x = 880 + (i % 3) * 330, y = 330 + Math.floor(i / 3) * 190;
      P(rect(x, y, 280, 120, 2), A(1, .04 + i * .17), .25, { c: BLUE, fill: BLUE, fillOp: .07 });
      T(t, x + 140, y + 78, 54, A(1, .1 + i * .17), .25, { c: BLUE });
    });
    T('80 ribu / hari', 1100, 800, 66, A(2, .1), .4, { c: RED });
    T('= 2,4 juta / bulan', 1100, 890, 56, A(2, .5), .4, { c: RED });
    P(G.dokumen(1560, 640, 200, 250, 5), A(3, .1), .5, { fill: GOLD, fillOp: .12 });
    D.centang(1660, 800, 30, A(3, .5), .2);
    T('catat semua', 1660, 600, 46, A(3, .65), .3, { c: GREEN });
  },

  // 0 Sekarang kita perbaiki harga piring tadi.
  // 1 Modal 10.500 rupiah, ditambah biaya kecil 80 ribu rupiah sehari dibagi 80 piring, yaitu seribu rupiah per piring.
  // 2 Lalu sewa, listrik, dan gaji 9 juta rupiah sebulan dibagi 2.400 piring, sekitar 3.750 rupiah per piring.
  // 3 Total modal sebenarnya 15.250 rupiah per piring, lebih mahal dari harga jualnya.
  // 4 Dengan target untung 20 persen dari harga jual, harga idealnya sekitar 19 ribu rupiah.
  // 5 Naik 4 ribu rupiah terasa berat, jadi pilih langkah bertahap: kecilkan porsi nasi, cari bagian ayam yang lebih murah, atau naikkan harga sedikit demi sedikit.
  harga(A) {
    TPL.judul(A, 'Perbaiki harga sepiring');
    P(G.tangga(130, 770, 4, 190, 100), A(0, .3), .8, { c: GRAY });
    T('10.500', 225, 650, 50, A(1, .1), .3, { c: INK });
    T('+ 1.000', 415, 550, 50, A(1, .5), .3, { c: RED });
    T('+ 3.750', 605, 450, 50, A(2, .5), .3, { c: RED });
    T('15.250', 795, 350, 56, A(3, .1), .4, { c: RED });
    TPL.statistik(A, { x: 1300, y: 420, angka: '15.250', label: 'modal sebenarnya', at: A(3, .2), warna: RED, r: 135 });
    P(G.piring(1150, 740, 42), A(3, .55), .3, { c: GOLD });
    T('dijual 15.000 = rugi', 1260, 760, 50, A(3, .65), .3, { anchor: 'start', c: RED });
    D.target(1720, 440, 90, A(4, .1), .6, { dart: true });
    T('19 ribu', 1720, 640, 72, A(4, .5), .4, { c: GREEN });
    T('untung 20%', 1720, 710, 44, A(4, .65), .2, { c: GRAY });
    TPL.alur(A, { x: 130, y: 845, w: 400, h: 75, gap: 90, ukuran: 40, items: [
      { teks: 'porsi lebih kecil', at: A(5, .05), warna: BLUE }, { teks: 'ayam lebih murah', at: A(5, .35), warna: BLUE }, { teks: 'naik bertahap', at: A(5, .65), warna: GREEN }] });
  },

  // 0 Ada satu jebakan yang membuat biang kerok pertama makin parah: menu terlaris belum tentu paling menguntungkan.
  // 1 Misalnya nasi ayam laku 50 piring sehari dengan sisa 4.500 rupiah per piring, atau 225 ribu rupiah.
  // 2 Sementara nasi telur dadar, dijual 10 ribu rupiah dengan modal 4 ribu rupiah, menyisakan 6 ribu rupiah per piring.
  // 3 Kalau 30 pembeli yang tadinya memesan ayam beralih ke telur, sisa sehari naik dari 135 ribu menjadi 180 ribu rupiah.
  // 4 Taruh menu hemat yang untungnya lebih besar di urutan atas papan menu.
  // 5 Jadi lihat untung per piring, bukan hanya jumlah piring yang keluar.
  menu(A) {
    TPL.judul(A, 'Menu laris belum tentu untung');
    TPL.kartu(A, { x: 150, y: 290, w: 520, h: 330, at: A(1, .05), warna: BLUE, isi: BLUE, label: '',
      gambar: (cx, cy, at) => { T('nasi ayam', cx, cy - 90, 60, at, .3, { c: BLUE }); T('50 piring', cx, cy - 10, 56, at + .15, .3, { c: INK }); T('sisa 4.500', cx, cy + 70, 58, at + .3, .3, { c: GREEN }); } });
    T('= 225 ribu', 410, 700, 60, A(1, .6), .3, { c: GREEN });
    TPL.kartu(A, { x: 800, y: 290, w: 520, h: 330, at: A(2, .05), warna: GOLD, isi: GOLD, label: '',
      gambar: (cx, cy, at) => { T('telur dadar', cx, cy - 90, 60, at, .3, { c: INK }); T('Rp 10.000', cx, cy - 10, 56, at + .15, .3, { c: INK }); T('sisa 6.000', cx, cy + 70, 58, at + .3, .3, { c: GREEN }); } });
    P(arrow(1340, 700, 1040, 700), A(3, .05), .2, { c: RED, w: 8 });
    T('30 pembeli pindah', 1100, 790, 54, A(3, .1), .4, { c: GRAY });
    T('135 ribu', 800, 880, 60, A(3, .35), .3, { anchor: 'start', c: RED });
    P(arrow(1060, 855, 1200, 855), A(3, .6), .15, { c: GRAY, w: 7 });
    T('180 ribu', 1230, 880, 66, A(3, .7), .3, { anchor: 'start', c: GREEN });
    P(G.browser(1450, 300, 380, 400), A(4, .1), .5, { c: INK });
    T('MENU', 1640, 425, 50, A(4, .35), .2, { c: RED });
    T('hemat', 1640, 535, 52, A(4, .5), .3, { c: GREEN });
    D.lingkari(1640, 520, 110, 50, A(4, .7), .25, GREEN);
    D.kacaPembesar(1690, 790, 62, A(5, .2), .4);
    T('untung per piring', 1690, 910, 44, A(5, .5), .3, { c: GREEN });
  },

  // 0 Sebagian pemilik warung takut membuka catatan karena khawatir soal pajak.
  // 1 Direktorat Jenderal Pajak menjelaskan bahwa bagian peredaran bruto sampai 500 juta rupiah dalam satu tahun tidak dikenai PPh.
  // 2 Dengan tarif PPh final sebesar 0,5 persen untuk bagian di atasnya, menurut Peraturan Pemerintah Nomor 20 Tahun 2026.
  // 3 Dalam contoh kita, omzet setahun 432 juta rupiah, jadi masih di bawah batas itu.
  // 4 Ketentuan usahamu bisa berbeda, jadi tanyakan ke kantor pajak, tetapi catatan yang rapi justru memudahkan semuanya.
  pajak(A) {
    TPL.judul(A, 'Pajak bukan momok');
    TPL.tokohBalon(A, { x: 250, y: 905, s: .8, pose: 'berdiri', at: A(0, .05), baju: BLUE,
      balon: { teks: 'Takut pajak...', x: 700, y: 410, ukuran: 56, at: A(0, .45), warna: GRAY } });
    P(G.kantor(900, 760, 200, 280), A(1, .08), .6, { c: BLUE });
    T('DJP', 1090, 640, 56, A(1, .5), .2, { anchor: 'start', c: BLUE });
    T('0 - 500 juta', 1560, 400, 80, A(1, .4), .4, { c: GREEN });
    T('tidak dikenai PPh', 1560, 480, 52, A(1, .75), .3, { c: GREEN });
    T('di atasnya 0,5%', 1560, 640, 66, A(2, .15), .4, { c: RED });
    T('PP 20/2026', 1560, 710, 46, A(2, .6), .3, { c: GRAY });
    P(rect(560, 810, 1300, 44, 2), A(3, .05), .3);
    P(rect(560, 810, 1300 * .432, 44, 1), A(3, .2), .4, { c: GREEN, fill: GREEN, fillOp: .35 });
    T('omzet 432 juta', 560 + 1300 * .216, 900, 50, A(3, .55), .3, { c: GREEN });
    P(line(1210, 790, 1210, 875, 1), A(3, .7), .2, { c: RED, w: 6 });
    T('batas 500 juta', 1210, 910, 44, A(3, .8), .2, { c: RED });
    T('tanya kantor pajak', 1560, 780, 46, A(4, .4), .3, { c: GRAY });
  },

  // 0 Sekarang, cara memeriksa warungmu dalam satu malam.
  // 1 Pertama, hitung modal tiap menu, termasuk minyak, gas, dan plastik, lalu bagi dengan harga jualnya.
  // 2 Kedua, tentukan satu porsi standar dan catat sisa masakan tiap malam.
  // 3 Ketiga, bagi semua biaya bulanan dengan jumlah piring terjual, lalu tambahkan ke modal per piring.
  // 4 Keempat, bandingkan dengan harga jual, dan ulangi tiap kali harga cabai atau ayam berubah.
  cek(A) {
    TPL.judul(A, 'Periksa warungmu malam ini');
    P(G.siklus(300, 600, 140), A(0, .2), .6, { c: GREEN, w: 7 });
    T('1 malam', 300, 800, 52, A(0, .6), .3, { c: GRAY });
    [
      ['modal tiap menu / harga jual', A(1, .1)],
      ['1 porsi standar + catat sisa', A(2, .1)],
      ['biaya bulanan / jumlah piring', A(3, .1)],
      ['bandingkan, ulangi tiap harga berubah', A(4, .1)],
    ].forEach(([teks, at], i) => {
      const y = 330 + i * 150;
      P(rect(560, y, 1250, 105, 2), at, .3, { c: i === 3 ? GREEN : BLUE, fill: i === 3 ? GREEN : BLUE, fillOp: .07 });
      D.lencana(i + 1, 630, y + 52, 36, at + .1, .3);
      T(teks, 700, y + 70, G.pasUkuran(teks, 52, 1050), at + .3, .5, { anchor: 'start', c: INK });
    });
  },

  // 0 Jadi, kenapa warung makan yang ramai bisa tetap bangkrut?
  // 1 Karena harga ditebak, porsi dan sisa masakan bocor, harga bahan berubah, dan biaya kecil tidak pernah dihitung.
  // 2 Hitung modal tiap piring, standarkan porsi, cek harga bahan tiap minggu, dan catat semua biaya.
  // 3 Dengan begitu, warung yang ramai benar-benar menghasilkan, bukan sekadar sibuk menjual rugi.
  // 4 Buku kas warung satu halaman dan kalkulator HPP gratis ada di deskripsi, tinggal salin.
  // 5 Kalau video ini berguna, langganan Buku Kas Juragan, lalu lanjut ke video soal cara menghitung HPP tiap menu.
  penutup(A) {
    TPL.judul(A, 'Ringkasan', { c: GREEN });
    D.toko(260, 520, 260, A(0, .05), .7, { nama: 'RAMAI' });
    T('?', 260, 640, 110, A(0, .6), .2, { c: RED });
    ['harga ditebak', 'porsi bocor', 'bahan berubah', 'biaya kecil lolos'].forEach((t, i) => {
      const x = 560 + (i % 2) * 380, y = 300 + Math.floor(i / 2) * 140;
      P(rect(x, y, 340, 100, 2), A(1, .1 + i * .2), .25, { c: RED, fill: RED, fillOp: .08 });
      T(t, x + 170, y + 66, G.pasUkuran(t, 50, 310), A(1, .15 + i * .2), .25, { c: RED });
    });
    P(arrow(1360, 400, 1450, 400), A(2, .05), .15, { c: GRAY, w: 7 });
    P(G.lampu(1640, 400, 80), A(2, .15), .4, { c: GOLD, w: 7 });
    T('hitung, standarkan, cek, catat', 1640, 580, 46, A(2, .45), .5, { c: GREEN });
    D.grafik(560, 770, 520, 170, 'naik', A(3, .1), .7, { c: GREEN });
    T('benar-benar menghasilkan', 820, 880, 50, A(3, .5), .4, { c: GREEN });
    P(G.dokumen(1230, 640, 150, 190, 5), A(4, .1), .4, { fill: GOLD, fillOp: .12 });
    T('buku kas + kalkulator HPP', 1330, 895, 42, A(4, .4), .3, { c: GRAY });
    P(rect(1520, 690, 340, 110, 2), A(5, .4), .3, { c: RED, fill: RED, fillOp: .25, w: 8 });
    T('Langganan', 1690, 768, 64, A(5, .5), .3, { c: RED });
  },
};
