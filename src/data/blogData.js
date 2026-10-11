"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOG_DATA = exports.ALL_CATEGORIES = void 0;
exports.getPostById = getPostById;
exports.filterPostsByCategory = filterPostsByCategory;
exports.sanitizeBlogHtml = sanitizeBlogHtml;
exports.stripHtmlTags = stripHtmlTags;
exports.ALL_CATEGORIES = [
    "Merek",
    "Hak Cipta",
    "E-Commerce",
];
/**
 * Cari artikel berdasarkan id. Mengembalikan `undefined` jika tidak ditemukan.
 * Dipakai oleh `generateStaticParams` & halaman detail.
 */
function getPostById(id) {
    return exports.BLOG_DATA.find(function (post) { return post.id === id; });
}
/**
 * Filter artikel berdasarkan kategori. "Semua" = tidak filter.
 */
function filterPostsByCategory(posts, category) {
    if (category === "Semua")
        return posts;
    return posts.filter(function (post) { return post.category === category; });
}
/**
 * Daftar semua tag HTML yang diizinkan dalam konten artikel.
 * Sesuai prinsip "allowlist" — semua tag lain akan dibuang saat sanitasi.
 */
var ALLOWED_TAGS = new Set([
    "p",
    "br",
    "hr",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "h2",
    "h3",
    "h4",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "blockquote",
    "code",
    "pre",
]);
/**
 * Daftar atribut yang diizinkan per tag.
 * Atribut lain (termasuk `style`, `on*`, `src`, dll.) akan dibuang.
 *
 * Catatan keamanan untuk <img>:
 * - Hanya izinkan `src` eksternal HTTPS (CDN seperti Unsplash).
 * - `loading="lazy"` didorong untuk gambar di bawah fold.
 * - `alt` WAJIB untuk aksesibilitas (disarankan, tidak dipaksa
 *   oleh sanitizer agar tidak break kompatibilitas mundur).
 */
var ALLOWED_ATTRS = {
    a: new Set(["href", "title", "rel", "target"]),
    img: new Set(["src", "alt", "title", "loading", "width", "height", "class"]),
};
/**
 * Sanitasi HTML mentah dari data blog sebelum dirender ke DOM.
 *
 * Pendekatan: regex-based allowlist. Cukup untuk konten trusted
 * dari tim redaksi (bukan user-generated content). Untuk UGC,
 * gunakan DOMPurify atau library serupa.
 *
 * Yang dilakukan:
 * 1. Hapus script/style/iframe/object/embed/svg (XSS-prone).
 * 2. Hapus semua event handlers (onclick, onerror, dll).
 * 3. Hapus atribut危险 (javascript: URL, data: URL untuk <a>).
 * 4. Pada tag yang diizinkan, hanya pertahankan atribut yang diizinkan.
 * 5. Tambah `rel="noopener noreferrer"` ke <a target="_blank">.
 */
function sanitizeBlogHtml(html) {
    if (!html)
        return "";
    var sanitized = html;
    // 1. Hapus tag berbahaya secara keseluruhan (termasuk isinya)
    sanitized = sanitized.replace(/<(script|style|iframe|object|embed|svg|noscript)[^>]*>[\s\S]*?<\/\1>/gi, "");
    // 2. Untuk tag lain, hapus atribut berbahaya
    // - Hapus semua event handler (on*)
    sanitized = sanitized.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    // - Hapus javascript: URL
    sanitized = sanitized.replace(/\s+(href|src|action|formaction)\s*=\s*("javascript:[^"]*"|'javascript:[^']*'|javascript:[^\s>]+)/gi, "");
    // - Hapus data:text/html URL (XSS vector)
    sanitized = sanitized.replace(/\s+(href|src)\s*=\s*("data\s*:\s*text\/html[^"]*"|'data\s*:\s*text\/html[^']*')/gi, "");
    // 3. Filter setiap tag: hanya pertahankan yang diizinkan
    // Tag self-closing yang umum di konten blog: <br>
    // Tag berpasangan: <p>...</p>, <strong>...</strong>, dst.
    sanitized = sanitized.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g, function (match, slash, tagName, attrs) {
        var _a, _b, _c;
        var lower = tagName.toLowerCase();
        // Tag penutup (mis. </p>)
        if (slash) {
            return ALLOWED_TAGS.has(lower) ? match : "";
        }
        // Tag pembuka / self-closing
        if (!ALLOWED_TAGS.has(lower)) {
            return "";
        }
        // Filter atribut
        var allowedForTag = ALLOWED_ATTRS[lower];
        if (!allowedForTag) {
            // Tag diizinkan tapi tanpa atribut
            return "<".concat(lower, ">");
        }
        // Parse atribut yang ada, hanya pertahankan yang diizinkan
        var attrPairs = [];
        var attrRegex = /([a-zA-Z][a-zA-Z0-9-]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;
        var attrMatch;
        while ((attrMatch = attrRegex.exec(attrs)) !== null) {
            var attrName = attrMatch[1].toLowerCase();
            if (allowedForTag.has(attrName)) {
                var attrValue = (_c = (_b = (_a = attrMatch[3]) !== null && _a !== void 0 ? _a : attrMatch[4]) !== null && _b !== void 0 ? _b : attrMatch[5]) !== null && _c !== void 0 ? _c : "";
                attrPairs.push("".concat(attrName, "=\"").concat(attrValue, "\""));
            }
        }
        // Hardening: tambah rel="noopener noreferrer" ke link eksternal
        if (lower === "a" && !attrPairs.some(function (a) { return a.startsWith("rel="); })) {
            attrPairs.push('rel="noopener noreferrer"');
        }
        return "<".concat(lower).concat(attrPairs.length ? " " + attrPairs.join(" ") : "", ">");
    });
    return sanitized;
}
/**
 * Hapus tag HTML dari string untuk membuat excerpt/text polos.
 * Digunakan untuk preview text & meta description fallback.
 */
function stripHtmlTags(html) {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}
exports.BLOG_DATA = [
    // ============ KATEGORI MEREK ============
    {
        id: "sengketa-merek-byd-denza",
        title: "Sengketa Nama: BYD Ubah Merek 'Denza' Jadi 'Danza' di Indonesia",
        date: "Oktober 2026",
        category: "Merek",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Kalah di tingkat Kasasi Mahkamah Agung, raksasa otomotif BYD terpaksa mengganti nama lini mobil mewahnya di Indonesia karena merek 'Denza' sudah terdaftar.",
        content: "\n      <p>Masuknya raksasa otomotif asal Tiongkok, BYD, ke pasar Indonesia membawa antusiasme besar. Namun, langkah ekspansi mereka sempat tersandung kerikil tajam terkait masalah legalitas kekayaan intelektual. Lini mobil mewah mereka yang secara global dikenal dengan nama <strong>\"Denza\"</strong>, terpaksa berganti nama menjadi <strong>\"Danza\"</strong> khusus untuk pasar Indonesia.</p>\n      <h2>Kronologi Sengketa Merek Denza</h2>\n      <p>Sengketa bermula ketika BYD berniat mendaftarkan merek \"Denza\" di DJKI Kemenkumham RI. Namun, pendaftaran tersebut menemui jalan buntu karena nama \"Denza\" telah lebih dulu didaftarkan oleh pengusaha lokal untuk kelas barang yang berkaitan.</p>\n      <p>Pihak BYD sempat menempuh jalur hukum hingga kasasi, berargumen bahwa \"Denza\" adalah merek global. Namun, Mahkamah Agung melalui Putusan Nomor 1338 K/PDT.SUS-HKI/2025 menolak permohonan tersebut.</p>\n      <h2>Pelajaran Berharga: Hukum 'First to File'</h2>\n      <p>Kasus ini menjadi peringatan keras bagi pelaku usaha. Sistem hukum di Indonesia menganut asas <strong>First to File</strong> (Siapa yang pertama mendaftar, dia pemilik sahnya).</p>\n      <ul>\n        <li><strong>Jangan Menunda:</strong> Daftarkan merek sebelum diklaim pihak lain.</li>\n        <li><strong>Reputasi Tidak Menjamin:</strong> Merek besar di luar negeri tidak kebal hukum di Indonesia jika terlambat mendaftar.</li>\n      </ul>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Undang-Undang No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis, Pasal 21 dan 76.</li>\n        <li>Putusan Mahkamah Agung No. 1338 K/PDT.SUS-HKI/2025 (sengketa merek Denza vs. pendaftar lokal).</li>\n        <li>Harian Kompas, edisi 9 Oktober 2025: \u201CBYD Ganti Nama Denza Jadi Danza di Indonesia\u201D.</li>\n      </ul>\n    },\n  {\n    id: \"mengatasi-surat-usulan-penolakan-merek\",\n    title:\n      \"Langkah-Langkah Mengatasi Surat Usulan Penolakan Merek dari DJKI: Jangan Panik Dulu!\",\n    date: \"Oktober 2026\",\n    category: \"Merek\",\n    image:\n      \"https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Mendapat Surat Usulan Penolakan dari DJKI bukan berarti merek Anda otomatis ditolak. Pahami kenapa penolakan terjadi, berapa lama waktu yang Anda punya, dan bagaimana strategi sanggahan yang benar agar merek tetap bisa terdaftar.\",\n    content: "
            < p > Bagi,
        pelaku: pelaku,
        usaha: usaha,
        yang: yang,
        baru: baru,
        pertama: pertama,
        kali: kali,
        mengurus: mengurus,
        pendaftaran: pendaftaran,
        merek: merek,
        menerima: menerima,
        amplop: amplop,
        berwarna: berwarna,
        kuning: kuning,
        dari: dari,
        Direktorat: Direktorat,
        Jenderal: Jenderal,
        Kekayaan: Kekayaan,
        Intelektual: function (DJKI) { },
        Kemenkumham: Kemenkumham,
        RI: RI,
        sering: sering,
        kali: kali,
        langsung: langsung,
        diasosiasikan: diasosiasikan,
        dengan: dengan,
        berita: berita,
        buruk: buruk,
        : .Padahal,
        tidak: tidak,
        semua: semua,
        surat: surat,
        dari: dari,
        DJKI: DJKI,
        berujung: berujung,
        pada: pada,
        penolakan: penolakan,
        : .Salah,
        satu: satu,
        yang: yang,
        paling: paling,
        sering: sering,
        menimbulkan: menimbulkan,
        kepanikan: kepanikan,
        Surat: Surat,
        Usulan: Usulan
    } / strong > (bahasa), Inggris, Office, Action / Refusal < /em>).</p >
        Surat, ini, pada, dasarnya, adalah < strong > pernyataan, keberatan, dari, pemeriksa, merek < /strong> di DJKI yang melihat adanya indikasi merek Anda tidak memenuhi syarat substantif. Ini bukan vonis mati, melainkan undangan untuk berargumen. Artikel ini mengulas langkah-langkah yang perlu Anda tempuh ketika surat itu tiba di meja kerja.</p >
        Apa, Itu, Surat, Usulan, Penolakan ? /h2>
        < p > Surat : , Usulan, Penolakan, diterbitkan, setelah, pemeriksa, DJKI, melakukan, pemeriksaan, substantif, terhadap, permohonan, merek, Anda.Pemeriksaan, ini, dilakukan, setelah, tahap, pemeriksaan, administratif, dan, masa, publikasi, berakhir.Jika, pemeriksa, menemukan, alasan, kuat, untuk, menolak, DJKI, akan, mengirimkan, surat, resmi, yang, merinci, dasar, penolakan, tersebut. < /p>
        < p > Surat, ini, biasanya, menyebutkan, secara, eksplisit, pasal, yang, menjadi, dasar, keberatan, misalnya, Pasal, 21, ayat(1), UU, No., 20, Tahun, 2016, tentang, Merek, dan, Indikasi, Geografis.Sejak, surat, diterbitkan, Anda, memiliki, waktu, untuk, menanggapi - bukan, untuk, melawan, secara, konfrontatif, melainkan, untuk < strong > menyusun, argumentasi, hukum, yang, meyakinkan < /strong>.</p >
        Alasan, Paling, Umum, Kesamaan, pada, Pokoknya < /h2>
        < p > Berdasarkan, pengalaman, praktik, lebih, dari, 80, persen, usulan, penolakan, disebabkan, oleh, satu, hal, persamaan, pada, pokoknya < /strong> dengan merek pihak lain yang sudah terdaftar lebih dulu. Pasal 21 ayat (1) huruf a UU Merek secara tegas melarang pendaftaran merek yang memiliki persamaan pada pokoknya dengan merek milik orang lain untuk barang dan/atau, jasa, sejenis. < /p>
        < p > Penilaian, persamaan, ini, tidak, hanya, sebatas, kemiripan, teks.Pemeriksa, DJKI, akan, melihat, tiga, aspek, utama, /p>
        < ul >
        Persamaan, Visual, /strong> Tampilan logo, tipografi huruf, komposisi warna, dan elemen grafis secara keseluruhan.</li >
        Persamaan, Fonetik, /strong> Bunyiucapkan nama merek, termasuk aksen dan pengucapan dominan di lidah konsumen Indonesia.</li >
        Persamaan, Konseptual, /strong> Makna, ide, atau kesan yang muncul di benak konsumen ketika mendengar atau melihat merek tersebut.</li >
        /ul>
        < p > Jika, dua, dari, tiga, aspek, di, atas, menunjukkan, kemiripan, yang, signifikan, dan, merek - merek, tersebut, digunakan, untuk, barang, atau, jasa, dalam, kelas, Nice, yang, sama, atau, berdekatan, usulan, penolakan, hampir, pasti, keluar. < /p>
        < h2 > Batas, Waktu, Fatal, 30, Hari < /h2>
        < p > Ini, adalah, bagian, yang, paling, krusial.Setelah, menerima, Surat, Usulan, Penolakan, pemohon < strong > wajib, mengajukan, tanggapan, dalam, jangka, waktu, paling, lama, 30, hari < /strong> terhitung sejak tanggal surat diterbitkan. Ketentuan ini diatur secara limitatif dalam Pasal 26 UU Merek.</p >
        Batas, waktu, 30, hari, ini, adalah < em > hard, deadline < /em>. Tidak ada perpanjangan. Tidak ada dispensasi untuk hari raya, cuti bersama, atau alasan Force Majeure lainnya. DJKI tidak mengirim surat peringatan kedua. Begitu hari ke-31 tiba dan tidak ada tanggapan masuk, permohonan Anda secara otomatis berstatus <strong>Ditolak</strong > tanpa, ada, kesempatan, kedua. < /p>
        < p > Praktiknya, batas, 30, hari, sudah, termasuk, sempit.Diperlukan, waktu, untuk, membaca, dan, memahami, dasar, penolakan, mengumpulkan, bukti - bukti, pembanding, menyusun, argumen, hukum, dalam, format, yang, lazim, di, DJKI, hingga, mengajukan, secara, resmi.Karena, itulah, banyak, pemohon, yang, langsung, menggunakan, jasa, Konsultan, HKI, Terdaftar, begitu, surat, itu, datang. < /p>
        < h2 > Risiko, Jika, Sanggahan, Diabaikan < /h2>
        < p > Mengabaikan, Surat, Usulan, Penolakan, sama, artinya, dengan, melepas, merek, Anda, sendiri.Konsekuensinya, bersifat, permanen, dan, berjenjang.Pertama, permohonan, Anda, akan, dianulir, oleh, DJKI, dengan, status, Penolakan.Kedua, merek, yang, pernah, Anda, ajukan, akan, tercatat, dalam, basis, data, DJKI, sebagai, merek, yang, pernah, ditolak, sehingga, menyulitkan, upaya, pendaftaran, ulang, di, masa, depan, dengan, nama, yang, sama.Ketiga, waktu, dan, biaya, yang, sudah, Anda, keluarkan, untuk, proses, pendaftaran, awal, menjadi, sia - sia. < /p>
        < p > Yang, lebih, fatal, jika, Anda, tetap, menggunakan, merek, tersebut, untuk, kegiatan, komersial, tanpa, perlindungan, hukum, Anda, berada, dalam, posisi, rentan.Pemilik, merek, terdaftar, yang, merasa, dirugikan, dapat, mengajukan, somasi, menuntut, ganti, rugi, melalui, Pengadilan, Niaga, hingga, meminta, penyitaan, barang, bukti, atas, dasar, pelanggaran, merek. < /p>
        < h2 > Solusi, Layanan, Sanggahan, Merek, Profesional < /h2>
        < p > Sanggahan, atau, Hearing, adalah, mekanisme, hukum, yang, dirancang, untuk, menjawab, usulan, penolakan.Dalam, proses, ini, Anda(atau, Konsultan, HKI, yang, Anda, kuasakan), menyusun, dokumen, tertulis, yang, berisi, argumen, hukum, bukti - bukti, pembanding, serta, klarifikasi, atas, keberatan, pemeriksa.Dokumen, ini, kemudian, diajukan, kembali, ke, DJKI, untuk, dievaluasi, ulang, oleh, pemeriksa, yang, sama, atau, bahkan, tim, penilai, di, tingkat, banding, di, DJKI. < /p>
        < p > Penyusunan, sanggahan, yang, efektif, membutuhkan, dua, hal, pemahaman, mendalam, terhadap, basis, data, merek, terdaftar, di, DJKI, dan, kemampuan, meramu, argumen, dalam, bahasa, hukum, yang, sistematis.Inilah, alasan, mengapa, menggunakan < strong > Layanan, Sanggahan, Merek, profesional < /strong> dari Konsultan HKI Terdaftar menjadi pilihan yang sangat rasional. Konsultan akan melakukan penelusuran mendalam, memetakan potensi kelemahan merek, lalu membangun narasi pembelaan yang fokus pada perbedaan substansial dengan merek-merek pembanding.</p >
        Di, HAKASA, Group, Layanan, Sanggahan, Merek, kami, mencakup, analisis, menyeluruh, terhadap, dasar, penolakan, penyusunan, dokumen, tanggapan, resmi, sesuai, format, DJKI, hingga, pendampingan, sampai, diterbitkannya, keputusan, akhir.Layanan, ini, dirancang, untuk, merek, yang, ingin, mempertahankan, haknya, tanpa, harus, langsung, berperkara, di, Pengadilan, Niaga. < /p>
        < p > Jika, Anda, baru, saja, menerima, Surat, Usulan, Penolakan, jangan, tunda, untuk, mencari, pendamping, hukum, yang, tepat.Satu, hari, keterlambatan, bisa, berarti, hilangnya, satu, tahun, perlindungan, merek. < /p>
        < hr, /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()) = "my-8 border-slate-200" /  >
        Sumber & Referensi, /h4>
        < ul >
        Undang - Undang, No., 20, Tahun, 2016, tentang, Merek, dan, Indikasi, Geografis, Pasal, 21, ayat(1), dan, Pasal, 26. < /li>
        < li > Pedoman, Pemeriksaan, Substantif, Merek, DJKI, Kemenkumham, RI, edisi, revisi, 2024. < /li>
        < li > Trilio, Surat, Usulan, Penolakan, Merek, dari, DJKI, Panduan, Sanggahan, (15), Juni, 2026, . < /li>
        < /ul>
];
{
    id: "djki-mediasi-sengketa-asics",
        title;
    "DJKI Fasilitasi Selesainya Sengketa Merek ASICS Jalur Damai",
        date;
    "Oktober 2026",
        category;
    "Merek",
        image;
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
        excerpt;
    "Penyelesaian sengketa merek tidak selalu harus di pengadilan. DJKI berhasil memediasi sengketa merek global ASICS tanpa proses litigasi yang panjang.",
        content;
    "\n      <p>Sengketa Kekayaan Intelektual (KI) seringkali identik dengan proses pengadilan yang panjang, melelahkan, dan menguras biaya besar. Namun, Direktorat Jenderal Kekayaan Intelektual (DJKI) terus mendorong penyelesaian alternatif melalui jalur mediasi.</p>\n      <h2>Keberhasilan Mediasi Merek ASICS</h2>\n      <p>Pada awal Oktober 2026, DJKI mencatat prestasi dengan memfasilitasi penyelesaian sengketa yang melibatkan merek sepatu olahraga global, ASICS. Proses mediasi ini mempertemukan pihak-pihak yang bersengketa dalam ruang diskusi yang netral, dibantu oleh mediator ahli dari Kemenkumham.</p>\n      <p>Hasilnya, kedua belah pihak mencapai kesepakatan damai (win-win solution) tanpa harus melangkah ke Pengadilan Niaga. Langkah ini tidak hanya menghemat biaya legal yang bisa mencapai ratusan juta rupiah, tetapi juga menjaga reputasi bisnis kedua belah pihak di mata publik.</p>\n      <h2>Mengapa Memilih Mediasi?</h2>\n      <ul>\n        <li><strong>Cepat dan Efisien:</strong> Proses selesai dalam hitungan minggu, bukan bertahun-tahun.</li>\n        <li><strong>Rahasia Terjamin:</strong> Sidang mediasi bersifat tertutup sehingga rahasia dagang perusahaan aman.</li>\n        <li><strong>Fokus pada Solusi Bisnis:</strong> Tidak ada pihak yang kalah secara mutlak, melainkan mencari titik temu komersial.</li>\n      </ul>\n      <p>Jika merek Anda sedang menghadapi sengketa, konsultasikan dengan HAKASA Group untuk menyusun strategi penyelesaian terbaik sebelum melangkah ke ranah litigasi.</p>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Undang-Undang No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis, Pasal 36 tentang Mediasi.</li>\n        <li>Siaran Pers DJKI Kemenkumham RI, \u201CMediasi Merek ASICS Capai Kesepakatan Damai\u201D, 8 Oktober 2026.</li>\n        <li>WIPO Mediation and Arbitration Statistics 2025, Jenewa.</li>\n      </ul>\n    },\n  {\n    id: \"risiko-first-to-file-umkm\",\n    title:\n      \"Merek Belum Terdaftar? Pahami Risiko 'First to File' Bagi Bisnis Anda\",\n    date: \"Mei 2026\",\n    category: \"Merek\",\n    \n    image:\n      \"https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Banyak pengusaha UMKM salah paham bahwa pemakai pertama adalah pemilik merek. Padahal, hukum di Indonesia tidak bekerja seperti itu.\",\n    content: "
        < p > Banyak;
    pelaku;
    UMKM;
    di;
    Indonesia;
    terjebak;
    pada;
    satu;
    mitos;
    yang;
    berbahaya: "Saya sudah pakai nama toko ini selama 10 tahun, jadi otomatis ini milik saya." < /em> Dalam kacamata hukum Kekayaan Intelektual di Indonesia, anggapan tersebut adalah kesalahan fatal.</p >
        Mengenal;
    Asas;
    First;
    to;
    File < /h2>
        < p > Hukum;
    merek;
    di;
    Indonesia;
    menganut;
    prinsip < strong > First;
    to;
    File < /strong>. Artinya, negara hanya mengakui dan memberikan pelindungan hukum kepada pihak yang mendaftarkan mereknya paling pertama ke DJKI Kemenkumham, terlepas dari siapa yang lebih dulu menggunakan merek tersebut di lapangan.</p >
        Risiko;
    Hukum;
    Jika;
    Menunda;
    Pendaftaran < /h2>
        < p > Penundaan;
    pendaftaran;
    merek;
    sama;
    dengan;
    menaruh;
    bom;
    waktu;
    pada;
    bisnis;
    Anda.Berikut;
    risikonya: /p>
        < ul >
        Pembajakan;
    Merek;
    oleh;
    Kompetitor: /strong> Kompetitor yang nakal bisa mendaftarkan nama bisnis Anda. Setelah sertifikatnya keluar, mereka berhak mensomasi Anda.</li >
        Kehilangan;
    Identitas;
    Bisnis: /strong> Anda terpaksa mengganti nama (rebranding), mengganti papan nama, kemasan, hingga akun media sosial yang memakan biaya besar.</li >
        Ancaman;
    Pidana;
    dan;
    Perdata: /strong> Pemilik sertifikat yang sah dapat menuntut ganti rugi miliaran rupiah dan melaporkan Anda atas tuduhan pelanggaran hak cipta/merek. < /li>
        < /ul>
        < p > Jangan;
    tunggu;
    bisnis;
    Anda;
    besar;
    baru;
    mendaftar;
    merek.Daftarkan;
    merek;
    Anda;
    sekarang;
    bersama;
    HAKASA;
    Group;
    sebelum;
    identitas;
    bisnis;
    Anda;
    dirampas;
    pihak;
    lain. < /p>
        < hr;
    var default_1 = /** @class */ (function () {
        function default_1() {
        }
        return default_1;
    }());
    "my-8 border-slate-200" /  >
        Sumber & Referensi;
    /h4>
        < ul >
        Undang - Undang;
    No.;
    20;
    Tahun;
    2016;
    tentang;
    Merek;
    dan;
    Indikasi;
    Geografis, Pasal;
    3(asas, first, to, file). < /li>
        < li > Laporan;
    DJKI;
    2025;
    84 % UMKM;
    Belum;
    Mendaftarkan;
    Merek;
    dalam;
    2;
    Tahun;
    Beroperasi. < /li>
        < li > Kontan, ;
    Risiko;
    Hukum;
    UMKM;
    yang;
    Tak;
    Daftarkan;
    Merek;
    (Mei);
    2026;
    /li>
        < /ul>(templateObject_1 || (templateObject_1 = __makeTemplateObject([",\n\n  {\n    id: \"denda-telat-perpanjang-merek-2026\",\n    title:\n      \"Masa Tenggang Berakhir? Ini Denda dan Risiko Fatal Telat Perpanjang Merek di DJKI 2026\",\n    date: \"November 2026\",\n    category: \"Merek\",\n    image:\n      \"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Lewat dari tanggal jatuh tempo perpanjangan merek di DJKI? Jangan panik dulu, ada masa tenggang 6 bulan. Tapi jika dibiarkan lebih lama, merek Anda bisa dihapus dan jatuh ke domain publik. Simak aturan lengkap dan dendanya di sini.\",\n    content: "], [",\n\n  {\n    id: \"denda-telat-perpanjang-merek-2026\",\n    title:\n      \"Masa Tenggang Berakhir? Ini Denda dan Risiko Fatal Telat Perpanjang Merek di DJKI 2026\",\n    date: \"November 2026\",\n    category: \"Merek\",\n    image:\n      \"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Lewat dari tanggal jatuh tempo perpanjangan merek di DJKI? Jangan panik dulu, ada masa tenggang 6 bulan. Tapi jika dibiarkan lebih lama, merek Anda bisa dihapus dan jatuh ke domain publik. Simak aturan lengkap dan dendanya di sini.\",\n    content: "])))
        < p > Pertanyaan;
    yang;
    paling;
    sering;
    masuk;
    ke;
    tim;
    kami;
    setiap;
    bulan;
    adalah;
    sederhana: Apa;
    yang;
    terjadi;
    jika;
    telat;
    perpanjang;
    merek ? /strong> Kekhawatiran ini wajar, karena pemilik merek sering kali baru menyadari pentingnya perpanjangan setelah mendekati tanggal jatuh tempo.</p >
        Berdasarkan : ;
    UU;
    No.;
    20;
    Tahun;
    2016;
    tentang;
    Merek, perlindungan;
    merek;
    terdaftar;
    berlaku;
    selama;
    10;
    tahun;
    dan;
    dapat;
    diperpanjang.Namun, sistem;
    DJKI;
    tidak;
    otomatis;
    memperpanjang;
    perlindungan;
    Anda.Jika;
    Anda;
    tidak;
    mengajukan;
    permohonan;
    perpanjangan;
    dalam;
    waktu;
    yang;
    ditentukan, ada;
    konsekuensi;
    hukum;
    yang;
    permanen. < /p>
        < h2 > Kapan;
    Sebaiknya;
    Ajukan;
    Perpanjangan;
    Merek ? /h2>
        < p > DJKI : ;
    memberikan;
    jendela;
    waktu;
    yang;
    cukup;
    panjang.Permohonan;
    perpanjangan;
    bisa;
    diajukan;
    sejak < strong > 6;
    bulan;
    sebelum < /strong> tanggal jatuh tempo perlindungan berakhir. Artinya, jika merek Anda habis pada 31 Desember 2026, Anda sudah bisa mengajukan perpanjangan mulai 1 Juli 2026.</p >
        Menjelang;
    masa;
    jatuh;
    tempo, DJKI;
    biasanya;
    mengirim;
    surat;
    edaran;
    dan;
    notifikasi;
    ke;
    pemilik;
    merek;
    yang;
    tercatat;
    di;
    sistem.Pastikan;
    data;
    kontak;
    Anda;
    di;
    DJKI;
    selalu;
    mutakhir, agar;
    notifikasi;
    ini;
    tidak;
    hilang;
    di;
    tengah;
    jalan. < /p>
        < h2 > Apa;
    Itu;
    Masa;
    Tenggang(Grace, Period);
    6;
    Bulan ? /h2>
        < p > Bagi : ;
    pemilik;
    merek;
    yang;
    terlambat;
    mengajukan;
    perpanjangan;
    sebelum;
    tanggal;
    jatuh;
    tempo, DJKI;
    menyediakan < strong > masa;
    tenggang;
    6;
    bulan < /strong>. Selama periode ini, perlindungan merek Anda dianggap masih berlaku secara administratif, dengan catatan Anda tetap harus membayar PNBP perpanjangan plus denda keterlambatan.</p >
        Denda;
    keterlambatan;
    perpanjangan;
    merek;
    di;
    DJKI;
    bervariasi;
    tergantung;
    kelas;
    barang;
    atau;
    jasa.Sebagai;
    gambaran, denda;
    ini;
    bisa;
    mencapai;
    ratusan;
    ribu;
    hingga;
    jutaan;
    rupiah;
    per;
    kelas.Informasi;
    terbaru;
    tentang;
    besaran;
    denda;
    bisa;
    dicek;
    langsung;
    di;
    situs;
    resmi;
    DJKI;
    atau;
    melalui;
    biro;
    jasa;
    HKI;
    Jakarta;
    yang;
    berpengalaman. < /p>
        < p > Penting;
    untuk;
    diingat: masa;
    tenggang;
    6;
    bulan < strong > bukan < /strong> berarti Anda bebas dari kewajiban. Begitu tanggal jatuh tempo terlewati tanpa pengajuan, Anda sudah memasuki zona risiko meskipun belum dihapus secara resmi.</p >
        Apa;
    yang;
    Terjadi;
    Jika;
    Lewat;
    dari;
    6;
    Bulan;
    Masa;
    Tenggang ? /h2>
        < p > Jika : ;
    Anda;
    tidak;
    juga;
    mengajukan;
    perpanjangan;
    hingga;
    6;
    bulan;
    setelah;
    tanggal;
    jatuh;
    tempo, DJKI;
    secara;
    otomatis;
    menghapus;
    merek;
    Anda;
    dari;
    daftar;
    umum.Konsekuensinya;
    cukup;
    fatal: /p>
        < ul >
        Merek;
    dihapus;
    dari;
    sistem;
    DJKI. < /strong> Anda kehilangan seluruh hak eksklusif atas nama tersebut. Siapa pun, termasuk pesaing Anda, bisa dengan bebas menggunakan nama itu untuk bisnis mereka sendiri.</li >
        Merek;
    menjadi;
    milik;
    publik. < /strong> Nama yang Anda bangun dengan biaya mahal bisa didaftarkan oleh pihak lain di esok harinya, tanpa kewajiban apa pun kepada Anda.</li >
        Daftar;
    ulang;
    harus;
    dari;
    awal. < /strong> Anda harus melalui proses permohonan baru, mulai dari pemeriksaan administratif hingga masa publikasi dua bulan. Total waktu yang dibutuhkan bisa melebihi satu tahun.</li >
        /ul>
        < p > Ini;
    adalah;
    situasi;
    yang;
    paling;
    merugikan.Nama;
    yang;
    sebelumnya;
    sudah;
    Anda;
    jaga;
    selama;
    10;
    tahun;
    bisa;
    lenyap;
    hanya;
    karena;
    satu;
    kelalaian;
    administratif. < /p>
        < h2 > Bagaimana;
    Cara;
    Monitoring;
    Merek;
    yang;
    Efektif ? /h2>
        < p > Untuk : ;
    mencegah;
    kejadian;
    ini, pemilik;
    merek;
    perlu;
    memiliki;
    sistem;
    monitoring;
    sederhana;
    namun;
    disiplin.Pertama, catat;
    tanggal;
    jatuh;
    tempo;
    di;
    kalender;
    bisnis;
    dan;
    reminder;
    aplikasi;
    setidaknya;
    satu;
    tahun;
    sebelumnya.Kedua, gunakan;
    layanan;
    konsultasi;
    dari;
    biro;
    jasa;
    HKI;
    Jakarta;
    yang;
    memiliki;
    dashboard;
    internal;
    untuk;
    mengingatkan;
    jatuh;
    tempo;
    Anda. < /p>
        < p > Ketiga, simpan;
    semua;
    dokumen;
    sertifikat, bukti;
    pembayaran, dan;
    korespondensi;
    DJKI;
    dalam;
    folder;
    khusus.Terakhir, jika;
    Anda;
    merasa;
    tidak;
    sempat;
    mengurus;
    sendiri, serahkan;
    proses;
    perpanjangan;
    kepada;
    konsultan;
    HKI;
    berpengalaman;
    agar;
    tidak;
    ada;
    detail;
    yang;
    terlewat. < /p>
        < h2 > Berapa;
    Besaran;
    PNBP;
    dan;
    Denda;
    Perpanjangan;
    Merek ? /h2>
        < p > Untuk : ;
    satu;
    kelas;
    barang;
    atau;
    jasa, biaya;
    PNBP;
    perpanjangan;
    merek;
    di;
    DJKI;
    saat;
    ini;
    berada;
    di;
    kisaran;
    ratusan;
    ribu;
    rupiah.Tambahan;
    denda;
    keterlambatan;
    bervariasi;
    tergantung;
    pada;
    berapa;
    lama;
    Anda;
    menunda, tetapi;
    dalam;
    banyak;
    kasus, total;
    biaya;
    ini;
    masih;
    jauh;
    lebih;
    murah;
    dibanding;
    risiko;
    kehilangan;
    merek;
    seutuhnya. < /p>
        < p > Sebagai;
    perbandingan, jika;
    Anda;
    harus;
    mendaftarkan;
    ulang;
    merek;
    dari;
    awal;
    karena;
    sudah;
    dihapus;
    DJKI, biaya;
    yang;
    dikeluarkan;
    bisa;
    mencapai;
    belasan;
    kali;
    lipat.Belum;
    lagi;
    waktu;
    yang;
    hilang;
    selama;
    satu;
    tahun;
    proses;
    pendaftaran;
    ulang, termasuk;
    potensi;
    kerugian;
    reputasi;
    dan;
    bisnis;
    selama;
    masa;
    transisi. < /p>
        < h2 > Bagaimana;
    Prosedur;
    Perpanjangan;
    yang;
    Benar ? /h2>
        < p > Secara : ;
    umum, prosedur;
    perpanjangan;
    merek;
    di;
    DJKI;
    dimulai;
    dengan;
    penyiapan;
    dokumen;
    sertifikat;
    asli, KTP;
    pemilik, dan;
    formulir;
    permohonan;
    yang;
    tersedia;
    di;
    sistem;
    Merek;
    DJKI.Pengajuan;
    dilakukan;
    secara;
    daring;
    melalui;
    situs;
    resmi, dengan;
    verifikasi;
    pembayaran;
    PNBP;
    dan;
    unggah;
    dokumen;
    pendukung. < /p>
        < p > Setelah;
    pengajuan, DJKI;
    akan;
    melakukan;
    pemeriksaan;
    substantif;
    terhadap;
    permohonan;
    perpanjangan.Jika;
    disetujui, sertifikat;
    perpanjangan;
    akan;
    diterbitkan;
    dengan;
    masa;
    perlindungan;
    baru;
    selama;
    10;
    tahun;
    ke;
    depan.Seluruh;
    proses;
    ini;
    idealnya;
    memakan;
    waktu;
    antara;
    1;
    hingga;
    3;
    bulan, sehingga;
    semakin;
    cepat;
    Anda;
    mengajukan, semakin;
    tenang;
    pula;
    posisi;
    hukum;
    merek;
    Anda. < /p>
        < p > HAKASA;
    Group;
    menyediakan;
    layanan;
    monitoring;
    HKI;
    menyeluruh;
    untuk;
    para;
    pemilik;
    merek;
    di;
    Indonesia.Kami;
    tidak;
    hanya;
    mengurus;
    proses;
    perpanjangan, tetapi;
    juga;
    mengingatkan;
    Anda;
    jauh - jauh;
    hari;
    sebelum;
    jatuh;
    tempo.Jangan;
    tunggu;
    masa;
    tenggang;
    hampir;
    habis;
    baru;
    bertindak.Hubungi;
    tim;
    kami;
    sekarang;
    untuk;
    konsultasi;
    gratis. < /p>
        < hr;
    var default_2 = /** @class */ (function () {
        function default_2() {
        }
        return default_2;
    }());
    "my-8 border-slate-200" /  >
        Sumber & Referensi;
    /h4>
        < ul >
        Undang - Undang;
    No.;
    20;
    Tahun;
    2016;
    tentang;
    Merek;
    dan;
    Indikasi;
    Geografis, Pasal;
    35;
    dan;
    Pasal;
    36. < /li>
        < li > Peraturan;
    Pemerintah;
    No.;
    45;
    Tahun;
    2024;
    tentang;
    PNBP;
    DJKI;
    Kemenkumham;
    RI. < /li>
        < li > Surat;
    Edaran;
    DJKI;
    No.;
    13 / SE / 2026;
    tentang;
    Tata;
    Cara;
    Perpanjangan;
    Merek. < /li>
        < /ul>(templateObject_2 || (templateObject_2 = __makeTemplateObject([",\n  // ============ KATEGORI HAK CIPTA ============\n  {\n    id: \"djki-tutup-situs-bajakan\",\n    title:\n      \"Tegas! DJKI Tutup 1.004 Situs Bajakan untuk Lindungi Hak Cipta Digital\",\n    date: \"Mei 2026\",\n    category: \"Hak Cipta\",\n    \n    image:\n      \"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Pemerintah semakin ketat memberantas pelanggaran hak cipta di ruang digital dengan memblokir ribuan situs ilegal sepanjang awal tahun 2026.\",\n    content: "], [",\n  // ============ KATEGORI HAK CIPTA ============\n  {\n    id: \"djki-tutup-situs-bajakan\",\n    title:\n      \"Tegas! DJKI Tutup 1.004 Situs Bajakan untuk Lindungi Hak Cipta Digital\",\n    date: \"Mei 2026\",\n    category: \"Hak Cipta\",\n    \n    image:\n      \"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Pemerintah semakin ketat memberantas pelanggaran hak cipta di ruang digital dengan memblokir ribuan situs ilegal sepanjang awal tahun 2026.\",\n    content: "])))
        < p > Di;
    era;
    digital, pembajakan;
    karya;
    intelektual;
    menjadi;
    ancaman;
    paling;
    masif;
    bagi;
    para;
    kreator, sineas, dan;
    penulis.Merespon;
    hal;
    ini, pemerintah;
    Indonesia;
    melalui;
    Direktorat;
    Penegakan;
    Hukum;
    DJKI;
    bekerja;
    sama;
    dengan;
    Kementerian;
    Komunikasi;
    dan;
    Informatika(Kominfo);
    mengambil;
    langkah;
    tegas. < /p>
        < h2 > Pemblokiran;
    Masif;
    Situs;
    Ilegal < /h2>
        < p > Hingga;
    Mei;
    2026, tercatat;
    lebih;
    dari;
    1.004;
    situs;
    web;
    penyedia;
    konten;
    ilegal;
    telah;
    diblokir.Situs - situs;
    ini;
    terbukti;
    mendistribusikan;
    film, musik, e - book, dan;
    software;
    bajakan;
    tanpa;
    izin;
    dari;
    pencipta;
    aslinya, yang;
    menyebabkan;
    kerugian;
    ekonomi;
    hingga;
    triliunan;
    rupiah. < /p>
        < h2 > Pentingnya;
    Pencatatan;
    Hak;
    Cipta;
    Digital < /h2>
        < p > Tindakan;
    tegas;
    pemerintah;
    ini;
    merupakan;
    angin;
    segar, namun;
    kreator;
    juga;
    harus;
    membentengi;
    dirinya;
    sendiri.Negara;
    hanya;
    bisa;
    menindak;
    tegas;
    pembajakan;
    jika;
    kreator;
    memiliki;
    bukti;
    kepemilikan;
    yang;
    sah;
    secara;
    hukum. < /p>
        < ul >
        Pencatatan;
    sebagai;
    Bukti;
    Otentik: /strong> Sertifikat Surat Pencatatan Ciptaan dari DJKI adalah bukti awal yang sangat kuat di mata pengadilan jika karya Anda dibajak.</li >
        Dasar;
    Laporan;
    ke;
    Platform(Takedown, Notice);
    /strong> Jika karya Anda dicuri dan diunggah ke YouTube, Instagram, atau TikTok, sertifikat Hak Cipta mempercepat proses takedown oleh pihak platform.</li >
        /ul>
        < p > Lindungi;
    aset;
    digital;
    berupa;
    desain, kode;
    software, hingga;
    video;
    konten;
    Anda.HAKASA;
    Group;
    siap;
    membantu;
    proses;
    pencatatan;
    Hak;
    Cipta;
    Anda;
    dalam;
    waktu;
    kurang;
    dari;
    7;
    hari;
    kerja. < /p>
        < hr;
    var default_3 = /** @class */ (function () {
        function default_3() {
        }
        return default_3;
    }());
    "my-8 border-slate-200" /  >
        Sumber & Referensi;
    /h4>
        < ul >
        Undang - Undang;
    No.;
    28;
    Tahun;
    2014;
    tentang;
    Hak;
    Cipta, Pasal;
    113;
    hingga;
    Pasal;
    116(sanksi, pidana). < /li>
        < li > Laporan;
    Kinerja;
    DJKI;
    Kemenkumham;
    RI, Kuartal;
    II;
    2026. < /li>
        < li > Siaran;
    Pers;
    Kemenkominfo, ;
    Penutupan;
    1.004;
    Situs;
    Bajakan;
    per;
    Mei;
    2026;
    /li>
        < /ul>;
}
{
    id: "kelas-merek-nice-classification-umkm",
        title;
    "Pilih Kelas Merek yang Tepat: Kesalahan Klasifikasi Nice (Nice Classification) yang Sering Bikin UMKM Rugi Ratusan Juta",
        date;
    "Oktober 2026",
        category;
    "Merek",
        image;
    "https://images.unsplash.com/photo-1450012509206-92d2b4f2c4f8?auto=format&fit=crop&q=80&w=1000",
        excerpt;
    "Salah memilih kelas barang atau jasa saat pendaftaran merek bukan sekadar masalah administratif. Ini soal ruang lingkup perlindungan hukum Anda, dan kasus-kasus di lapangan menunjukkan UMKM bisa rugi ratusan juta rupiah gara-gara kelas yang keliru.",
        content;
    "\n      <p>Banyak pemilik usaha mikro, kecil, dan menengah (UMKM) yang sudah mengeluarkan biaya untuk mendaftarkan merek di DJKI, mengira segala sesuatunya sudah beres. Sertifikat sudah di tangan. Logo sudah resmi. Tapi begitu bersengketa di pengadilan, mereka terkejut: merek mereka yang sudah terdaftar tidak bisa digunakan sebagai dasar hukum. Penyebabnya hampir selalu satu: <strong>salah memilih kelas pendaftaran</strong>.</p>\n      <p>Pemahaman yang keliru tentang sistem Klasifikasi Nice (Nice Classification) menjadi salah satu jebakan paling mahal dalam pendaftaran merek di Indonesia. Artikel ini membedah kasus demi kasus, sehingga Anda tidak perlu belajar dari kerugian.</p>\n      <h2>Apa Itu Klasifikasi Nice?</h2>\n      <p>Klasifikasi Nice adalah sistem internasional pengelompokan barang dan jasa yang dipakai oleh DJKI untuk mengkategorikan lingkup perlindungan sebuah merek. Sistem ini terdiri dari 45 kelas: kelas 1 sampai 34 diperuntukkan bagi <em>barang</em>, sedangkan kelas 35 sampai 45 diperuntukkan bagi <em>jasa</em>.</p>\n      <p>Contoh sederhana: kelas 25 melindungi pakaian, kelas 30 melindungi kopi dan makanan, kelas 43 melindungi jasa restoran dan kafe. Satu sertifikat merek pada dasarnya hanya melindungi kategori barang atau jasa spesifik yang Anda daftarkan. Tidak lebih, tidak kurang.</p>\n      <p>Artinya, jika Anda bergerak di industri makanan dan hanya mendaftarkan merek Anda di kelas 30, perlindungan hukum Anda tidak berlaku untuk lini bisnis lain, seperti jasa layanan pesan-antar (kelas 39) atau jasa konsultasi kuliner (kelas 41).</p>\n      <h2>Studi Kasus: Kedai Kopi yang Kehilangan Nama Sendiri</h2>\n      <p>Pengusaha muda di Yogyakarta, sebut saja Rina, membuka kedai kopi dengan nama Kopi Senja. Ia lalu mendaftarkan mereknya di DJKI pada kelas 30, mencakup biji kopi, minuman kopi, dan bahan minuman. Beberapa bulan berselang, jaringan ritel besar ingin bekerja sama, dan Rina menyadari ia butuh melindungi nama itu juga sebagai <em>nama usaha</em>, bukan sekadar nama produk.</p>\n      <p>Sayangnya, Rina tidak pernah mendaftarkan mereknya di kelas 43, yaitu kelas untuk jasa restoran, kafe, dan bar. Sadar akan celah itu, pihak lain mendaftarkan nama nyaris identik di kelas 43. Hasilnya, ketika Rina berekspansi membuka cabang fisik, nama Kopi Senja miliknya tidak bisa dilindungi secara hukum untuk operasional kafe. Sementara itu, pihak lain yang mendaftarkan belakangan justru memiliki sertifikat yang sah untuk kategori tersebut.</p>\n      <p>Kasus seperti ini bukan fiksi. Praktik serupa terjadi di berbagai industri, mulai dari fashion, F&B, hingga produk kecantikan. Biaya untuk bangkit kembali dari kesalahan ini bisa mencapai ratusan juta rupiah, termasuk biaya somasi, negosiasi, hingga sidang Pengadilan Niaga.</p>\n      <h2>Cara Menentukan Kelas yang Tepat</h2>\n      <p>Ada tiga langkah sederhana namun krusial yang bisa Anda lakukan sebelum mendaftarkan merek:</p>\n      <ul>\n        <li><strong>Identifikasi seluruh lini bisnis saat ini dan proyeksi 3-5 tahun ke depan.</strong> Jika Anda sekarang menjual produk fisik, tapi sedang merencanakan layanan berbasis jasa, daftarkan kedua kelas sekaligus.</li>\n        <li><strong>Pelajari tabel kelas DJKI dengan teliti.</strong> Tabel resmi dapat diunduh gratis dari situs DJKI, dan setiap kelas memiliki daftar subkategori spesifik yang sangat detail.</li>\n        <li><strong>Konsultasikan dengan Konsultan HKI Terdaftar.</strong> Profesional HKI memahami konsekuensi hukum dari setiap pilihan kelas dan dapat merekomendasikan strategi pendaftaran yang paling efisien.</li>\n      </ul>\n      <h2>Jangan Ragu Mendaftar Lebih dari Satu Kelas</h2>\n      <p>Biaya pendaftaran memang meningkat seiring bertambahnya jumlah kelas. Namun, dibandingkan potensi kerugian ratusan juta akibat perlindungan yang bolong, investasi tambahan untuk satu atau dua kelas tambahan sangat kecil. Banyak pemilik merek baru akhirnya menambahkan kelas setelah mereka memahami pentingnya perlindungan menyeluruh, dan proses penambahan ini jauh lebih mudah ketika dilakukan sejak awal.</p>\n      <p>Memilih kelas merek bukan perkara teknis yang bisa dianggap enteng. Ini adalah keputusan strategis yang menentukan apakah merek Anda akan menjadi benteng pertahanan bisnis, atau hanya selembar kertas tanpa arti saat diuji di pengadilan. Di HAKASA Group, kami tidak hanya membantu proses administratif pendaftaran, tetapi juga memandu Anda dalam memilih kelas yang paling relevan dengan visi bisnis. Hubungi tim kami untuk konsultasi gratis sebelum Anda mendaftarkan merek.</p>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Undang-Undang No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis, Pasal 22 tentang Kelas Barang/Jasa.</li>\n        <li>World Intellectual Property Organization, \u201CNice Classification of Goods and Services\u201D, 12th Edition (2024).</li>\n        <li>Tabel Kelas Resmi DJKI Kemenkumham RI, edisi 2026.</li>\n      </ul>\n    },\n  {\n    id: \"merek-biasa-vs-merek-terkenal\",\n    title:\n      \"Merek Biasa vs Merek Terkenal: Belajar dari Sengketa Brand Global Melawan Pembajak Lokal di Indonesia\",\n    date: \"November 2026\",\n    category: \"Merek\",\n    \n    image:\n      \"https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Tidak semua merek diperlakukan sama di mata hukum. Pelajari beda status hukum Merek Biasa dan Merek Terkenal (Well-Known Trademark) di Indonesia, plus strategi agar merek Anda tidak dituduh 'membonceng ketenaran' brand global.\",\n    content: "
        < p > Banyak;
    pemilik;
    usaha;
    di;
    Jakarta;
    dan;
    kota;
    besar;
    lain;
    sering;
    terkecoh: mereka;
    mengira;
    seluruh;
    sertifikat;
    merek;
    punya;
    kekuatan;
    hukum;
    yang;
    sama.Faktanya, UU;
    No.;
    20;
    Tahun;
    2016;
    tentang;
    Merek;
    dan;
    Indikasi;
    Geografis;
    membedakan;
    secara;
    tegas;
    antara < strong > Merek;
    Biasa < /strong> dan <strong>Merek Terkenal</strong > (Well - Known);
    Trademark;
    Perbedaan;
    ini;
    menentukan;
    seberapa;
    luas;
    perlindungan;
    yang;
    Anda;
    dapatkan;
    saat;
    bersengketa;
    dengan;
    pembajak;
    lokal. < /p>
        < h2 > Apa;
    Bedanya;
    Merek;
    Biasa;
    dan;
    Merek;
    Terkenal ? /h2>
        < p > Merek : ;
    Biasa;
    adalah;
    merek;
    yang;
    terdaftar;
    di;
    DJKI;
    Kemenkumham;
    untuk;
    barang;
    atau;
    jasa;
    tertentu;
    pada;
    satu;
    atau;
    beberapa;
    kelas;
    Nice.Perlindungan;
    hukumnya;
    bersifat < em > kelas;
    terbatas < /em>, artinya hanya berlaku untuk kelas barang atau jasa yang tercantum di sertifikat.</p >
        Merek;
    Terkenal, sebaliknya, memiliki;
    perlindungan;
    yang;
    jauh;
    lebih;
    luas.Berdasarkan;
    Pasal;
    6;
    ayat(1);
    huruf;
    a;
    UU;
    Merek, Merek;
    Terkenal;
    dilindungi;
    tanpa;
    terbatas;
    kelas;
    barang;
    dan;
    jasa.Artinya, jika;
    merek;
    Anda;
    berstatus;
    Merek;
    Terkenal, pembajak;
    yang;
    mendaftarkan;
    nama;
    identik;
    di;
    kelas;
    mana;
    pun;
    di;
    Indonesia;
    bisa;
    langsung;
    Anda;
    gugat. < /p>
        < p > Lembaga;
    yang;
    berwenang;
    menentukan;
    status;
    Merek;
    Terkenal;
    adalah;
    DJKI;
    untuk;
    perkara;
    administratif, dan;
    Pengadilan;
    Niaga;
    untuk;
    perkara;
    perdata.Status;
    ini;
    sangat;
    krusial;
    terutama;
    bagi;
    merek;
    var global = void 0;
    (function (global) {
    })(global || (global = {}));
    yang;
    namanya;
    dikenal;
    luas;
    oleh;
    masyarakat;
    Indonesia;
    namun;
    tidak;
    sempat;
    mendaftarkan;
    diri;
    di;
    semua;
    kelas. < /p>
        < h2 > Bagaimana;
    Cara;
    Membuktikan;
    Merek;
    Terkenal ? /h2>
        < p > DJKI : ;
    tidak;
    memberikan;
    status;
    Merek;
    Terkenal;
    secara;
    otomatis.Status;
    ini;
    harus;
    dibuktikan;
    berdasarkan;
    parameter;
    yang;
    diatur;
    dalam;
    Pasal;
    6;
    ayat(2);
    UU;
    Merek, yaitu;
    /p>
        < ul >
        Promosi;
    lintas;
    negara. < /strong> Bukti iklan, kampanye digital, dan kerja sama sponsorship yang menjangkau banyak negara, termasuk Indonesia.</li >
        Pendaftaran;
    di;
    banyak;
    negara. < /strong> Daftar sertifikat merek dari berbagai yurisdiksi menunjukkan reputasi global.</li >
        Pengakuan;
    masyarakat;
    luas. < /strong> Riset pasar, jangkauan pelanggan, dan survei brand awareness independen.</li >
        Volume;
    penjualan;
    dan;
    nilai;
    transaksi. < /strong> Laporan keuangan yang menunjukkan pendapatan signifikan dari merek tersebut.</li >
        Reputasi;
    dan;
    prestise. < /strong> Penghargaan industri, liputan media berskala internasional, dan kepemimpinan pasar.</li >
        /ul>
        < p > Tanpa;
    dokumen - dokumen;
    tersebut, pengadilan;
    kemungkinan;
    besar;
    menolak;
    klaim;
    Merek;
    Terkenal.Banyak;
    brand;
    (function (global) {
    })(global || (global = {}));
    akhirnya;
    kalah;
    di;
    Pengadilan;
    Niaga;
    karena;
    bukti;
    tertulis;
    mereka;
    lemah;
    meskipun;
    nama;
    mereka;
    sudah;
    ngetop;
    di;
    kalangan;
    konsumen;
    awam. < /p>
        < h2 > Studi;
    Kasus: Pembajak;
    Lokal;
    yang;
    Meniru;
    Brand;
    Global < /h2>
        < p > Salah;
    satu;
    contoh;
    menarik;
    terjadi;
    di;
    industri;
    F & B.Sebuah;
    jaringan;
    kedai;
    kopi;
    asal;
    Australia;
    yang;
    sudah;
    terkenal;
    di;
    banyak;
    negara;
    mencoba;
    masuk;
    ke;
    pasar;
    Indonesia.Ketika;
    mereka;
    mengurus;
    merek, ternyata;
    sebuah;
    perusahaan;
    lokal;
    sudah;
    lebih;
    dulu;
    mendaftarkan;
    nama;
    yang;
    nyaris;
    identik;
    di;
    kelas;
    43;
    untuk;
    jasa;
    kafe. < /p>
        < p > Brand;
    (function (global) {
    })(global || (global = {}));
    tersebut;
    mengajukan;
    gugatan;
    ke;
    Pengadilan;
    Niaga.Mereka;
    menyertakan;
    bukti;
    promosi;
    internasional, daftar;
    sertifikat;
    di;
    20;
    negara, dan;
    laporan;
    penjualan;
    global.Pengadilan;
    akhirnya;
    menyatakan;
    nama;
    mereka;
    sebagai;
    Merek;
    Terkenal;
    dan;
    menghukum;
    pembajak;
    lokal;
    untuk;
    menghapus;
    pendaftaran;
    serta;
    membayar;
    ganti;
    rugi;
    miliaran;
    rupiah. < /p>
        < p > Namun, hasilnya;
    tidak;
    selalu;
    mulus.Banyak;
    brand;
    serupa;
    yang;
    kalah;
    karena;
    tidak;
    cukup;
    menyiapkan;
    dokumen;
    bukti;
    sebelum;
    bersengketa.Proses;
    pengumpulan;
    bukti;
    yang;
    terlambat;
    justru;
    membuat;
    mereka;
    harus;
    menelan;
    malu;
    di;
    pengadilan. < /p>
        < h2 > Risiko;
    Tuduhan;
    Membonceng;
    Ketenaran(Passing, Off) < /h2>
        < p > Sebaliknya, pemilik;
    usaha;
    lokal;
    juga;
    harus;
    hati - hati.Jika;
    Anda;
    menggunakan;
    nama;
    yang;
    sengaja;
    mirip;
    dengan;
    brand;
    (function (global) {
    })(global || (global = {}));
    terkenal, Anda;
    bisa;
    dituduh < em > passing;
    off < /em> atau sengaja membonceng ketenangan merek orang lain. Tuduhan ini bisa berujung pada sanksi ganti rugi hingga pencabutan merek Anda dari DJKI.</p >
        Oleh;
    karena;
    itu, sebelum;
    mendaftarkan;
    nama;
    bisnis, lakukan;
    riset;
    menyeluruh;
    di;
    basis;
    data;
    merek;
    DJKI, mesin;
    pencari;
    global, dan;
    catatan;
    World;
    Intellectual;
    Property;
    Organization(WIPO).Jika;
    nama;
    Anda;
    berpotensi;
    rancu;
    dengan;
    Merek;
    Terkenal, pilih;
    alternatif;
    lain;
    dari;
    awal. < /p>
        < h2 > Pentingnya;
    Pendaftaran;
    Dini;
    di;
    DJKI < /h2>
        < p > Salah;
    satu;
    strategi;
    paling;
    efektif;
    bagi;
    pemilik;
    merek;
    (function (global) {
    })(global || (global = {}));
    adalah;
    mendaftarkan;
    diri;
    secara;
    dini;
    di;
    DJKI, bahkan;
    sebelum;
    benar - benar;
    masuk;
    ke;
    pasar;
    Indonesia.Prinsip < em > first;
    to;
    file < /em> yang berlaku di Indonesia tidak menunggu brand Anda terkenal. Siapa yang lebih dulu mendaftar, dialah yang diakui secara hukum.</p >
        Bagi;
    UMKM;
    lokal;
    yang;
    mengembangkan;
    merek;
    orisinal, prinsip;
    yang;
    sama;
    berlaku: jangan;
    tunda;
    pendaftaran;
    karena;
    pesaing;
    yang;
    bergerak;
    lebih;
    cepat;
    bisa;
    merebut;
    nama;
    Anda.Daftar;
    di;
    DJKI, amankan;
    sertifikat, dan;
    baru;
    mulai;
    ekspansi. < /p>
        < h2 > Apa;
    Saja;
    Risiko;
    Hukum;
    Jika;
    Nama;
    Bisnis;
    Anda;
    Mirip;
    Brand;
    Global ? /h2>
        < p > Risiko : ;
    hukum;
    bagi;
    pemilik;
    usaha;
    lokal;
    yang;
    menggunakan;
    nama;
    mirip;
    brand;
    (function (global) {
    })(global || (global = {}));
    cukup;
    serius.Pertama, Anda;
    bisa;
    menerima;
    surat;
    somasi;
    dari;
    kuasa;
    hukum;
    pemilik;
    Merek;
    Terkenal, menuntut;
    penghentian;
    penggunaan;
    nama;
    dan;
    ganti;
    rugi;
    finansial. < /p>
        < p > Kedua, jika;
    perkara;
    berlanjut;
    ke;
    Pengadilan;
    Niaga, Anda;
    berpotensi;
    dihukum;
    untuk;
    mengalihkan;
    seluruh;
    keuntungan;
    yang;
    diperoleh;
    dari;
    penggunaan;
    nama;
    tersebut.Ketiga, merek;
    Anda;
    bisa;
    dihapus;
    paksa;
    dari;
    daftar;
    DJKI, memaksa;
    Anda;
    melakukan;
    pendaftaran;
    ulang;
    dengan;
    nama;
    baru;
    dan;
    kehilangan;
    seluruh;
    investasi;
    pemasaran;
    yang;
    sudah;
    dibangun. < /p>
        < h2 > Langkah;
    Praktis;
    Mengecek;
    Apakah;
    Merek;
    Anda;
    Berpotensi;
    Bermasalah < /h2>
        < p > Sebelum;
    mengajukan;
    pendaftaran;
    ke;
    DJKI, lakukan;
    tiga;
    langkah;
    verifikasi;
    sederhana.Cek;
    basis;
    data;
    resmi;
    DJKI;
    melalui;
    pencarian;
    daring;
    untuk;
    memastikan;
    tidak;
    ada;
    merek;
    identik;
    atau;
    mirip;
    di;
    kelas;
    yang;
    Anda;
    targetkan. < /p>
        < p > Selanjutnya, lakukan;
    riset;
    (function (global) {
    })(global || (global = {}));
    melalui;
    WIPO;
    Global;
    Brand;
    Database;
    untuk;
    memastikan;
    merek;
    Anda;
    tidak;
    berbenturan;
    dengan;
    Merek;
    Terkenal;
    dari;
    negara;
    lain.Terakhir, konsultasikan;
    dengan;
    konsultan;
    HKI;
    di;
    Jakarta;
    yang;
    memahami;
    seluk - beluk;
    hukum;
    merek;
    dan;
    dapat;
    memberikan;
    opini;
    hukum;
    tertulis(legal, opinion);
    mengenai;
    kelayakan;
    pendaftaran;
    Anda. < /p>
        < p > HAKASA;
    Group, sebagai;
    biro;
    jasa;
    HKI;
    Jakarta;
    yang;
    berpengalaman, siap;
    membantu;
    Anda;
    memastikan;
    merek;
    Anda;
    terlindungi;
    dengan;
    strategi;
    yang;
    tepat.Tim;
    kami;
    akan;
    melakukan;
    penelusuran;
    menyeluruh, menyusun;
    strategi;
    pendaftaran, dan;
    mendampingi;
    setiap;
    proses;
    administratif;
    di;
    DJKI;
    hingga;
    sertifikat;
    terbit. < /p>
        < hr;
    var default_4 = /** @class */ (function () {
        function default_4() {
        }
        return default_4;
    }());
    "my-8 border-slate-200" /  >
        Sumber & Referensi;
    /h4>
        < ul >
        Undang - Undang;
    No.;
    20;
    Tahun;
    2016;
    tentang;
    Merek;
    dan;
    Indikasi;
    Geografis, Pasal;
    6;
    ayat(1);
    dan(2). < /li>
        < li > TRIPs;
    Agreement, Article;
    16(protection, of, well - known, trademarks). < /li>
        < li > Putusan;
    Mahkamah;
    Agung;
    No.;
    144;
    PK / Pdt.SUS - HKI / 2024(kriteria, merek, terkenal, di, Indonesia). < /li>
        < /ul>;
}
{
    id: "pidana-modifikasi-karya-visual",
        title;
    "Hati-hati, Modifikasi Karya Visual Tanpa Izin Bisa Kena Pidana",
        date;
    "Juni 2026",
        category;
    "Hak Cipta",
        image;
    "https://images.unsplash.com/photo-1505371905894-6c41ce3ba65a?auto=format&fit=crop&q=80&w=1000",
        excerpt;
    "Mengambil gambar dari internet lalu memodifikasinya untuk kebutuhan komersial brosur atau konten media sosial adalah pelanggaran hukum berat.",
        content;
    "\n      <p>Kebiasaan mencari gambar dari mesin pencari seperti Google, lalu mengeditnya untuk keperluan iklan atau postingan komersial perusahaan masih sering terjadi. Padahal, praktik ini mengandung risiko hukum pidana yang sangat serius.</p>\n      <h2>Memahami Hak Moral dan Hak Ekonomi</h2>\n      <p>Setiap karya visual (foto, desain grafis, ilustrasi, lukisan) secara otomatis dilindungi Hak Cipta sejak karya itu diwujudkan. Terdapat dua hak mutlak di dalamnya:</p>\n      <ul>\n        <li><strong>Hak Ekonomi:</strong> Hak pencipta untuk mendapatkan keuntungan finansial. Menggunakan karya orang lain untuk jualan tanpa membayar lisensi adalah pencurian hak ekonomi.</li>\n        <li><strong>Hak Moral:</strong> Hak agar nama pencipta dicantumkan dan hak agar karyanya tidak diubah/dimodifikasi tanpa izin. Mengedit foto orang lain (meskipun sudah dibeli lisensinya) tanpa persetujuan kreator bisa melanggar hak moral.</li>\n      </ul>\n      <h2>Sanksi Pelanggaran Sesuai UU No. 28 Tahun 2014</h2>\n      <p>Sesuai Undang-Undang Hak Cipta, pelanggaran seperti ini dapat dikenakan sanksi pidana penjara maksimal 10 tahun dan/atau denda maksimal Rp 4.000.000.000 (Empat Miliar Rupiah).</p>\n      <p>Sebagai pelaku bisnis yang profesional, pastikan seluruh aset visual brand Anda memiliki legalitas yang jelas, baik itu desain logo, desain kemasan, hingga jingle iklan. HAKASA Group dapat melakukan audit dan pendaftaran Hak Cipta aset visual perusahaan Anda.</p>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Undang-Undang No. 28 Tahun 2014 tentang Hak Cipta, Pasal 9 (hak moral) dan Pasal 113 (sanksi pidana).</li>\n        <li>Studi Kasus: Putusan PN Jakarta Pusat No. 451/Pid.Sus/2025 (modifikasi foto komersial tanpa izin).</li>\n        <li>Cipta Karya Indonesia, \u201CPerlindungan Karya Visual di Era Digital\u201D (2025).</li>\n      </ul>\n    },\n  {\n    id: \"status-hak-cipta-sound-horeg\",\n    title:\n      \"Pemerintah Luruskan Status Hak Cipta 'Sound Horeg' di Jawa Timur\",\n    date: \"Oktober 2026\",\n    category: \"Hak Cipta\",\n    \n    image:\n      \"https://images.unsplash.com/photo-1505664177941-be672e8113ce?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Sempat viral akan didaftarkan Hak Ciptanya, Kemenkumham tegaskan bahwa sertifikat Hak Cipta untuk fenomena Sound Horeg tidak pernah diterbitkan.\",\n    content: "
        < p > Dunia;
    maya;
    sempat;
    dihebohkan;
    oleh;
    kabar;
    bahwa;
    fenomena;
    "Sound Horeg"(kegiatan, pawai, sound, system, raksasa, yang, populer, di, Jawa, Timur);
    akan;
    didaftarkan;
    sebagai;
    Hak;
    Kekayaan;
    Intelektual.Wacana;
    ini;
    memicu;
    perdebatan;
    panjang;
    di;
    kalangan;
    akademisi;
    dan;
    masyarakat. < /p>
        < h2 > Klarifikasi;
    Kemenkumham < /h2>
        < p > Pada;
    awal;
    Oktober;
    2026, pihak;
    Kementerian;
    Hukum;
    dan;
    HAM;
    secara;
    resmi;
    meluruskan;
    kabar;
    tersebut.Kemenkumham;
    menegaskan;
    bahwa;
    tidak;
    pernah;
    ada;
    penerbitan;
    sertifikat;
    Hak;
    Cipta;
    untuk;
    "Sound Horeg". < /p>
        < p > Dalam;
    ilmu;
    hukum;
    KI, sebuah;
    tradisi, fenomena;
    budaya;
    massa, atau;
    suara;
    kebisingan(desibel, tinggi);
    secara;
    umum;
    tidak;
    memenuhi;
    unsur - unsur;
    dasar;
    perlindungan;
    Hak;
    Cipta;
    maupun;
    Hak;
    Paten. < /p>
        < h2 > Apa;
    Syarat;
    Karya;
    Bisa;
    Dicatatkan;
    Hak;
    Ciptanya ? /h2>
        < p > Agar : ;
    masyarakat;
    tidak;
    salah;
    kaprah, sebuah;
    karya;
    hanya;
    bisa;
    dicatatkan;
    jika;
    memenuhi;
    unsur: /p>
        < ul >
        Bentuk;
    Nyata(Fixation);
    /strong> Harus ada wujud fisiknya (berupa buku, rekaman lagu asli, gambar), bukan sekadar ide atau konsep kegiatan budaya.</li >
        Orisinalitas;
    /strong> Berasal dari kreativitas intelektual pencipta secara pribadi, bukan warisan publik atau klaim kebiasaan massa.</li >
        /ul>
        < p > Kejadian;
    ini;
    menunjukkan;
    betapa;
    pentingnya;
    pendampingan;
    Konsultan;
    HKI;
    dalam;
    mengidentifikasi;
    aset;
    mana;
    yang;
    bisa;
    dilindungi;
    dan;
    mana;
    yang;
    masuk;
    domain;
    publik.Jangan;
    buang;
    waktu;
    dan;
    uang;
    Anda;
    untuk;
    mendaftarkan;
    sesuatu;
    yang;
    tidak;
    bisa;
    dilindungi;
    hukum.Konsultasikan;
    bersama;
    ahlinya;
    di;
    HAKASA;
    Group. < /p>
        < hr;
    var default_5 = /** @class */ (function () {
        function default_5() {
        }
        return default_5;
    }());
    "my-8 border-slate-200" /  >
        Sumber & Referensi;
    /h4>
        < ul >
        Klarifikasi;
    Resmi;
    Kementerian;
    Hukum;
    dan;
    HAM;
    RI, 6;
    Oktober;
    2026, tentang;
    Sound;
    Horeg. < /li>
        < li > Undang - Undang;
    No.;
    28;
    Tahun;
    2014;
    tentang;
    Hak;
    Cipta, Pasal;
    1;
    dan;
    Pasal;
    2(definisi, ciptaan). < /li>
        < li > WIPO, ;
    Understanding;
    Copyright;
    and;
    Related;
    Rights;
    (2024). < /li>
        < /ul>;
}
{
    id: "lolos-verifikasi-shopee-tiktok-mall-2026",
        title;
    "Rahasia Lolos Verifikasi Shopee Mall & TikTok Mall 2026: Mengapa Punya Sertifikat Merek Saja Tidak Cukup?",
        date;
    "Oktober 2026",
        category;
    "E-Commerce",
        image;
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
        excerpt;
    "Punya sertifikat merek bukan jaminan lolos verifikasi Shopee Mall atau TikTok Mall. Marketplace di 2026 makin ketat, dan satu ketidaksesuaian data saja bisa membuat aplikasi Anda ditolak mentah-mentah.",
        content;
    "\n      <p>Di Indonesia, mendaftar sebagai seller biasa di marketplace mana pun relatif mudah. Tantangan sesungguhnya muncul ketika sebuah brand ingin naik level menjadi Official Store di Shopee Mall, TikTok Mall, atau LazMall. Di sinilah sebagian besar pemohon mendapat penolakan yang tidak mereka antisipasi.</p>\n      <p>Pada 2026, standar verifikasi marketplace menjadi jauh lebih ketat dibanding lima tahun lalu. Platform tidak lagi cukup hanya memastikan Anda memiliki NIB. Mereka sekarang melakukan audit forensik terhadap seluruh dokumen legal, dan salah satu faktor penentu terbesar adalah <strong>konsistensi antara nama toko, nama di NIB, KTP, dan Sertifikat Merek</strong>.</p>\n      <h2>Sertifikat Merek: Syarat Mutlak, Tapi Bukan Satu-satunya</h2>\n      <p>Tidak bisa dimungkiri, sertifikat merek dari DJKI adalah <em>ticket to enter</em> ke dalam ekosistem Official Store. Tanpa sertifikat ini, sebagian besar platform langsung menolak aplikasi pada tahap awal. Tapi setelah tiket ini Anda pegang, pemeriksa marketplace akan mulai membedah dokumen Anda baris per baris.</p>\n      <p>Salah satu jebakan klasik adalah <strong>ketidaksesuaian nama</strong>. Misalnya, sertifikat merek Anda atas nama \"Kopi Senja\", NIB Anda atas nama \"CV Senja Mandiri\", sementara nama toko di marketplace adalah \"Kopi Senja Official\". Ketiga nama ini terlihat mirip, tetapi di mata sistem verifikasi marketplace, ini adalah tiga entitas hukum yang berbeda. Hasilnya: aplikasi otomatis ditolak.</p>\n      <h2>Kasus Nyata: Salah Kelas Pendaftaran</h2>\n      <p>Masalah lain yang lebih teknis namun sama fatalnya adalah <strong>kesalahan pemilihan kelas</strong>. Anda mungkin berbisnis pakaian, tetapi karena salah konsultasi, Anda mendaftarkan merek di kelas 35, yaitu kelas untuk jasa retail dan franchising, alih-alih kelas 25 yang melindungi pakaian itu sendiri.</p>\n      <p>Bagi marketplace, hal ini menjadi sinyal bahaya. Mereka akan menolak aplikasi karena dokumen hukum Anda tidak melindungi lini produk yang Anda jual. Lebih jauh, mereka akan menganggap Anda belum memahami dasar-dasar perlindungan merek, sehingga sulit dipercaya sebagai Official Store resmi.</p>\n      <p>Bukan hanya pakaian. UMKM di industri kosmetik, makanan, dan gadget sering kali melakukan kesalahan serupa, yaitu mendaftarkan merek di kelas jasa padahal bisnis mereka adalah penjualan produk, atau sebaliknya.</p>\n      <h2>Tiga Dokumen yang Wajib Sinkron</h2>\n      <p>Agar lolos verifikasi, Anda perlu memastikan tiga dokumen utama Anda benar-benar selaras satu sama lain:</p>\n      <ul>\n        <li><strong>NIB (Nomor Induk Berusaha):</strong> Pastikan nama usaha yang tertera di NIB identik dengan nama brand di marketplace. Jika Anda berdagang sebagai PT atau CV, nama badan usaha harus sesuai.</li>\n        <li><strong>KTP Pemilik / Direksi:</strong> Nama pada KTP harus cocok dengan nama penanggung jawab yang tertera di NIB. Marketplace biasanya meminta foto KTP pemilik utama atau seluruh direksi.</li>\n        <li><strong>Sertifikat Merek DJKI:</strong> Nama pemilik di sertifikat harus sama dengan nama di NIB dan KTP. Jika merek terdaftar atas nama perorangan, NIB tidak boleh atas nama perusahaan, begitu juga sebaliknya.</li>\n      </ul>\n      <h2>Persiapan Dokumen yang Efektif</h2>\n      <p>Sebelum mengajukan verifikasi, lakukan simulasi internal. Minta tim Anda membandingkan setiap dokumen, baris per baris. Perhatikan hal-hal kecil seperti singkatan (PT vs Perseroan Terbatas), ejaan, dan urutan nama. Marketplace modern menggunakan sistem AI yang akan langsung menandai ketidaksesuaian meski hanya satu huruf.</p>\n      <p>Selain itu, pastikan kelas di sertifikat merek Anda benar-benar mencakup produk yang Anda jual. Jika Anda menjual makanan ringan, sertifikat harus di kelas 30 (makanan) atau kelas yang relevan. Jangan mengandalkan kelas yang terlalu umum.</p>\n      <h2>Pentingnya Pendampingan Profesional</h2>\n      <p>Mengurus pendaftaran Official Store memang tidak wajib melalui konsultan, tetapi mayoritas seller yang berhasil lolos pada percobaan pertama ternyata mendapatkan pendampingan dari Konsultan HKI atau spesialis e-commerce. Mereka tidak hanya memastikan dokumen Anda sesuai, tetapi juga membantu memperbaiki inkonsistensi sebelum diserahkan ke marketplace.</p>\n      <p>HAKASA Group memiliki layanan khusus untuk seller yang ingin melakukan upgrade ke Official Store. Tim kami akan melakukan audit menyeluruh terhadap dokumen legal Anda, memastikan keselarasan antara NIB, KTP, dan sertifikat merek, sekaligus memberikan rekomendasi strategi agar peluang lolos verifikasi meningkat signifikan. Hubungi kami untuk konsultasi awal yang gratis.</p>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Shopee Mall Seller Policy & Guidelines, edisi 2026 (PT Shopee Indonesia).</li>\n        <li>TikTok Shop Seller Center, \u201CPersyaratan Official Store\u201D (diakses November 2026).</li>\n        <li>Lazada LazMall Registration Guidelines 2026.</li>\n      </ul>\n    ", {
        id: "panduan-pengalihan-hak-merek-2026",
        title: "Panduan Lengkap Pengalihan Hak Merek 2026: Dari Pewarisan Hingga Akuisisi Bisnis",
        date: "November 2026",
        category: "Merek",
        image: "https://images.unsplash.com/photo-1450012509206-92d2b4f2c4f8?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Merek bukan sekadar nama, melainkan aset bisnis bernilai tinggi. Pahami cara sah mengalihkan hak merek lewat pewarisan, hibah, atau akuisisi, dan mengapa pencatatan resmi di DJKI wajib dilakukan.",
        content: "\n      <p>Merek yang sudah terdaftar di DJKI bukan hanya simbol identitas, melainkan juga <strong>aset tak berwujud</strong> (intangible asset) yang memiliki nilai ekonomi dan hukum setara dengan properti, kendaraan, atau saham. Banyak pemilik bisnis masih beranggapan bahwa merek hanya boleh diwariskan lewat bisnisnya, padahal faktanya merek bisa diwariskan, dihibahkan, dijual, atau diagunkan secara independen.</p>\n      <p>Pertanyaan yang paling sering muncul adalah: <strong>Bagaimana cara sah mengalihkan merek ke pihak lain?</strong> Apakah cukup dengan perjanjian di bawah tangan, atau harus ada dokumen khusus dari notaris? Artikel ini akan mengupas tuntas seluruh skenario pengalihan hak merek yang umum terjadi di Indonesia.</p>\n      <h2>Mengapa Pengalihan Merek Harus Dicatatkan ke DJKI?</h2>\n      <p>Berdasarkan UU No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis, pengalihan hak atas merek wajib dicatatkan pada Daftar Umum Merek di DJKI Kemenkumham. Tanpa pencatatan resmi, pengalihan hak tersebut tidak memiliki kekuatan hukum terhadap pihak ketiga.</p>\n      <p>Implikasinya cukup serius. Misalnya, Anda menjual merek Anda ke investor lewat perjanjian tertulis, namun tidak mencatatkan perubahan ke DJKI. Jika di kemudian hari investor tersebut bersengketa dengan kreditur atau mantan mitra Anda, posisi hukumnya lemah karena secara administratif DJKI masih mencatat nama Anda sebagai pemilik sah.</p>\n      <p>Pencatatan ke DJKI memastikan tiga hal: kepastian hukum bagi pemilik baru, perlindungan terhadap klaim pihak ketiga, dan kemampuan untuk bertindak di pengadilan apabila terjadi sengketa atas merek.</p>\n      <h2>Apa Saja Bentuk Pengalihan Hak Merek yang Diakui Hukum?</h2>\n      <p>Dalam praktiknya, terdapat empat bentuk pengalihan yang paling sering dijumpai di Indonesia:</p>\n      <ul>\n        <li><strong>Pewarisan:</strong> Jika pemilik merek meninggal dunia, hak atas merek beralih kepada ahli waris berdasarkan hukum waris yang berlaku di Indonesia. Dokumen pendukungnya adalah Surat Keterangan Waris atau Penetapan Ahli Waris dari Pengadilan.</li>\n        <li><strong>Hibah:</strong> Pemilik memberikan mereknya secara cuma-cuma kepada pihak lain, biasanya kepada keluarga atau yayasan. Dokumen pendukungnya adalah Akta Hibah yang dibuat di hadapan notaris.</li>\n        <li><strong>Jual Beli:</strong> Pengalihan paling umum dalam konteks akuisisi bisnis. Dokumen pendukungnya adalah Akta Jual Beli Merek yang dibuat oleh notaris.</li>\n        <li><strong>Pemisahan (Spin-off) atau Merger:</strong> Dalam restrukturisasi korporasi, merek dialihkan ke entitas hukum baru atau perusahaan hasil merger. Dokumen pendukungnya adalah Akta Pemisahan atau Akta Merger yang disahkan oleh Kementerian Hukum dan HAM.</li>\n      </ul>\n      <p>Keempat bentuk ini sama-sama membutuhkan dokumen otentik yang dibuat oleh atau di hadapan notaris. Tanpa dokumen tersebut, DJKI tidak akan memproses permohonan pencatatan pengalihan hak.</p>\n      <h2>Bahaya Perjanjian Pengalihan di Bawah Tangan</h2>\n      <p>Seringkali muncul kasus di mana dua pihak hanya mengandalkan perjanjian tertulis sederhana, ditandatangani di atas materai, tanpa notaris. Perjanjian semacam ini memang sah sebagai bukti perdata antara kedua belah pihak, namun tidak memiliki kekuatan hukum eksternal.</p>\n      <p>Risiko yang mungkin muncul antara lain: pembeli tidak dapat mengklaim kepemilikan di pengadilan jika penjual ingkar, hak pembeli tidak diakui saat terjadi sengketa dengan pihak ketiga, dan pembeli tidak dapat menggunakan merek sebagai agunan atau modal usaha secara resmi.</p>\n      <p>Singkatnya, perjanjian di bawah tangan hanya menyelesaikan urusan antara penjual dan pembeli, tetapi tidak menyentuh ranah negara. Untuk masuk ke dalam sistem DJKI, dokumen harus melewati notaris terlebih dahulu.</p>\n      <h2>Bagaimana Prosedur Pencatatan Pengalihan di DJKI?</h2>\n      <p>Setelah Akta Notaris ditandatangani, langkah berikutnya adalah mengajukan permohonan pencatatan pengalihan hak ke DJKI. Dokumen yang disiapkan antara lain: salinan Akta Notaris, sertifikat merek asli, KTP pemberi dan penerima hak, NPWP perusahaan (jika terkait), dan formulir permohonan yang diunduh dari situs DJKI.</p>\n      <p>Permohonan diajukan secara daring dengan pembayaran PNBP yang jumlahnya relatif terjangkau. Setelah verifikasi administratif dan substantif, DJKI akan mencatat perubahan pemilik di Daftar Umum Merek dan mengeluarkan sertifikat merek baru atas nama pemilik baru.</p>\n      <p>Seluruh proses idealnya memakan waktu antara 3 hingga 6 bulan, tergantung kelengkapan dokumen dan antrian di DJKI. Karena itu, sebaiknya pengajuan dilakukan sesegera mungkin setelah akta notaris ditandatangani.</p>\n      <h2>Berapa Nilai Ekonomi Sebuah Merek?</h2>\n      <p>Banyak pemilik bisnis yang menjual perusahaannya tidak menghitung merek sebagai bagian dari valuasi aset. Padahal, merek yang sudah dikenal luas, memiliki reputasi baik, dan terlindungi secara hukum di DJKI bisa bernilai ratusan juta hingga miliaran rupiah.</p>\n      <p>Dalam praktik akuisisi bisnis, merek sering kali menjadi salah satu komponen penentu harga akhir. Investor bersedia membayar premium lebih tinggi untuk perusahaan yang memiliki merek terdaftar, karena fondasi hukum untuk ekspansi sudah tersedia.</p>\n      <p>HAKASA Group, sebagai konsultan HKI berpengalaman di Jakarta, siap membantu Anda menyusun strategi pengalihan hak merek yang efisien dan aman secara hukum. Tim kami akan mendampingi mulai dari penyusunan akta notaris, verifikasi dokumen, hingga pengajuan resmi di DJKI. Hubungi kami untuk konsultasi awal.</p>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Undang-Undang No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis, Pasal 41 dan Pasal 42.</li>\n        <li>Kitab Undang-Undang Hukum Perdata (KUHPerdata), Pasal 1666 tentang Jual Beli.</li>\n        <li>Pedoman Pencatatan Pengalihan Merek DJKI Kemenkumham RI (2025).</li>\n      </ul>\n    ",
    };
    {
        id: "keberatan-oposisi-merek-penolakan-pendaftaran",
            title;
        "Keberatan (Oposisi) Merek: Cara Menggagalkan Pendaftaran Merek Kompetitor yang Menjiplak Bisnis Anda",
            date;
        "November 2026",
            category;
        "Merek",
            image;
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=1000",
            excerpt;
        "Ada jendela waktu 2 bulan yang sering terlewat: masa pengumuman merek di DJKI. Jika Anda tidak bertindak cepat, pesaing yang menjiplak nama bisnis Anda bisa sah menjadi pemilik terdaftar.",
            content;
        "\n      <p>Di antara banyak pemilik bisnis di Jakarta, masih ada yang belum memahami satu fase kritis dalam proses pendaftaran merek di DJKI, yaitu <strong>masa pengumuman</strong> (publikasi). Padahal, dua bulan dalam fase ini bisa menjadi penentu apakah Anda mempertahankan nama bisnis Anda atau justru melepasnya ke tangan orang lain.</p>\n      <p>Pertanyaan yang wajib Anda pahami: <strong>Apa yang harus dilakukan jika melihat nama merek Anda muncul di pengumuman resmi DJKI, dengan nama pemohon yang berbeda?</strong> Inilah saatnya Anda menggunakan hak oposisi, senjata utama untuk menggagalkan pendaftaran pesaing yang menjiplak bisnis Anda.</p>\n      <h2>Apa Itu Masa Pengumuman Merek di DJKI?</h2>\n      <p>Setelah melewati pemeriksaan administratif dan lolos dari tahap formalitas, setiap permohonan merek yang masuk ke DJKI akan diumumkan secara terbuka selama <strong>2 bulan</strong> di Pangkalan Data Merek DJKI. Tujuannya adalah memberikan kesempatan kepada pihak ketiga yang merasa dirugikan untuk mengajukan keberatan.</p>\n      <p>Selama 2 bulan tersebut, masyarakat, pesaing, atau pemilik usaha lain dapat menelusuri permohonan yang masuk. Jika ada yang merasa nama mereka digunakan secara tidak sah, inilah waktu yang tepat untuk bertindak. Jika tidak ada yang mengajukan keberatan hingga masa publikasi berakhir, DJKI akan melanjutkan ke tahap pemeriksaan substantif dan berpotensi menerbitkan sertifikat.</p>\n      <h2>Apa Bedanya Keberatan (Oposisi) dengan Sanggahan (Hearing)?</h2>\n      <p>Kedua istilah ini sering tertukar, padahal berbeda fase dan tujuannya. Oposisi adalah langkah preventif yang Anda lakukan saat merek pesaing masih dalam tahap pengumuman. Dalam fase ini, sertifikat belum diterbitkan, sehingga posisi hukum Anda sebagai pemilik merek yang lebih dulu terdaftar akan menjadi senjata utama.</p>\n      <p>Sanggahan (Hearing) adalah langkah kuratif yang dilakukan saat DJKI telah mengeluarkan Surat Usulan Penolakan terhadap merek yang Anda ajukan. Dalam fase ini, Anda berargumentasi untuk mempertahankan merek Anda sendiri agar tidak ditolak.</p>\n      <p>Singkatnya, oposisi adalah strategi menyerang dari posisi pemilik merek lama, sedangkan sanggahan adalah strategi bertahan untuk pemilik merek baru. Keduanya sama-sama membutuhkan dokumen argumen hukum yang kuat.</p>\n      <h2>Bukti Apa Saja yang Diperlukan untuk Mengajukan Oposisi?</h2>\n      <p>Dalam menyusun surat oposisi, ada beberapa bukti utama yang biasanya diminta oleh pemeriksa DJKI:</p>\n      <ul>\n        <li><strong>Sertifikat Merek Terdaftar lebih dulu.</strong> Ini adalah bukti paling kuat. Anda harus sudah memiliki sertifikat merek yang nama dan kelasnya identik atau mirip dengan merek yang Anda tolak.</li>\n        <li><strong>Bukti Penggunaan Pertama.</strong> Invoice, brosur, kemasan produk, atau materi promosi yang menunjukkan bahwa Anda sudah menggunakan merek tersebut sebelum pesaing mengajukan.</li>\n        <li><strong>Bukti Reputasi dan Popularitas.</strong> Jika merek Anda sudah dikenal luas, tunjukkan liputan media, data penjualan, atau pengakuan pasar.</li>\n        <li><strong>Kesamaan pada Pokoknya.</strong> Analisis visual dan fonetik yang menunjukkan bahwa merek pesaing memiliki kemiripan signifikan dengan merek Anda.</li>\n      </ul>\n      <p>Tanpa bukti-bukti ini, oposisi Anda kemungkinan besar akan ditolak DJKI. Pemeriksa tidak cukup hanya dengan klaim subjektif; mereka membutuhkan dokumen otentik yang bisa diverifikasi.</p>\n      <h2>Mengapa Anda Membutuhkan Bantuan Spesialis?</h2>\n      <p>Menyusun surat oposisi terlihat sederhana, tetapi di baliknya ada analisis hukum yang kompleks. Pemeriksa DJKI terbiasa membaca puluhan oposisi setiap minggunya, sehingga argumen yang lemah atau generic tidak akan mendapat respons positif.</p>\n      <p>Spesialis oposisi memahami bagaimana menyusun struktur argumen yang sistematis, memilih bukti mana yang paling relevan, dan menyusun narasi yang meyakinkan pemeriksa bahwa merek pesaing seharusnya ditolak. Pengalaman mereka dalam menangani oposisi serupa menjadi modal penting untuk memenangkan kasus Anda.</p>\n      <h2>Apa yang Terjadi Jika Oposisi Anda Diterima?</h2>\n      <p>Jika oposisi Anda diterima oleh pemeriksa DJKI, permohonan merek pesaing akan ditolak dan tidak akan diteruskan ke tahap penerbitan sertifikat. Nama yang mereka daftarkan tidak akan pernah menjadi milik mereka secara sah. Anda pun bebas menggunakan nama Anda tanpa ada pihak lain yang mengklaim.</p>\n      <p>Sebaliknya, jika oposisi Anda ditolak, Anda masih memiliki opsi untuk mengajukan gugatan ke Pengadilan Niaga, namun prosesnya akan jauh lebih panjang dan mahal. Karena itu, menyiapkan oposisi yang kuat sejak awal adalah investasi terbaik.</p>\n      <h2>Bagaimana Cara Memantau Masa Pengumuman Merek?</h2>\n      <p>Cara paling efektif untuk mengetahui apakah ada pesaing yang berusaha mendaftarkan nama Anda adalah memantau secara berkala Pangkalan Data Merek DJKI. Anda bisa menggunakan fitur pencarian daring untuk memantau permohonan yang masuk di kelas yang Anda targetkan.</p>\n      <p>Banyak konsultan HKI Jakarta juga menawarkan layanan monitoring merek dengan sistem alert otomatis. Setiap kali ada permohonan baru dengan kata kunci relevan yang masuk, Anda akan menerima notifikasi untuk segera ditinjau.</p>\n      <p>HAKASA Group menyediakan layanan oposisi merek yang terintegrasi dengan sistem monitoring DJKI. Tim kami akan membantu Anda menyusun surat oposisi yang kuat dan mewakili posisi hukum Anda di hadapan pemeriksa. Hubungi kami sesegera mungkin untuk konsultasi dan tindakan cepat.</p>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Undang-Undang No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis, Pasal 25 dan Pasal 26.</li>\n        <li>Peraturan Menteri Hukum dan HAM No. 67 Tahun 2016 tentang Tahapan Pendaftaran Merek.</li>\n        <li>Trilio, \u201CStrategi Oposisi Merek di DJKI\u201D (edisi September 2026).</li>\n      </ul>\n    },\n  {\n    id: \"perbedaan-merek-dagang-dan-merek-jasa-fnb\",\n    title:\n      \"Perbedaan Merek Dagang dan Merek Jasa: Pemilik Bisnis F&B Wajib Tahu Dua Kelas Ini\",\n    date: \"November 2026\",\n    category: \"Merek\",\n    image:\n      \"https://images.unsplash.com/photo-1580828369019-2238b6d77888?auto=format&fit=crop&q=80&w=1000\",\n    excerpt:\n      \"Salah satu kesalahan paling fatal pemilik bisnis F&B di 2026: hanya mendaftarkan nama produk di kelas barang, lalu kaget ketika nama kafenya dipakai orang lain. Kenali beda kelas 29/30 vs kelas 43 sebelum terlambat.\",\n    content: "
            < p > Industri;
        makanan;
        dan;
        minuman;
        di;
        Indonesia;
        tumbuh;
        pesat.Banyak;
        pemilik;
        kafe, kedai;
        kopi, atau;
        bisnis;
        kuliner;
        rumahan;
        yang;
        akhirnya;
        memutuskan;
        melindungi;
        merek;
        mereka;
        di;
        DJKI;
        Kemenkumham.Namun;
        di;
        tahun;
        2026, kami;
        di;
        HAKASA;
        Group;
        masih;
        melihat;
        satu;
        pola;
        kesalahan;
        yang;
        konsisten: pengusaha;
        F & B;
        mendaftar;
        merek, tetapi;
        hanya;
        di;
        satu;
        kelas. < /p>
            < p > Akibatnya, nama;
        kafe;
        yang;
        sudah;
        mereka;
        bangun;
        bertahun - tahun;
        dengan;
        biaya;
        mahal;
        bisa;
        didaftarkan;
        oleh;
        pihak;
        lain;
        di;
        kelas;
        yang;
        berbeda.Penyebab;
        utamanya;
        adalah;
        tidak;
        memahami;
        perbedaan;
        antara < strong > merek;
        dagang < /strong> (kelas barang) dan <strong>merek jasa</strong > (kelas);
        jasa;
        Mari;
        kita;
        bedah;
        satu;
        per;
        satu. < /p>
            < h2 > Apa;
        Itu;
        Merek;
        Dagang(Kelas, Barang) ? /h2>
            < p > Dalam : ;
        Klasifikasi;
        Nice;
        yang;
        diakui;
        DJKI, kelas;
        1;
        hingga;
        34;
        diperuntukkan;
        bagi;
        barang.Untuk;
        bisnis;
        F & B, kelas;
        yang;
        paling;
        relevan;
        adalah;
        kelas;
        29, 30, dan;
        31.;
        Merek;
        dagang;
        pada;
        dasarnya;
        melindungi < strong > nama;
        produk < /strong> yang Anda jual, seperti kemasan, label, dan brand pada makanan atau minuman itu sendiri.</p >
            Contoh;
        konkret: jika;
        Anda;
        membuat;
        produk;
        kopi;
        bubuk;
        dengan;
        merek;
        Senja;
        Roast;
        dan;
        menjualnya;
        secara;
        retail;
        di;
        marketplace, Anda;
        cukup;
        mendaftarkan;
        merek;
        dagang;
        di;
        kelas;
        30.;
        Sertifikat;
        yang;
        Anda;
        peroleh;
        hanya;
        melindungi;
        merek;
        tersebut;
        ketika;
        digunakan;
        pada;
        kopi;
        bubuk, teh, cokelat, atau;
        bumbu;
        dapur. < /p>
            < h2 > Apa;
        Itu;
        Merek;
        Jasa(Kelas, 43) ? /h2>
            < p > Kelas : ;
        43;
        dalam;
        Klasifikasi;
        Nice;
        secara;
        spesifik;
        diperuntukkan;
        bagi;
        jasa, termasuk;
        layanan;
        restoran, kafe, bar, kedai;
        minuman, dan;
        layanan;
        penyediaan;
        makanan;
        dan;
        minuman.Merek;
        pada;
        kelas;
        ini;
        melindungi < strong > nama;
        usaha < /strong> atau nama tempat usaha Anda.</p >
            Jadi, ketika;
        pelanggan;
        datang;
        ke;
        kafe;
        fisik;
        Anda;
        dengan;
        nama;
        Kopi;
        Senja, merek;
        yang;
        melindungi;
        identitas;
        tempat;
        usaha;
        tersebut;
        berada;
        di;
        kelas;
        43.;
        Tanpa;
        pendaftaran;
        di;
        kelas;
        ini, nama;
        kafe;
        Anda;
        secara;
        hukum;
        tidak;
        terlindungi;
        jika;
        ada;
        pihak;
        lain;
        yang;
        membuka;
        usaha;
        sejenis;
        dengan;
        nama;
        yang;
        sama;
        di;
        lokasi;
        lain. < /p>
            < h2 > Mengapa;
        Banyak;
        Pemilik;
        F & B;
        Melewatkan;
        Kelas;
        43 ? /h2>
            < p > Ada : ;
        beberapa;
        alasan;
        umum;
        yang;
        kami;
        temui;
        di;
        lapangan.Pertama, banyak;
        UMKM;
        beranggapan;
        satu;
        sertifikat;
        sudah;
        cukup;
        untuk;
        melindungi;
        seluruh;
        lini;
        bisnis.Kedua, istilah;
        merek;
        jasa;
        terdengar;
        kurang;
        familiar;
        dibanding;
        merek;
        dagang;
        yang;
        lebih;
        sering;
        muncul;
        di;
        iklan;
        layanan;
        pendaftaran.Ketiga, biaya;
        tambahan;
        untuk;
        satu;
        kelas;
        lagi;
        sering;
        dianggap;
        tidak;
        perlu, apalagi;
        saat;
        usaha;
        masih;
        skala;
        kecil. < /p>
            < p > Persepsi;
        ini;
        berbahaya.Pada;
        kenyataannya, sertifikat;
        merek;
        yang;
        hanya;
        mencakup;
        kelas;
        30;
        tidak;
        memberikan;
        Anda;
        hak;
        eksklusif;
        apa;
        pun;
        di;
        kelas;
        43.;
        Siapapun, termasuk;
        pesaing, bisa;
        datang;
        dan;
        mendaftarkan;
        nama;
        yang;
        sama;
        persis;
        untuk;
        layanan;
        kafe;
        dengan;
        legal;
        standing;
        yang;
        utuh. < /p>
            < h2 > Studi;
        Kasus: Kafe;
        yang;
        Kehilangan;
        Nama;
        Sendiri;
        di;
        2026 < /h2>
            < p > Salah;
        satu;
        kasus;
        yang;
        sempat;
        menjadi;
        perhatian;
        kami;
        di;
        awal;
        2026;
        adalah;
        pemilik;
        usaha;
        F & B;
        di;
        Jakarta.Ia;
        mendaftarkan;
        mereknya;
        pada;
        kelas;
        30;
        untuk;
        produk;
        bumbunya;
        dengan;
        nama;
        Rempah;
        Nusantara.Setelah;
        usahanya;
        berkembang;
        dan;
        membuka;
        beberapa;
        gerai;
        kafe;
        di;
        bawah;
        nama;
        yang;
        sama, ia;
        kaget;
        mengetahui;
        bahwa;
        nama;
        Rempah;
        Nusantara;
        untuk;
        layanan;
        kafe;
        sudah;
        terdaftar;
        atas;
        nama;
        pihak;
        lain;
        di;
        kelas;
        43. < /p>
            < p > Akibatnya, sang;
        pemilik;
        asli;
        tidak;
        bisa;
        menggunakan;
        nama;
        tersebut;
        untuk;
        operasional;
        gerai;
        kafe.Ia;
        harus;
        bernegosiasi;
        dengan;
        pihak;
        yang;
        memegang;
        sertifikat;
        di;
        kelas;
        43, yang;
        akhirnya;
        meminta;
        biaya;
        transfer;
        hak;
        yang;
        cukup;
        tinggi.Padahal, jika;
        sejak;
        awal;
        ia;
        menambah;
        satu;
        kelas;
        saja;
        dalam;
        pendaftaran, semua;
        ini;
        tidak;
        perlu;
        terjadi. < /p>
            < h2 > Langkah;
        Praktis;
        yang;
        Harus;
        Diambil;
        Pemilik;
        F & B < /h2>
            < h3 > Daftarkan;
        Semua;
        Kelas;
        yang;
        Relevan;
        Sejak;
        Awal < /h3>
            < p > Bagi;
        Anda;
        yang;
        memiliki;
        produk;
        makanan;
        atau;
        minuman, selalu;
        pertimbangkan;
        dua;
        kelas;
        minimum: kelas;
        30;
        untuk;
        produk;
        dan;
        kelas;
        43;
        untuk;
        layanan;
        kafe;
        atau;
        restoran.Jika;
        Anda;
        juga;
        memproduksi;
        merchandise;
        seperti;
        kaos, mug, atau;
        totebag;
        bermerek, tambahkan;
        kelas;
        25;
        atau;
        35;
        sesuai;
        kebutuhan. < /p>
            < h3 > Audit;
        Portofolio;
        Merek;
        Setiap;
        Tahun < /h3>
            < p > Jika;
        Anda;
        sudah;
        memiliki;
        sertifikat;
        merek;
        dagang, lakukan;
        audit;
        internal;
        setiap;
        tahun.Periksa;
        lini;
        bisnis;
        baru;
        yang;
        mungkin;
        sudah;
        berkembang;
        dan;
        belum;
        dilindungi.Pendaftaran;
        tambahan;
        di;
        kelas;
        baru;
        jauh;
        lebih;
        murah;
        daripada;
        biaya;
        berperkara;
        di;
        kemudian;
        hari. < /p>
            < h3 > Jangan;
        Ragu;
        Menggunakan;
        Konsultan;
        HKI < /h3>
            < p > Konsultan;
        HKI;
        berpengalaman;
        di;
        Jakarta;
        akan;
        memetakan;
        lini;
        bisnis;
        Anda;
        ke;
        kelas - kelas;
        Nice;
        yang;
        paling;
        relevan.Mereka;
        memastikan;
        tidak;
        ada;
        celah;
        yang;
        bisa;
        dieksploitasi;
        pihak;
        lain.Investasi;
        kecil;
        di;
        awal;
        akan;
        menghemat;
        puluhan;
        kali;
        lipat;
        di;
        kemudian;
        hari. < /p>
            < p > HAKASA;
        Group;
        melayani;
        pendaftaran;
        merek;
        di;
        DJKI;
        untuk;
        berbagai;
        industri, termasuk;
        F & B.Tim;
        kami;
        akan;
        membantu;
        Anda;
        memilih;
        kelas;
        yang;
        tepat;
        dan;
        menyusun;
        strategi;
        perlindungan;
        menyeluruh.Hubungi;
        kami;
        untuk;
        konsultasi;
        gratis. < /p>
            < hr;
        var default_6 = /** @class */ (function () {
            function default_6() {
            }
            return default_6;
        }());
        "my-8 border-slate-200" /  >
            Sumber & Referensi;
        /h4>
            < ul >
            Undang - Undang;
        No.;
        20;
        Tahun;
        2016;
        tentang;
        Merek;
        dan;
        Indikasi;
        Geografis, Pasal;
        21;
        dan;
        Pasal;
        22. < /li>
            < li > World;
        Intellectual;
        Property;
        Organization, Nice;
        Classification;
        of;
        Goods;
        and;
        Services, 12;
        th;
        Edition(2024). < /li>
            < li > Tabel;
        Kelas;
        Resmi;
        DJKI;
        Kemenkumham;
        RI, edisi;
        2026. < /li>
            < /ul>;
    }
    {
        id: "sengketa-merek-era-ai-logo-artificial-intelligence",
            title;
        "Sengketa Merek di Era AI: Apakah Logo Buatan Artificial Intelligence Bisa Didaftarkan ke DJKI?",
            date;
        "November 2026",
            category;
        "Merek",
            image;
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
            excerpt;
        "Logo dari Midjourney, DALL-E, atau Adobe Firefly semakin sering dipakai UMKM Indonesia. Pertanyaannya: apakah DJKI menerima pendaftaran merek dengan logo hasil AI Generatif? Ini jawaban dan implikasinya di 2026.",
            content;
        "\n      <p>Sepanjang 2025 hingga 2026, penggunaan AI Generatif untuk membuat logo bisnis meningkat drastis di kalangan UMKM Indonesia. Platform seperti Midjourney, DALL-E, dan Adobe Firefly memungkinkan siapa pun menghasilkan logo profesional dalam hitungan menit. Pertanyaan yang ramai muncul: apakah logo hasil AI itu bisa didaftarkan ke DJKI Kemenkumham sebagai merek?</p>\n      <p>Pertanyaan ini tidak bisa dijawab dengan ya atau tidak. Ada perbedaan besar antara perlindungan Hak Cipta untuk gambar AI dan fungsinya sebagai Merek di pasar. Artikel ini akan mengupas status hukum dan implikasinya secara gamblang.</p>\n      <h2>Bagaimana DJKI Menyikapi Logo AI?</h2>\n      <p>Berdasarkan praktik yang berlaku di DJKI per 2026, pendaftaran merek tidak mensyaratkan siapa pencipta logo. Yang menjadi perhatian utama pemeriksa adalah <strong>keunikan visual</strong>, <strong>kemampuan pembedaan</strong>, dan <strong>bukannya nama umum atau deskriptif</strong>. Artinya, secara administratif, logo hasil AI yang memenuhi kriteria substantif tetap bisa diterima sebagai gambar merek.</p>\n      <p>Namun, ada nuansa penting. Pasal 21 UU Merek melarang pendaftaran tanda yang menyerupai nama umum, lambang, atau atribut yang sudah menjadi milik umum. Logo AI yang sangat generik atau dihasilkan dengan prompt sederhana cenderung menampilkan pola yang mirip satu sama lain. Risiko ditolak karena kurang distinctive menjadi lebih tinggi.</p>\n      <h2>AI sebagai Pencipta: Dilema Hak Cipta</h2>\n      <p>Pada tataran Hak Cipta, status AI sebagai pencipta masih menjadi perdebatan global. Berdasarkan UU No. 28 Tahun 2014 tentang Hak Cipta, pencipta adalah seorang atau beberapa orang yang secara sendiri-sendiri atau bersama-sama menghasilkan suatu Ciptaan. AI Generatif tidak masuk kategori ini secara hukum di Indonesia.</p>\n      <p>Organisasi WIPO dalam laporan 2024 menyatakan bahwa perlindungan Hak Cipta untuk hasil karya AI masih abu-abu di banyak negara. Beberapa negara mengakui perlindungan terbatas, sementara yang lain menolak sama sekali. Indonesia sendiri belum memiliki regulasi spesifik untuk ciptaan AI, sehingga status kepemilikan Hak Cipta logo AI masih menjadi area abu-abu.</p>\n      <h2>Implikasinya untuk UMKM di Indonesia</h2>\n      <p>Bagi UMKM, penggunaan logo AI tetap sah secara hukum, tetapi ada beberapa catatan penting. Pertama, tidak ada Hak Cipta eksklusif yang melekat pada logo AI yang sepenuhnya dihasilkan oleh mesin. Artinya, jika ada pihak lain yang menggunakan logo sangat mirip, perlindungan hukum Anda lebih lemah dibanding logo yang dibuat desainer manusia.</p>\n      <p>Kedua, Anda tetap bisa mendaftarkan logo AI sebagai Merek di DJKI. Sertifikat Merek yang Anda peroleh tetap berlaku selama 10 tahun dan melindungi nama serta logo di kelas barang atau jasa yang Anda pilih. Risiko sengketa baru muncul ketika ada pihak lain yang independen menggunakan AI serupa dan menghasilkan logo yang mirip.</p>\n      <h2>Apakah Ada Risiko Sengketa?</h2>\n      <p>Risiko sengketa pada dasarnya tidak berbeda dengan pendaftaran logo konvensional. Selama logo Anda cukup unik untuk membedakan produk Anda dan tidak melanggar Merek Terkenal milik pihak lain, sertifikat dari DJKI memberi Anda hak eksklusif. Namun, untuk memperkuat posisi hukum, ada beberapa langkah mitigasi yang bisa dilakukan.</p>\n      <h3>Tambahkan Sentuhan Manusia pada Logo AI</h3>\n      <p>Jangan langsung menggunakan logo AI mentah sebagai output akhir. Mintalah desainer grafis untuk melakukan modifikasi, penyesuaian tipografi, dan elemen pembeda lain. Dengan begitu, logo yang didaftarkan memiliki kontribusi manusia yang jelas, sehingga status Hak Cipta dan orisinalitasnya lebih kuat.</p>\n      <h3>Simpan Bukti Prompt dan Riwayat Pembuatan</h3>\n      <p>Selalu simpan riwayat perintah yang Anda gunakan di platform AI, beserta tanggal dan versi. Jika suatu saat terjadi sengketa, dokumentasi ini menjadi bukti bahwa Anda adalah pengguna pertama. Meskipun bukan bukti hukum yang absolut, ini membantu proses mediasi.</p>\n      <h3>Selalu Lakukan Penelusuran Merek Sebelum Mendaftar</h3>\n      <p>Sebelum mengajukan logo AI ke DJKI, lakukan penelusuran di Pangkalan Data Merek DJKI untuk memastikan tidak ada pihak lain yang sudah mendaftarkan logo serupa di kelas yang sama. Langkah ini sederhana tapi sering diabaikan oleh pengguna AI.</p>\n      <h2>Bagaimana DJKI Akan Menyikapi 5 Tahun ke Depan?</h2>\n      <p>WIPO bersama banyak negara sedang merumuskan kerangka regulasi global untuk AI dan kekayaan intelektual. DJKI Kemenkumham kemungkinan akan mengeluarkan pedoman teknis yang lebih spesifik dalam 2-3 tahun ke depan. Untuk UMKM, mengikuti perkembangan ini sama pentingnya dengan melindungi merek itu sendiri.</p>\n      <p>Sampai ada kepastian regulasi, pendekatan paling aman adalah memperlakukan logo AI sebagai titik awal, bukan produk akhir. Kombinasikan dengan sentuhan kreatif manusia dan strategi pendaftaran merek yang matang.</p>\n      <p>HAKASA Group, sebagai konsultan HKI di Jakarta, siap membantu Anda menavigasi dunia pendaftaran merek di era AI. Tim kami akan melakukan penelusuran menyeluruh, menilai keunikan logo, dan menyusun strategi pendaftaran yang aman secara hukum. Hubungi kami untuk konsultasi awal.</p>\n      <hr class=\"my-8 border-slate-200\" />\n      <h4>Sumber & Referensi:</h4>\n      <ul>\n        <li>Undang-Undang No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis, Pasal 21.</li>\n        <li>Undang-Undang No. 28 Tahun 2014 tentang Hak Cipta, Pasal 1 dan Pasal 9.</li>\n        <li>World Intellectual Property Organization, WIPO Report on AI and Intellectual Property (2024).</li>\n      </ul>\n    ",
        ;
        ;
    }
}
var templateObject_1, templateObject_2;
