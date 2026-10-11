var fs = require('fs');
var content = fs.readFileSync('src/components/home/ServicesSection.tsx', 'utf8');
// Fix the backtick typo
content = content.replace("href={\"/layanan/\"}", "href={\"/layanan/\"}");
fs.writeFileSync('src/components/home/ServicesSection.tsx', content);
console.log('Fixed!');
