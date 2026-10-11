import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(projectRoot, "src", "data", "blogData.ts");
const prisma = new PrismaClient();

function extractBlogDataArray(source) {
  const declaration = source.indexOf("export const BLOG_DATA");
  if (declaration === -1) {
    throw new Error("Deklarasi BLOG_DATA tidak ditemukan di blogData.ts");
  }

  const assignment = source.indexOf("=", declaration);
  const arrayStart = source.indexOf("[", assignment);
  if (arrayStart === -1) {
    throw new Error("Array BLOG_DATA tidak ditemukan di blogData.ts");
  }

  let depth = 0;
  let quote = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = arrayStart; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (inLineComment) {
      if (character === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (character === "*" && nextCharacter === "/") {
        inBlockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }
    if (character === "/" && nextCharacter === "/") {
      inLineComment = true;
      index += 1;
      continue;
    }
    if (character === "/" && nextCharacter === "*") {
      inBlockComment = true;
      index += 1;
      continue;
    }
    if (character === "'" || character === '"' || character === "`") {
      quote = character;
      continue;
    }
    if (character === "[") depth += 1;
    if (character === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(arrayStart, index + 1);
    }
  }

  throw new Error("Array BLOG_DATA tidak memiliki penutup yang valid");
}

async function main() {
  const source = await fs.readFile(sourcePath, "utf8");
  const arrayExpression = extractBlogDataArray(source);
  const articles = Function(`"use strict"; return (${arrayExpression});`)();

  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error("BLOG_DATA kosong atau bukan array yang valid");
  }

  let created = 0;
  let updated = 0;

  for (const article of articles) {
    if (!article?.id || !article.title || !article.category || !article.content) {
      throw new Error(`Data artikel tidak lengkap: ${JSON.stringify(article)}`);
    }

    const result = await prisma.article.upsert({
      where: { slug: article.id },
      update: {
        title: article.title,
        category: article.category,
        image: "",
        content: article.content,
        excerpt: article.excerpt ?? null,
        metaDesc: null,
        keywords: null,
        isPublished: true,
      },
      create: {
        title: article.title,
        slug: article.id,
        category: article.category,
        image: "",
        content: article.content,
        excerpt: article.excerpt ?? null,
        metaDesc: null,
        keywords: null,
        isPublished: true,
      },
    });

    // createdAt dan updatedAt tersedia pada hasil upsert, tetapi hanya slug
    // yang diperlukan untuk membedakan hasil tanpa query tambahan.
    if (result.createdAt.getTime() === result.updatedAt.getTime()) created += 1;
    else updated += 1;
  }

  const migrated = await prisma.article.count();
  const withSafeImages = await prisma.article.count({ where: { image: "" } });
  const published = await prisma.article.count({ where: { isPublished: true } });

  console.log(`✅ Migrasi selesai: ${articles.length} artikel diproses.`);
  console.log(`   Baru: ${created} | Diperbarui: ${updated}`);
  console.log(`   Total artikel di database: ${migrated}`);
  console.log(`   Image kosong: ${withSafeImages}/${articles.length}`);
  console.log(`   Published: ${published}/${articles.length}`);
}

main()
  .catch((error) => {
    console.error("❌ Migrasi gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });