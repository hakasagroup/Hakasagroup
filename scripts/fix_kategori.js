const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses perbaikan kapitalisasi kategori...");

  // Update semua artikel yang kategorinya 'merek' (huruf kecil) menjadi 'Merek' (huruf kapital)
  const result = await prisma.article.updateMany({
    where: {
      category: 'merek' // Huruf kecil
    },
    data: {
      category: 'Merek' // Diubah jadi huruf kapital
    }
  });

  console.log(`Berhasil memperbaiki ${result.count} artikel. Kategori sudah disatukan menjadi "Merek".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });