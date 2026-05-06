"use client"

import { useCart } from "../../context/CartContext"
import Link from "next/link"

export default function CartPage() {
    const { cart, removeItem, updateQty } = useCart()

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const total = cart.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * (item.qty || 0),
        0
    )

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">KeranjangMu 🛒</h1>

            {cart.length === 0 ? (
                <p>Keranjang kosong 😓</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={`${item.id}-${item.qty}`} className="flex gap-4 border p-4 rounded-xl items-center">
                            
                            <img
                                src={item.image}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-gray-600">
                                    {formatPrice(item.price)}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => updateQty(item.id, "dec")}
                                        className="px-3 border rounded"
                                    >-</button>

                                    <span>{item.qty}</span>

                                    <button
                                        onClick={() => updateQty(item.id, "inc")}
                                        className="px-3 border rounded"
                                    >+</button>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">
                                    {formatPrice(item.price * item.qty)}
                                </p>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* TOTAL */}
                    <div className="flex justify-between items-center border-t pt-4">
                        <h2 className="text-lg font-bold">Total</h2>
                        <p className="text-xl font-bold">
                            {formatPrice(total)}
                        </p>
                    </div>

                    {/* CHECKOUT */}
                    <Link href="/checkout">
                        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
                            Checkout 🚀
                        </button>
                    </Link>
                </>
            )}
        </div>
    )
}