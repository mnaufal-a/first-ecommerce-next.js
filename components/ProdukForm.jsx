"use client";

import { useState, useEffect } from "react";

export default function ProdukForm({ initialData = {}, onSubmit }) {
    const [nama, setNama ] = useState("");
    const [harga, setHarga] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData.nama) {
            setNama(initialData.nama);
            setHarga(initialData.harga);
        }
    }, [initialData]);


    
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!nama.trim()) {
            setError("Nama Produk harus diisi!");
            setLoading(false);
            return;
        }

        if (!nama || !harga) {
            setError("Semua field wajib diisi!");
            setLoading(false);
            return;
        }

        if (nama.length <2) {
            setError("Nama minimal 2 karakter!");
            setLoading(false);
            return;
        }

        if (isNaN(harga) || Number(harga) <= 0) {
            setError("Harga wajib dengan angka dan lebih dari 0!");
            setLoading(false);
            return;
        }

        await onSubmit({ nama, harga: Number(harga) }, setError, setLoading);
    }


    return (

        <form onSubmit={handleSubmit} className="space-y-3">

                {error && (
                   <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-7 rounded mb-4">
                     <div className="flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                     </div>
                   </div>
                )}
                

                <input
                    type="text"
                    placeholder="Nama Produk"
                    value={nama}
                    onChange={(e) => {
                    setNama(e.target.value);
                    setError ("");
                    }}
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Harga"
                    value={harga}
                    onChange={(e) => {
                    setHarga(e.target.value);
                    setError("");
                    }}
                    className="border p-2 w-full"
                />

                <button
                    type="submit"
                    disabled={loading} 
                    className={`w-full py-2 rounded text-white transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                
                >
                    {loading ? "Menyimpan..." : "Simpan Produk"}
                </button>
            </form>

    )
}