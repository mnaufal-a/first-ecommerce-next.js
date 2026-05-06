import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";


export const runtime = "nodejs";


// GET produk by ID
export async function GET(request, context) {
  const { id } = await context.params;

  try {
    const produk = await prisma.produk.findUnique({
      where: { id: Number(id) },
    });

    if (!produk) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(produk);
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


// UPDATE produk
export async function PUT(request, context) {
  const { id } = await context.params;

  try {
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

    const update = await prisma.produk.update({
      where: { id: Number(id) },
      data: {
        nama,
        harga: Number(harga),
      },
    });

    return NextResponse.json(update);
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_, context) {
  const { id } = await context.params;

  try {
    await prisma.produk.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }

      
    );
  }
}