"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProdukPage() {
    const { id } = useParams();
    const router = useRouter();

    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");

    useEffect(() => {
        const fetchProduk = async () => {
            const res = await fetch(`/api/produk/${id}`)
            const data = await res.json()

            setNama(data.nama || "")
            setHarga(data.harga?.toString() || "")
        }

        if (id) {
            fetchProduk();
        }
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/produk/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nama,
                harga,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message);
            return;
        }

        toast.success("Produk berhasil diupdate!");
        router.push("/produk");
        router.refresh();
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <form
                onSubmit={handleUpdate}
                className="bg-white p-6 rounded-xl shadow w-96"
            >
                <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>

                <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Produk"
                    className="w-full border p-2 mb-3"
                />

                <input
                    type="number"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Harga"
                    className="w-full border p-2 mb-3"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Update
                </button>
            </form>
        </div>
    );
}