import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { authOptions } from "../auth/[...nextauth]/route";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const extensionByType: Record<string, string> = {
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "File gambar wajib diunggah" },
        { status: 400 },
      );
    }

    const extension = extensionByType[file.type];
    if (!extension) {
      return NextResponse.json(
        { error: "Format file harus JPG, PNG, GIF, SVG, atau WebP" },
        { status: 400 },
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Ukuran gambar harus lebih dari 0 dan maksimal 5 MB" },
        { status: 400 },
      );
    }

    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDirectory, { recursive: true });

    const fileName = `${randomUUID()}${extension}`;
    await writeFile(
      path.join(uploadDirectory, fileName),
      Buffer.from(await file.arrayBuffer()),
    );

    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return NextResponse.json(
      { error: "Gagal mengunggah gambar" },
      { status: 500 },
    );
  }
}