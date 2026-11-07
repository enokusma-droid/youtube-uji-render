// N1-003 "You Are Not Bad With Money. You Were Taught Wrong." (Money in the Margin). 12 adegan, 16:9, semua teks layar bahasa Inggris.
// Memakai pustaka/wvs (G, D, TPL). scenes.js dibuat oleh pustaka/wvs/rakit.js. A(baris, fraksi) = waktu dalam baris narasi.

// Baris batang persentase: track 100% selebar 1100 px mulai x 400.
const _barra = (label, y, frac, c, at, nilai) => {
  T(label, 130, y + 55, 46, at, .25, { anchor: 'start', c: GRAY });
  P(rect(400, y, 1100, 70, 2), at, .3);
  P(rect(400, y, 1100 * frac, 70, 2), at + .15, .4, { c, fill: c, fillOp: .3 });
  T(nilai, 1530, y + 55, 56, at + .45, .3, { anchor: 'start', c });
};

window.SCENES = {
  // 0 Are you actually bad with money, or did nobody ever teach you how it works?
  // 1 Most of us never sat through a class on interest, inflation, or emergency funds.
  // 2 Then we blamed ourselves for every mistake that followed.
  // 3 In six minutes, I will show you what the data says, and three small habits to start with.
  hook(A) {
    TPL.judul(A, 'Bad with money, or never taught?');
    TPL.tokohBalon(A, { x: 420, y: 880, s: 1.15, pose: 'berpikir', at: A(0, .05),
      balon: { teks: 'Am I bad with money?', x: 640, y: 330, ukuran: 50, ekor: 'kiri', at: A(0, .45), warna: RED } });
    TPL.daftar(A, { x: 1100, y: 420, gap: 90, ukuran: 56, gaya: 'silang', maks: 760, kotak: 52,
      items: [{ teks: 'interest', at: A(1, .2) }, { teks: 'inflation', at: A(1, .45) }, { teks: 'emergency funds', at: A(1, .7) }] });
    T('no class on:', 1300, 340, 50, A(1, .0), .4, { c: GRAY });
    T('"so it must be my fault"', 1380, 760, 54, A(2, .15), .8, { c: RED });
    const b = T('the data + three small habits', 960, 895, 56, A(3, .3), .9, { c: GREEN });
    D.garisBawah(b, A(3, .3) + .9, .2, GREEN);
  },

  // 0 Let's begin with a test.
  // 1 Every few years, the FINRA Foundation measures how well American adults understand basic money ideas.
  // 2 In its 2024 survey, respondents answered seven financial knowledge questions.
  // 3 Only 27 percent got at least five of the seven right.
  // 4 That is nearly the same as the 28 percent in 2021.
  // 5 So roughly three in four adults missed three or more of the seven questions.
  quiz(A) {
    TPL.judul(A, 'A seven-question test');
    T('a quick test', 960, 285, 54, A(0, .2), .5, { c: GRAY });
    T('FINRA Foundation survey, 2024', 960, 355, 48, A(1, .2), .8, { c: INK });
    for (let i = 0; i < 7; i++) {
      const x = 400 + i * 190;
      P(rect(x, 420, 130, 120, 2), A(2, .05 + i * .08), .3);
      T('?', x + 65, 510, 80, A(2, .15 + i * .08), .2, { c: GRAY });
    }
    for (let i = 0; i < 5; i++) P(rect(400 + i * 190, 420, 130, 120, 2), A(3, .05 + i * .06), .25, { c: GREEN, fill: GREEN, fillOp: .3 });
    T('27% got 5 or more right', 960, 650, 66, A(3, .45), .7, { c: GREEN });
    T('2021: 28%', 960, 740, 52, A(4, .2), .4, { c: GRAY });
    const b = T('about 3 in 4 missed 3 or more', 960, 880, 62, A(5, .2), .9, { c: RED });
    D.garisBawah(b, A(5, .2) + .9, .2, RED);
  },

  // 0 There is one bright spot in the results.
  // 1 One question asked about inflation, and 58 percent answered it correctly, up from 53 percent in 2021.
  // 2 Among adults aged 18 to 34, that score rose from 34 percent to 44 percent.
  // 3 That hints that people can learn these ideas when they get the chance.
  // 4 Knowledge is not fixed, and that is good news.
  inflasi(A) {
    TPL.judul(A, '1. One bright spot');
    T('inflation question answered correctly', 960, 300, 46, A(1, .0), .6, { c: GRAY });
    _barra('2021', 325, .53, GRAY, A(1, .3), '53%');
    _barra('2024', 410, .58, GREEN, A(1, .6), '58%');
    T('adults aged 18 to 34', 960, 555, 46, A(2, .0), .6, { c: GRAY });
    _barra('2021', 580, .34, GRAY, A(2, .3), '34%');
    _barra('2024', 665, .44, GREEN, A(2, .6), '44%');
    T('people can learn when they get the chance', 960, 805, 52, A(3, .15), .9, { c: INK });
    const b = T('knowledge is not fixed', 960, 885, 62, A(4, .15), .8, { c: GREEN });
    D.garisBawah(b, A(4, .15) + .8, .2, GREEN);
  },

  // 0 Now ask where most people were supposed to learn this.
  // 1 In February 2024, the Council for Economic Education reported that 35 states require a personal finance course to graduate.
  // 2 That is up by 12 states since 2022.
  // 3 Only 15 states require a full semester-long course, which the council calls its highest standard.
  // 4 These rules are growing quickly, so plenty of adults finished school before they existed.
  sekolah(A) {
    TPL.judul(A, '2. What school covered');
    T('where were we supposed to learn it?', 960, 290, 52, A(0, .1), .9, { c: GRAY });
    TPL.statistik(A, { x: 480, y: 520, angka: '35', label: 'states require a course', at: A(1, .3), warna: GREEN, ukuranLabel: 42 });
    T('+12 since 2022', 480, 800, 58, A(2, .15), .5, { c: GREEN });
    TPL.statistik(A, { x: 1040, y: 520, angka: '15', label: 'full semester course', at: A(3, .15), warna: GOLD, ukuranLabel: 42 });
    T('many adults', 1570, 470, 50, A(4, .1), .4, { c: INK });
    T('finished school', 1570, 540, 50, A(4, .35), .4, { c: INK });
    T('before these rules', 1570, 610, 50, A(4, .6), .4, { c: RED });
  },

  // 0 A 2026 national report card on personal finance education puts the speed of change in perspective.
  // 1 In 2013, only three states earned an A grade, covering just 5 percent of students.
  // 2 By 2031, the report projects that 29 states will require a standalone personal finance course.
  // 3 It also projects that 73 percent of public high school students graduating in 2031 will take a substantive course.
  // 4 Progress is real, but it is recent.
  sejarah(A) {
    TPL.judul(A, '3. How recent this is');
    T('2026 national report card', 960, 265, 46, A(0, .1), .8, { c: GRAY });
    P(line(1000, 310, 1000, 800, 1), A(0, .6), .3, { c: GRAY, w: 4 });
    T('2013', 520, 360, 64, A(1, .0), .3, { c: GRAY });
    TPL.statistik(A, { x: 320, y: 540, angka: '3', label: 'states with an A', at: A(1, .2), warna: RED, r: 100, ukuranLabel: 40 });
    TPL.statistik(A, { x: 740, y: 540, angka: '5%', label: 'of students', at: A(1, .6), warna: RED, r: 100, ukuranLabel: 40 });
    T('2031 (projected)', 1450, 360, 64, A(2, .0), .4, { c: GREEN });
    T('29 states', 1450, 480, 90, A(2, .3), .5, { c: GREEN });
    T('require a standalone course', 1450, 545, 42, A(2, .65), .4, { c: GRAY });
    T('73%', 1450, 690, 110, A(3, .2), .5, { c: GREEN });
    T('of graduates take a real course', 1450, 755, 42, A(3, .6), .4, { c: GRAY });
    const b = T('real progress, but recent', 960, 885, 62, A(4, .15), .8, { c: INK });
    D.garisBawah(b, A(4, .15) + .8, .2, GOLD);
  },

  // 0 Here is what people say about it.
  // 1 In a 2025 poll cited in that report card, 83 percent of U.S. adults said their state should require a course.
  // 2 And 82 percent of respondents who attended high school said they wish they had been required to take one.
  // 3 Those answers do not sound like people who feel lazy or careless.
  // 4 They point to a gap in what people were taught.
  suara(A) {
    TPL.judul(A, '4. What people say');
    T('2025 poll', 960, 290, 50, A(0, .2), .5, { c: GRAY });
    TPL.statistik(A, { x: 480, y: 510, angka: '83%', label: 'say their state should require one', at: A(1, .3), warna: GREEN, r: 120, ukuranLabel: 40 });
    TPL.statistik(A, { x: 1340, y: 510, angka: '82%', label: 'wish they had been required', at: A(2, .3), warna: RED, r: 120, ukuranLabel: 40 });
    T('not lazy, not careless', 960, 810, 58, A(3, .2), .7, { c: GRAY });
    const b = T('a gap in what we were taught', 960, 890, 64, A(4, .15), .9, { c: RED });
    D.garisBawah(b, A(4, .15) + .9, .2, RED);
  },

  // 0 A gap in knowledge can show up in everyday life.
  // 1 In the FINRA Foundation's 2024 study, 46 percent of adults said they had set aside three months of living expenses.
  // 2 That is down from 53 percent in 2021.
  // 3 The study also found that 53 percent always pay their credit cards in full each month, down six points from 2021.
  // 4 Many forces sit behind those numbers, including higher costs, so knowledge is only part of the story.
  // 5 But it is a part you can change.
  jurang(A) {
    TPL.judul(A, '5. What the gap can look like');
    T('saved 3 months of expenses', 960, 300, 46, A(0, .3), .8, { c: GRAY });
    _barra('2024', 330, .46, RED, A(1, .3), '46%');
    _barra('2021', 415, .53, GRAY, A(2, .2), '53%');
    T('always pay cards in full', 960, 585, 46, A(3, .0), .6, { c: GRAY });
    _barra('2024', 610, .53, GREEN, A(3, .3), '53%');
    T('-6 points vs 2021', 1100, 745, 46, A(3, .75), .4, { c: RED });
    T('higher costs matter too', 960, 815, 50, A(4, .2), .8, { c: GRAY });
    const b = T('but knowledge is a part you can change', 960, 890, 58, A(5, .15), .9, { c: GREEN });
    D.garisBawah(b, A(5, .15) + .9, .2, GREEN);
  },

  // 0 So let's change the question.
  // 1 Being bad with money sounds like a personality trait, as if you were born without the talent.
  // 2 It is much closer to a skill, like driving or cooking.
  // 3 Nobody is born knowing how to read a lease or compare loan offers.
  // 4 People learn those skills from teachers, practice, and mistakes.
  // 5 If you never had the teacher, the mistakes are not proof that something is wrong with you.
  // 6 That is not an excuse to stop. It is a reason to start.
  keterampilan(A) {
    TPL.judul(A, 'Skill, not character');
    T('a better question', 960, 240, 44, A(0, .2), .6, { c: GRAY });
    TPL.duaKolom(A, { y0: 270, y1: 590, garis: true, atGaris: A(1, .0),
      kiri: { judul: 'a trait?', warna: RED, at: A(1, .15), atCatatan: A(1, .6), catatan: 'born with it', gambar: (cx, cy, at) => D.silang(cx, cy, 70, at) },
      kanan: { judul: 'a skill', warna: GREEN, at: A(2, .1), atCatatan: A(2, .55), catatan: 'like driving or cooking', gambar: (cx, cy, at) => D.centang(cx, cy, 70, at) } });
    TPL.daftar(A, { x: 250, y: 690, gap: 70, ukuran: 46, gaya: 'titik', maks: 1500,
      items: [{ teks: 'nobody is born knowing how to read a lease', at: A(3, .2) },
        { teks: 'we learn from teachers, practice, and mistakes', at: A(4, .2) },
        { teks: 'no teacher? the mistakes prove nothing about you', at: A(5, .2) }] });
    const b = T('not an excuse to stop, a reason to start', 960, 895, 56, A(6, .2), .9, { c: GREEN });
    D.garisBawah(b, A(6, .2) + .9, .2, GREEN);
  },

  // 0 Habit one: learn one idea at a time.
  // 1 Pick a single concept this week, such as compound interest, inflation, or what an emergency fund is for.
  // 2 Spend fifteen minutes on a trustworthy source, like the Consumer Financial Protection Bureau website.
  // 3 Then write one sentence in your own words explaining it.
  // 4 If you can explain it simply, you probably understand it.
  // 5 Do that for a few months, and money questions stop feeling like tricks.
  satu(A) {
    TPL.judul(A, 'Habit 1: Learn one idea');
    T('one idea at a time', 960, 285, 50, A(0, .3), .6, { c: GRAY });
    [['compound interest', 130], ['inflation', 700], ['emergency fund', 1270]].forEach(([t, x], i) => {
      P(rect(x, 330, 520, 110, 2), A(1, .25 + i * .22), .3, { c: BLUE, fill: BLUE, fillOp: .08 });
      T(t, x + 260, 400, 48, A(1, .4 + i * .22), .3, { c: BLUE });
    });
    P(circ(250, 640, 90), A(2, .1), .45, { c: INK, fill: GOLD, fillOp: .15 });
    P(line(250, 640, 250, 575, 1), A(2, .35), .15, { c: INK, w: 7 });
    P(line(250, 640, 300, 665, 1), A(2, .45), .15, { c: INK, w: 7 });
    T('15 minutes', 400, 630, 58, A(2, .4), .4, { anchor: 'start', c: INK });
    T('a trustworthy source (like the CFPB)', 400, 700, 42, A(2, .65), .5, { anchor: 'start', c: GRAY });
    P(rect(1180, 560, 600, 150, 2), A(3, .1), .4, { c: INK, fill: GOLD, fillOp: .2 });
    T('1 sentence,', 1480, 620, 46, A(3, .35), .3, { c: INK });
    T('in your own words', 1480, 675, 46, A(3, .55), .35, { c: INK });
    T('explain it simply = you probably get it', 960, 810, 54, A(4, .15), .9, { c: GREEN });
    T('after a few months, money stops feeling like a trick', 960, 890, 50, A(5, .2), 1, { c: BLUE });
  },

  // 0 Habit two: let a machine do the remembering.
  // 1 Willpower is unreliable, especially at the end of a long week.
  // 2 Set up an automatic transfer to savings on payday, even a small one.
  // 3 For example, if you are paid every two weeks and move $25 each time, that adds up to $650 in a year.
  // 4 That is an illustration, and any amount you can keep up is the right amount.
  // 5 The goal is to build the habit before you build the balance.
  dua(A) {
    TPL.judul(A, 'Habit 2: Automate a small step');
    T('let a machine remember', 960, 280, 50, A(0, .3), .6, { c: GRAY });
    T('willpower runs low by Friday', 960, 345, 54, A(1, .1), .8, { c: RED });
    D.grafik(560, 375, 800, 120, 'turun', A(1, .4), .8, { c: RED });
    TPL.alur(A, { x: 470, y: 545, w: 380, h: 100, gap: 220, ukuran: 46, items: [
      { teks: 'payday', at: A(2, .15), warna: INK }, { teks: 'savings', at: A(2, .5), warna: GREEN }] });
    T('automatic', 960, 585, 36, A(2, .7), .3, { c: GRAY });
    D.koin(440, 740, 45, A(3, .1), .4, { simbol: '$' });
    T('$25 x 26 paychecks = $650', 540, 755, 62, A(3, .3), .9, { anchor: 'start', c: GREEN });
    T('an illustration; any amount you can keep up works', 960, 830, 44, A(4, .15), .9, { c: GRAY });
    const b = T('habit first, balance later', 960, 895, 58, A(5, .15), .8, { c: INK });
    D.garisBawah(b, A(5, .15) + .8, .2, GOLD);
  },

  // 0 Habit three: look at your money once a month.
  // 1 Set a calendar reminder and spend ten minutes, no more.
  // 2 Check three numbers: what came in, what went out, and what is left in savings.
  // 3 You are not judging yourself, you are collecting information.
  // 4 Avoiding the numbers feels safer, but that is how small problems grow quietly.
  // 5 Looking is the habit that makes the other two habits work.
  tiga(A) {
    TPL.judul(A, 'Habit 3: A ten-minute check');
    D.kalender(150, 280, 460, 330, A(0, .1), .8, { judul: 'monthly' });
    T('once a month', 380, 665, 48, A(0, .6), .4, { c: GRAY });
    P(circ(800, 380, 85), A(1, .1), .45, { c: INK, fill: GOLD, fillOp: .15 });
    P(line(800, 380, 800, 320, 1), A(1, .4), .15, { c: INK, w: 7 });
    P(line(800, 380, 845, 405, 1), A(1, .5), .15, { c: INK, w: 7 });
    T('10 minutes, no more', 940, 400, 56, A(1, .45), .5, { anchor: 'start', c: INK });
    T('information, not judgment', 940, 480, 48, A(3, .15), .7, { anchor: 'start', c: GREEN });
    T('avoiding it lets problems grow', 940, 550, 48, A(4, .2), .8, { anchor: 'start', c: RED });
    TPL.alur(A, { x: 130, y: 710, w: 480, h: 100, gap: 120, ukuran: 44, items: [
      { teks: 'what came in', at: A(2, .1), warna: GREEN }, { teks: 'what went out', at: A(2, .45), warna: RED }, { teks: 'what is left in savings', at: A(2, .75), warna: BLUE }] });
    const b = T('looking makes the other two habits work', 960, 895, 54, A(5, .15), .9, { c: GREEN });
    D.garisBawah(b, A(5, .15) + .9, .2, GREEN);
  },

  // 0 So, are you actually bad with money?
  // 1 The data says most adults missed several basic questions, and school rules are only now catching up.
  // 2 That points to a teaching gap, not to a flaw in you.
  // 3 Nobody was born knowing how money works, and nobody teaches it by accident.
  // 4 So start with one idea, one automatic transfer, and one monthly check.
  // 5 Real results vary, and this video is for education only, not personal financial advice. Talk to a licensed professional before big decisions.
  // 6 If this helped, follow the channel, and watch the next video about the money beliefs you picked up as a kid.
  penutup(A) {
    TPL.judul(A, 'Taught wrong, not broken');
    T('actually bad with money?', 960, 290, 54, A(0, .2), .7, { c: GRAY });
    T('most adults missed basic questions', 960, 365, 50, A(1, .1), .6, { c: INK });
    T('school rules are catching up', 960, 430, 50, A(1, .55), .6, { c: INK });
    const b = T('a teaching gap, not a flaw in you', 960, 510, 64, A(2, .15), .9, { c: GREEN });
    D.garisBawah(b, A(2, .15) + .9, .2, GREEN);
    T('nobody is born knowing how money works', 960, 585, 46, A(3, .15), .9, { c: GRAY });
    TPL.alur(A, { x: 130, y: 620, w: 480, h: 90, gap: 120, ukuran: 40, items: [
      { teks: 'one idea', at: A(4, .1), warna: BLUE }, { teks: 'one automatic transfer', at: A(4, .4), warna: GREEN }, { teks: 'one monthly check', at: A(4, .7), warna: GOLD }] });
    P(rect(460, 745, 1000, 80, 2), A(5, .05), .4, { c: INK, fill: INK, fillOp: .03 });
    T('For education only, not financial advice', 960, 797, 42, A(5, .2), .8, { c: INK });
    T('Follow, and watch the next video', 960, 895, 52, A(6, .2), .7, { c: BLUE });
  },
};
