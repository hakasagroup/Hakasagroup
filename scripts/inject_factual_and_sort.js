const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("1. Memperbaiki Tanggal Artikel Faktual 1 & 2...");

  await prisma.article.updateMany({
    where: { slug: 'produk-viral-belum-tentu-aman-kemenkumham-umkm-merek-kolektif' },
    data: { createdAt: new Date('2026-10-10T10:00:00Z') }
  });

  await prisma.article.updateMany({
    where: { slug: 'terobosan-djki-oktober-2026-pendaftaran-merek-selesai-4-bulan' },
    data: { createdAt: new Date('2026-09-30T10:00:00Z') }
  });

  console.log("2. Menyuntikkan Artikel Faktual 3 & 4 dengan Tanggal Spesifik...");

  const articles = [
    {
      title: "Tembus 872 Pendaftaran di 2026: Strategi DJKI Bawa Merek Kolektif Indonesia ke Kancah Global via AHKFTA ECOTECH",
      slug: "872-pendaftaran-2026-djki-merek-kolektif-ahkfta-ecotech",
      category: "Merek",
      image: "",
      excerpt: "Berdasarkan rilis DJKI 2 Oktober 2026, pendaftaran Merek Kolektif di Indonesia telah menembus angka 872. Melalui kerja sama AHKFTA ECOTECH, pemerintah kini mendorong produk komunitas lokal untuk merajai pasar ekspor ASEAN hingga Hong Kong.",
      metaDesc: "Berita HKI 2026: Tembus 872 pendaftaran, DJKI kembangkan Merek Kolektif UMKM Indonesia untuk ekspor via AHKFTA ECOTECH. Pelajari syarat pendaftaran merek komunitas di sini.",
      keywords: "ahkfta ecotech 2026, pendaftaran merek kolektif djki, ekspor umkm indonesia, merek kolektif 2026, pendaftaran merek komunitas, perlindungan hki ukm, syarat merek kolektif indonesia",
      isPublished: true,
      createdAt: new Date('2026-10-02T10:00:00Z'),
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Berdasarkan rilis Direktorat Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum RI pada <strong>2 Oktober 2026</strong>, pendaftaran Merek Kolektif di Indonesia telah mencapai <strong>872 merek</strong>. Pencapaian ini menunjukkan meningkatnya kesadaran komunitas usaha untuk melindungi identitas dan kualitas produk secara bersama-sama.</p>

        <p>Merek Kolektif memberi ruang bagi koperasi, asosiasi pengrajin, BUMDes, dan kelompok usaha produktif untuk menggunakan satu tanda dengan karakteristik mutu yang sama. Model ini membantu pelaku UMKM menggabungkan kapasitas produksi, membagi biaya perlindungan, serta membangun reputasi produk daerah secara lebih konsisten.</p>

        <h3>AHKFTA ECOTECH sebagai Jalur Penguatan Pasar</h3>
        <p>DJKI mengaitkan pengembangan Merek Kolektif dengan kerja sama <em>ASEAN-Hong Kong, China Free Trade Agreement - Economic and Technical Cooperation</em> (AHKFTA ECOTECH). Forum tersebut membuka ruang peningkatan kapasitas ekonomi, investasi, dan perdagangan antara ASEAN dan Hong Kong, China.</p>

        <p>Dalam konteks ini, Merek Kolektif bukan sekadar label pemasaran. Ia dapat menjadi instrumen untuk memperkenalkan produk komunitas Indonesia ke pasar regional dengan identitas yang seragam, standar kualitas yang terdokumentasi, dan struktur pengelolaan yang jelas. Perlindungan lintas negara tetap memerlukan strategi pendaftaran di yurisdiksi tujuan, tetapi fondasinya dimulai dari kepemilikan dan penggunaan merek yang tertib di Indonesia.</p>

        <h3>Keunggulan Merek Kolektif bagi Komunitas</h3>
        <ul>
          <li><strong>Efisiensi biaya:</strong> biaya pendaftaran, pengelolaan, dan promosi dapat direncanakan bersama.</li>
          <li><strong>Standardisasi kualitas:</strong> pemohon wajib menyiapkan peraturan penggunaan yang mengatur karakteristik, mutu, pengawasan, dan sanksi.</li>
          <li><strong>Daya tawar lebih kuat:</strong> anggota dapat menggabungkan produksi dan menegosiasikan akses pasar sebagai satu komunitas.</li>
          <li><strong>Identitas daerah terlindungi:</strong> reputasi produk lokal dibangun melalui penggunaan tanda yang konsisten dan bertanggung jawab.</li>
        </ul>

        <h3>Dokumen yang Tidak Boleh Diabaikan</h3>
        <p>Permohonan Merek Kolektif membutuhkan lebih dari sekadar nama dan logo. Peraturan penggunaan harus menjelaskan sifat, ciri umum, mutu barang atau jasa, cara pengawasan, serta konsekuensi bagi anggota yang melanggar standar. Dokumen ini perlu disusun secara realistis agar dapat diterapkan, bukan sekadar formalitas untuk melengkapi permohonan.</p>

        <p>Komunitas juga perlu memastikan siapa pemilik merek, siapa yang berwenang mendaftarkan, bagaimana anggota memperoleh izin penggunaan, serta bagaimana perubahan anggota dan penyelesaian sengketa dilakukan. Tata kelola yang jelas akan mengurangi risiko konflik ketika merek mulai dikenal dan memiliki nilai ekonomi.</p>

        <h3>Kesimpulan HAKASA</h3>
        <p>Angka 872 pendaftaran menunjukkan bahwa Merek Kolektif semakin relevan sebagai sarana penguatan ekonomi berbasis komunitas. Keterlibatan DJKI dalam AHKFTA ECOTECH mempertegas pentingnya menghubungkan perlindungan merek dengan kesiapan ekspor, standardisasi, dan tata kelola kelompok.</p>
        <p>Koperasi, BUMDes, dan asosiasi pengusaha daerah sebaiknya melakukan audit identitas, menyusun peraturan penggunaan, dan memastikan kelas barang atau jasa sesuai dengan kegiatan anggotanya sebelum mengajukan permohonan ke DJKI.</p>

        <hr>
        <h4>Daftar Pustaka &amp; Referensi Faktual:</h4>
        <ul>
          <li>Direktorat Jenderal Kekayaan Intelektual Kementerian Hukum RI. (2026, 2 Oktober). <em>DJKI Kembangkan Merek Kolektif melalui AHKFTA ECOTECH 2026</em>. Publikasi resmi dgip.go.id.</li>
          <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis, ketentuan Merek Kolektif.</li>
          <li>Peraturan Menteri Hukum dan HAM Nomor 67 Tahun 2016 tentang Pendaftaran Merek.</li>
        </ul>
      `
    },
    {
      title: "Studi Kasus 2026: Pengalihan Hak Sebagai Solusi Taktis Penolakan Merek 'Amerta' dan 'Nadi' di DJKI",
      slug: "studi-kasus-pengalihan-hak-solusi-pendaftaran-merek-amerta-nadi-djki",
      category: "Merek",
      image: "",
      excerpt: "Berdasarkan rilis resmi DJKI pada 18 September 2026, sengketa pendaftaran merek 'Amerta' dan 'Nadi' berhasil diselesaikan melalui instrumen Pengalihan Hak. Pelajari bagaimana manuver hukum ini dapat menyelamatkan aset merek perusahaan Anda dari vonis penolakan tetap.",
      metaDesc: "Berita HKI 2026: DJKI selesaikan kasus merek Amerta dan Nadi (Sept 2026) melalui Pengalihan Hak. Panduan hukum cara membalikkan usulan penolakan merek melalui transaksi pengalihan hak di Kemenkumham.",
      keywords: "pengalihan hak merek djki, kasus merek amerta dan nadi, berita djki september 2026, solusi penolakan merek, cara beli hak merek, yohanes indro sodok djki, hukum kekayaan intelektual, konsultan hki jakarta",
      isPublished: true,
      createdAt: new Date('2026-09-18T10:00:00Z'),
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Usulan penolakan karena persamaan pada pokoknya tidak selalu harus berakhir dengan rebranding. Rilis DJKI Kementerian Hukum pada <strong>18 September 2026</strong> mengenai merek “Amerta” dan “Nadi” menyoroti Pengalihan Hak sebagai salah satu instrumen penyelesaian administratif yang dapat dipertimbangkan oleh pemohon.</p>

        <p>Pengalihan Hak merupakan perpindahan kepemilikan hak atas merek dari pemilik lama kepada pihak lain berdasarkan peristiwa atau perjanjian yang sah. Dalam praktiknya, mekanisme ini dapat menjadi solusi ketika terdapat merek terdahulu yang menjadi penghalang, sementara para pihak bersedia menyelesaikan persoalan secara komersial dan tertib.</p>

        <h3>Memahami Pengalihan Hak Merek</h3>
        <p>Pengalihan hak berbeda dari lisensi. Pengalihan memindahkan kepemilikan, sedangkan lisensi pada dasarnya memberikan hak penggunaan dalam batas tertentu tanpa memindahkan pemilik. Karena berdampak pada kepemilikan, dokumen pengalihan harus mengidentifikasi para pihak, nomor permohonan atau pendaftaran, kelas barang atau jasa, imbalan, dan ruang lingkup hak secara jelas.</p>

        <p>Pasal 41 Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis mengakui pengalihan hak atas merek karena pewarisan, wasiat, wakaf, hibah, perjanjian, atau sebab lain yang dibenarkan oleh peraturan perundang-undangan. Pengalihan tersebut perlu dicatatkan kepada Menteri agar memiliki akibat hukum terhadap pihak ketiga.</p>

        <h3>Tahapan Penyelesaian yang Perlu Diperiksa</h3>
        <ol>
          <li><strong>Identifikasi penghalang:</strong> periksa nomor, pemilik, kelas, status, dan relevansi merek yang disebut dalam usulan penolakan.</li>
          <li><strong>Uji kepemilikan dan kewenangan:</strong> pastikan pihak yang menawarkan pengalihan benar-benar pemilik atau memiliki kewenangan untuk bertindak.</li>
          <li><strong>Negosiasi dan dokumentasi:</strong> sepakati nilai transaksi, jaminan, pernyataan bebas sengketa, serta tanggung jawab masing-masing pihak.</li>
          <li><strong>Pencatatan di DJKI:</strong> ajukan dokumen pengalihan melalui prosedur resmi dan simpan bukti pencatatan.</li>
          <li><strong>Evaluasi permohonan:</strong> setelah pencatatan, periksa kembali strategi tanggapan terhadap surat pemeriksaan dan status permohonan yang berkaitan.</li>
        </ol>

        <h3>Risiko yang Harus Dihindari</h3>
        <p>Tanda terima pembayaran atau perjanjian privat saja tidak cukup untuk membuktikan perubahan pemilik terhadap pihak ketiga. Para pihak perlu memastikan dokumen memenuhi ketentuan administrasi, tanda tangan dan kewenangan dapat diverifikasi, serta tidak ada beban, lisensi, atau sengketa lain yang belum diungkapkan.</p>

        <p>Pengalihan juga bukan jaminan otomatis bahwa setiap permohonan akan diterima. Pemeriksa tetap menilai persyaratan formal dan substantif, termasuk klasifikasi barang atau jasa, iktikad baik, serta alasan penolakan lain yang mungkin berlaku. Karena itu, analisis dokumen dan komunikasi dengan DJKI harus dilakukan secara hati-hati.</p>

        <h3>Kesimpulan HAKASA</h3>
        <p>Kasus “Amerta” dan “Nadi” sebagaimana diberitakan DJKI pada September 2026 memperlihatkan pentingnya mempertimbangkan penyelesaian non-litigasi ketika sengketa merek memiliki ruang untuk diselesaikan melalui kesepakatan. Pengalihan Hak dapat menjadi pilihan strategis, tetapi harus dituangkan secara sah dan dicatatkan sesuai prosedur.</p>
        <p>Sebelum bernegosiasi, pemilik usaha sebaiknya melakukan penelusuran status, audit dokumen, pemeriksaan kewenangan, dan penilaian risiko. Dengan demikian, solusi yang dipilih tidak hanya menyelesaikan hambatan pendaftaran, tetapi juga memberikan kepastian kepemilikan untuk jangka panjang.</p>

        <hr>
        <h4>Daftar Pustaka &amp; Referensi Faktual:</h4>
        <ul>
          <li>Direktorat Jenderal Kekayaan Intelektual Kementerian Hukum RI. (2026, 18 September). <em>Pengalihan Hak Jadi Solusi Pendaftaran Merek Amerta dan Nadi</em>. Publikasi berita resmi dgip.go.id.</li>
          <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis, khususnya Pasal 41.</li>
          <li>Peraturan Menteri Hukum dan HAM Nomor 67 Tahun 2016 tentang Pendaftaran Merek.</li>
        </ul>
      `
    }
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: { ...article },
      create: { ...article }
    });
    console.log(`Sukses menyuntikkan fakta: ${article.title}`);
  }

  console.log("Proses injeksi selesai! Artikel sekarang diurutkan berdasarkan tanggal riil.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });