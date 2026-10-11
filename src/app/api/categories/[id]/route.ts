import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  _request: Request,
  { params }: CategoryRouteContext,
) {
  try {
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}