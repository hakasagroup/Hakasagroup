import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedPage = Number(searchParams.get("page"));
    const page = Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

    const total = await prisma.article.count();
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const normalizedPage = Math.min(page, totalPages);
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      skip: (normalizedPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    return NextResponse.json({
      articles,
      page: normalizedPage,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
    });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json(
      { error: "Gagal mengambil artikel" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        image: body.image,
        content: body.content,
        excerpt: body.excerpt || null,
        metaDesc: body.metaDesc || null,
        keywords: body.keywords || null,
        isPublished: body.isPublished ?? true,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json(
      { error: "Gagal membuat artikel" },
      { status: 500 },
    );
  }
}