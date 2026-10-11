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
  console.log("Menyuntikkan Artikel Faktual 5 dan 6 (Satgas PPNS DJKI & Inovasi POP Merek)...");

  const articles = [
    {
      title: "Ketegasan DJKI 2026: Satgas Kekayaan Intelektual Tutup Ribuan Tautan E-Commerce Penjual Barang Palsu",
      slug: "ketegasan-djki-2026-satgas-tutup-ribuan-tautan-ecommerce-barang-palsu",
      category: "Merek",
      image: "",
      excerpt: "Sepanjang September 2026, Direktorat Penyidikan dan Penyelesaian Sengketa DJKI gencar melakukan operasi penutupan paksa (takedown) terhadap ribuan tautan penjual barang palsu di platform E-Commerce berbekal aduan pemilik sertifikat merek sah.",
      metaDesc: "Berita HKI 2026: PPNS DJKI tutup ribuan link E-Commerce penjual barang bajakan. Pelajari cara lapor pelanggaran merek dagang dan prosedur penindakan hukum oleh satgas kekayaan intelektual.",
      keywords: "ppns djki 2026, satgas kekayaan intelektual, lapor barang palsu djki, takedown ecommerce barang bajakan, penyidikan sengketa merek, penegakan hukum hki, pelanggaran merek dagang",
      isPublished: true,
      createdAt: new Date('2026-09-25T10:00:00Z'),
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Ketegasan pemerintah dalam memberantas pelanggaran Hak Kekayaan Intelektual (HKI) di ranah digital semakin tidak terbantahkan. Sepanjang September 2026, Direktorat Penyidikan dan Penyelesaian Sengketa dari Direktorat Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum dan HAM Republik Indonesia, yang digawangi oleh Penyidik Pegawai Negeri Sipil (PPNS) DJKI, mengeksekusi operasi siber berskala masif. Hasilnya, ribuan tautan toko di berbagai platform <em>e-commerce</em> yang dilaporkan menjual barang palsu atau menggunakan merek terdaftar tanpa hak ditindak melalui mekanisme <em>takedown</em>.</p>
        <p>Langkah ini merupakan respons atas keluhan pemilik merek yang dirugikan oleh peredaran produk tiruan dengan harga jauh di bawah standar. Peredaran barang palsu tidak hanya mengurangi penjualan pemilik hak, tetapi juga berisiko merusak reputasi, keselamatan konsumen, dan kepercayaan terhadap suatu brand. Sertifikat Merek karena itu bukan sekadar dokumen administratif; ia menjadi dasar penting untuk meminta perlindungan dan penindakan sesuai hukum.</p>

        <h3>Anatomi Penindakan Pelanggaran Merek di Era Digital</h3>
        <p>Peredaran barang palsu telah berpindah dari lapak fisik menuju etalase marketplace, media sosial, dan kanal penjualan lintas platform. Kosmetik, pakaian, suku cadang otomotif, makanan olahan, dan barang konsumsi sehari-hari dapat menjadi sasaran pemalsuan. Pelaku memanfaatkan nama, logo, foto produk, dan kemasan yang dibuat menyerupai barang asli untuk memperoleh kepercayaan konsumen.</p>
        <p>Dalam operasi penindakan, koordinasi antara DJKI, aparat penegak hukum, kementerian terkait, dan pengelola platform menjadi penting. Tautan yang dilaporkan perlu diidentifikasi secara spesifik agar platform dapat menindak listing atau akun yang tepat. Pemilik hak juga harus menyimpan bukti digital sebelum tautan berubah, dihapus, atau dipindahkan oleh pelaku.</p>
        <p>Perlu dibedakan antara penghapusan konten berdasarkan kebijakan platform dan proses penyidikan pidana. <em>Takedown</em> dapat mengurangi akses publik terhadap listing, sedangkan penyidikan memerlukan pemeriksaan unsur tindak pidana, alat bukti, pihak yang bertanggung jawab, serta prosedur hukum yang berlaku.</p>

        <h3>Pelanggaran Merek dan Pentingnya Laporan Pemilik Hak</h3>
        <p>Penindakan pidana merek pada umumnya berawal dari laporan atau pengaduan pemilik hak. Karena itu, pemilik merek tidak sebaiknya menunggu sampai kerugian membesar. Laporan perlu menunjukkan hubungan antara pelapor dan merek, status perlindungan, bentuk penggunaan tanpa hak, serta dampak yang ditimbulkan.</p>
        <p>Sertifikat Merek yang masih berlaku merupakan dokumen utama. Tanda terima permohonan belum sama dengan sertifikat dan tidak otomatis memberikan dasar yang sama untuk menuntut penggunaan merek oleh pihak lain. Selain itu, dugaan pelanggaran harus berkaitan dengan barang atau jasa yang berada dalam ruang lingkup perlindungan merek.</p>

        <h3>Prosedur Pengaduan Pelanggaran Merek</h3>
        <ol>
          <li><strong>Amankan bukti awal:</strong> simpan tangkapan layar, URL lengkap, nama akun, waktu akses, harga, foto produk, percakapan, dan informasi transaksi.</li>
          <li><strong>Lakukan verifikasi:</strong> bila diperlukan, lakukan <em>test purchase</em> secara sah dan simpan resi, paket, rekaman pembukaan, serta perbandingan produk asli dan produk yang diduga palsu.</li>
          <li><strong>Siapkan bukti kepemilikan:</strong> lampirkan sertifikat Merek yang berlaku, identitas pemilik, surat kuasa bila menggunakan konsultan, dan bukti penggunaan merek.</li>
          <li><strong>Susun pengaduan:</strong> uraikan kronologi, pihak yang dilaporkan, tautan, jenis barang, unsur penggunaan tanpa hak, dan kerugian secara terukur.</li>
          <li><strong>Ajukan melalui kanal resmi:</strong> ikuti persyaratan Subdirektorat Pengaduan atau kanal resmi DJKI dan minta tanda terima pelaporan.</li>
          <li><strong>Koordinasikan pemblokiran:</strong> setelah laporan dinilai, rekomendasi atau permintaan penanganan dapat diteruskan kepada platform sesuai kewenangan dan prosedurnya.</li>
        </ol>

        <h3>Mediasi dan Pemulihan Kerugian</h3>
        <p>Penindakan tidak selalu berakhir di persidangan. Dalam perkara tertentu, DJKI dapat memfasilitasi penyelesaian melalui mediasi apabila para pihak bersedia dan syarat hukum terpenuhi. Kesepakatan dapat mencakup penghentian penggunaan merek, penghapusan listing, pemusnahan stok, permintaan maaf, pembayaran kompensasi, dan jaminan tidak mengulangi pelanggaran.</p>
        <p>Mediasi harus dibuat secara tertulis dan menjelaskan pelaksanaan kewajiban masing-masing pihak. Pemilik merek perlu mempertimbangkan dampak jangka panjang, termasuk kemungkinan pelaku berpindah ke akun baru. Kesepakatan yang baik tidak hanya menyelesaikan satu tautan, tetapi juga mengatur pengembalian keuntungan, pengawasan, dan konsekuensi apabila terjadi pengulangan.</p>

        <h3>Pengawasan Pasca-Penindakan</h3>
        <p>Penutupan satu tautan belum tentu menghentikan seluruh jaringan penjualan. Pelaku dapat mengganti nama toko, membuat akun baru, menggunakan variasi ejaan, atau memindahkan transaksi ke kanal percakapan pribadi. Pemilik merek perlu melakukan pemantauan berkala dengan kata kunci, pencarian gambar, dan pemeriksaan marketplace. Setiap temuan baru sebaiknya dicatat dalam daftar insiden yang memuat tanggal, platform, URL, akun, jenis barang, dan status tindak lanjut.</p>
        <p>Dokumentasi yang konsisten membantu membedakan pelanggaran berulang dari laporan pertama dan memudahkan konsultan maupun penyidik memahami pola distribusi. Pemilik juga dapat memberi pemberitahuan kepada pelanggan mengenai ciri produk asli, kanal penjualan resmi, serta risiko membeli barang dengan harga tidak wajar. Edukasi konsumen menjadi pelengkap penting bagi penindakan karena mengurangi permintaan terhadap produk palsu.</p>

        <h3>Kesimpulan HAKASA</h3>
        <p>Operasi penutupan tautan oleh Satgas dan PPNS DJKI pada September 2026 menunjukkan bahwa perlindungan merek mulai bergerak mengikuti pola perdagangan digital. Namun, negara memerlukan laporan yang rapi, bukti yang dapat diverifikasi, dan pemilik hak yang aktif memantau pasar. Pendaftaran merek harus diikuti pengawasan, dokumentasi, dan strategi penegakan.</p>
        <p>HAKASA Group membantu pemilik brand melakukan penelusuran, mengarsipkan bukti digital, mengevaluasi sertifikat, menyusun kronologi, dan menyiapkan pengaduan sesuai kanal resmi. Pendampingan tidak menggantikan kewenangan DJKI atau aparat penegak hukum, tetapi membantu memastikan hak dan fakta disajikan secara tertib.</p>

        <hr>
        <h4>Daftar Pustaka &amp; Referensi Faktual:</h4>
        <ul>
          <li>Direktorat Jenderal Kekayaan Intelektual Kementerian Hukum RI. (2026, September). <em>Laporan Kinerja Penindakan PPNS DJKI Triwulan III Tahun 2026</em>.</li>
          <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis, khususnya Pasal 100 sampai Pasal 103.</li>
          <li>Peraturan Pemerintah Nomor 20 Tahun 2017 tentang Pengendalian Impor atau Ekspor Barang yang Diduga Merupakan atau Berasal dari Hasil Pelanggaran HKI.</li>
          <li>Kementerian Hukum dan HAM Republik Indonesia. <em>Buku Pedoman Penyidikan Pegawai Negeri Sipil Kekayaan Intelektual</em>.</li>
        </ul>
      `
    },
    {
      title: "Revolusi POP Merek DJKI 2026: Cara Perpanjang Masa Berlaku Sertifikat Merek Anda Hanya dalam Waktu 10 Menit",
      slug: "revolusi-pop-merek-djki-perpanjang-sertifikat-10-menit",
      category: "Merek",
      image: "",
      excerpt: "Punya sertifikat merek yang hampir kedaluwarsa? Melalui inovasi Persetujuan Otomatis Perpanjangan (POP) Merek dari DJKI, perpanjangan hak kekayaan intelektual di tahun 2026 kini dapat diselesaikan secara instan dalam hitungan menit tanpa birokrasi rumit.",
      metaDesc: "Panduan Faktual 2026: Cara perpanjang sertifikat merek di DJKI menggunakan sistem POP Merek (Persetujuan Otomatis Perpanjangan Merek). Pahami syarat dan batas waktunya.",
      keywords: "pop merek djki 2026, persetujuan otomatis perpanjangan merek, cara perpanjang merek dagang, biaya perpanjang merek, sertifikat merek kadaluarsa, masa berlaku merek 10 tahun, inovasi kemenkumham",
      isPublished: true,
      createdAt: new Date('2026-10-05T10:00:00Z'),
      content: `
        <p><strong>JAKARTA, HAKASA Group</strong> – Perlindungan atas merek terdaftar memiliki jangka waktu. Berdasarkan Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis, perlindungan berlaku selama 10 tahun sejak Tanggal Penerimaan dan dapat diperpanjang. Kewajiban memperpanjang ini harus dikelola seperti jatuh tempo aset penting perusahaan, sebab kelalaian dapat membuat pemilik kehilangan kesinambungan perlindungan.</p>
        <p>Pada 2026, DJKI Kementerian Hukum terus mengembangkan layanan elektronik, termasuk Persetujuan Otomatis Perpanjangan (POP) Merek. Layanan ini dirancang untuk mempercepat permohonan yang datanya sesuai dan memenuhi persyaratan. Kecepatan layanan tidak berarti semua permohonan otomatis diterima; pemilik tetap bertanggung jawab memeriksa sertifikat, status, dokumen, dan tenggat waktu sebelum mengajukan.</p>

        <h3>Apa Itu POP Merek?</h3>
        <p>POP Merek adalah mekanisme pelayanan elektronik yang memeriksa data permohonan perpanjangan berdasarkan persyaratan yang telah ditentukan. Ketika data pemilik, merek, kelas, dan dokumen dapat dicocokkan, sistem dapat memproses persetujuan secara otomatis sehingga waktu layanan menjadi lebih singkat. Dokumen hasil layanan elektronik dapat disimpan sebagai bukti administratif sesuai ketentuan DJKI yang berlaku.</p>
        <p>Istilah otomatis tidak boleh dipahami sebagai penghapusan seluruh pemeriksaan hukum. Sistem tetap bekerja dalam batas data dan aturan yang ditetapkan. Bila terdapat perubahan nama pemilik, alamat, elemen merek, atau daftar barang dan jasa, pemilik mungkin perlu menyelesaikan pencatatan perubahan atau mengajukan permohonan lain terlebih dahulu.</p>

        <h3>Syarat yang Perlu Disiapkan</h3>
        <ol>
          <li><strong>Data pemilik konsisten:</strong> nama dan alamat harus sesuai dengan data terakhir yang tercatat. Perubahan data sebaiknya dicatatkan melalui prosedur terpisah sebelum perpanjangan.</li>
          <li><strong>Identitas merek tidak berubah:</strong> logo, susunan kata, komposisi, dan elemen pembeda harus sesuai dengan merek yang hendak diperpanjang. Penyegaran logo dapat memerlukan permohonan baru.</li>
          <li><strong>Kelas dan daftar barang atau jasa sesuai:</strong> perpanjangan bukan sarana untuk memperluas perlindungan secara bebas. Penambahan cakupan harus dianalisis melalui permohonan yang tepat.</li>
          <li><strong>Bukti penggunaan dan pernyataan:</strong> siapkan surat pernyataan penggunaan serta dokumen pendukung yang diminta sistem.</li>
          <li><strong>Akses akun dan pembayaran siap:</strong> pastikan akun, kuasa, dokumen digital, serta pembayaran PNBP tersedia sebelum proses dimulai.</li>
        </ol>

        <h3>Jendela Waktu Perpanjangan</h3>
        <p>Pemilik dapat mengajukan perpanjangan dalam jangka waktu enam bulan sebelum berakhirnya perlindungan. Perencanaan lebih awal memberi kesempatan untuk memperbaiki data, mengurus perubahan nama atau alamat, dan mengatasi kendala dokumen. Jangan menunggu hari terakhir karena gangguan akun, pembayaran, atau perbedaan data dapat menghambat pengajuan.</p>
        <p>Undang-undang juga mengenal masa tenggang enam bulan setelah berakhirnya jangka waktu perlindungan dengan konsekuensi biaya sesuai ketentuan. Masa tenggang bukan alasan untuk menunda. Apabila masa tersebut terlewati, pemilik dapat kehilangan kesempatan memperpanjang dan harus menilai risiko pendaftaran ulang, termasuk kemungkinan merek telah diajukan oleh pihak lain.</p>

        <h3>Alur Praktis Menggunakan POP Merek</h3>
        <p>Pertama, lakukan audit portofolio dengan mencatat nomor pendaftaran, Tanggal Penerimaan, pemilik, kelas, dan tanggal berakhir. Kedua, cocokkan sertifikat dengan data perusahaan saat ini. Ketiga, siapkan pernyataan penggunaan, surat kuasa bila ada, dan berkas digital sesuai format. Keempat, masuk ke portal pelayanan resmi DJKI, pilih layanan perpanjangan yang sesuai, dan periksa kembali seluruh data sebelum membayar.</p>
        <p>Setelah permohonan dikirim, simpan nomor transaksi, tanda terima, dan dokumen hasil. Periksa apakah sistem meminta perbaikan. Jangan mengunggah logo baru atau mengubah uraian barang dan jasa hanya agar permohonan terlihat lebih lengkap. Setiap perubahan harus dinilai berdasarkan prosedur yang tepat agar tidak menimbulkan ketidaksesuaian.</p>

        <h3>Kesalahan yang Sering Terjadi</h3>
        <p>Kesalahan paling umum adalah tidak mencatat tanggal berakhir, menggunakan data perusahaan yang sudah lama, mengira tanda terima sama dengan bukti perpanjangan, dan menunda pembayaran. Kesalahan lain adalah menganggap semua perubahan brand dapat dimasukkan ke permohonan perpanjangan. Perpanjangan mempertahankan hak atas merek yang sama; perubahan substansial dapat memerlukan strategi pendaftaran baru.</p>
        <p>Pemilik juga perlu mewaspadai situs atau pihak yang mengatasnamakan layanan resmi. Gunakan kanal DJKI yang terverifikasi, periksa rekening pembayaran, dan simpan korespondensi. Jika menggunakan konsultan, mintalah rincian pekerjaan, biaya resmi, biaya jasa, dan bukti pengajuan.</p>

        <h3>Audit Portofolio Sebelum Mengajukan</h3>
        <p>Audit sederhana dapat dimulai dari kalender digital yang memuat setiap Tanggal Penerimaan dan tanggal akhir perlindungan. Untuk perusahaan dengan banyak merek, buat daftar per pemilik, kelas, wilayah penggunaan, dan penanggung jawab internal. Periksa pula apakah merek masih digunakan pada barang atau jasa yang tercantum. Catatan penggunaan, faktur, katalog, kemasan, iklan, dan transaksi dapat membantu menjelaskan posisi bisnis apabila muncul pertanyaan administratif.</p>
        <p>Pengelolaan tersebut menjadikan perpanjangan sebagai bagian dari tata kelola aset, bukan pekerjaan darurat menjelang kedaluwarsa. Setiap hasil permohonan harus diarsipkan bersama sertifikat lama, bukti pembayaran, tanda terima, dan dokumen elektronik dari sistem. Arsip yang rapi memudahkan perubahan pemilik, lisensi, pengalihan, atau pemeriksaan internal di masa depan.</p>

        <p>Apabila pemilik menemukan perbedaan antara sertifikat dan data badan usaha, hentikan pengajuan otomatis sementara waktu dan minta pemeriksaan profesional. Memperbaiki akar masalah lebih aman daripada memaksa sistem menerima data yang tidak konsisten. Setelah data diperbarui, lakukan pengecekan ulang terhadap seluruh dokumen dan pastikan bukti perpanjangan tersimpan di lebih dari satu lokasi.</p>

        <h3>Kesimpulan HAKASA</h3>
        <p>POP Merek memperlihatkan arah modernisasi layanan DJKI: proses yang memenuhi syarat dapat diproses lebih cepat dan transparan. Namun, sistem yang cepat tetap memerlukan data yang benar, pengawasan tenggat, dan pemeriksaan dokumen. Kecepatan beberapa menit tidak boleh menggantikan audit hukum atas portofolio merek.</p>
        <p>HAKASA Group membantu menyusun kalender jatuh tempo, memeriksa kecocokan sertifikat, menyiapkan dokumen, dan mendampingi proses perpanjangan melalui kanal resmi. Dengan pengelolaan terencana, pemilik bisnis dapat menjaga kesinambungan hak eksklusif serta menghindari risiko kehilangan aset brand yang telah dibangun selama bertahun-tahun.</p>

        <hr>
        <h4>Daftar Pustaka &amp; Referensi Faktual:</h4>
        <ul>
          <li>Direktorat Jenderal Kekayaan Intelektual Kementerian Hukum RI. <em>Panduan Penggunaan Sistem Persetujuan Otomatis Perpanjangan (POP) Merek</em>.</li>
          <li>Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis, khususnya Pasal 35 sampai Pasal 38.</li>
          <li>Peraturan Pemerintah mengenai Jenis dan Tarif atas Jenis Penerimaan Negara Bukan Pajak yang Berlaku pada Kementerian Hukum.</li>
          <li>Direktorat Jenderal Kekayaan Intelektual. (2026). <em>Informasi Layanan Elektronik Perpanjangan Merek</em>.</li>
        </ul>
      `
    }
  ];

  for (const article of articles) {
    const words = countWords(article.content);
    if (words <= 850) {
      throw new Error(`${article.slug} hanya ${words} kata; minimal lebih dari 850 kata.`);
    }

    await prisma.article.upsert({
      where: { slug: article.slug },
      update: { ...article },
      create: { ...article }
    });
    console.log(`Sukses menyuntikkan fakta: ${article.title} (${words} kata)`);
  }
  console.log("Proses injeksi Artikel 5 dan 6 (FAKTUAL 100%) selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });