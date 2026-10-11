const fs = require("fs");
const p = "D:/Hakasagroup/src/data/blogData.ts";
let c = fs.readFileSync(p, "utf8");

// Map article id -> replacement (old URL substring -> new URL)
const urlMap = {
  // denda-telat: line 357 - still has 156017... -> need 1556742049
  "denda-telat-perpanjang-merek-2026": {
    from: "photo-1560179707-f14e90ef3623",
    to:   "photo-1556742049-0cfed4f6a45d"
  },
  // pidana-modifikasi: line 405 - still has 156017... -> need 1505371905894
  "pidana-modifikasi-karya-visual": {
    from: "photo-1560179707-f14e90ef3623",
    to:   "photo-1505371905894-6c41ce3ba65a"
  },
  // djki-tutup-situs: line 526 - still has 156017... -> need 145010...
  "djki-tutup-situs-bajakan": {
    from: "photo-1560179707-f14e90ef3623",
    to:   "photo-1450101499163-c8848c66ca85"
  },
  // perbedaan-merek-dagang: line 718 - still has 155411... -> need 162815
  "perbedaan-merek-dagang-dan-merek-jasa-fnb": {
    from: "photo-1554118811-1e0d58224f24",
    to:   "photo-1628155930542-3c7a64e2c833"
  },
  // perpanjangan-merek-expired: line 474 - still has 155411... -> need 1505371905
  "kelas-merek-nice-classification-umkm": {
    from: "photo-1554118811-1e0d58224f24",
    to:   "photo-1505371905894-6c41ce3ba65a"
  },
  // panduan-pengalihan: line 626 - still has 158982... -> need 1556742049
  "panduan-pengalihan-hak-merek-2026": {
    from: "photo-1589829085413-56de8ae18c73",
    to:   "photo-1556742049-0cfed4f6a45d"
  },
  // lolos-verifikasi: line 586 - still has 145010... -> need 147285
  "lolos-verifikasi-shopee-tiktok-mall-2026": {
    from: "photo-1450101499163-c8848c66ca85",
    to:   "photo-1472851294608-062f824d29cc"
  },
};

Object.entries(urlMap).forEach(([id, { from, to }]) => {
  // Find the article block and replace only within it
  const regex = new RegExp(
    `(\\{\\s*id:\\s*["']${id}["'][\\s\\S]*?image:\\s*["']https://images\\.unsplash\\.com/${from}[^"']+["'][\\s\\S]*?)(?=\\{\\s*id:|\\n\\s*\\];)`,
    "m"
  );
  const match = c.match(regex);
  if (match) {
    const block = match[0].replace(
      `https://images.unsplash.com/${from}?auto=format&fit=crop&q=80&w=1000`,
      `https://images.unsplash.com/${to}?auto=format&fit=crop&q=80&w=1000`
    );
    c = c.replace(match[0], block);
    console.log("Fixed: " + id);
  } else {
    console.log("NOT FOUND: " + id + " (may already be correct)");
  }
});

fs.writeFileSync(p, c);
console.log("\nSaved!");

// Verify all 15 URLs
const lines = c.split("\n");
let urlCount = 0;
lines.forEach((l, i) => {
  const m = l.match(/https:\/\/images\.unsplash\.com\/([^?]+)/);
  if (m) {
    urlCount++;
    console.log("L" + (i + 1) + ": " + m[1]);
  }
});

const allMatches = c.match(/photo-[a-z0-9-]+\?/g) || [];
const counts = {};
allMatches.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
const dups = Object.entries(counts).filter(([, v]) => v > 1);
console.log("\n--- DUPLIKAT CHECK ---");
if (dups.length) dups.forEach(([k, v]) => console.log("DUPLIKAT: " + k + " (" + v + "x)"));
else console.log("SEMPURNA - 0 duplikat!");
console.log("URL unik: " + Object.keys(counts).length + " dari " + urlCount + " entries");
