require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const oldSlugs = [
  "sengketa-merek-denza-byd-first-to-file-indonesia",
  "anatomi-pembatalan-merek-itikad-tidak-baik-putusan-mahkamah-agung",
];

const articles = [
  {
    title: "Update Regulasi DJKI 2026: Pengetatan Pemeriksaan Substantif Merek di Era E-Commerce untuk Mencegah Trademark Squatting",
    slug: "update-regulasi-djki-2026-pengetatan-pemeriksaan-merek-e-commerce",
    category: "merek",
    image: "",
    excerpt: "Merespons lonjakan sengketa merek di platform E-Commerce sepanjang tahun 2026, DJKI menerapkan pengetatan pemeriksaan substantif. Kebijakan ini menargetkan pemberantasan praktik pembajakan merek (trademark squatting).",
    metaDesc: "Berita HKI terbaru 2026: analisis pengetatan pemeriksaan substantif merek dagang untuk mencegah trademark squatting di platform E-Commerce seperti Shopee dan TikTok.",
    keywords: "berita djki 2026, regulasi merek terbaru, pemeriksaan substantif merek, trademark squatting indonesia, pendaftaran merek e-commerce, sengketa merek online",
    isPublished: true,
    content: `
      <p><strong>JAKARTA, HAKASA Group</strong> – Dinamika pendaftaran Kekayaan Intelektual (KI) di Indonesia terus mengalami penyesuaian strategis. Memasuki kuartal ketiga 2026, Direktorat Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum dan HAM mulai memperkuat pemeriksaan substantif permohonan merek baru. Kebijakan ini menjadi respons terhadap meningkatnya praktik <em>trademark squatting</em>, yaitu pendaftaran merek oleh pihak yang bukan pemilik atau pengguna sebenarnya untuk memperoleh keuntungan dari reputasi orang lain.</p>
      <p>Fenomena tersebut makin terasa di ekosistem Shopee, Tokopedia, dan TikTok Shop. Banyak pelapak membangun reputasi, mengumpulkan ulasan, serta menanam modal promosi sebelum menyadari bahwa nama toko belum terdaftar sebagai merek. Ketika pihak lain mengajukan pendaftaran lebih dahulu, sertifikat tersebut kemudian dipakai untuk meminta <em>takedown</em> terhadap toko yang justru lebih dulu dikenal konsumen. Karena itu, pengetatan pemeriksaan merek menjadi isu penting bagi UMKM dan pemilik brand digital.</p>
      <h3>Anatomi Trademark Squatting di Ekosistem Digital</h3>
      <p><em>Trademark squatting</em> bukan sekadar penggunaan nama yang mirip. Pelaku biasanya memantau toko online dengan penjualan tinggi, akun <em>Star Seller</em>, atau brand yang sedang viral tetapi belum memiliki sertifikat DJKI. Setelah target ditemukan, pelaku mengajukan merek identik atau memiliki persamaan pada pokoknya dalam kelas barang dan jasa yang relevan. Sertifikat atau nomor permohonan lalu dijadikan dasar untuk menekan pemilik usaha asli.</p>
      <p>Di tingkat platform, mekanisme perlindungan merek umumnya bersifat administratif dan berbasis dokumen. Pusat perlindungan seperti <em>Shopee Brand Protection</em> dan <em>TikTok IP Protection Center</em> membutuhkan bukti kepemilikan untuk memproses laporan. Akibatnya, toko korban dapat dibekukan, iklan dihentikan, dan dana ditahan sementara sengketa belum diperiksa secara menyeluruh. Pelaku bahkan dapat meminta uang damai atau biaya pengalihan hak dengan nominal yang tidak proporsional.</p>
      <p>Pelajaran pentingnya jelas: penggunaan pertama di media sosial tidak otomatis menggantikan pendaftaran merek. Bukti penggunaan tetap bernilai untuk menunjukkan riwayat, reputasi, dan iktikad baik, tetapi hak eksklusif dalam sistem konstitutif pada dasarnya lahir melalui pendaftaran yang sah. Pemilik bisnis harus membangun perlindungan hukum sebelum melakukan investasi pemasaran besar.</p>
      <h3>Pengetatan Pemeriksaan Substantif DJKI</h3>
      <p>Pemeriksaan substantif menilai apakah suatu permohonan memenuhi persyaratan material, bukan hanya kelengkapan formulir. Pemeriksa mempertimbangkan daya pembeda, persamaan dengan merek terdahulu, potensi menyesatkan konsumen, merek terkenal, serta iktikad pemohon. Dalam pendekatan yang lebih responsif terhadap ekonomi digital, jejak penggunaan publik dapat menjadi konteks ketika menilai apakah pendaftaran diajukan secara jujur atau sekadar membonceng reputasi.</p>
      <p>Rujukan pentingnya adalah Pasal 21 ayat (3) Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (UU MIG), yang menegaskan bahwa permohonan ditolak apabila diajukan oleh pemohon yang beriktikad tidak baik. Dengan pengawasan yang lebih cermat, permohonan yang terlihat seperti upaya menguasai nama toko, brand, atau identitas produk yang telah dikenal dapat memperoleh pemeriksaan lebih mendalam dan berisiko menerima usulan penolakan.</p>
      <p>Penggunaan teknologi dalam penelusuran data dapat membantu menemukan kemiripan, tetapi teknologi tidak menggantikan penilaian hukum. Pemeriksa tetap perlu melihat kelas barang atau jasa, hubungan para pihak, kronologi penggunaan, pola pendaftaran, dan bukti bahwa pemohon memiliki kegiatan usaha yang wajar. Pemilik merek juga perlu berhati-hati terhadap informasi yang belum dituangkan dalam peraturan atau siaran resmi DJKI; strategi sebaiknya didasarkan pada dokumen dan kanal resmi.</p>
      <h3>Implikasi bagi Pelaku Usaha</h3>
      <p><strong>1. Lakukan <em>clearance search</em> sebelum peluncuran.</strong> Penelusuran harus mencakup ejaan alternatif, kemiripan bunyi, logo, kelas Nice, serta kelas yang berhubungan dengan rencana ekspansi. Nama yang tersedia di media sosial belum tentu tersedia di pangkalan data DJKI.</p>
      <p><strong>2. Daftarkan kelas yang tepat.</strong> Pendaftaran pada kelas yang keliru tidak memberikan perlindungan memadai. Toko fesyen, misalnya, perlu membedakan perlindungan pakaian, tas, retail, dan layanan digital. Analisis barang atau jasa harus mengikuti aktivitas bisnis nyata, bukan sekadar memilih kelas paling populer.</p>
      <p><strong>3. Simpan bukti pemakaian dan proses penciptaan brand.</strong> Arsipkan desain awal, kontrak, invoice, katalog, iklan, transaksi, dan tanggal peluncuran. Dokumen tersebut dapat membantu menunjukkan iktikad baik ketika ada keberatan, sanggahan, atau gugatan pembatalan.</p>
      <p><strong>4. Pantau publikasi dan kanal marketplace.</strong> Pemilik merek perlu membuat prosedur internal untuk menanggapi notifikasi pelanggaran. Jika menerima laporan, jangan mengabaikan batas waktu. Kumpulkan sertifikat, kronologi, bukti penggunaan, dan korespondensi sebelum mengajukan tanggapan.</p>
      <p><strong>5. Siapkan respons terhadap usulan penolakan.</strong> Surat usulan penolakan bukan selalu keputusan akhir. Pemohon perlu membaca dasar penolakan, menyusun argumen yang menjawab alasan pemeriksa, dan menyerahkan bukti dalam jangka waktu yang berlaku. Pendekatan yang hanya menyatakan “merek saya berbeda” tanpa analisis kelas dan kesan keseluruhan biasanya tidak cukup.</p>
      <p>Selain itu, pemilik brand perlu menunjuk satu orang yang bertanggung jawab atas kalender legalitas. Tanggal permohonan, masa publikasi, tenggat sanggahan, perpanjangan, dan pembaruan data harus dicatat. Tata kelola sederhana ini mencegah notifikasi penting terlewat dan membuat respons terhadap klaim marketplace lebih cepat, konsisten, serta berbasis bukti.</p>
      <h3>Konklusi HAKASA</h3>
      <p>Pengetatan pemeriksaan merek merupakan perkembangan positif bagi ekosistem E-Commerce, tetapi tidak menghapus kewajiban pemilik bisnis untuk waspada. Platform, DJKI, dan pengadilan memiliki fungsi berbeda; sertifikat merek tetap menjadi fondasi paling kuat untuk mengajukan perlindungan. Prinsip <em>vigilantibus non dormientibus jura subveniunt</em> mengingatkan bahwa hukum membantu pihak yang menjaga haknya secara aktif.</p>
      <p>HAKASA Group merekomendasikan audit merek sejak tahap penamaan produk, pendaftaran sebelum kampanye besar, serta pemantauan berkala setelah brand mulai dikenal. Dengan strategi tersebut, UMKM tidak hanya mengejar penjualan hari ini, tetapi juga memastikan identitas bisnis dapat tumbuh tanpa mudah disandera oleh praktik <em>trademark squatting</em>.</p>
      <hr>
      <h4>Daftar Pustaka &amp; Referensi</h4>
      <ul>
        <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</li>
        <li>Direktorat Jenderal Kekayaan Intelektual, kanal informasi dan pangkalan data merek resmi.</li>
        <li>WIPO, <em>Trademark Squatting: Issues and Strategies for Brand Owners</em>.</li>
        <li>Pedoman perlindungan kekayaan intelektual pada platform E-Commerce yang berlaku.</li>
      </ul>
    `,
  },
  {
    title: "Strategi Perlindungan Merek Defensif: Kapan Bisnis Anda Wajib Mendaftar di Lebih dari Satu Kelas (Multi-Class)?",
    slug: "strategi-perlindungan-merek-defensif-pendaftaran-multi-kelas",
    category: "merek",
    image: "",
    excerpt: "Panduan komprehensif bagi pemilik bisnis tentang pentingnya pendaftaran merek di berbagai kelas barang dan jasa. Pahami kapan strategi defensif krusial untuk mencegah kanibalisme merek oleh kompetitor.",
    metaDesc: "Edukasi HKI: panduan strategi pendaftaran merek defensif dan multi-kelas di DJKI. Hindari pencurian merek oleh pihak lain melalui pemilihan kelas barang dan jasa yang tepat.",
    keywords: "pendaftaran merek multi kelas, strategi merek defensif, kelas merek djki, sistem klasifikasi nice, merek dagang dan jasa, perlindungan hki e-commerce",
    isPublished: true,
    content: `
      <p><strong>JAKARTA, HAKASA Group</strong> – Banyak pengusaha mengira satu sertifikat merek memberikan perlindungan untuk seluruh jenis bisnis. Anggapan ini keliru. Pelindungan merek bersifat spesifik berdasarkan barang dan jasa yang dicantumkan dalam permohonan. Karena itu, nama yang telah kuat di satu bidang masih dapat digunakan pihak lain pada bidang berbeda apabila tidak ada dasar hukum untuk memperluas perlindungan.</p>
      <p>Sistem yang digunakan secara internasional adalah Klasifikasi Nice, yang membagi barang dan jasa ke dalam 45 kelas: Kelas 1–34 untuk barang dan Kelas 35–45 untuk jasa. Pasal 3 UU MIG menghubungkan hak atas merek dengan barang dan/atau jasa yang didaftarkan. Memahami pembagian ini bukan pekerjaan administratif semata; ia menentukan seberapa jauh aset brand dapat dikembangkan dan dipertahankan.</p>
      <h3>Contoh Risiko Beda Kelas</h3>
      <p>Bayangkan sebuah kedai kopi bernama “SENJA ROAST” telah mendaftarkan merek di Kelas 43 untuk layanan penyediaan makanan dan minuman. Kedai itu viral dan berencana menjual biji kopi kemasan. Setahun kemudian, pihak lain mendaftarkan “SENJA ROAST” di Kelas 30 untuk kopi, teh, dan produk turunannya. Pihak tersebut kemudian memasarkan kopi melalui supermarket dan E-Commerce.</p>
      <p>Pemilik kedai dapat merasa menjadi pengguna pertama dan pembentuk reputasi, tetapi somasi saja belum otomatis menghapus sertifikat pada kelas barang. Ia perlu membuktikan persamaan yang relevan, iktikad tidak baik, hubungan antarkelas, atau status merek terkenal sesuai persyaratan hukum. Proses pembuktian di Pengadilan Niaga dapat panjang dan mahal. Risiko itu seharusnya dipetakan ketika bisnis mulai memiliki rencana ekspansi produk.</p>
      <p>Risiko serupa muncul pada brand fesyen yang hanya mendaftarkan pakaian, tetapi lupa tas dan aksesori; perusahaan aplikasi yang hanya mendaftarkan perangkat lunak tetapi tidak mendaftarkan layanan; atau produsen makanan yang tidak mengamankan jasa retail dan distribusi. Kompetitor dapat masuk melalui celah kelas, membingungkan konsumen, dan mengurangi nilai goodwill.</p>
      <h3>Apa Itu Strategi Pendaftaran Defensif?</h3>
      <p>Pendaftaran defensif adalah strategi mengamankan merek pada kelas inti, kelas pendukung, dan kelas ekspansi yang rasional. Tujuannya bukan memonopoli semua sektor atau memborong 45 kelas, melainkan mencegah pihak lain mengambil identitas brand dalam ruang bisnis yang secara wajar akan dimasuki perusahaan. Strategi ini harus dibedakan dari pendaftaran tanpa niat penggunaan yang dapat menimbulkan risiko penghapusan.</p>
      <p>Analisis dimulai dengan memetakan <em>brand ecosystem</em>: produk utama, layanan yang menyertainya, kanal distribusi, program lisensi, merchandise, dan roadmap tiga sampai lima tahun. Setelah itu, identifikasi kelas yang benar-benar relevan dan susun daftar spesifikasi barang atau jasa secara presisi. Deskripsi yang terlalu sempit dapat meninggalkan celah, sementara deskripsi yang terlalu luas dapat menyulitkan pemeriksaan dan meningkatkan biaya.</p>
      <h3>Kapan Pendaftaran Multi-Kelas Layak Diprioritaskan?</h3>
      <p><strong>1. Bisnis F&amp;B.</strong> Restoran dan kafe umumnya memerlukan Kelas 43 untuk layanan makanan dan minuman. Apabila ada rencana menjual kopi kemasan, saus, makanan ringan, atau minuman botolan, kelas barang seperti Kelas 29, 30, dan 32 perlu dianalisis. Kelas tambahan bukan otomatis wajib untuk semua pelaku usaha, tetapi menjadi prioritas ketika produk kemasan sudah masuk rencana penjualan.</p>
      <p><strong>2. Fashion dan apparel.</strong> Kelas 25 melindungi pakaian, alas kaki, dan tutup kepala. Brand yang menjual tas atau dompet perlu menilai Kelas 18; perhiasan dan jam dapat berhubungan dengan Kelas 14; layanan toko dan retail dapat dipertimbangkan pada Kelas 35. Penilaian harus mengikuti model bisnis, bukan sekadar meniru portofolio perusahaan besar.</p>
      <p><strong>3. Startup dan aplikasi.</strong> Aplikasi yang dapat diunduh dapat terkait Kelas 9, tetapi layanan yang diberikan mungkin masuk Kelas 35, 38, 39, 41, 42, atau kelas jasa lain. Platform pesan-antar, misalnya, perlu memisahkan perangkat lunak, layanan pengiriman, dan layanan marketplace. Kelas yang dipilih harus menggambarkan fungsi bisnis sebenarnya.</p>
      <p><strong>4. Bisnis yang memasuki lisensi dan waralaba.</strong> Ketika brand mulai dilisensikan, membuka kemitraan, atau menjual merchandise, pemilik perlu meninjau kembali cakupan kelas. Perjanjian lisensi yang baik tidak dapat memperbaiki kelemahan apabila merek tidak dilindungi untuk barang atau jasa yang dilisensikan.</p>
      <h3>Risiko Non-Use Cancellation</h3>
      <p>Pendaftaran defensif memiliki batas. Pasal 74 UU MIG memungkinkan gugatan penghapusan merek apabila merek tidak digunakan secara komersial dalam perdagangan barang dan/atau jasa selama tiga tahun berturut-turut sejak tanggal pendaftaran atau pemakaian terakhir, dengan pengecualian yang ditentukan hukum. Karena itu, pemilik tidak boleh mendaftarkan kelas secara spekulatif tanpa roadmap penggunaan.</p>
      <p>Mitigasinya adalah membuat rencana komersialisasi yang realistis, menggunakan merek sesuai spesifikasi terdaftar, dan menyimpan bukti pemakaian seperti invoice, katalog, kontrak distribusi, konten promosi, dan data penjualan. Jika ekspansi tertunda karena alasan objektif, dokumentasi tersebut dapat membantu menjelaskan strategi bisnis, meskipun tidak menggantikan kewajiban penggunaan yang ditentukan peraturan.</p>
      <h3>Checklist Strategi Multi-Kelas</h3>
      <ol>
        <li>Petakan seluruh produk, jasa, kanal penjualan, dan rencana ekspansi.</li>
        <li>Lakukan penelusuran merek pada kelas inti dan kelas yang berdekatan.</li>
        <li>Gunakan klasifikasi dan istilah barang/jasa yang akurat.</li>
        <li>Prioritaskan kelas berdasarkan risiko, omzet, dan roadmap penggunaan.</li>
        <li>Ajukan pendaftaran atas nama pemilik yang benar dan konsisten dengan dokumen usaha.</li>
        <li>Jadwalkan audit merek sebelum peluncuran produk baru atau kerja sama lisensi.</li>
      </ol>
      <h3>Kesimpulan</h3>
      <p>Pendaftaran multi-kelas adalah instrumen perlindungan bisnis, bukan sekadar biaya tambahan. Dengan memetakan ekosistem brand dan rencana ekspansi, pemilik dapat mengurangi risiko kanibalisme merek, sengketa beda kelas, serta hambatan saat masuk marketplace. Namun strategi defensif harus proporsional karena merek yang tidak digunakan dapat menghadapi gugatan penghapusan.</p>
      <p>HAKASA Group menyarankan audit HKI sebelum brand dipasarkan secara luas. Konsultasi dengan Konsultan Kekayaan Intelektual membantu pemilik memilih kelas yang relevan, menyusun spesifikasi yang presisi, dan menyiapkan bukti penggunaan. Perlindungan terbaik adalah perlindungan yang selaras dengan strategi komersial nyata.</p>
      <hr>
      <h4>Daftar Pustaka &amp; Referensi Edukasi</h4>
      <ul>
        <li>World Intellectual Property Organization (WIPO), <em>Nice Classification</em>.</li>
        <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</li>
        <li>Direktorat Jenderal Kekayaan Intelektual, panduan klasifikasi barang dan jasa.</li>
        <li>Putusan Mahkamah Agung Republik Indonesia terkait persamaan merek dan beda kelas.</li>
      </ul>
    `,
  },
];

