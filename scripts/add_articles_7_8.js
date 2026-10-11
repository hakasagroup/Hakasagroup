const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function countWords(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  console.log("Menyuntikkan Artikel 7 dan 8 (Madrid Protocol & Merek Non-Tradisional) ke database...");

  const articles = [
    {
      title: "Tren Ekspansi Global 2026: Mengapa Brand Lokal Berbondong-bondong Mendaftarkan Merek Internasional via Protokol Madrid",
      slug: "tren-ekspansi-global-2026-pendaftaran-merek-internasional-protokol-madrid",
      category: "Merek",
      image: "",
      excerpt: "Kuartal ketiga 2026 mencatat rekor tertinggi pendaftaran merek internasional oleh UMKM Indonesia melalui Protokol Madrid. Pelajari efisiensi biaya dan kemudahan birokrasi ekspansi pasar lintas negara bagi brand lokal.",
      metaDesc: "Berita HKI 2026: Lonjakan pendaftaran merek internasional melalui Protokol Madrid oleh brand lokal Indonesia. Pahami syarat, biaya, dan cara ekspansi pasar ke luar negeri.",
      keywords: "protokol madrid indonesia, pendaftaran merek internasional, wipo madrid system, ekspansi bisnis luar negeri, daftar merek di malaysia singapura, djki merek internasional, ekspor umkm 2026",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Lanskap bisnis digital yang semakin tanpa batas (<em>borderless</em>) mendorong banyak pelaku usaha lokal Indonesia untuk berekspansi ke pasar regional dan global. Memasuki kuartal ketiga 2026, permohonan pendaftaran merek internasional semakin menjadi perhatian pelaku UMKM. Salah satu instrumen hukum yang banyak dipertimbangkan adalah <strong>Protokol Madrid (Madrid Protocol)</strong>, sistem internasional yang dikelola oleh <em>World Intellectual Property Organization</em> (WIPO).</p>
        <p>Geliat ekspansi ini berkaitan dengan pertumbuhan <em>cross-border e-commerce</em>. Brand Indonesia dapat menjangkau konsumen di Malaysia, Singapura, Filipina, hingga wilayah Timur Tengah tanpa membangun jaringan toko fisik terlebih dahulu. Namun, pertumbuhan penjualan lintas batas juga membawa persoalan hukum fundamental: pendaftaran merek di Indonesia tidak otomatis memberikan perlindungan di negara lain.</p>
        <h3>Problem Asas Teritorial: Merek Tidak Otomatis Aman di Luar Negeri</h3>
        <p>Dalam hukum kekayaan intelektual, perlindungan merek tunduk pada asas teritorial (<em>territoriality principle</em>). Sertifikat yang diterbitkan DJKI memberikan hak eksklusif dalam yurisdiksi Indonesia. Apabila sebuah brand fashion terkenal di Jakarta tetapi belum didaftarkan di Kuala Lumpur, pihak lain di Malaysia dapat saja mengajukan nama yang sama atau menyerupai, sepanjang permohonannya memenuhi pemeriksaan menurut hukum setempat.</p>
        <p>Risiko tersebut dikenal sebagai <em>trademark squatting</em>. Produk kosmetik, makanan, fesyen, dan kerajinan lokal yang viral dapat menghadapi hambatan ketika hendak diekspor karena nama brand telah digunakan atau didaftarkan lebih dahulu oleh pihak lain di negara tujuan. Pemilik asli kemudian harus memilih antara rebranding, negosiasi, atau litigasi di negara asing. Biaya penerjemahan, kuasa hukum, pembuktian reputasi, dan proses administratif dapat jauh lebih besar daripada biaya pencegahan.</p>
        <h3>Solusi Protokol Madrid: Satu Sistem untuk Banyak Negara</h3>
        <p>Secara tradisional, perusahaan yang ingin melindungi merek di lima negara harus mengurus permohonan terpisah, mengikuti persyaratan formal masing-masing kantor merek, dan menunjuk perwakilan lokal. Protokol Madrid menyederhanakan administrasi melalui satu permohonan internasional yang diajukan melalui kantor asal, yaitu DJKI untuk pemohon Indonesia. Pemohon kemudian menunjuk negara anggota tempat perlindungan diminta.</p>
        <ul><li><strong>Satu permohonan:</strong> Pemohon tidak perlu membuat berkas administratif terpisah untuk setiap negara pada tahap pengajuan internasional.</li><li><strong>Satu bahasa dan pembayaran terpusat:</strong> Sistem WIPO menggunakan prosedur dan biaya internasional yang lebih terstruktur, dengan pembayaran dalam Franc Swiss sesuai tarif resmi yang berlaku.</li><li><strong>Satu administrasi pascapendaftaran:</strong> Perubahan nama, alamat, pembatasan daftar barang, atau pembaruan dapat dikelola secara terpusat, walaupun efek hukumnya tetap mengikuti hukum negara yang ditunjuk.</li><li><strong>Skala yang fleksibel:</strong> Pemilik brand dapat memilih negara tujuan berdasarkan peta ekspor, distribusi, dan rencana investasi, bukan mendaftarkan di seluruh dunia secara serampangan.</li></ul>
        <h3>Madrid System Bukan Sertifikat Dunia Otomatis</h3>
        <p>Kesalahpahaman yang sering terjadi adalah anggapan bahwa pendaftaran melalui WIPO langsung menghasilkan satu sertifikat yang berlaku mutlak di semua negara. Faktanya, WIPO memeriksa formalitas dan mencatat pendaftaran internasional, sementara setiap kantor merek di negara yang ditunjuk tetap berwenang melakukan pemeriksaan substantif berdasarkan hukum nasionalnya. Negara tujuan dapat menerbitkan penolakan sementara (<em>provisional refusal</em>) yang harus dijawab melalui prosedur dan, dalam keadaan tertentu, perwakilan lokal.</p>
        <p>Karena itu, pemohon perlu melakukan <em>trademark clearance</em> sebelum menunjuk negara. Pemeriksaan harus meliputi kesamaan visual, fonetik, konseptual, klasifikasi barang atau jasa, serta status merek terdahulu. Daftar barang yang terlalu luas dapat menimbulkan keberatan, sementara daftar yang terlalu sempit dapat menyulitkan ekspansi produk di kemudian hari. Strategi kelas harus disusun berdasarkan penggunaan nyata dan rencana bisnis yang dapat dibuktikan.</p>
        <h3>Syarat Basic Mark dan Risiko Ketergantungan</h3>
        <p>Pemohon perlu memiliki permohonan dasar atau pendaftaran dasar (<em>basic application</em> atau <em>basic registration</em>) di negara asal. Data pemohon, representasi merek, dan daftar barang atau jasa harus konsisten dengan <em>basic mark</em>. Pada periode ketergantungan, perubahan atau masalah serius pada pendaftaran dasar dapat memengaruhi pendaftaran internasional. Oleh sebab itu, pemilik brand harus memantau pemeriksaan di Indonesia dengan serius dan tidak mengabaikan keberatan yang masuk.</p>
        <p>Dokumen korporasi, identitas pemohon, bukti hubungan dengan kantor asal, transliterasi, serta terjemahan juga harus disiapkan secara akurat. Kesalahan kecil pada nama pemilik atau alamat dapat menimbulkan surat kekurangan formalitas dan memperlambat proses. Pengusaha sebaiknya menyusun jadwal perpanjangan, pemantauan penggunaan, dan pembaruan data sejak awal agar hak tidak berhenti pada tahap pendaftaran.</p>
        <h3>Roadmap Ekspansi Brand Lokal</h3>
        <p>Strategi terbaik dimulai dengan memetakan negara yang benar-benar memiliki potensi penjualan, kanal distribusi, mitra lokal, dan risiko peniruan. Setelah itu, lakukan pemeriksaan merek dan tetapkan anggaran resmi serta biaya konsultan lokal apabila dibutuhkan. Brand yang memiliki rencana ekspor dua tahun ke depan dapat mengutamakan negara dengan kontribusi pendapatan terbesar, kemudian menambah wilayah melalui penunjukan lanjutan sesuai kebutuhan.</p>
        <p>HAKASA Group merekomendasikan agar pemilik usaha tidak menunggu produknya viral di luar negeri. Permohonan sebaiknya diajukan sebelum kampanye ekspor, negosiasi distributor, atau pembukaan toko lintas batas. Perlindungan merek perlu berjalan bersamaan dengan kontrak distribusi, pengendalian kualitas, aturan lisensi, dan strategi penegakan apabila terjadi pelanggaran.</p>
        <h3>Kesimpulan</h3>
        <p>Protokol Madrid menawarkan efisiensi penting bagi brand Indonesia yang ingin tumbuh secara internasional, tetapi sistem ini bukan pengganti analisis hukum di negara tujuan. Asas teritorial, pemeriksaan substantif, risiko penolakan sementara, dan ketergantungan pada <em>basic mark</em> harus dipahami sebelum pengajuan. Pendaftaran yang direncanakan berdasarkan roadmap ekspor akan memberikan fondasi yang lebih kuat daripada pendaftaran reaktif setelah sengketa terjadi.</p>
        <hr><h4>Daftar Pustaka &amp; Referensi</h4>
        <ul><li>Peraturan Presiden Republik Indonesia Nomor 92 Tahun 2017 tentang Pengesahan <em>Protocol Relating to the Madrid Agreement Concerning the International Registration of Marks</em>.</li><li>World Intellectual Property Organization, <em>Guide to the Madrid System</em>, WIPO.</li><li>World Intellectual Property Organization, <em>Madrid Yearly Review: International Registration of Marks</em>.</li><li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</li><li>DJKI, <em>Panduan Pendaftaran Merek Internasional melalui Protokol Madrid</em>, Kementerian Hukum Republik Indonesia.</li></ul>
      `
    },
    {
      title: "Menguasai Merek Non-Tradisional: Panduan Hukum Mendaftarkan Bentuk 3 Dimensi, Suara, dan Hologram di Indonesia",
      slug: "panduan-hukum-pendaftaran-merek-non-tradisional-3-dimensi-suara-hologram",
      category: "Merek",
      image: "",
      excerpt: "Bentuk kemasan produk yang unik atau jingle iklan kini bisa dilindungi hukum. Bedah tuntas syarat, kriteria, dan pembuktian daya pembeda untuk pendaftaran Merek Non-Tradisional berdasarkan UU MIG.",
      metaDesc: "Edukasi HKI: Panduan pendaftaran merek non-tradisional di Indonesia (Merek 3 Dimensi, Merek Suara, Merek Hologram) menurut UU No. 20 Tahun 2016.",
      keywords: "merek 3 dimensi indonesia, merek suara jingle, merek hologram, merek non tradisional, syarat merek 3d, perlindungan desain kemasan, uu merek 20 2016, konsultan hki jakarta",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Ketika mendengar kata "merek", pelaku usaha biasanya membayangkan kata, susunan huruf, angka, logo, atau kombinasi warna. Elemen itu merupakan bentuk tradisional yang telah lama digunakan untuk membedakan barang dan jasa. Dalam persaingan bisnis modern, identitas brand juga dibangun melalui kemasan, suara, animasi cahaya, aroma, dan pengalaman sensorik yang konsisten.</p>
        <p>Hukum Indonesia melalui Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (UU MIG) mengakui tanda yang dapat ditampilkan secara grafis, termasuk bentuk dua atau tiga dimensi, suara, dan hologram. Pengakuan tersebut membuka ruang bagi <strong>merek non-tradisional</strong>, tetapi bukan berarti setiap bentuk, jingle, atau efek visual otomatis memperoleh hak eksklusif. Pemeriksa tetap menilai daya pembeda, representasi, serta kemungkinan tanda itu hanya merupakan fungsi atau karakter umum barang.</p>
        <h3>Merek Tiga Dimensi dan Doktrin Fungsionalitas</h3>
        <p>Merek tiga dimensi dapat berupa bentuk kemasan atau bentuk barang yang berfungsi sebagai penanda sumber. Contoh yang sering dibahas dalam literatur global adalah siluet botol yang sangat khas atau bentuk kemasan yang secara konsisten diasosiasikan konsumen dengan satu produsen. Pemohon harus menjelaskan bagian mana yang membedakan bentuk tersebut dari kemasan umum di industri dan bagaimana konsumen mengenalinya sebagai indikator asal komersial.</p>
        <p>Hambatan utama adalah doktrin fungsionalitas. Bentuk yang semata-mata ditentukan oleh fungsi teknis, kebutuhan ergonomis, atau keharusan agar barang dapat digunakan tidak seharusnya dimonopoli melalui merek. Perlindungan fungsi dapat berada pada rezim paten atau desain industri, sedangkan merek bertujuan menunjukkan asal barang. Bentuk botol standar, wadah yang wajib mengikuti ukuran mesin, atau susunan yang diperlukan untuk menumpuk produk kemungkinan memiliki daya pembeda yang lemah.</p>
        <p>Pemohon sebaiknya melampirkan gambar dari berbagai sudut, perspektif, dan detail bagian yang diklaim. Deskripsi harus konsisten dengan representasi visual, serta membatasi klaim pada karakter yang memang menjadi identitas brand. Bukti penggunaan seperti kampanye, angka distribusi, pemberitaan, survei, dan pernyataan konsumen dapat membantu membuktikan <em>acquired distinctiveness</em>, tetapi tidak boleh digunakan untuk menghapus sifat fungsional yang melekat.</p>
        <h3>Merek Suara: Notasi, Rekaman, dan Daya Pembeda</h3>
        <p>Merek suara melindungi kombinasi bunyi yang dapat mengidentifikasi jasa atau barang. Jingle pendek, rangkaian nada, atau suara non-musikal dapat menjadi aset branding yang efektif dalam iklan video, aplikasi, dan layanan digital. Agar dapat diperiksa, suara harus direpresentasikan secara jelas melalui notasi musik, deskripsi, rekaman, atau format lain yang dipersyaratkan sistem administrasi yang berlaku.</p>
        <p>Rekaman audio tidak cukup hanya terdengar menarik. Pemohon harus menjelaskan keterkaitan suara dengan barang atau jasa dan menunjukkan bahwa konsumen menggunakannya sebagai tanda sumber, bukan sekadar musik latar. Melodi yang sangat umum, potongan lagu milik pihak lain, atau suara yang menjadi konsekuensi teknis penggunaan produk dapat ditolak. Pemeriksaan hak cipta juga penting karena pendaftaran sebagai merek tidak menghapus hak pencipta atau hak terkait atas komposisi dan rekaman.</p>
        <p>Untuk memperkuat permohonan, simpan versi asli file, tanggal penciptaan, kontrak dengan komposer atau produser, bukti lisensi, materi kampanye, serta bukti penggunaan yang konsisten. Pemilik brand harus memastikan bahwa seluruh pihak yang terlibat telah memberikan pengalihan atau izin yang cukup, terutama jika suara dibuat oleh agensi atau freelancer.</p>
        <h3>Merek Hologram dan Representasi Multi-Sudut</h3>
        <p>Hologram memberikan efek visual yang berubah ketika dilihat dari sudut berbeda. Tanda ini umum dipakai pada segel autentikasi, kemasan produk premium, kartu, dan perangkat keamanan. Karena karakter hologram tidak selalu dapat ditangkap satu gambar, pemohon harus menunjukkan representasi yang menjelaskan perubahan visual, urutan tampilan, warna, serta elemen yang dianggap sebagai identitas merek.</p>
        <p>Hologram yang hanya berfungsi sebagai fitur keamanan generik belum tentu memiliki daya pembeda. Pemohon perlu membedakan antara klaim atas tanda holografis tertentu dan klaim atas teknologi anti-pemalsuan secara umum. Deskripsi yang kabur dapat menyulitkan pemeriksaan dan penegakan ketika pihak lain menggunakan efek yang berbeda. Bukti produk asli, prosedur autentikasi, dan materi edukasi konsumen dapat membantu menunjukkan fungsi identifikasi.</p>
        <h3>Memilih Rezim Perlindungan yang Tepat</h3>
        <p>Satu inovasi dapat dilindungi oleh beberapa rezim secara kumulatif. Bentuk kemasan dapat dipertimbangkan sebagai desain industri, bagian teknisnya sebagai paten, logo atau nama sebagai merek, dan ilustrasi atau jingle sebagai hak cipta. Namun, setiap rezim memiliki syarat, jangka waktu, serta ruang lingkup berbeda. Pemilik brand harus menyusun strategi sebelum mempublikasikan desain karena kebaruan desain industri dan persyaratan pendaftaran tertentu dapat dipengaruhi oleh pengungkapan awal.</p>
        <p>Audit aset membantu menjawab pertanyaan penting: apakah tanda digunakan konsisten, siapa pemiliknya, apa bukti pembeda, dan bagaimana tanda dapat direpresentasikan dalam sistem DJKI? Pemeriksaan merek terdahulu juga harus dilakukan untuk menghindari konflik. Konsultan HKI dapat membantu merancang deskripsi, memilih kelas barang atau jasa, mengelola bukti, dan menyiapkan tanggapan jika pemeriksa meminta klarifikasi.</p>
        <h3>Kesimpulan dan Langkah Taktis</h3>
        <p>Merek non-tradisional memberi dimensi baru pada perlindungan identitas bisnis. Kemasan tiga dimensi, suara, dan hologram dapat menjadi aset penting bagi industri makanan, kosmetik, teknologi, dan layanan digital, tetapi hak eksklusif tidak lahir hanya karena tanda itu unik menurut pemiliknya. Daya pembeda, representasi yang jelas, non-fungsionalitas, kepemilikan yang bersih, dan bukti penggunaan harus dibangun sejak awal.</p>
        <p>HAKASA Group mendampingi pemilik brand dalam memetakan aset, melakukan clearance, menyusun dokumen representasi, dan menilai pilihan perlindungan yang paling tepat. Perlindungan melampaui logo dan nama membutuhkan dokumentasi yang disiplin serta strategi lintas-rezim agar investasi kreatif dapat dipertahankan secara efektif.</p>
        <hr><h4>Daftar Pustaka &amp; Referensi Edukasi</h4>
        <ul><li>Undang-Undang Republik Indonesia Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</li><li>Peraturan Menteri Hukum dan HAM Nomor 67 Tahun 2016 tentang Pendaftaran Merek.</li><li>World Intellectual Property Organization, <em>Standing Committee on the Law of Trademarks: Non-Traditional Marks</em>.</li><li>World Intellectual Property Organization, <em>WIPO Intellectual Property Handbook</em>.</li><li>Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta.</li><li>Undang-Undang Nomor 31 Tahun 2000 tentang Desain Industri.</li></ul>
      `
    }
  ];

  for (const article of articles) {
    const words = countWords(article.content);
    if (words < 850) throw new Error(`${article.slug} hanya ${words} kata; minimal 850 kata.`);
    await prisma.article.upsert({ where: { slug: article.slug }, update: article, create: article });
    console.log(`Sukses menyuntikkan: ${article.title} (${words} kata)`);
  }
  console.log("Proses injeksi Artikel 7 dan 8 selesai!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });