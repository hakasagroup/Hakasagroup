const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function countWords(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  console.log("Menyuntikkan Artikel 9 dan 10 (Sengketa Franchise & Pengalihan Hak) ke database...");

  const articles = [
    {
      title: "Booming Franchise F&B 2026: Bahaya Hukum Menjual Paket Kemitraan Tanpa Sertifikat Merek DJKI",
      slug: "booming-franchise-fb-2026-bahaya-hukum-kemitraan-tanpa-merek",
      category: "Merek",
      image: "",
      excerpt: "Tren bisnis kemitraan (franchise) minuman dan makanan ringan di tahun 2026 memicu gelombang sengketa hukum. Ratusan mitra menggugat franchisor akibat penggunaan merek dagang yang ternyata berstatus ditolak oleh DJKI.",
      metaDesc: "Berita Bisnis 2026: Risiko hukum menjual paket kemitraan (franchise) F&B tanpa sertifikat merek DJKI. Analisis sengketa merek waralaba dan syarat legalitas bisnis kemitraan di Indonesia.",
      keywords: "sengketa merek franchise 2026, hukum waralaba indonesia, kemitraan f&b tanpa merek, penipuan franchise merek, daftar merek kuliner, lisensi merek djki, sengketa bisnis kemitraan",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Lanskap bisnis kuliner (<em>Food and Beverage</em>/F&amp;B) Indonesia pada 2026 diwarnai ekspansi kilat berbasis kemitraan atau <em>Business Opportunity</em>. Merek minuman, ayam geprek, dan camilan viral bermunculan di berbagai kota. Di balik pertumbuhan tersebut terdapat persoalan serius: sebagian pemilik usaha menawarkan paket kemitraan sebelum memastikan status merek dan hak kekayaan intelektualnya.</p>
        <p>Sengketa biasanya muncul ketika pemohon merek memperoleh usulan penolakan, menghadapi oposisi, atau ternyata menggunakan tanda yang memiliki persamaan pada pokoknya dengan merek terdahulu. Mitra yang telah membayar <em>franchise fee</em> kemudian menerima somasi, harus menurunkan papan nama, mengganti kemasan, atau menghentikan operasional. Peristiwa ini menunjukkan bahwa pemeriksaan legalitas tidak boleh dilakukan setelah gerai dibuka.</p>
        <h3>Ilusi Legalitas: Tanda Terima Bukan Sertifikat</h3>
        <p>Taktik pemasaran yang sering menyesatkan adalah memamerkan tanda terima permohonan sebagai bukti bahwa merek sudah aman. Tanda terima hanya membuktikan permohonan diterima untuk diproses. DJKI masih dapat menerima oposisi selama masa pengumuman dan pemeriksa dapat menemukan alasan penolakan absolut maupun relatif. Hak eksklusif yang kuat tidak boleh diasumsikan lahir hanya karena formulir telah diajukan.</p>
        <p>Perbedaan antara permohonan, pendaftaran, dan sertifikat harus dijelaskan kepada calon mitra dalam dokumen penawaran. Franchisor juga wajib menyampaikan risiko secara jujur apabila merek masih diperiksa. Menggunakan bahasa pemasaran seperti "merek telah terlindungi penuh" padahal statusnya masih pending dapat menimbulkan sengketa informasi, wanprestasi, bahkan dugaan perbuatan melawan hukum berdasarkan fakta dan niat para pihak.</p>
        <h3>Ketika Merek Ditolak dan Gerai Mitra Terancam</h3>
        <p>Jika permohonan ditolak karena persamaan pada pokoknya, pemilik merek terdahulu dapat mengirimkan somasi kepada franchisor dan gerai mitra. Mitra mungkin bukan pihak yang menciptakan kemiripan, tetapi penggunaan tanda di pasar tetap dapat dipersoalkan. Kerugian tidak berhenti pada biaya paket. Ada sewa tempat, renovasi, stok bahan baku, gaji karyawan, biaya promosi, dan hilangnya kepercayaan pelanggan.</p>
        <p>Dalam keadaan demikian, franchisor perlu segera menilai opsi sanggahan, banding, negosiasi, atau rebranding. Mitra perlu memeriksa perjanjian: apakah tersedia jaminan pengembalian biaya, kewajiban penggantian kerugian, atau klausul yang mengatur risiko apabila hak merek gagal diperoleh. Kontrak yang hanya memuat target omzet tanpa mengatur status HKI merupakan tanda bahaya dalam transaksi kemitraan.</p>
        <h3>Konsekuensi Hukum Perjanjian Kemitraan</h3>
        <p>Objek penting dalam waralaba adalah hak menggunakan merek, sistem bisnis, rahasia dagang, dan dukungan operasional. Perjanjian harus memenuhi syarat sah perjanjian dalam Pasal 1320 KUHPerdata serta ketentuan waralaba yang berlaku. Apabila franchisor menjanjikan hak yang ternyata tidak dimilikinya, mitra dapat mempertimbangkan tuntutan pembatalan, pengembalian pembayaran, dan ganti rugi berdasarkan bukti perjanjian serta kerugian nyata.</p>
        <p>Penilaian pidana tidak boleh dilakukan secara serampangan. Pasal penipuan hanya dapat diterapkan apabila unsur delik dan kesengajaan terbukti oleh aparat penegak hukum. Namun, penyampaian informasi palsu, penyembunyian status penolakan, atau penggunaan dokumen yang tidak benar dapat meningkatkan risiko hukum secara signifikan. Transparansi bukan sekadar etika; ia merupakan perlindungan bagi semua pihak.</p>
        <h3>Tiga Pilar Audit Sebelum Menjual Paket</h3>
        <ol><li><strong>Verifikasi merek:</strong> Periksa PDKI, kelas barang atau jasa, status pemeriksaan, sertifikat, pemilik terdaftar, dan potensi konflik. Gunakan <em>clearance search</em> visual, fonetik, dan konseptual.</li><li><strong>Perjanjian yang seimbang:</strong> Atur ruang lingkup lisensi, wilayah, standar merek, royalti, pelatihan, pasokan, pengakhiran, force majeure, rebranding, dan kompensasi apabila terjadi masalah HKI.</li><li><strong>Pencatatan lisensi dan kepatuhan waralaba:</strong> Pastikan lisensi dicatatkan sesuai ketentuan dan penuhi kewajiban dokumen waralaba, pengungkapan informasi, serta perizinan usaha yang relevan.</li></ol>
        <p>Franchisor sebaiknya juga memiliki register aset HKI dan kalender perpanjangan. Setiap materi promosi perlu menggunakan versi logo yang disetujui, sementara mitra harus diberi panduan tentang larangan memodifikasi merek. Audit berkala terhadap gerai dapat mencegah logo berubah menjadi tanda yang justru berbeda dari sertifikat. Semua bukti penjualan, kampanye, dan penggunaan harus disimpan untuk memperkuat posisi hukum.</p>
        <p>Due diligence juga harus mencakup pemeriksaan hubungan antara merek dan badan usaha. Nama pada sertifikat, nama perseroan, pemilik manfaat, dan pihak yang menerima pembayaran paket harus dapat dijelaskan. Jika merek dimiliki pribadi tetapi paket dijual oleh perusahaan, kontrak harus memuat dasar kewenangan penggunaan. Ketidaksesuaian ini sering baru terlihat ketika mitra meminta pengembalian dana atau ketika pemilik merek mengirimkan somasi.</p>
        <p>Franchisor wajib membedakan biaya lisensi, biaya peralatan, bahan baku, pelatihan, dan dukungan pemasaran. Rincian tersebut membuat mitra memahami apa yang sebenarnya dibeli dan mengurangi klaim bahwa pembayaran dilakukan berdasarkan janji yang tidak pernah tersedia. Proyeksi keuntungan pun harus disampaikan sebagai estimasi dengan asumsi yang jelas, bukan jaminan hasil. Tata kelola transparan membantu membangun hubungan jangka panjang sekaligus mengurangi risiko sengketa kolektif secara berkelanjutan.</p>
        <h3>Due Diligence bagi Calon Mitra</h3>
        <p>Calon franchisee tidak cukup hanya menghitung proyeksi balik modal. Mintalah salinan sertifikat atau status resmi permohonan, identitas pemilik merek, bukti pencatatan lisensi, laporan sengketa, dan dokumen penawaran. Periksa apakah pihak yang menandatangani kontrak merupakan pemilik atau penerima kuasa yang sah. Bandingkan klaim omzet dengan data transaksi dan tanyakan skenario jika merek tidak dapat digunakan.</p>
        <h3>Kesimpulan</h3>
        <p>Bisnis kemitraan dapat mempercepat skala usaha, tetapi ekspansi tanpa merek yang sah ibarat membangun gedung di atas rawa. Sertifikat bukan satu-satunya dokumen yang diperlukan, namun merupakan fondasi penting untuk memberikan kepastian penggunaan tanda. HAKASA Group membantu melakukan audit portofolio HKI, menyusun perjanjian, dan memetakan risiko sebelum paket kemitraan ditawarkan kepada publik.</p>
        <hr><h4>Daftar Pustaka &amp; Referensi Faktual</h4>
        <ul><li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</li><li>Kitab Undang-Undang Hukum Perdata, khususnya Pasal 1320.</li><li>Peraturan Pemerintah Nomor 42 Tahun 2007 tentang Waralaba.</li><li>Peraturan Menteri Perdagangan Nomor 71 Tahun 2019 tentang Penyelenggaraan Waralaba.</li><li>WIPO, <em>WIPO Intellectual Property Handbook</em>.</li></ul>
      `
    },
    {
      title: "Panduan Legal Monetisasi Aset: Perbedaan Pengalihan Hak dan Lisensi Merek Serta Prosedur Pencatatannya di DJKI",
      slug: "perbedaan-pengalihan-hak-merek-dan-lisensi-prosedur-pencatatan-djki",
      category: "Merek",
      image: "",
      excerpt: "Memiliki merek terdaftar berarti Anda memiliki aset yang dapat diuangkan. Pahami prosedur hukum, persyaratan akta, dan pentingnya pencatatan pengalihan hak merek di DJKI agar transaksi akuisisi brand sah di mata hukum.",
      metaDesc: "Edukasi HKI: Panduan cara mengalihkan hak merek dan mencatat lisensi merek di DJKI. Pelajari syarat dokumen, akta pengalihan, surat kuasa, dan pencatatan sesuai UU MIG.",
      keywords: "pengalihan hak merek djki, lisensi merek dagang, pencatatan pengalihan hak merek, akta notaris jual beli merek, cara jual beli merek, monetisasi aset hki, uu no 20 tahun 2016",
      isPublished: true,
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Merek terdaftar bukan sekadar alat pembeda, melainkan aset benda bergerak tidak berwujud yang dapat menghasilkan nilai ekonomi. Merek dapat digunakan untuk memperluas jaringan, memperoleh royalti, dijadikan bagian dari akuisisi, atau diwariskan. Namun, monetisasi tersebut harus membedakan dua mekanisme yang sering tertukar: <strong>pengalihan hak</strong> dan <strong>lisensi</strong>.</p>
        <p>Pengalihan memindahkan kepemilikan, sedangkan lisensi memberikan izin penggunaan tanpa memindahkan pemilik. Kesalahan memilih instrumen dapat membuat pihak yang membayar harga akuisisi tetap tidak tercatat sebagai pemilik atau membuat penerima lisensi tidak memiliki posisi yang kuat terhadap pihak ketiga. Dokumentasi kontrak dan pencatatan pada DJKI menjadi bagian penting dari manajemen aset.</p>
        <h3>Pengalihan Hak Merek</h3>
        <p>Pengalihan hak (<em>assignment</em>) adalah perpindahan kepemilikan merek secara penuh kepada pihak lain. Dasarnya dapat berupa pewarisan, wasiat, hibah, perjanjian, atau sebab lain yang dibenarkan peraturan. Setelah transaksi efektif dan dicatat, penerima menjadi pemegang hak baru, termasuk hak untuk menggunakan, melisensikan, memperpanjang, atau menegakkan merek dalam batas pendaftaran.</p>
        <p>Transaksi pengalihan harus melewati uji tuntas. Periksa siapa pemilik yang tercatat, apakah merek masih berlaku, apakah terdapat lisensi atau jaminan, apakah sedang disengketakan, dan apakah daftar barang sesuai dengan bisnis yang dibeli. Akuisisi akun marketplace tidak otomatis mengalihkan merek. Akun, domain, stok, desain, hak cipta, dan merek merupakan aset berbeda yang perlu dicantumkan secara terpisah dalam kontrak.</p>
        <h3>Risiko Transaksi Bawah Tangan</h3>
        <p>Pengusaha sering membeli toko daring beserta brand hanya dengan kuitansi atau surat jual beli sederhana. Dokumen tersebut dapat menjadi bukti hubungan kontraktual, tetapi belum tentu cukup untuk memperbarui data pemilik pada DJKI. Selama pencatatan belum dilakukan, data publik masih menunjukkan pemilik lama. Kondisi ini menimbulkan risiko ketika pemilik lama mengajukan perpanjangan, memberikan lisensi kepada pihak lain, atau menyangkal transaksi.</p>
        <p>Kontrak pengalihan sebaiknya mengatur identitas para pihak, nomor pendaftaran, harga dan cara pembayaran, tanggal efektif, jaminan bebas sengketa, kewajiban menyerahkan dokumen, peralihan reputasi dan materi brand, pajak, kerahasiaan, serta penyelesaian sengketa. Untuk transaksi korporasi, kewenangan penandatangan dan persetujuan organ perusahaan harus diverifikasi. Akta notaris atau dokumen yang memenuhi persyaratan administrasi akan memperkuat proses pencatatan.</p>
        <h3>Prosedur Pencatatan Pengalihan</h3>
        <ol><li><strong>Inventarisasi:</strong> Kumpulkan sertifikat, identitas atau dokumen badan hukum, perjanjian pengalihan, bukti hubungan para pihak, dan surat kuasa jika menggunakan kuasa.</li><li><strong>Verifikasi:</strong> Cocokkan nama pemilik, alamat, kelas, nomor permohonan, dan masa perlindungan. Perbaiki perbedaan data sebelum mengajukan permohonan.</li><li><strong>Pengajuan:</strong> Ajukan pencatatan melalui kanal resmi DJKI dan bayar biaya sesuai PNBP yang berlaku.</li><li><strong>Pemeriksaan:</strong> Tanggapi permintaan perbaikan atau kekurangan dokumen dalam batas waktu yang ditentukan.</li><li><strong>Pembaruan data:</strong> Simpan surat pencatatan dan perbarui register aset, kontrak distributor, serta informasi pemilik pada kanal komersial.</li></ol>
        <p>Apabila pihak pengalih atau penerima merupakan entitas asing, dokumen dapat memerlukan legalisasi, apostille, terjemahan tersumpah, dan kuasa kepada konsultan lokal sesuai persyaratan administratif. Pemeriksaan ini penting agar transaksi lintas negara tidak terhenti karena dokumen korporasi atau tanda tangan tidak dapat diverifikasi.</p>
        <h3>Lisensi Merek</h3>
        <p>Lisensi adalah izin penggunaan merek terdaftar kepada pihak lain untuk jangka waktu, wilayah, dan barang atau jasa tertentu. Kepemilikan tetap berada pada pemberi lisensi (<em>licensor</em>), sementara penerima (<em>licensee</em>) memperoleh hak memakai tanda sesuai kontrak. Model ini lazim digunakan dalam waralaba, manufaktur, distribusi, kolaborasi, dan <em>merchandising</em>.</p>
        <p>Perjanjian lisensi harus mengatur eksklusivitas, wilayah, jangka waktu, royalti, standar kualitas, audit, sublisensi, penggunaan logo, kanal penjualan, penghentian, dan pengelolaan stok setelah kontrak berakhir. Pengawasan kualitas penting karena merek dapat kehilangan reputasi jika licensee menjual produk tidak sesuai standar. Lisensi yang terlalu luas tanpa pengendalian dapat menciptakan konflik dengan distributor dan pemegang hak lain.</p>
        <h3>Pentingnya Pencatatan Lisensi</h3>
        <p>UU MIG mengatur bahwa perjanjian lisensi perlu dicatatkan agar mempunyai akibat hukum terhadap pihak ketiga. Pencatatan memberikan pemberitahuan publik mengenai hubungan penggunaan merek dan memperkuat posisi licensee ketika menghadapi pihak luar. Kontrak privat tetap penting di antara para pihak, tetapi tidak seharusnya menjadi satu-satunya perlindungan ketika bisnis telah beroperasi di pasar.</p>
        <p>Sebelum pencatatan, pastikan merek yang dilisensikan benar-benar terdaftar, pihak pemberi memiliki kewenangan, dan klausul kontrak tidak bertentangan dengan peraturan persaingan atau ketertiban umum. Simpan bukti pembayaran royalti, laporan kualitas, dan korespondensi karena dokumen tersebut dapat dibutuhkan untuk audit maupun sengketa.</p>
        <h3>Strategi Monetisasi yang Aman</h3>
        <p>Pemilik brand perlu menentukan tujuan ekonominya. Jika ingin keluar total dari bisnis, pengalihan mungkin lebih tepat. Jika ingin mempertahankan kepemilikan dan memperoleh pendapatan berulang, lisensi dapat dipilih. Dalam kedua skenario, valuasi harus mempertimbangkan reputasi, arus royalti, kelas, wilayah, durasi, risiko sengketa, dan kewajiban penggunaan. Jangan menjual atau melisensikan merek hanya berdasarkan jumlah pengikut media sosial.</p>
        <p>HAKASA Group membantu melakukan audit kepemilikan, menyiapkan dokumen transaksi, menyelaraskan perjanjian dengan data DJKI, dan mendampingi pencatatan. Kepastian administratif bukan formalitas semata; ia menentukan siapa yang dapat mengambil keputusan terhadap aset dan siapa yang berhak menegakkan merek ketika terjadi pelanggaran.</p>
        <h3>Kesimpulan</h3>
        <p>Pengalihan hak memindahkan kepemilikan, sedangkan lisensi memberikan hak pakai. Keduanya dapat menjadi sarana monetisasi, tetapi memiliki konsekuensi kontraktual dan administratif yang berbeda. Pemeriksaan sertifikat, akta, kewenangan, kualitas, dan pencatatan DJKI harus dilakukan sebelum uang dan hak komersial berpindah. Dengan struktur yang tepat, merek dapat menjadi aset yang tumbuh tanpa menimbulkan sengketa kepemilikan di kemudian hari.</p>
        <hr><h4>Daftar Pustaka &amp; Referensi Hukum</h4>
        <ul><li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis, khususnya Pasal 41 sampai Pasal 43.</li><li>Peraturan Menteri Hukum dan HAM Nomor 8 Tahun 2016 tentang Syarat dan Tata Cara Pencatatan Perjanjian Lisensi Kekayaan Intelektual.</li><li>Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas.</li><li>WIPO, <em>WIPO Intellectual Property Handbook: Policy, Law and Use</em>.</li><li>Lindsey, T., dkk. (2013). <em>Hak Kekayaan Intelektual: Suatu Pengantar</em>. Bandung: Alumni.</li></ul>
      `
    }
  ];

  for (const article of articles) {
    const words = countWords(article.content);
    if (words < 850) throw new Error(`${article.slug} hanya ${words} kata; minimal 850 kata.`);
    await prisma.article.upsert({ where: { slug: article.slug }, update: article, create: article });
    console.log(`Sukses menyuntikkan: ${article.title} (${words} kata)`);
  }
  console.log("Proses injeksi Artikel 9 dan 10 selesai!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });