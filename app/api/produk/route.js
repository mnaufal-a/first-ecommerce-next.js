import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";


export async function GET() {
  try {
    const data = await prisma.produk.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const body = await request.json();
  const { nama, harga } = body;
  
  if (!nama || !harga) {
    return NextResponse.json(
      { message: "Nama dan harga wajib diisi" },
      { status: 400 }
    );
  }

  if (nama.length < 2) {
    return NextResponse.json(
      { message: "Nama minimal 2 karakter" },
      { status: 400 }
    );
  }
  
  if (isNaN(Number(harga)) || Number(harga) <= 0) {
    return NextResponse.json(
      { message: "Harga harus angka dan lebih dari 0" },
      { status: 400 }
    );
  }

  const newProduk = await prisma.produk.create({
    data: {
      nama,
      harga: Number(harga),
    },
  })
  
  return NextResponse.json(newProduk);
}
