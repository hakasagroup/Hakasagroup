const fs = require("fs");
const p = "D:/Hakasagroup/src/data/blogData.ts";
let c = fs.readFileSync(p, "utf8");

// Fix: Line 434 - ASICS (ganti dari photo-162815 ke photo-145001)
c = c.replace(
  "photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=1000",
  "photo-1450012509206-92d2b4f2c4f8?auto=format&fit=crop&q=80&w=1000"
);

// Fix: Line 556 - Oposisi (ganti dari photo-1505664062203 ke photo-1505664177)
c = c.replace(
  "photo-1505664062203-2c00e8bc1bd4?auto=format&fit=crop&q=80&w=1000",
  "photo-1505664177941-be672e8113ce?auto=format&fit=crop&q=80&w=1000"
);

// Fix: Line 586 - E-Commerce Shopee/TikTok (ganti dari photo-145010 ke photo-147285)
// Only replace the FIRST occurrence for E-Commerce article
let ecCount = 0;
c = c.replace(
  "photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000",
  (match) => { ecCount++; return ecCount === 1 ? "photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000" : match; }
);

// Fix: Line 626 - Sound Horeg (ganti dari photo-1589829085413 ke photo-155075)
// Only replace the SECOND occurrence for Sound Horeg
let sCount = 0;
c = c.replace(
  "photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
  (match) => { sCount++; return sCount === 2 ? "photo-1550751827-4bd374c3f7fb?auto=format&fit=crop&q=80&w=1000" : match; }
);

fs.writeFileSync(p, c);
console.log("Fixed: ASICS, Oposisi, E-Commerce, Sound Horeg");

// Verify
const matches = c.match(/photo-[a-z0-9-]+\?/g) || [];
const counts = {};
matches.forEach((m) => (counts[m] = (counts[m] || 0) + 1));
const dups = Object.entries(counts).filter(([, v]) => v > 1);
if (dups.length) {
  console.log("SISA DUPLIKAT:");
  dups.forEach(([k, v]) => console.log("  " + k + " (" + v + "x)"));
} else {
  console.log("SEMPURNA - Tidak ada duplikat!");
}
console.log("Total URL unik: " + Object.keys(counts).length + " dari " + matches.length + " entries");
