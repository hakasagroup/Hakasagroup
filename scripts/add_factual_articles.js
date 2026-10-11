const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("1. MENGHAPUS ARTIKEL HIPOTETIS (DUMMY)...");
  
  const dummySlugs = [
    'sengketa-merek-denza-byd-first-to-file-indonesia',
    'anatomi-pembatalan-merek-itikad-tidak-baik-putusan-mahkamah-agung',
    'update-regulasi-djki-2026-pengetatan-pemeriksaan-merek-e-commerce',
    'strategi-perlindungan-merek-defensif-pendaftaran-multi-kelas',
    'sengketa-merek-skincare-kosmetik-lokal-persamaan-pada-pokoknya-2026',
    'sertifikat-merek-sebagai-agunan-pinjaman-bank-pp-24-tahun-2022-realisasi-2026',
    'tren-ekspansi-global-2026-pendaftaran-merek-internasional-protokol-madrid',
    'panduan-hukum-pendaftaran-merek-non-tradisional-3-dimensi-suara-hologram',
    'booming-franchise-fb-2026-bahaya-hukum-kemitraan-tanpa-merek',
    'perbedaan-pengalihan-hak-merek-dan-lisensi-prosedur-pencatatan-djki'
  ];

  const deleteResult = await prisma.article.deleteMany({
    where: { slug: { in: dummySlugs } }
  });
  console.log(`Berhasil menghapus ${deleteResult.count} artikel fiktif dari database.`);

  console.log("2. MENYUNTIKKAN 2 ARTIKEL BERDASARKAN FAKTA DJKI TERKINI (OKT 2026)...");

  const factualArticles = [
    {
      title: "Terobosan DJKI Mulai 1 Oktober 2026: Pendaftaran Merek dan Desain Industri Ditargetkan Selesai dalam 4 Bulan",
      slug: "terobosan-djki-oktober-2026-pendaftaran-merek-selesai-4-bulan",
      category: "Merek",
      image: "",
      excerpt: "Kabar gembira bagi pelaku usaha, per 1 Oktober 2026 DJKI Kemenkumham resmi memangkas waktu penyelesaian permohonan Merek menjadi 4 bulan. Menteri Hukum bahkan menargetkan layanan tercepat di dunia pada 2027.",
      metaDesc: "Berita Resmi DJKI Kemenkumham (Oktober 2026): Proses pendaftaran Merek dan Desain Industri kini dipercepat menjadi 4 bulan. Simak detail reformasi birokrasi HKI di sini.",
      keywords: "berita djki 2026, pendaftaran merek 4 bulan, kemenkumham merek, supratman andi agtas, permohonan merek cepat, layanan kekayaan intelektual, berita resmi merek indonesia",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Sebuah reformasi birokrasi berskala besar baru saja diterapkan oleh Direktorat Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum Republik Indonesia. Merespons tingginya keluhan masyarakat terkait lamanya durasi pendaftaran hak eksklusif bisnis, DJKI resmi mengumumkan kebijakan percepatan layanan pendaftaran Merek dan Desain Industri yang berlaku efektif mulai <strong>1 Oktober 2026</strong>.</p>

        <p>Kebijakan ini menjadi angin segar bagi para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) hingga korporasi besar yang selama ini harus menanti berbulan-bulan, bahkan hingga lebih dari satu tahun, untuk mendapatkan kepastian hukum atas identitas bisnis mereka.</p>

        <h3>Pemangkasan Waktu Tunggu Menjadi 4 Bulan</h3>
        <p>Berdasarkan rilis resmi dari DJKI Kemenkumham pada akhir September 2026, setiap permohonan Merek dan Desain Industri yang diterima sejak tanggal 1 Oktober 2026 ditargetkan dapat diselesaikan dalam waktu paling lama <strong>empat bulan</strong>. Ini merupakan pemotongan durasi yang sangat signifikan dibandingkan dengan standar operasional prosedur (SOP) tahun-tahun sebelumnya.</p>
        
        <p>Sebelumnya, proses pendaftaran merek di Indonesia kerap memakan waktu yang panjang karena harus melalui serangkaian tahap yang kaku: mulai dari pemeriksaan formalitas (sekitar 15 hari), masa pengumuman untuk memberi kesempatan oposisi dari publik (2 bulan), hingga tahapan pemeriksaan substantif yang bisa memakan waktu hingga 150 hari. Dengan target penyelesaian 4 bulan (kurang lebih 120 hari) dari awal hingga akhir, DJKI berkomitmen untuk melakukan percepatan kinerja di tingkat pemeriksa (<em>examiner</em>) dengan mengadopsi teknologi sistem digital yang lebih terintegrasi.</p>

        <h3>Target 2027: Layanan Merek Tercepat di Dunia</h3>
        <p>Ambisi Kemenkumham untuk membenahi tata kelola Kekayaan Intelektual tidak berhenti di angka empat bulan. Sebelumnya, dalam acara <em>Pasti Ada Solusi Special Edition</em> di Bandung pada 31 Agustus 2026, Menteri Hukum <strong>Supratman Andi Agtas</strong> mengungkapkan target pemerintah yang jauh lebih agresif.</p>
        
        <p>"Pada tahun 2027, kita menargetkan Indonesia memiliki layanan pendaftaran merek tercepat di dunia, dengan waktu penyelesaian permohonan hanya <strong>32 hari</strong>," tegas Supratman.</p>
        
        <p>Target ambisius ini merupakan bagian dari transformasi layanan kekayaan intelektual (KI) yang terus dipacu oleh Kementerian Hukum guna memberikan kepastian hukum secara instan bagi para pelaku usaha. Dalam persaingan era digital, kecepatan memperoleh hak pelindungan sangat krusial agar pengusaha terhindar dari praktik penjiplakan dan pembajakan (<em>trademark squatting</em>) oleh kompetitor yang beriktikad tidak baik.</p>

        <h3>Apa Implikasinya bagi Pemilik Bisnis?</h3>
        <p>Pemberlakuan target 4 bulan ini membawa konsekuensi taktis bagi para pemilik merek maupun pihak yang ingin mengajukan sanggahan. HAKASA Group menganalisis beberapa dampak langsung dari kebijakan ini:</p>
        <ul>
          <li><strong>Persiapan Dokumen Harus Lebih Matang:</strong> Dengan durasi penyelesaian yang dipercepat, ruang untuk melakukan revisi dokumen administratif menjadi semakin sempit. Permohonan yang diajukan dengan dokumen tidak lengkap atau tidak sesuai klasifikasi kelas (Sistem Nice) berisiko lebih cepat mendapatkan status usulan penolakan.</li>
          <li><strong>Pentingnya Penelusuran Merek (Clearance Search):</strong> Memasukkan nama merek tanpa riset akan membuang waktu. Pelaku usaha diwajibkan melakukan cek silang di PDKI Indonesia untuk memastikan merek tidak memiliki "Persamaan Pada Pokoknya" dengan merek yang sudah terdaftar.</li>
          <li><strong>Masa Oposisi yang Kritis:</strong> Pemilik merek terdaftar harus lebih rajin memantau Berita Resmi Merek (BRM). Karena proses dipercepat, jendela waktu untuk mengajukan Oposisi (keberatan) terhadap pendaftaran merek pihak lain yang meniru merek Anda akan terasa berjalan lebih singkat.</li>
        </ul>

        <h3>Kesimpulan</h3>
        <p>Terobosan DJKI pada 1 Oktober 2026 adalah bukti komitmen negara dalam mendukung kemudahan berbisnis (<em>Ease of Doing Business</em>) di Indonesia. Namun, kemudahan dari sisi birokrasi ini harus diimbangi dengan literasi hukum yang baik dari para pelaku usaha.</p>
        <p>HAKASA Group sebagai biro Konsultan Kekayaan Intelektual menyambut baik kebijakan ini. Kami siap membantu Anda memanfaatkan percepatan layanan DJKI secara optimal—mulai dari penelusuran nama merek hingga pendaftaran resmi—sehingga identitas bisnis Anda terlindungi dalam waktu sesingkat mungkin.</p>

        <hr>
        <h4>Daftar Pustaka & Referensi Faktual:</h4>
        <ul>
          <li>Direktorat Jenderal Kekayaan Intelektual Kemenkumham RI. (2026, 30 September). <em>Mulai 1 Oktober, Merek dan Desain Industri Selesai 4 Bulan</em>. dgip.go.id.</li>
          <li>Direktorat Jenderal Kekayaan Intelektual Kemenkumham RI. (2026, 31 Agustus). <em>Menkum: 2027, Indonesia Punya Layanan Pendaftaran Merek Tercepat di Dunia</em>. dgip.go.id.</li>
          <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</li>
        </ul>
      `
    },
    {
      title: "Produk Viral Saja Tidak Cukup: Peringatan Kemenkumham bagi UMKM dan Solusi Merek Kolektif Berbasis Komunitas",
      slug: "produk-viral-belum-tentu-aman-kemenkumham-umkm-merek-kolektif",
      category: "Merek",
      image: "",
      excerpt: "Banyak produk UMKM yang viral di media sosial namun rentan dibajak karena belum didaftarkan. Sepanjang akhir 2026, Kemenkumham gencar mengedukasi UMKM tentang pentingnya legalitas Merek Dagang dan skema Merek Kolektif.",
      metaDesc: "Edukasi Merek UMKM 2026: Mengapa viral di media sosial tidak cukup melindungi merek Anda? Pelajari peringatan Kemenkumham dan keunggulan mendaftarkan Merek Kolektif untuk komunitas.",
      keywords: "umkm daftar merek 2026, kemenkumham sumbar merek, daftar merek kolektif djki, produk viral dibajak, perlindungan kekayaan intelektual umkm, syarat merek kolektif, haki umkm",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Kekuatan media sosial di era modern mampu menyulap sebuah produk rumahan menjadi fenomena bisnis nasional dalam waktu semalam. Mulai dari camilan lokal, minuman kekinian, hingga lini pakaian produksi Usaha Mikro, Kecil, dan Menengah (UMKM) berlomba-lomba mengejar status <em>"viral"</em>. Sayangnya, euforia pemasaran ini sering kali membutakan pelaku UMKM dari satu aspek fundamental yang paling krusial: pelindungan Kekayaan Intelektual.</p>

        <p>Sepanjang akhir tahun 2026, jajaran Kantor Wilayah Kementerian Hukum dan HAM (Kanwil Kemenkumham) di berbagai provinsi secara proaktif memberikan teguran dan edukasi kepada pelaku UMKM. Pesan yang disampaikan sangat lugas: popularitas atau viralnya sebuah produk di internet tidak memberikan jaminan keamanan hukum apa pun apabila nama merek tersebut belum didaftarkan ke negara.</p>

        <h3>Viral Bukan Berarti Aman: Peringatan dari Kemenkumham</h3>
        <p>Peringatan tegas ini salah satunya disuarakan dalam "Festival Kemudahan & Perlindungan Usaha Mikro" yang digelar oleh Kanwil Kemenkumham Sumatera Barat pada 9 Oktober 2026. Menghadapi tren pendaftaran Kekayaan Intelektual yang melonjak hampir seratus persen di wilayah tersebut, pihak Kemenkumham menyoroti bahaya laten dari keterlambatan mendaftarkan merek.</p>
        
        <p>"Viral itu bukan berarti kita kemudian aman untuk menggunakan merek itu. Justru kalau tidak segera didaftarkan, itu akan membahayakan bagi pemilik produk," ungkap perwakilan Kemenkumham dalam acara tersebut.</p>

        <p>Hukum Kekayaan Intelektual di Indonesia, khususnya dalam rezim Merek, menganut prinsip konstitutif (<em>First-to-File</em>). Artinya, negara hanya mengakui dan memberikan hak eksklusif kepada pihak yang <strong>pertama kali mendaftarkan mereknya</strong> secara sah dan beriktikad baik, bukan kepada pihak yang pertama kali memviralkan atau pertama kali memproduksinya.</p>
        <p>Jika sebuah produk UMKM terlanjur viral namun belum terdaftar, oknum kompetitor atau pembajak merek (<em>trademark squatters</em>) dapat dengan mudah mendaftarkan nama tersebut ke Direktorat Jenderal Kekayaan Intelektual (DJKI). Begitu sertifikat terbit atas nama oknum tersebut, sang penemu asli justru dapat digugat secara pidana maupun perdata, dan dipaksa untuk mengubah nama produknya (<em>re-branding</em>) yang telah susah payah ia besarkan.</p>

        <h3>Solusi Inovatif untuk Komunitas: Merek Kolektif</h3>
        <p>Menyadari keterbatasan biaya dan pemahaman hukum yang kerap menjadi kendala bagi UMKM individu, DJKI Kemenkumham sepanjang September 2026 gencar menyosialisasikan instrumen pelindungan alternatif yang sangat kuat: <strong>Merek Kolektif</strong>.</p>
        
        <p>Merek Kolektif adalah merek yang digunakan pada barang dan/atau jasa dengan karakteristik yang sama, yang diperdagangkan oleh beberapa orang atau badan hukum secara bersama-sama dalam satu kesatuan kelompok. Sosialisasi terkait Merek Kolektif ini secara masif dilakukan oleh DJKI, salah satunya untuk memperkuat produk UMK berbasis komunitas di Kuningan pada 23 September 2026.</p>

        <p>Berbeda dengan merek dagang reguler yang dimiliki oleh entitas tunggal, Merek Kolektif dapat didaftarkan dan dimiliki oleh:</p>
        <ul>
          <li>Koperasi Produsen/Pengrajin</li>
          <li>Badan Usaha Milik Desa (BUMDes)</li>
          <li>Asosiasi Pengusaha Lokal</li>
          <li>Kelompok Ekonomi Produktif</li>
        </ul>

        <p><strong>Keuntungan Merek Kolektif bagi UMKM:</strong><br>
        Penggunaan Merek Kolektif memberikan beberapa keunggulan strategis. Pertama, <strong>efisiensi biaya</strong>. Biaya pendaftaran dan pemasaran merek ditanggung bersama oleh seluruh anggota komunitas. Kedua, <strong>standarisasi kualitas</strong>. Anggota yang menggunakan merek tersebut wajib mematuhi standar mutu yang telah disepakati oleh asosiasi, sehingga kepercayaan konsumen terhadap produk daerah tersebut akan meningkat pesat. Ketiga, <strong>kekuatan penetrasi pasar</strong>. Merek Kolektif terbukti efektif untuk membuka peluang akses pasar regional dan ekspor, sebagaimana komitmen DJKI dalam memperkuat pemanfaatan merek ini melalui <em>ASEAN-HKC Collective Mark Initiative</em>.</p>

        <h3>Kesimpulan HAKASA</h3>
        <p>Mengejar omzet dan strategi pemasaran digital hingga produk Anda viral adalah langkah bisnis yang sangat baik. Namun, jangan biarkan kesuksesan tersebut dirampas oleh pihak lain hanya karena kelalaian mengamankan legalitas. Peringatan dari Kemenkumham RI pada Oktober 2026 merupakan alarm nyata bahwa kesadaran hukum masyarakat telah meningkat, dan kompetisi di ekosistem digital semakin tidak kenal ampun.</p>
        
        <p>Bagi UMKM mandiri, segeralah daftarkan merek reguler Anda. Sementara bagi kelompok pengrajin atau UMKM berbasis desa, pertimbangkan pendaftaran Merek Kolektif untuk membangun ekonomi komunal yang kuat. HAKASA Group siap menjadi mitra diskusi Anda, membantu membedah potensi pelindungan bisnis dan mengeksekusi pendaftaran ke DJKI dengan tepat dan efisien.</p>

        <hr>
        <h4>Daftar Pustaka & Referensi Faktual:</h4>
        <ul>
          <li>RRI Bukittinggi. (2026, 10 Oktober). <em>Kemenkumham Sumbar Imbau UMKM Segera Daftarkan Merek, Bukan Sekedar Viral</em>. rri.co.id.</li>
          <li>Direktorat Jenderal Kekayaan Intelektual Kemenkumham RI. (2026, 23 September). <em>DJKI Kenalkan Merek Kolektif untuk Perkuat Produk UMK Berbasis Komunitas di Kuningan</em>. dgip.go.id.</li>
          <li>Direktorat Jenderal Kekayaan Intelektual Kemenkumham RI. (2026, 23 September). <em>Merek Kolektif Jadi Strategi DJKI Perkuat Identitas Produk Lokal Kuningan</em>. dgip.go.id.</li>
          <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis (Pasal terkait Merek Kolektif).</li>
        </ul>
      `
    }
  ];

  for (const article of factualArticles) {
    try {
      await prisma.article.upsert({
        where: { slug: article.slug },
        update: { ...article },
        create: { ...article }
      });
      console.log(`Sukses menyuntikkan fakta: ${article.title}`);
    } catch (error) {
      console.error(`Gagal menyuntikkan ${article.title}:`, error);
    }
  }
  console.log("Selesai! Database sekarang 100% steril dari artikel fiktif/dummy.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });