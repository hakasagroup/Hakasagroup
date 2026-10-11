const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function countWords(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

async function main() {
  console.log("Menyuntikkan Artikel 3 dan 4 (Premium HKI) ke database...");

  const articles = [
    {
      title: "Sengketa Merek Skincare Lokal Memanas di 2026: Membedah Batas Tipis 'Persamaan Pada Pokoknya' di Pengadilan Niaga",
      slug: "sengketa-merek-skincare-kosmetik-lokal-persamaan-pada-pokoknya-2026",
      category: "Merek",
      image: "",
      excerpt: "Industri kecantikan lokal mencatat rekor sengketa merek tertinggi di Pengadilan Niaga sepanjang paruh pertama 2026. Analisis hukum mengenai bagaimana hakim menentukan batas 'persamaan pada pokoknya' di tengah padatnya merek kosmetik yang menggunakan istilah generik serupa.",
      metaDesc: "Berita HKI 2026: Analisis sengketa merek skincare lokal di Pengadilan Niaga. Pahami kriteria Persamaan Pada Pokoknya menurut DJKI dan Mahkamah Agung untuk menghindari gugatan merek kosmetik.",
      keywords: "sengketa merek skincare 2026, persamaan pada pokoknya, putusan pengadilan niaga merek kosmetik, hukum merek indonesia, pendaftaran merek skincare, pembatalan merek djki",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Dinamika industri kecantikan dan perawatan kulit (<em>skincare</em>) di Indonesia tidak hanya memanas di ranah pemasaran digital, tetapi juga di ruang sidang Pengadilan Niaga. Memasuki pertengahan tahun 2026, Direktorat Jenderal Kekayaan Intelektual (DJKI) dan Pengadilan Niaga mencatat rekor tertinggi dalam hal jumlah oposisi dan gugatan pembatalan merek yang melibatkan sesama produsen kosmetik lokal. Lonjakan sengketa ini memunculkan diskursus hukum yang krusial di kalangan praktisi Kekayaan Intelektual (HKI): sejauh mana batas toleransi "Persamaan Pada Pokoknya" diterapkan dalam industri yang cenderung menggunakan nomenklatur seragam?</p>
        <p>Ledakan jumlah merek <em>skincare</em> lokal yang beredar di pasaran sejak pasca-pandemi telah menyebabkan terjadinya kongesti (kepadatan) nama merek di Kelas 3 (sediaan kosmetik dan perawatan tubuh). Kondisi ini memaksa para pemilik bisnis dan konsultan HKI untuk lebih jeli dalam memahami anatomi hukum perlindungan merek, agar terhindar dari jerat kanibalisme identitas bisnis yang dapat berujung pada penarikan produk (<em>product recall</em>) secara paksa oleh otoritas berwenang.</p>
        <h3>Kongesti Merek dan Dominasi Kosakata Generik</h3>
        <p>Akar permasalahan dari tingginya angka sengketa di sektor ini terletak pada kecenderungan pelaku usaha <em>skincare</em> untuk menggunakan kosakata yang bersifat deskriptif atau sugestif terhadap fungsi produk. Penggunaan kata-kata seperti <em>Glow, White, Skin, Derma, Beauty,</em> atau <em>Clear</em> mendominasi pangkalan data DJKI. Ketika puluhan ribu merek mencoba mendaftarkan variasi dari kata-kata yang sama, benturan hukum menjadi suatu keniscayaan yang tidak dapat dihindari.</p>
        <p>Berdasarkan pedoman pemeriksaan merek yang dikeluarkan oleh DJKI, sebuah kata yang bersifat umum atau menerangkan jenis barang sejatinya tidak dapat didaftarkan menjadi merek secara tunggal karena tidak memiliki daya pembeda (<em>distinctiveness</em>). Namun, ketika kata tersebut dirangkai dengan kata lain membentuk sebuah frasa baru, ia dapat lolos pemeriksaan. Masalah timbul ketika frasa-frasa baru ini saling menyerupai satu sama lain secara visual maupun fonetik.</p>
        <h3>Membedah Doktrin "Persamaan Pada Pokoknya"</h3>
        <p>Dalam rezim Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (UU MIG), Pasal 21 ayat (1) huruf a secara tegas menyatakan bahwa permohonan merek ditolak jika mempunyai persamaan pada pokoknya atau keseluruhannya dengan merek milik pihak lain yang sudah terdaftar lebih dahulu untuk barang dan/atau jasa yang sejenis.</p>
        <p>Menurut penjelasan resmi UU MIG dan berbagai yurisprudensi Mahkamah Agung (MA) hingga tahun 2026, "persamaan pada pokoknya" diartikan sebagai kemiripan yang disebabkan oleh adanya elemen yang dominan antara merek yang satu dengan merek yang lain. Penilaian ini dititikberatkan pada tiga aspek utama, yaitu:</p>
        <ol><li><strong>Persamaan Bentuk (Visual):</strong> Kesamaan dalam penggunaan logo, tipografi, susunan warna, hingga tata letak huruf yang dapat mengecoh pandangan konsumen secara sekilas.</li><li><strong>Persamaan Bunyi (Fonetik):</strong> Kesamaan pengucapan meskipun cara penulisannya berbeda. Contoh klasik di industri kosmetik adalah penggunaan akhiran "z" menggantikan "s" (seperti <em>Glows</em> vs <em>Glowz</em>), yang di mata hukum tetap dianggap memiliki persamaan fonetik tingkat tinggi.</li><li><strong>Persamaan Konseptual:</strong> Kesamaan makna atau ide dasar yang terkandung dalam merek tersebut.</li></ol>
        <h3>Pandangan Pengadilan Niaga: Uji Kebingungan Konsumen</h3>
        <p>Dalam menyelesaikan sengketa merek <em>skincare</em> sepanjang 2025-2026, majelis hakim di Pengadilan Niaga secara konsisten menerapkan prinsip <em>Likelihood of Confusion</em> (kemungkinan timbulnya kebingungan di masyarakat). Hakim tidak menelaah merek tersebut kata per kata secara terpisah dengan menggunakan kaca pembesar (<em>microscopic examination</em>), melainkan melihatnya secara utuh sebagai satu kesatuan impresi (<em>overall impression</em>) yang ditangkap oleh konsumen biasa yang daya ingatnya terbatas.</p>
        <p>Sebagai contoh hipotetis yang merefleksikan tren kasus terkini: Jika Merek A bernama "DERMABEAUTY" telah terdaftar, kemudian Merek B mendaftarkan "DERMA BEAUTIE", hakim hampir dipastikan akan membatalkan Merek B karena unsur dominan yang ditangkap oleh telinga dan mata konsumen adalah identik. Meskipun pihak Merek B berargumen bahwa penulisan "Beautie" berbeda dengan "Beauty", pengadilan menganggap perbedaan minor tersebut tidak cukup untuk menghapus persamaan pada pokoknya.</p>
        <h3>Dampak Finansial Berantai dari Kekalahan Sengketa Merek</h3>
        <p>Bagi produsen kosmetik, kalah dalam gugatan pembatalan merek bukan sekadar kehilangan nama dagang. Konsekuensi legal dan finansialnya sangat destruktif dan berantai:</p>
        <ul><li><strong>Pencabutan Izin Edar BPOM:</strong> BPOM mewajibkan legalitas merek dalam proses notifikasi kosmetik. Jika hak atas merek dibatalkan oleh pengadilan, BPOM dapat membekukan atau mencabut nomor notifikasi produk tersebut.</li><li><strong>Penarikan Produk:</strong> Pihak yang kalah wajib menarik seluruh produk dari distributor, ritel fisik, hingga <em>marketplace online</em> untuk mengganti kemasannya.</li><li><strong>Biaya Re-Branding:</strong> Perusahaan harus mencetak ulang kemasan, merancang kampanye pemasaran, dan membangun kembali <em>brand awareness</em> konsumen dari titik nol.</li><li><strong>Ancaman Ganti Rugi:</strong> Pihak pemenang dapat mengajukan tuntutan perdata atas kerugian materiil dan imateriil akibat penggunaan merek yang menyerupai.</li></ul>
        <h3>Strategi Mitigasi HKI bagi Pemilik Brand Kosmetik</h3>
        <p>Menghadapi tingginya risiko ini, HAKASA Group sangat menyarankan pengusaha <em>skincare</em> merumuskan nama merek yang dikategorikan sebagai <em>Fanciful</em> (kata ciptaan yang tidak memiliki arti di kamus) atau <em>Arbitrary</em> (kata umum yang tidak ada hubungannya dengan kosmetik, seperti "Apple" untuk komputer). Hindari penggunaan kata-kata generik yang terlalu mendeskripsikan sifat produk kosmetik.</p>
        <p>Selain itu, melakukan Penelusuran Merek (<em>Trademark Clearance Search</em>) secara mendalam sebelum produksi massal kemasan adalah langkah wajib. Penelusuran harus mencakup analisis fonetik dan konseptual, tidak hanya pencarian nama persis (<em>exact match</em>). Pemeriksaan juga perlu memetakan kelas terkait, pemilik merek terdahulu, status perpanjangan, dan penggunaan nyata di pasar.</p>
        <p>Pemilik bisnis sebaiknya menyimpan bukti penggunaan merek secara tertib, termasuk faktur, materi promosi, kontrak distributor, dan arsip peluncuran produk. Dokumentasi tersebut membantu menunjukkan iktikad baik apabila terdapat keberatan, sekaligus memperkuat posisi ketika membuktikan reputasi merek di hadapan pemeriksa atau hakim.</p>
        <h3>Kesimpulan</h3>
        <p>Sengketa merek di industri kecantikan lokal pada tahun 2026 memberikan sinyal keras bahwa DJKI dan Pengadilan semakin ketat dalam melindungi hak eksklusif pendaftar pertama (<em>first to file</em>). Garis batas "persamaan pada pokoknya" sangat tipis dan kerap menjebak pengusaha yang kurang literasi hukum. Melindungi investasi bisnis dengan mendaftarkan merek yang berdaya pembeda kuat adalah strategi pertahanan terbaik di tengah padatnya persaingan industri kosmetik Indonesia.</p>
        <hr><h4>Daftar Pustaka &amp; Referensi Faktual</h4>
        <ul><li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis, khususnya Pasal 21 ayat (1).</li><li>Direktorat Jenderal Kekayaan Intelektual. <em>Pedoman Pemeriksaan Merek</em>. Kementerian Hukum Republik Indonesia.</li><li>Mahkamah Agung Republik Indonesia. <em>Yurisprudensi Perkara Merek dan Indikasi Geografis</em>.</li><li>World Intellectual Property Organization. <em>WIPO Intellectual Property Handbook</em>.</li><li>Hukumonline. <em>Perlindungan Merek dan Persamaan pada Pokoknya</em>, diakses 2026.</li></ul>
      `
    },
    {
      title: "Menjadikan Sertifikat Merek Sebagai Agunan Pinjaman Bank: Panduan Praktis dan Realisasi Hukum di 2026",
      slug: "sertifikat-merek-sebagai-agunan-pinjaman-bank-pp-24-tahun-2022-realisasi-2026",
      category: "Merek",
      image: "",
      excerpt: "Sejak disahkannya PP No. 24 Tahun 2022, Kekayaan Intelektual kini sah menjadi objek jaminan utang. Bagaimana realisasi, mekanisme valuasi merek, dan prosedur hukumnya agar merek Anda dapat diterima oleh perbankan nasional di tahun 2026?",
      metaDesc: "Panduan 2026: Cara menjadikan sertifikat merek dagang sebagai agunan pinjaman bank berdasarkan PP No. 24 Tahun 2022. Pelajari syarat valuasi dan pengikatan Jaminan Fidusia HKI.",
      keywords: "merek sebagai agunan bank, pp 24 tahun 2022, jaminan fidusia kekayaan intelektual, valuasi merek dagang, pembiayaan umkm hki, hukum bisnis indonesia, sertifikat merek untuk pinjaman",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Paradigma pembiayaan bisnis di Indonesia telah mengalami pergeseran revolusioner. Selama puluhan tahun, perbankan dan lembaga pembiayaan konvensional hanya mengakui aset berwujud (<em>tangible assets</em>) seperti tanah, bangunan, atau kendaraan sebagai objek jaminan utang yang sah. Namun, seiring dengan berlakunya Peraturan Pemerintah Nomor 24 Tahun 2022 tentang Peraturan Pelaksanaan Undang-Undang Ekonomi Kreatif (PP 24/2022), Kekayaan Intelektual (KI) yang berbasis aset tak berwujud (<em>intangible assets</em>) kini secara resmi diakui sebagai objek jaminan utang yang memiliki nilai ekonomis tinggi.</p>
        <p>Memasuki tahun 2026, regulasi ini bukan lagi sekadar wacana di atas kertas. Berbagai lembaga perbankan nasional, terutama bank-bank BUMN, mulai mengimplementasikan skema pembiayaan berbasis Kekayaan Intelektual, dengan Sertifikat Merek Dagang sebagai salah satu jaminan potensial. Artikel edukasi HAKASA Group ini merincikan mekanisme hukum, syarat valuasi, dan proses pengikatan merek agar dapat dicairkan menjadi modal segar bagi ekspansi bisnis.</p>
        <h3>Landasan Hukum: Merek sebagai Objek Jaminan Fidusia</h3>
        <p>Pengakuan merek sebagai jaminan utang memiliki landasan hukum. Pasal 9 ayat (1) PP 24/2022 menyatakan bahwa pelaku ekonomi kreatif dapat mengajukan pembiayaan berbasis Kekayaan Intelektual kepada lembaga keuangan bank maupun non-bank. Bentuk pengikatan yang digunakan untuk menjaminkan merek adalah melalui skema <strong>Jaminan Fidusia</strong>.</p>
        <p>Jaminan Fidusia dipilih karena sifat alamiah HKI. Dalam fidusia, hak kepemilikan atas merek tersebut dijadikan jaminan kepada bank sebagai kreditor, namun hak penggunaan untuk menjalankan bisnis tetap berada di tangan pelaku usaha sebagai debitor. Pengusaha dapat menjalankan operasional secara normal selama masa pinjaman, tanpa kehilangan identitas bisnisnya. Akta dan pendaftaran fidusia harus disusun secara hati-hati agar objek, nilai penjaminan, dan kewenangan penggunaan tercatat jelas.</p>
        <h3>Syarat Mutlak Menjaminkan Merek ke Bank</h3>
        <p>Tidak semua merek terdaftar otomatis dapat diterima bank sebagai agunan. Prinsip kehati-hatian (<em>prudential banking principle</em>) menuntut pemeriksaan menyeluruh. Beberapa syarat kumulatif yang umumnya diminta adalah:</p>
        <ol><li><strong>Sertifikat Merek Resmi dari DJKI:</strong> Pemohon wajib memiliki sertifikat pendaftaran yang sah, bukan sekadar bukti tanda terima permohonan.</li><li><strong>Kepemilikan dan Masa Perlindungan:</strong> Merek harus atas nama pemohon atau debitor yang jelas, tidak sedang disengketakan, dan masa perlindungannya harus diperpanjang tepat waktu sehingga tidak berakhir sebelum tenor pinjaman.</li><li><strong>Telah Dikomersialisasikan:</strong> Merek tidak boleh berstatus merek tidur. Pemohon harus membuktikan produksi, distribusi, dan aliran pendapatan melalui laporan keuangan, rekening usaha, faktur, serta kontrak penjualan.</li><li><strong>Dokumen Bisnis Teratur:</strong> Legalitas badan usaha, perpajakan, perizinan produk, dan catatan utang harus konsisten agar bank dapat menilai kemampuan bayar selain nilai agunan.</li></ol>
        <h3>Proses Valuasi: Berapa Harga Merek Anda?</h3>
        <p>Tantangan terbesar adalah menilai harga sebuah nama. Berbeda dengan tanah yang mempunyai NJOP atau kendaraan yang mempunyai harga pasar, merek adalah aset abstrak. Oleh karena itu, diperlukan keterlibatan <strong>Penilai Publik</strong> yang teregistrasi di Kementerian Keuangan dan memiliki kompetensi valuasi aset tak berwujud.</p>
        <p>Dalam praktik, penilai dapat menggunakan satu atau kombinasi dari tiga pendekatan standar:</p>
        <ul><li><strong>Pendekatan Pendapatan:</strong> Menghitung nilai sekarang (<em>present value</em>) dari proyeksi keuntungan ekonomi yang dihasilkan kekuatan merek. Royalty relief, arus kas, dan pertumbuhan penjualan dapat menjadi parameter penting.</li><li><strong>Pendekatan Pasar:</strong> Membandingkan merek dengan aset sejenis yang dijual atau dilisensikan di industri yang sama. Ketersediaan transaksi pembanding menjadi tantangan karena banyak lisensi bersifat rahasia.</li><li><strong>Pendekatan Biaya:</strong> Menghitung biaya riset, pendaftaran, kampanye pemasaran, periklanan, dan biaya hukum. Metode ini berguna sebagai pembanding, tetapi belum tentu mencerminkan reputasi dan loyalitas konsumen.</li></ul>
        <h3>Risiko Gagal Bayar dan Eksekusi Merek</h3>
        <p>Apabila bisnis bangkrut dan gagal membayar cicilan, bank dapat mengeksekusi jaminan sesuai perjanjian, hukum fidusia, dan prosedur yang berlaku. Sertifikat merek dapat dilelang atau dijual di bawah tangan berdasarkan kesepakatan. Pemenang memperoleh hak untuk mengurus pengalihan dan menggunakan merek sesuai batas perlindungan yang terdaftar. Namun eksekusi harus menghormati hak debitor, asas proporsionalitas, serta larangan mengambil alih objek secara sepihak tanpa mekanisme hukum.</p>
        <p>Risiko tersebut membuat bank sangat selektif. Bank perlu memastikan merek memiliki <em>brand equity</em>, pasar yang nyata, tidak terikat lisensi bermasalah, dan dapat dialihkan secara administratif. Debitor juga perlu memahami bahwa menjaminkan merek bukan berarti menjualnya; selama kewajiban dipenuhi, hak penggunaan tetap dijalankan sesuai kontrak.</p>
        <h3>Mengapa Banyak UMKM Masih Ditolak?</h3>
        <p>Meskipun payung hukum tersedia, tingkat penolakan terhadap agunan merek masih relatif tinggi. Pertama, pembukuan keuangan tidak rapi dan rekening pribadi bercampur dengan rekening bisnis, sehingga kontribusi merek terhadap pendapatan sulit dilacak. Kedua, merek sedang dalam sengketa, kelasnya tidak relevan, atau masa perlindungannya hampir habis. Ketiga, pasar sekunder HKI masih berkembang sehingga bank khawatir aset tidak likuid ketika harus diuangkan.</p>
        <p>Untuk memperbaiki kesiapan, UMKM sebaiknya membuat laporan arus kas berkala, memisahkan rekening, mendokumentasikan penjualan, memperpanjang sertifikat tepat waktu, dan melakukan audit merek. Konsultasi dengan penilai publik, notaris, konsultan HKI, serta bank sejak awal juga dapat mengurangi kesalahan dalam menentukan nilai dan struktur pembiayaan.</p>
        <h3>Kesimpulan HAKASA</h3>
        <p>Kebijakan menjadikan sertifikat merek sebagai agunan bank merupakan pengakuan negara terhadap nilai ekonomi Kekayaan Intelektual. Merek kini dapat menjadi bagian dari strategi permodalan, tetapi tidak otomatis setara dengan tanah dalam hal likuiditas. Pendaftaran di DJKI hanyalah langkah fundamental pertama; langkah berikutnya adalah membangun tata kelola, pencatatan keuangan, reputasi, dan arus pendapatan yang profesional.</p>
        <p>HAKASA Group hadir untuk membantu memastikan aset Kekayaan Intelektual terdaftar dengan benar, aman dari sengketa, dan siap dioptimalkan sebagai kekuatan finansial. Keputusan menjaminkan merek harus dibuat setelah memahami nilai, risiko wanprestasi, kewajiban pelaporan, dan konsekuensi eksekusinya.</p>
        <hr><h4>Daftar Pustaka &amp; Referensi Regulasi</h4>
        <ul><li>Peraturan Pemerintah Republik Indonesia Nomor 24 Tahun 2022 tentang Peraturan Pelaksanaan Undang-Undang Nomor 24 Tahun 2019 tentang Ekonomi Kreatif.</li><li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</li><li>Undang-Undang Nomor 42 Tahun 1999 tentang Jaminan Fidusia.</li><li>Undang-Undang Nomor 24 Tahun 2019 tentang Ekonomi Kreatif.</li><li>WIPO. <em>Valuation of Intellectual Property Assets</em>. World Intellectual Property Organization.</li><li>Otoritas Jasa Keuangan. <em>Prinsip Kehati-hatian dan Penilaian Agunan dalam Pemberian Kredit</em>.</li></ul>
      `
    }
  ];

  for (const article of articles) {
    const words = countWords(article.content);
    if (words < 850) {
      throw new Error(`${article.slug} hanya ${words} kata; minimal 850 kata.`);
    }
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: { ...article },
      create: { ...article }
    });
    console.log(`Sukses menyuntikkan: ${article.title} (${words} kata)`);
  }
  console.log("Proses injeksi Artikel 3 dan 4 selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });