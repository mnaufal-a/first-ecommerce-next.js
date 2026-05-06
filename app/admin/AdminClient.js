"use client";

import { useEffect, useState } from "react";
import AdminForm from "./AdminForm";
import ProductItem from "./ProductItem";
import toast from "react-hot-toast";
import useDebounce from "../hooks/useDebounce";
import ProductSkeleton from "./ProductSkeleton";



export default function AdminClient({ products: initialProducts }) {
    const [products, setProducts] = useState(initialProducts)
    const [editingProduct, setEditingProduct] = useState(null)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 500)
    const [total, setTotal] = useState(1)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const fetchProducts = async () => {
    try {
        setLoading(true)

        const params = new URLSearchParams({
            page,
            limit: 5,
        })

        if (search.trim() !== "") {
            params.append("search", search)
        }

        const res = await fetch(`/api/products?${params.toString()}`)

        if (!res.ok) throw new Error("Gagal Fetch")

        const data = await res.json()

        setProducts(data.data)
        setTotal(data.total)
    } catch (err) {
        console.error(err)
        toast.error("gagal ambil data")
    } finally  {
        setLoading(false)
    }
}

    useEffect(() => {
        fetchProducts()
    }, [page, debouncedSearch])

    const totalPages = Math.ceil(total / 5)

    const addProduct = (product) => {
        setProducts((prev) => [product, ...prev])
    }

    const updateProduct = (updateProduct) => {
        setProducts((prev) => 
            prev.map((p) => 
                p.id === updateProduct.id ? updateProduct : p
            )
        )
    }

    const removeProduct = (id) => {
        setProducts((prev) => prev.filter(p => p.id !== id))
        toast.success("Produk berhasil dihapus 🗑️")
    }


    return (
        <div className="space-y-8">
            <AdminForm
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                updateProduct={updateProduct}
                addProduct={(product) =>
                    setProducts((prev) => [product, ...prev])
                }
                onSuccess={fetchProducts}
            />

            <input
                type="text"
                placeholder="Cari Produk..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                }}
                style={{
                    padding: "8px",
                    marginBottom: "20px",
                    width: "300px"
                }}
                className="w-full border p-2 rounded"
            >
            
            </input>

            <div className="space-y-2">
                {loading ? (
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map ((_, i) => (
                            <ProductSkeleton key={i}/>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-4xl">📦</p>
                            <p className="text-xl font-semibold mt-2">Produk tidak ditemukan!</p>
                            <p className="text-sm">Coba kata kunci lain...</p>
                        </div>
                ) : (

                    products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            search={debouncedSearch}
                            setEditingProduct={setEditingProduct}
                            removeProduct={removeProduct}
                            onSuccess={fetchProducts}
                        />
                    ))
                )}
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    className="text-white bg-black px-4 py-2 rounded"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled ={page === 1}
                >
                    Prev
                </button>

                <span> Page {page} of {totalPages}</span>

                 <button
                    className="text-white bg-black px-4 py-2 rounded"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled ={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}