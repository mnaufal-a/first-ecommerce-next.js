"use client";

import { useParams } from "next/navigation";

export default function EditProdukPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1>Edit Produk</h1>
      <p>ID Produk: {id}</p>
    </div>
  );
}
