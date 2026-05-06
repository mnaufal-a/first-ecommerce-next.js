"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function produkPage() {
    const session = await getServerSession()

    if (!session) {
        redirect("/")
    }

    type Produk = {
        id: number
        nama: string
        harga: number
        createdAt: string
    }

    const [produk, setProduk] = useState<Produk[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const filteredProduk = produk.filter((item) => 
        item.nama.toLowerCase().includes(debouncedSearch.toLowerCase())
    ); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = async (id : number) => {
        setDeletingId(id);

        try {
            const res = await fetch(`/api/produk/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Gagal hapus Produk!");
            }

            setProduk((prev) => prev.filter((item) => item.id !== id));
            toast.success("Produk berhasil dihapus!");
        } catch (error) {
            toast.error("Terjadi Kesalahan!")
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        async function fetchProduk() {
            try {
                const res = await fetch("/api/produk");
                const data = await res.json();

                
                setProduk(data);
                console.log("DATA:", data);
            } catch (error) {
                console.error("Gagal fecth produk:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduk();
    }, []);

    const highlightText = (text: string) => {
        if (!debouncedSearch) return text;

        const regex = new RegExp(`(${debouncedSearch})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) => 
            part.toLowerCase() === debouncedSearch.toLocaleLowerCase() ? (
                <span key={index} className="bg-yellow-300 text-black font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Daftar Produk</h1>

            <input
                type="text"
                placeholder="Cari Produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 w-full p-2 rounded=lg border border-slate-600 bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {loading ? (
                <p>Loading...</p>
            ) : !Array.isArray(produk) ? (
                <p>Data tidak valid.</p>
            ) : filteredProduk.length === 0 ? (
                 <p>Tidak ada produk ditemukan!</p>
            ) : (
                <div className="space-y-4 bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700 hover:scale-105 transition">
                    {filteredProduk.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-xl shadow"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {highlightText(item.nama)}
                            </h2>
                            <p className="font-semibold text-gray-600">
                                Rp {item.harga.toLocaleString("id-ID")}
                            </p>

                            <button
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                className={`px-3 py-1 rounded mt-2 text-white ${
                                    deletingId === item.id
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                {deletingId === item.id ? (
                                    <>
                                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t=transparent rounded-full mr-2"></span>
                                        Menghapus...
                                    </>
                                ) : (
                                    "Hapus"
                                )}
                            </button>

                            <a
                                href={`/produk/${item.id}/edit`}
                                className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 ml-2 inline-block"
                            >
                                Edit
                            </a>

                        </div>
                    ))}
                </div>
            )}

            <div className="mt-7">
                <a
                    href="/produk/tambah"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition duration-200"
                >
                    + Tambah Produk
                </a>
            </div>
        </div>
    );
}