"use client"

import { useCart } from "../context/CartContext"

export default function AddToCartButton({ product }) {
    const { addToCart } = useCart()

    return (
        <button 
            onClick={() => addToCart(product)}
            className="border px-6 py-3 rounded hover:bg-gray-100 transition"
        >
            Tambah ke Keranjang!
        </button>
    )
}