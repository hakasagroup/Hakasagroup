import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, whatsapp, source } = body;

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Nama dan WhatsApp wajib diisi" },
        { status: 400 },
      );
    }

    const newLead = await prisma.lead.create({
      data: { name, whatsapp, source },
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}