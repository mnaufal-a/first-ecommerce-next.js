"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function ProductCard({ product }) {
  return (
    <div className="fp-shop-card">

      {/* IMAGE */}
      <div className="fp-shop-image-wrap">

        <img
          src={product.image || "/no-image.png"}
          alt={product.name}
          className="fp-shop-image"
        />

        {/* HOVER OVERLAY */}
        <div className="fp-shop-overlay">

          <Link
            href={`/products/${product.id}`}
            className="fp-shop-detail-btn"
          >
            VIEW PRODUCT
          </Link>

        </div>

      </div>

      {/* INFO */}
      <div className="fp-shop-info">

        <div>
          <h3 className="fp-shop-name">
            {product.name}
          </h3>

          <p className="fp-shop-category">
            FALLPROJECT COLLECTION
          </p>
        </div>

        <div className="fp-shop-bottom">

          <div className="fp-shop-price">
            Rp {product.price.toLocaleString("id-ID")}
          </div>

          <button className="fp-shop-cart-btn">
            <ShoppingBag size={16} />
          </button>

        </div>

      </div>

    </div>
  )
}