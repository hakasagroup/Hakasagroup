const fs=require("fs");
const p="D:/Hakasagroup/src/data/blogData.ts";
const s=fs.readFileSync(p,"utf8");
// Cari posisi masing-masing entry id
const lines=s.split("\n");
const entries=[];
for(let i=0;i<lines.length;i++){
  const l=lines[i];
  const m=l.match(/^    id: "([^"]+)",/);
  if(m) entries.push({id:m[1],line:i+1});
}
console.log("Found entries:",entries.length);
entries.forEach(e=>console.log("  L"+e.line+": "+e.id));
// Cari first entry (line 215) dan end of file
console.log("\nFile length:",s.length);
console.log("First 200 chars from line 214:");
console.log(lines.slice(213,230).join("\n"));
