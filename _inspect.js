const fs=require("fs");
const p="D:/Hakasagroup/src/data/blogData.ts";
const s=fs.readFileSync(p,"utf8");
const lines=s.split("\n");
// Untuk setiap baris "image:" (bukan ALLOWED), ambil baris berikutnya (URL)
const imageEntries=[];
for(let i=0;i<lines.length;i++){
  const l=lines[i];
  if(l.includes("image:") && !l.includes("ALLOWED") && !l.includes("imageCredit")){
    // Ambil line sebelumnya untuk context (id)
    const prevLine=lines[i-5]||""; // id biasanya 4-5 line sebelum
    const idMatch=prevLine.match(/id:\s*"([^"]+)"/);
    // Ambil baris URL (i+1)
    const urlLine=lines[i+1]||"";
    imageEntries.push({line:i+1,id:idMatch?idMatch[1]:"?",url:urlLine.trim()});
  }
}
imageEntries.forEach(x=>{
  const isValid=x.url.includes("https://images.unsplash.com");
  console.log((isValid?"OK ":"BAD")+" L"+x.line+" id="+x.id+" => "+x.url);
});
