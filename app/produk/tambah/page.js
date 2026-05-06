"use client";

import toast from "react-hot-toast";
import ProdukForm from "../../../components/ProdukForm";
import { useRouter } from "next/navigation";

export default function TambahProduk() {
    const router = useRouter();

   async function handleCreate( data, setError, setLoading ) {

     const res = await fetch("/api/produk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            toast.error("Terjadi Kesalahan!");
            setLoading(false);
            return;
        }

        toast.success("Produk berhasil ditambahkan!");
        setLoading(false);
        router.push("/produk");
        router.refresh();
   }

   return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
            <ProdukForm 
                initialData={{ nama: "", harga: ""}}
                onSubmit={handleCreate}
            />
            
        </div>
   );
    
}