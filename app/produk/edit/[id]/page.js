"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProdukForm from "@/components/ProdukForm";

export default function EditProduk() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [produk, setProduk] = useState(null)
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function fetchProduk() {
      try {
        const res = await fetch(`/api/produk/${id}`);
        const data = await res.json();
        setProduk(data);

        setNama(data.nama);
        setHarga(data.harga);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // ⬅️ sekarang AMAN
      }
    }

    fetchProduk();
  }, [id]);


  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`/api/produk/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        nama,
        harga: Number(harga),
      }),
    });

    router.push("/produklist");
  }

  async function handleUpdate(data, setError, setloading) {
    const res = await fetch(`/api/produk/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.messages);
      setloading(false);
      return;
    }

    setloading(false);
    router.push("/produklist");
  }

  if (loading) return <p>Loading data produk....</p>

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>

    <ProdukForm
      initialData={produk}
      onSubmit={handleUpdate}
    />
  </div>
  );
}
