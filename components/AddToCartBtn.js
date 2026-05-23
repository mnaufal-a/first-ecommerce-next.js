"use client"
import { useCart } from "@/context/CartContext"
import { ShoppingBag } from "lucide-react"

export default function AddToCartBtn({ product }) {
  const { addToCart } = useCart()

  return (
    <button
      className="fp-detail-cart-btn"
      onClick={() => addToCart(product)}
    >
      <ShoppingBag size={18} />
      ADD TO CART
    </button>
  )
}