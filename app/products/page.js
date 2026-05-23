import { prisma } from "../../lib/prisma"
import SearchInput from "@/components/SearchInput"
import SortSelect from "../../components/SortSelect"
import ProductCard from "../../components/ProductCard"
import ProductsFilterModal from "../../components/ProductsFilterModal"

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams
  const search  = params?.q    || ""
  const sort    = params?.sort || ""
  const page    = Number(params?.page) || 1
  const limit   = 8
  const skip    = (page - 1) * limit

  let orderBy = {}
  if (sort === "price_asc")  orderBy = { price: "asc"  }
  if (sort === "price_desc") orderBy = { price: "desc" }
  if (sort === "name_asc")   orderBy = { name:  "asc"  }
  if (sort === "name_desc")  orderBy = { name:  "desc" }

  const where = search.length > 0
    ? { name: { contains: search.toLowerCase() } }
    : {}

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take: limit }),
    prisma.product.count({ where }),
  ])

  const totalPages = Math.ceil(totalProducts / limit)

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#fff" }}>

      {/* TOP BAR */}
      <div className="fp-products-topbar" style={{
        borderBottom: "1px solid #1a1a1a",
        padding: "24px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
      }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 4, color: "#87CEFA", marginBottom: 6 }}>
            — FALLPROJECT COLLECTION —
          </p>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 7vw, 72px)",
            letterSpacing: 3, lineHeight: 0.9, color: "#fff",
          }}>
            PRO<span style={{ color: "#F189B8" }}>DUCTS</span>
          </h1>
        </div>

        {/* Search + Sort + Filter btn */}
        <div className="fp-products-topbar-actions" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <SearchInput />
          <SortSelect />
          {/* Filter button — client component, hanya muncul di mobile via CSS */}
          <ProductsFilterModal />
        </div>
      </div>

      {/* BODY */}
      <div className="fp-products-body" style={{ display: "flex", minHeight: "calc(100vh - 140px)" }}>

        {/* SIDEBAR — hidden di mobile, pakai CSS */}
        <aside className="fp-products-sidebar">
          <div>
            <p style={{ fontSize: 10, letterSpacing: 3, color: "#87CEFA", marginBottom: 16 }}>KATEGORI</p>
            {["Semua Produk","T-Shirt","Jacket","Pants","DLL"].map((cat, i) => (
              <label key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0", cursor: "pointer", borderBottom: "1px solid #141414",
              }}>
                <input type="radio" name="category" defaultChecked={i === 0} style={{ accentColor: "#F189B8" }} />
                <span style={{ fontSize: 13, color: i === 0 ? "#fff" : "#666", letterSpacing: 1 }}>{cat}</span>
              </label>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 10, letterSpacing: 3, color: "#87CEFA", marginBottom: 16 }}>UKURAN</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["XS","S","M","L","XL","XXL"].map(size => (
                <button key={size} className="fp-size-btn">{size}</button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 10, letterSpacing: 3, color: "#87CEFA", marginBottom: 16 }}>HARGA</p>
            {["Di bawah Rp 200.000","Rp 200.000 – 350.000","Rp 350.000 – 500.000","Rp 500.000 +"].map((r, i) => (
              <label key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "7px 0", cursor: "pointer", borderBottom: "1px solid #141414",
              }}>
                <input type="radio" name="price" style={{ accentColor: "#F189B8" }} />
                <span style={{ fontSize: 12, color: "#666", letterSpacing: 0.5 }}>{r}</span>
              </label>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 10, letterSpacing: 3, color: "#87CEFA", marginBottom: 16 }}>KOLEKSI</p>
            {["New Arrival","Best Seller","Sale"].map((tag, i) => (
              <label key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "7px 0", cursor: "pointer", borderBottom: "1px solid #141414",
              }}>
                <input type="checkbox" style={{ accentColor: "#F189B8" }} />
                <span style={{ fontSize: 12, color: "#666" }}>{tag}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <main className="fp-products-main">
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 24,
          }}>
            <span style={{ fontSize: 12, color: "#555", letterSpacing: 1 }}>
              {totalProducts} PRODUK DITEMUKAN
            </span>
            <span style={{ fontSize: 11, color: "#333", letterSpacing: 1 }}>
              Halaman {page} / {totalPages || 1}
            </span>
          </div>

          {products.length === 0 ? (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              height: 300, gap: 12,
            }}>
              <span style={{ fontSize: 48 }}>📦</span>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 3, color: "#333" }}>
                PRODUK TIDAK DITEMUKAN
              </p>
            </div>
          ) : (
            <div className="fp-products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} search={search} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 40, justifyContent: "center" }}>
              {page > 1 && (
                <a href={`?q=${search}&sort=${sort}&page=${page - 1}`} style={{
                  padding: "8px 16px", background: "transparent",
                  border: "1px solid #2a2a2a", color: "#fff",
                  fontSize: 12, letterSpacing: 1, textDecoration: "none",
                }}>← PREV</a>
              )}
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1
                return (
                  <a key={p} href={`?q=${search}&sort=${sort}&page=${p}`} style={{
                    padding: "8px 16px",
                    background: p === page ? "#87CEFA" : "transparent",
                    border: `1px solid ${p === page ? "#87CEFA" : "#2a2a2a"}`,
                    color: p === page ? "#080808" : "#555",
                    fontSize: 12, letterSpacing: 1, textDecoration: "none",
                  }}>{p}</a>
                )
              })}
              {page < totalPages && (
                <a href={`?q=${search}&sort=${sort}&page=${page + 1}`} style={{
                  padding: "8px 16px", background: "transparent",
                  border: "1px solid #2a2a2a", color: "#fff",
                  fontSize: 12, letterSpacing: 1, textDecoration: "none",
                }}>NEXT →</a>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}