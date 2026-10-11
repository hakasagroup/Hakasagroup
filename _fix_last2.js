const fs = require("fs");
const p = "D:/Hakasagroup/src/data/blogData.ts";
let c = fs.readFileSync(p, "utf8");

const fixes = [
  // L586 - E-Commerce: change from photo-1554224155 to photo-1556742049
  { id: "lolos-verifikasi-shopee-tiktok-mall-2026", from: "photo-1554224155-8d04cb21cd6c", to: "photo-1556742049-0cfed4f6a45d" },
  // L626 - Pengalihan Hak: change from photo-1505371905 to photo-1450012509206
  { id: "panduan-pengalihan-hak-merek-2026", from: "photo-1505371905894-6c41ce3ba65a", to: "photo-1450012509206-92d2b4f2c4f8" },
];

fixes.forEach(({ id, from, to }) => {
  const regex = new RegExp(
    `\\{\\s*id:\\s*["']${id}["'][\\s\\S]*?image:\\s*["']https://images\\.unsplash\\.com/${from}[^"']+["'][\\s\\S]*?(?=\\{\\s*id:|\\n\\s*\\];)`, "m"
  );
  const match = c.match(regex);
  if (match) {
    c = c.replace(match[0], match[0].replace(
      `https://images.unsplash.com/${from}?auto=format&fit=crop&q=80&w=1000`,
      `https://images.unsplash.com/${to}?auto=format&fit=crop&q=80&w=1000`
    ));
    console.log("Fixed: " + id + " (" + from.substring(0,20) + " -> " + to.substring(0,20) + ")");
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
else console.log("SEMPURNA - 0 duplikat! Semua 15 URL unik.");
console.log("URL unik: " + Object.keys(counts).length + " dari " + urlCount + " entries");