function countWords(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  console.log("1. Memperbaiki Database (Mengubah null menjadi string kosong)...");
  try {
    await prisma.$executeRawUnsafe(`UPDATE Article SET image = '' WHERE image IS NULL;`);
    console.log("Data null berhasil dibersihkan dari database.");
  } catch (error) {
    console.log("Raw update terlewati, lanjut ke ORM.");
  }

  console.log("2. Memperbaiki kategori 2 artikel sebelumnya...");
  await prisma.article.updateMany({
    where: { slug: { in: oldSlugs } },
    data: { category: "merek", image: "" },
  });
  console.log("Koreksi artikel lama berhasil.");

  console.log("3. Menyuntikkan 2 Artikel Baru secara aman...");
  for (const article of articles) {
    const words = countWords(article.content);
    if (words < 850) throw new Error(`${article.slug} hanya ${words} kata; minimal 850 kata.`);
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
    console.log(`Sukses menambahkan/memperbarui: ${article.title} (${words} kata)`);
  }

  const slugs = [...oldSlugs, ...articles.map(({ slug }) => slug)];
  const rows = await prisma.article.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, category: true, image: true, isPublished: true, content: true },
  });
  if (rows.length !== 4) throw new Error(`Validasi gagal: ditemukan ${rows.length}/4 artikel.`);
  for (const row of rows) {
    if (row.category !== "merek" || row.image !== "") {
      throw new Error(`Validasi gagal untuk ${row.slug}: category/image tidak sesuai.`);
    }
  }
  const nullImages = await prisma.$queryRawUnsafe(`SELECT COUNT(*) AS count FROM Article WHERE image IS NULL;`);
  const nullImageCount = Number(nullImages[0]?.count ?? 0);
  if (nullImageCount !== 0) throw new Error(`Validasi gagal: masih ada ${nullImageCount} image NULL.`);
  console.log(`Validasi database berhasil: ${rows.length}/4 artikel berada di kategori merek dengan image kosong.`);
  console.log("Proses injeksi dan perbaikan selesai!");
}

main()
  .catch((error) => {
    console.error("Gagal melakukan injeksi:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });