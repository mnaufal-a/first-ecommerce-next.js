"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProdukPage() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProduk = produk.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(produk.length / itemsPerPage);

  const fetchProduk = async () => {
    const res = await fetch("/api/produk");
    const data = await res.json();
    setProduk(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete di klik:", id)

    if (!confirm("Yakin mau hapus produk ini?")) return;

    if (currentPage > 1 && selectedProduk.length === 1){
      setCurrentPage(currentPage - 1);
    }

    await fetch(`/api/produk/${id}`, {
      method: "DELETE",
    });

    fetchProduk(); // refresh list
  };

  if (loading) {
    return <p className="p-6">Loading....</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Daftar Produk (Latihan Sore)
      </h1>

      <ul className="space-y-2">
        {selectedProduk.map((item) => (
          <li key={item.id}>
            <Link
              href={`/produk/${item.id}`}
              className="text-blue-600 underline"
            >
              {item.nama} - Rp {item.harga}
            </Link>{" "}
            <Link href={`/produk/edit/${item.id}`}>✏️ Edit</Link>{" "}
            <button 
                type="button"
                onClick={() => handleDelete(item.id)}>
                    ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
      </div>


      <Link
        href="/produk/tambah"
        className="inline-block mt-4 bg-green-600 text-white px-4 py-2"
      >
        + Tambah Produk
      </Link>
    </div>
  );
}
