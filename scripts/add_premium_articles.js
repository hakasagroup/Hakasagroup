require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const articles = [
  {
    title: "Sengketa Merek Denza vs Danza: Ketika Prinsip First to File Menentukan Nasib Raksasa Otomotif di Indonesia",
    slug: "sengketa-merek-denza-byd-first-to-file-indonesia",
    category: "Berita",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Mahkamah Agung resmi menolak kasasi BYD terkait sengketa merek Denza melawan perusahaan lokal. Kasus ini menegaskan kekuatan mutlak asas First to File dalam hukum kekayaan intelektual Indonesia.",
    metaDesc: "Pelajari analisis hukum putusan Mahkamah Agung (2026) terkait sengketa merek Denza (BYD) vs PT Worcas. Pentingnya asas First to File bagi perlindungan merek bisnis di Indonesia.",
    keywords: "sengketa merek denza, byd indonesia, pendaftaran merek, first to file, putusan kasasi merek, hak kekayaan intelektual otomotif",
    isPublished: true,
    content: `
      <p><strong>JAKARTA, HAKASA Group</strong> – Dinamika hukum Kekayaan Intelektual (KI) di Indonesia kembali menjadi sorotan tajam publik, khususnya di sektor industri otomotif. Pada pertengahan tahun 2026, raksasa kendaraan listrik asal Tiongkok, Build Your Dreams (BYD), harus menelan pil pahit dalam upayanya mengamankan identitas salah satu sub-merek premium mereka di pasar tanah air. Mahkamah Agung Republik Indonesia secara resmi mengeluarkan putusan berkekuatan hukum tetap yang menolak kasasi BYD terkait sengketa merek dagang "Denza".</p>
      <p>Sengketa hukum yang melibatkan korporasi global melawan entitas bisnis lokal ini bukan sekadar persoalan administratif, melainkan preseden penting yang kembali menegaskan kedudukan asas <em>first to file</em> (pendaftar pertama) dalam rezim hukum merek di Indonesia. Artikel ini membedah implikasi hukum putusan tersebut dan pelajaran yang dapat dipetik para pelaku usaha.</p>
      <h3>Kronologi Sengketa: Ekspansi Global dan Pendaftaran Lokal</h3>
      <p>Permasalahan bermula ketika BYD, yang tengah melakukan ekspansi agresif ke pasar otomotif Indonesia, berniat mendaftarkan merek dagang "Denza". Merek ini dirancang sebagai lini kendaraan elektrifikasi premium mereka. Namun, langkah administratif BYD terhambat fakta bahwa merek "Denza" telah lebih dahulu terdaftar secara sah di Direktorat Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum dan HAM RI oleh pihak lain.</p>
      <p>Berdasarkan pangkalan data DJKI, PT Worcas Nusantara Abadi—sebuah perusahaan lokal—telah mendaftarkan hak merek "Denza" sejak 3 Juli 2023 di bawah nomor pendaftaran IDM001176306. Pendaftaran ini memberikan pelindungan eksklusif kepada PT Worcas atas merek tersebut hingga 3 Juli 2033. Menghadapi jalan buntu ini, BYD menempuh jalur litigasi untuk merebut kendali atas merek tersebut.</p>
      <p>Dalam argumentasinya, BYD mengklaim bahwa "Denza" merupakan merek global yang sudah mapan dan telah diajukan pendaftarannya di lebih dari 100 yurisdiksi. Mereka berpendapat memiliki hak prerogatif atas merek itu di Indonesia. Namun, hukum positif Indonesia memiliki mekanisme dan batas teritorialnya sendiri. Reputasi di luar negeri tidak dengan sendirinya melahirkan hak eksklusif tanpa pendaftaran di Indonesia.</p>
      <h3>Putusan Kasasi: Ketegasan Asas First to File</h3>
      <p>Perselisihan ini bermuara pada tingkat kasasi di Mahkamah Agung. Melalui Putusan Nomor 1338 K/Pdt.Sus-HKI/2025, Majelis Hakim menolak seluruh gugatan yang diajukan pihak BYD. Putusan tingkat sebelumnya, yang menyatakan gugatan BYD tidak dapat diterima karena persoalan subjek hukum (<em>error in persona</em>), secara efektif diperkuat.</p>
      <p>Penolakan kasasi menggarisbawahi prinsip fundamental dalam Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (UU MIG), yakni asas konstitutif atau <em>first to file</em>. Hak atas suatu merek diperoleh setelah merek tersebut terdaftar. Berbeda dari asas <em>first to use</em>, hukum Indonesia memberikan pelindungan eksklusif kepada pihak yang pertama kali mengajukan pendaftaran secara sah dan beriktikad baik, terlepas dari apakah merek itu telah terkenal di luar negeri.</p>
      <p>Prinsip ini bukan sekadar formalitas. Ia menjadi fondasi kepastian hukum agar dunia usaha dapat mengidentifikasi pemilik hak dan menghitung risiko investasi. Pemegang sertifikat berhak atas pelindungan hukum, sedangkan pihak lain tidak dapat menganulirnya hanya dengan klaim keterkenalan global yang belum dibuktikan dan belum didaftarkan secara lokal.</p>
      <h3>Manuver Darurat: Transisi dari Denza ke Danza</h3>
      <p>Menyadari posisi hukum yang tidak lagi menguntungkan, BYD mengambil langkah taktis untuk menyelamatkan agenda bisnisnya. Di tengah proses hukum, BYD Company Limited tercatat mengajukan permohonan pendaftaran merek baru yang memiliki kemiripan fonetik, yakni "Danza". Pengajuan tersebut tercatat di DJKI sejak 11 Agustus 2025.</p>
      <p>Perubahan satu huruf dari "Denza" menjadi "Danza" merupakan strategi mitigasi yang lazim ketika perusahaan gagal memperoleh hak atas merek asli. Meski demikian, kemiripan bunyi tetap perlu dianalisis berdasarkan kelas barang, tampilan, dan potensi kebingungan konsumen. Perubahan nama juga menimbulkan biaya rebranding, penyesuaian materi promosi, edukasi pasar, dan risiko terputusnya ekuitas merek.</p>
      <h3>Implikasi Hukum bagi Pelaku Usaha dan UMKM</h3>
      <p><strong>1. Keterkenalan tidak menggugurkan kewajiban pendaftaran.</strong> Status sebagai merek global tidak otomatis memberikan kekebalan di setiap negara. Pengecualian bagi merek terkenal yang belum terdaftar memiliki syarat pembuktian ketat. Pihak asing akan kesulitan merebut kembali merek yang lebih dahulu didaftarkan dengan iktikad baik oleh pihak lokal.</p>
      <p><strong>2. Pendaftaran adalah investasi preventif.</strong> Bagi UMKM, kasus ini membuktikan bahwa sistem hukum melindungi pemilik sah yang taat asas pendaftaran. Sertifikat merek merupakan <em>primary shield</em> dengan biaya yang jauh lebih terukur dibandingkan litigasi, kehilangan momentum pasar, dan rebranding paksa.</p>
      <p><strong>3. Lakukan trademark clearance.</strong> Sebelum meluncurkan produk, lakukan penelusuran pada pangkalan data DJKI untuk kelas barang dan jasa yang relevan, variasi ejaan, kemiripan bunyi, serta merek yang berpotensi dianggap terkenal. Pendapat profesional dapat membantu memetakan risiko dan memilih strategi pendaftaran yang tepat.</p>
      <p><strong>4. Lindungi merek lintas yurisdiksi secara terencana.</strong> Perusahaan yang berekspansi perlu menyusun kalender pendaftaran di negara tujuan, termasuk memanfaatkan sistem Madrid bila relevan. Pendaftaran global sebaiknya dilakukan sebelum kampanye peluncuran dan distribusi komersial, bukan setelah sengketa muncul.</p>
      <h3>Kesimpulan</h3>
      <p>Sengketa Denza memberikan afirmasi bahwa hukum merek Indonesia tidak pandang bulu terhadap ukuran perusahaan. Asas <em>first to file</em> menjadi instrumen kepastian hukum yang kokoh, sementara kegagalan mendaftarkan merek sejak awal dapat berujung pada konsekuensi bisnis yang mahal. HAKASA Group merekomendasikan pendaftaran segera setelah ide bisnis atau produk dikonseptualisasikan. Jangan menunggu bisnis besar untuk mendaftarkan merek; daftarkan merek untuk membuat bisnis tumbuh secara aman.</p>
      <hr>
      <h4>Daftar Pustaka &amp; Referensi</h4>
      <ul>
        <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (UU MIG).</li>
        <li>Putusan Mahkamah Agung Nomor 1338 K/Pdt.Sus-HKI/2025.</li>
        <li>Kurniawan, R. &amp; Ferdian, A. (2026, 16 April). <em>MA Tolak Kasasi BYD Terkait Sengketa Merek Denza</em>. Kompas.com.</li>
        <li>Dananjaya, D. &amp; Ferdian, A. (2026, 28 Mei). <em>Sengketa Merek Masih Berlanjut, Nama Danza Jadi Dipakai?</em>. Kompas.com.</li>
      </ul>
    `,
  },
  {
    title: "Anatomi Pembatalan Merek: Mengupas Putusan Mahkamah Agung dan Itikad Tidak Baik dalam Pendaftaran HKI",
    slug: "anatomi-pembatalan-merek-itikad-tidak-baik-putusan-mahkamah-agung",
    category: "Pengetahuan",
    image: "https://images.unsplash.com/photo-1450012509206-92d2b4f2c4f8?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Memahami batas tipis antara inspirasi bisnis dan plagiarisme merek. Analisis mendalam mengenai syarat pembatalan merek terdaftar di Indonesia berdasarkan pembuktian unsur itikad tidak baik di mata hukum.",
    metaDesc: "Pelajari prosedur hukum pembatalan merek terdaftar di DJKI. Analisis yurisprudensi Mahkamah Agung mengenai itikad tidak baik (bad faith) dalam sistem pendaftaran merek (First to File).",
    keywords: "pembatalan merek terdaftar, itikad tidak baik merek, bad faith trademark, putusan mahkamah agung merek, first to file, uu nomor 20 tahun 2016",
    isPublished: true,
    content: `
      <p><strong>JAKARTA, HAKASA Group</strong> – Memiliki sertifikat merek dari Direktorat Jenderal Kekayaan Intelektual (DJKI) merupakan pencapaian penting bagi setiap entitas bisnis. Sertifikat tersebut mengonfirmasi hak eksklusif pemegang merek untuk menggunakan identitas itu dalam aktivitas komersial. Namun, kepemilikan sertifikat bukan jaminan kekebalan mutlak. Dalam rezim hukum Kekayaan Intelektual (HKI) Indonesia, merek terdaftar tetap dapat dievaluasi, digugat, bahkan dihapuskan dari Daftar Umum Merek melalui mekanisme pembatalan.</p>
      <p>Instrumen <em>trademark cancellation</em> bertindak sebagai mekanisme korektif untuk memastikan asas <em>first to file</em> tidak dieksploitasi pihak yang tidak bertanggung jawab. Artikel edukasi HAKASA Group ini mengurai anatomi pembatalan merek di Indonesia, dengan fokus pada pembuktian "Itikad Tidak Baik" (<em>bad faith</em>) berdasarkan undang-undang dan yurisprudensi Mahkamah Agung.</p>
      <h3>Landasan Hukum Pembatalan Merek Terdaftar</h3>
      <p>Berdasarkan Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (UU MIG), hak gugat pembatalan diatur dalam Pasal 76 ayat (1). Pihak yang berkepentingan dapat mengajukan gugatan kepada Pengadilan Niaga dengan dasar pendaftaran bertentangan dengan Pasal 20 dan/atau Pasal 21. Gugatan ini berbeda dari keberatan terhadap permohonan yang masih diperiksa DJKI.</p>
      <p>Pembatalan ditujukan kepada merek yang sertifikatnya telah diterbitkan atau melewati proses pendaftaran final. Pelaksanaannya, sebagaimana dimandatkan Pasal 91 UU MIG, dilakukan Menteri setelah menerima salinan resmi putusan pengadilan yang telah berkekuatan hukum tetap (<em>inkracht van gewijsde</em>). Artinya, putusan saja belum cukup tanpa administrasi lanjutan pada Daftar Umum Merek.</p>
      <p>Potensi pembatalan dapat muncul karena beberapa faktor:</p>
      <ol>
        <li><strong>Persamaan pada pokoknya atau keseluruhannya:</strong> kemiripan visual, konseptual, atau fonetik dengan merek pihak lain untuk barang atau jasa sejenis.</li>
        <li><strong>Mendompleng merek terkenal:</strong> pendaftaran meniru <em>well-known trademark</em> pihak lain, baik untuk barang sejenis maupun tidak sejenis, sehingga menimbulkan kebingungan atau <em>dilution</em>.</li>
        <li><strong>Menyesatkan konsumen:</strong> merek dapat menimbulkan kebingungan atau menipu mengenai asal-usul, kualitas, atau sifat barang dan jasa.</li>
        <li><strong>Bertentangan dengan hukum dan ketertiban umum:</strong> tanda yang melanggar ketentuan Pasal 20 atau digunakan untuk tujuan yang tidak patut dapat ditolak atau dipersoalkan.</li>
      </ol>
      <h3>Itikad Tidak Baik sebagai Senjata Utama</h3>
      <p>Dalam praktik Pengadilan Niaga hingga Mahkamah Agung, banyak gugatan bermuara pada pembuktian iktikad tidak baik. Pasal 21 ayat (3) UU MIG menyatakan, <em>"Permohonan ditolak jika diajukan oleh Pemohon yang beriktikad tidak baik."</em> Ketentuan ini menunjukkan bahwa sertifikat tidak boleh dijadikan tameng untuk melegitimasi pendaftaran yang sejak awal bertujuan merugikan pihak lain.</p>
      <p>Secara yurisprudensial, pemohon beriktikad tidak baik adalah individu atau korporasi yang patut diduga mendaftarkan merek dengan niat tersembunyi untuk meniru, menjiplak, atau mendompleng ketenaran pihak lain. Tujuannya memperoleh keuntungan instan tanpa membangun citra dari nol. Penilaian hakim tidak berhenti pada kemiripan kata, tetapi mempertimbangkan pengetahuan pemohon, hubungan para pihak, urutan waktu, jenis barang, pola penggunaan, dan perilaku komersial.</p>
      <p>Indikator yang dapat diajukan dalam persidangan antara lain:</p>
      <ul>
        <li><strong>Persaingan tidak jujur:</strong> upaya membonceng (<em>free riding</em>) reputasi merek yang telah eksis agar publik mengira ada afiliasi.</li>
        <li><strong>Pelanggaran kepatutan:</strong> tindakan bertentangan dengan kewajiban hukum, kesusilaan, dan nilai kepatutan dalam hubungan komersial.</li>
        <li><strong>Hubungan historis:</strong> pendaftar pernah menjadi distributor, mitra, agen, atau karyawan pemilik merek asli, lalu mendaftarkannya diam-diam tanpa izin.</li>
        <li><strong>Pola pendaftaran:</strong> tergugat mendaftarkan banyak merek pihak lain atau tidak menunjukkan aktivitas usaha yang wajar untuk merek yang didaftarkan.</li>
      </ul>
      <h3>Tantangan Yuridis: Kepastian Hukum dan Keadilan</h3>
      <p>Menggugat pembatalan bukan perkara mudah. Ada tegangan antara asas <em>first to file</em> yang mengutamakan kepastian administratif dan keadilan substantif yang hendak melindungi pemilik atau pengguna merek yang sesungguhnya. Sistem Indonesia mengharuskan pendaftaran sebagai syarat lahirnya hak, tetapi penerapan yang terlalu kaku tanpa menguji iktikad dapat melindungi <em>trademark squatters</em>.</p>
      <p>Karena itu, penggugat memikul beban pembuktian berat. Untuk merek asing, bukti dapat mencakup pendaftaran di negara asal, volume penjualan, promosi lintas negara, nilai investasi, penghargaan, pemberitaan, serta survei pangsa pasar sebelum tanggal pendaftaran tergugat. Bukti korespondensi bisnis dan dokumen distribusi juga penting untuk menunjukkan bahwa pendaftar mengetahui keberadaan merek asli.</p>
      <p>Kesamaan nama saja belum tentu cukup. Pengadilan juga menilai kelas barang atau jasa, saluran perdagangan, konsumen sasaran, kesan keseluruhan, serta apakah pemohon benar-benar menjalankan usaha. Pendekatan berbasis bukti ini menjaga agar pembatalan tidak berubah menjadi alat untuk mengambil alih merek pesaing secara sewenang-wenang.</p>
      <h3>Rekomendasi Perlindungan Preventif HAKASA Advisory</h3>
      <p>Pertama, jangan menunda pendaftaran merek. Pendaftaran dini adalah pelindungan eksternal paling efektif; mengandalkan status merek terkenal untuk melawan pendaftar lain melalui gugatan menghabiskan biaya, waktu, dan energi dengan hasil yang tidak pasti. Kedua, lakukan <em>clearance search</em> sebelum logo dan nama dipasarkan. Penelusuran harus mencakup variasi ejaan, transliterasi, bunyi, logo, kelas terkait, dan merek terkenal.</p>
      <p>Ketiga, simpan bukti penggunaan dan pengembangan merek secara teratur, termasuk konsep desain, kontrak dengan agensi, invoice, kampanye, dan tanggal peluncuran. Keempat, pastikan permohonan diajukan atas nama subjek hukum yang tepat dan seluruh kelas barang atau jasa yang relevan dipilih secara strategis. Kelima, pantau publikasi merek dan ajukan keberatan tepat waktu jika menemukan permohonan yang berisiko.</p>
      <h3>Kesimpulan</h3>
      <p>Pembatalan merek merupakan katup pengaman terhadap penyalahgunaan asas <em>first to file</em>, tetapi bukan jalan pintas. Keberhasilannya bergantung pada bukti persamaan, reputasi, hubungan historis, dan terutama iktikad tidak baik. Pelaku usaha yang membangun merek secara jujur harus menggabungkan pendaftaran, penelusuran, dokumentasi, dan pemantauan. HAKASA Group siap membantu menyusun strategi perlindungan HKI yang preventif, terukur, dan sesuai karakter bisnis.</p>
      <hr>
      <h4>Daftar Pustaka &amp; Referensi Akademis</h4>
      <ul>
        <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (UU MIG).</li>
        <li>Sari, Y. P., Saidin, S., &amp; Purba, H. (2025). <em>Analisis Sistem Pendaftaran Merek dalam Kasus Pembatalan Merek Zhe Nung Zhu</em>. Rewang Rencang, 6(4).</li>
        <li>Puspita Sari, D. A. (2025). <em>Pembatalan Merek Itikad Tidak Baik Dari Si Pemohon Menurut Undang-Undang No. 20 Tahun 2016</em>. Jurnal Kolaboratif Sains, 8(10).</li>
        <li>(2025). <em>Problematika Kepastian Hukum dalam Sistem Pendaftaran Merek</em>. Khatulistiwa, 5(2).</li>
        <li>Sudjana. (2020). <em>Akibat Hukum Penghapusan dan Pembatalan Merek Terdaftar terhadap Hak atas Merek</em>. Res Nullius Law Journal.</li>
      </ul>
    `,
  },
];

async function main() {
  console.log("Memulai proses injeksi 2 Artikel Premium HAKASA...");

  for (const article of articles) {
    const wordCount = article.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
    if (wordCount < 850) {
      throw new Error(`Konten artikel ${article.slug} hanya ${wordCount} kata; minimal 850 kata.`);
    }

    const result = await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
    console.log(`Sukses menambahkan/memperbarui: ${result.title}`);
  }

  const inserted = await prisma.article.findMany({
    where: { slug: { in: articles.map(({ slug }) => slug) } },
    select: { slug: true, title: true, isPublished: true, content: true },
  });
  console.log(`Validasi database: ${inserted.length}/2 artikel ditemukan.`);
  for (const article of inserted) {
    const wordCount = article.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
    console.log(`- ${article.slug}: ${wordCount} kata, published=${article.isPublished}`);
  }
}

main()
  .catch((error) => {
    console.error("Gagal melakukan injeksi:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });