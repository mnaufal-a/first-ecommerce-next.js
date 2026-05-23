import { prisma } from "@/lib/prisma"
import Link from "next/link"
import AddToCartBtn from "@/components/AddToCartBtn"

export default async function ProductDetail({ params }) {
  const { id } = await params

  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    return (
      <div className="fp-not-found">
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3 }}>
          PRODUK TIDAK DITEMUKAN
        </span>
      </div>
    )
  }

  return (
    <div className="fp-detail-page">

      {/* IMAGE */}
      <div className="fp-detail-image-wrap">
        <img
          src={product.image || "/no-image.png"}
          alt={product.name}
          className="fp-detail-image"
        />
      </div>

      {/* INFO */}
      <div className="fp-detail-info">

        <Link href="/products" style={{
          fontSize: 12, color: "#F189B8", letterSpacing: 2,
          textDecoration: "none", display: "inline-flex",
          alignItems: "center", gap: 6, marginBottom: 32,
          transition: "color .2s",
        }}>
          ← BACK TO PRODUCTS
        </Link>

        <p className="fp-detail-tag">FALLPROJECT COLLECTION</p>

        <h1 className="fp-detail-title">{product.name}</h1>

        <div className="fp-detail-price">
          Rp {product.price.toLocaleString("id-ID")}
        </div>

        <p className="fp-detail-description">
          {product.description || "Premium quality streetwear dari FALLPROJECT. Dibuat dengan bahan terbaik untuk kenyamanan maksimal."}
        </p>

        {/* Size picker */}
        <div style={{ marginTop: 28 }}>
          <p style={{ fontSize: 10, letterSpacing: 3, color: "#87CEFA", marginBottom: 12 }}>
            PILIH UKURAN
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["S","M","L","XL","XXL"].map(size => (
              <button key={size} className="fp-size-btn"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="fp-detail-actions">
          <AddToCartBtn product={product} />
          <button className="fp-detail-buy-btn">BUY NOW</button>
        </div>

        {/* Tags */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: 11, color: "#444", letterSpacing: 2 }}>
            FALLPROJECT · STREETWEAR · JAKARTA
          </p>
        </div>

      </div>
    </div>
  )
}