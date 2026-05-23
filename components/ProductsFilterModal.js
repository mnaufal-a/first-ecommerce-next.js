"use client"
import { useState } from "react"
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"

export default function ProductsFilterModal() {
  const [open, setOpen] = useState(false)
  const [openSection, setOpenSection] = useState("kategori")

  const toggle = (s) => setOpenSection(prev => prev === s ? null : s)

  const Section = ({ id, label, children }) => (
    <div style={{ borderBottom: "1px solid #1e1e1e" }}>
      <button
        onClick={() => toggle(id)}
        style={{
          width: "100%", background: "none", border: "none",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 0", cursor: "pointer", color: "#fff",
        }}
      >
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 2, color: "#87CEFA" }}>
          {label}
        </span>
        {openSection === id
          ? <ChevronUp size={16} color="#87CEFA" />
          : <ChevronDown size={16} color="#555" />}
      </button>
      {openSection === id && (
        <div style={{ paddingBottom: 16 }}>{children}</div>
      )}
    </div>
  )

  return (
    <>
      {/* Filter button — hanya tampil di mobile */}
      <button
        className="fp-filter-btn"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal size={14} />
        FILTER
      </button>

      {/* Overlay backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            zIndex: 998, backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Bottom sheet modal */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 999,
        background: "#111",
        borderTop: "2px solid #87CEFA",
        borderRadius: "16px 16px 0 0",
        padding: "0 20px 32px",
        maxHeight: "80vh",
        overflowY: "auto",
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* Handle bar */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 40, height: 4, background: "#333", borderRadius: 2 }} />
        </div>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: 16, borderBottom: "1px solid #1e1e1e", marginBottom: 4,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 24, letterSpacing: 3, color: "#fff",
          }}>
            FILTER
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#555" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* KATEGORI */}
        <Section id="kategori" label="KATEGORI">
          {["Semua Produk", "T-Shirt", "Jacket", "Pants", "DLL"].map((cat, i) => (
            <label key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", cursor: "pointer",
              borderBottom: "1px solid #141414",
            }}>
              <input type="radio" name="m-category" defaultChecked={i === 0}
                style={{ accentColor: "#F189B8", width: 16, height: 16 }} />
              <span style={{ fontSize: 14, color: i === 0 ? "#fff" : "#888", letterSpacing: 1 }}>{cat}</span>
            </label>
          ))}
        </Section>

        {/* UKURAN */}
        <Section id="ukuran" label="UKURAN">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 4 }}>
            {["XS","S","M","L","XL","XXL"].map(size => (
              <button key={size} style={{
                padding: "10px 18px", background: "transparent",
                border: "1px solid #2a2a2a", color: "#888",
                fontSize: 13, letterSpacing: 1, cursor: "pointer", borderRadius: 4,
              }}>
                {size}
              </button>
            ))}
          </div>
        </Section>

        {/* HARGA */}
        <Section id="harga" label="HARGA">
          {["Di bawah Rp 200.000","Rp 200.000 – 350.000","Rp 350.000 – 500.000","Rp 500.000 +"].map((r, i) => (
            <label key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", cursor: "pointer", borderBottom: "1px solid #141414",
            }}>
              <input type="radio" name="m-price" style={{ accentColor: "#F189B8", width: 16, height: 16 }} />
              <span style={{ fontSize: 13, color: "#888" }}>{r}</span>
            </label>
          ))}
        </Section>

        {/* KOLEKSI */}
        <Section id="koleksi" label="KOLEKSI">
          {["New Arrival","Best Seller","Sale"].map((tag, i) => (
            <label key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", cursor: "pointer", borderBottom: "1px solid #141414",
            }}>
              <input type="checkbox" style={{ accentColor: "#F189B8", width: 16, height: 16 }} />
              <span style={{ fontSize: 13, color: "#888" }}>{tag}</span>
            </label>
          ))}
        </Section>

        {/* Apply button */}
        <button
          onClick={() => setOpen(false)}
          style={{
            width: "100%", background: "#87CEFA", color: "#080808",
            border: "none", padding: "14px 0", marginTop: 24,
            fontFamily: "'DM Sans',sans-serif", fontSize: 13,
            fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4,
          }}
        >
          TERAPKAN FILTER
        </button>
      </div>
    </>
  )
}