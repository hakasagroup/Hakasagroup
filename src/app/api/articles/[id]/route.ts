import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

type ArticleRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: ArticleRouteContext) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Gagal mengambil artikel" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: ArticleRouteContext) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const article = await prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        image: body.image,
        content: body.content,
        excerpt: body.excerpt || null,
        metaDesc: body.metaDesc || null,
        keywords: body.keywords || null,
        isPublished: body.isPublished,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json(
      { error: "Gagal update artikel" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: ArticleRouteContext,
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}