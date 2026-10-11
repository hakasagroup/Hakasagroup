import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

function generateKeywords(title, category) {
  const words = title
    .toLowerCase()
    .split(' ')
    .filter(
      (word) =>
        word.length > 3 &&
        !['yang', 'dari', 'untuk', 'dengan', 'pada', 'atau'].includes(word),
    );
  const uniqueWords = [...new Set([category.toLowerCase(), ...words])];
  return uniqueWords.slice(0, 6).join(', ');
}

async function main() {
  console.log('Memulai proses Auto-Generate SEO...');

  const articles = await prisma.article.findMany({
    where: { OR: [{ metaDesc: null }, { metaDesc: '' }] },
  });

  console.log(`Ditemukan ${articles.length} artikel yang belum memiliki SEO.`);

  for (const article of articles) {
    const cleanContent = stripHtml(article.content || article.excerpt || '');
    const generatedMetaDesc =
      cleanContent.length > 150
        ? `${cleanContent.substring(0, 150)}...`
        : cleanContent;
    const generatedKeywords = generateKeywords(article.title, article.category);

    await prisma.article.update({
      where: { id: article.id },
      data: {
        metaDesc: generatedMetaDesc,
        keywords: generatedKeywords,
      },
    });
    console.log(`Update SEO sukses: ${article.title}`);
  }

  console.log('Semua SEO artikel lama berhasil diisi!');
}

main()
  .catch((error) => {
    console.error('Gagal melakukan auto-generate SEO:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });