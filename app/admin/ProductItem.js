"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ProductItem({ product, search, setEditingProduct, removeProduct, onSuccess }) {
    const [loading, setLoading] = useState(false)
    
    const handleDelete = async () => {
        const confirmDelete= confirm("Yakin hapus produk?")
        if (!confirmDelete) return

        setLoading(true)

        const backup = product

        removeProduct(product.id)

        try {

            const res = await fetch("/api/products", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: product.id })
            });
    
            if (!res.ok) {
                throw new Error("Gagal Delete!")
            }
    
            
        } catch (err) {
            alert("Gagal hapus, dikembalikan lagi!")
            location.reload()
        } finally {
            setLoading(false)
        }

    }
    
    const highlightText = (text, keyword) => {
        if (!keyword) return text

        const parts = text.split(new RegExp(`(${keyword})`, "gi"))

        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="bg-yellow-400 px-1 rounded">
                    {part}
                </span>
            ) : (
                part
            )
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 justify-between border max-w-lg p-3 rounded ">
            
            <div >
                <p className="text-lg font-semibold break-all">{highlightText(product.name, search)}</p>
                <p className="text-md text-gray-800">
                    Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                </p>
            </div>

            {product.image && (
                <img 
                    src={product.image || "/no-image.png"} 
                    className="w-16 h-16 object-cover rounded"/>
            )}

            <div className="flex gap-4">
                <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-8 ml-8"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`px-3 py-1 text-white rounded ml-8 ${
                        loading ? "bg-gray-400" : "bg-red-500"
                    }`}
                >
                    {loading ? "Menghapus" : "Delete"}
                </button>

            </div>

        </motion.div>
    )
}