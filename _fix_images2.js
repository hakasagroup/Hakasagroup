const fs = require("fs");
const p = "D:/Hakasagroup/src/data/blogData.ts";
const c = fs.readFileSync(p, "utf8");
const lines = c.split("\n");

// We need to replace by LINE NUMBER. Strategy:
// Replace occurrences by counting from top.
const replacements = [
  // Line 357 - Denda Perpanjangan: 4th occurrence of 156017...
  ["https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000", 4],
  // Line 405 - Modifikasi Visual: 5th occurrence of 156017...
  ["https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000", 5],
  // Line 526 - DJKI Tutup Situs: 6th occurrence of 156017...
  ["https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000", 6],
  // Line 718 - F&B: 2nd occurrence of 155411...
  ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=1000", 2],
  // Line 474 - Perpanjangan Expired: 2nd occurrence of 155411...  
  ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=1000", 1],
  // Line 626 - Pengalihan Hak: 2nd occurrence of 158982...
  ["https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000", 2],
  // Line 250 - Usulan Penolakan: 2nd occurrence of 147285...
  ["https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000", 2],
];

let newContent = c;
replacements.forEach(([old, nu, nth]) => {
  let count = 0;
  newContent = newContent.replace(old, (m) => {
    count++;
    return count === nth ? nu : m;
  });
  console.log(`Replaced ${nth}th ${old.substring(0, 40)}... with ${nu.substring(0, 40)}...`);
});

fs.writeFileSync(p, newContent);
console.log("Saved!");

// Verify
const m = newContent.match(/photo-[a-z0-9-]+\?/g) || [];
const counts = {};
m.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
const dups = Object.entries(counts).filter(([, v]) => v > 1);
if (dups.length) {
  console.log("SISA DUPLIKAT:");
  dups.forEach(([k, v]) => console.log("  " + k + " (" + v + "x)"));
} else {
  console.log("SEMPURNA - Tidak ada duplikat!");
}
console.log("URL unik: " + Object.keys(counts).length + " dari " + m.length);
