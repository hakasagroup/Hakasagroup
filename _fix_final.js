const fs = require("fs");
const p = "D:/Hakasagroup/src/data/blogData.ts";
let c = fs.readFileSync(p, "utf8");

// Fix the last 3 duplicates by targeting specific article blocks
const fixes = [
  // Article "lolos-verifikasi" (line 586): change from photo-147285 to photo-1554224155
  {
    id: "lolos-verifikasi-shopee-tiktok-mall-2026",
    from: "photo-1472851294608-062f824d29cc",
    to:   "photo-1554224155-8d04cb21cd6c"
  },
  // Article "panduan-pengalihan" (line 626): change from photo-155674 to photo-1505371905
  {
    id: "panduan-pengalihan-hak-merek-2026",
    from: "photo-1556742049-0cfed4f6a45d",
    to:   "photo-1505371905894-6c41ce3ba65a"
  },
  // Article "perbedaan-merek-dagang" (line 718): change from photo-162815 to photo-158082
  {
    id: "perbedaan-merek-dagang-dan-merek-jasa-fnb",
    from: "photo-1628155930542-3c7a64e2c833",
    to:   "photo-1580828369019-2238b6d77888"
  },
];

fixes.forEach(({ id, from, to }) => {
  const regex = new RegExp(
    `(\\{\\s*id:\\s*["']${id}["'][\\s\\S]*?image:\\s*["']https://images\\.unsplash\\.com/${from}[^"']+["'][\\s\\S]*?)(?=\\{\\s*id:|\\n\\s*\\];)`,
    "m"
  );
  const match = c.match(regex);
  if (match) {
    c = c.replace(match[0], match[0].replace(
      `https://images.unsplash.com/${from}?auto=format&fit=crop&q=80&w=1000`,
      `https://images.unsplash.com/${to}?auto=format&fit=crop&q=80&w=1000`
    ));
    console.log("Fixed: " + id);
  } else {
    console.log("NOT FOUND: " + id);
  }
});

fs.writeFileSync(p, c);
console.log("\nSaved!");

// Final verification
const lines = c.split("\n");
let urlCount = 0;
lines.forEach((l, i) => {
  const m = l.match(/https:\/\/images\.unsplash\.com\/([^?]+)/);
  if (m) { urlCount++; console.log("L" + (i+1) + ": " + m[1]); }
});

const all = c.match(/photo-[a-z0-9-]+\?/g) || [];
const counts = {};
all.forEach(x => counts[x] = (counts[x]||0)+1);
const dups = Object.entries(counts).filter(([,v]) => v > 1);
console.log("\n--- DUPLIKAT CHECK ---");
if (dups.length) dups.forEach(([k,v]) => console.log("DUPLIKAT: " + k + " (" + v + "x)"));
else console.log("SEMPURNA - 0 duplikat!");
console.log("URL unik: " + Object.keys(counts).length + " dari " + urlCount + " entries");
