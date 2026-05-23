"use client"

import { useCart } from "../../context/CartContext"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

export default function CartPage() {
    const { cart, removeItem, updateQty } = useCart()

    const total = cart.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * (item.qty || 0),
        0
    )

    return (
        <div style={{
            background: "#080808",
            minHeight: "100vh",
            color: "#fff",
            padding: "clamp(16px, 4vw, 40px)",
            overflowX: "hidden",   // ← tambahan
            boxSizing: "border-box",
        }}>

            {/* Header */}
            <div style={{ marginBottom: 40, borderBottom: "1px solid #1a1a1a", paddingBottom: 24 }}>
                <p style={{ fontSize: 10, letterSpacing: 4, color: "#87CEFA", marginBottom: 8 }}>
                    — FALLPROJECT —
                </p>
                <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(36px, 7vw, 64px)",
                    letterSpacing: 3,
                    lineHeight: 0.9,
                }}>
                    KERANJANG<span style={{ color: "#F189B8" }}> MU</span>
                </h1>
                <p style={{ fontSize: 12, color: "#F189B8", marginTop: 8 }}>
                    {cart.length} item{cart.length !== 1 ? "s" : ""} di keranjang
                </p>
            </div>

            {cart.length === 0 ? (
                <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    minHeight: 300, gap: 16, textAlign: "center",
                }}>
                    <ShoppingBag size={48} style={{ color: "#333" }} />
                    <p style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 28, letterSpacing: 3, color: "#333",
                    }}>
                        KERANJANG KOSONG
                    </p>
                    <Link href="/products" style={{
                        background: "#87CEFA", color: "#080808",
                        padding: "12px 28px", textDecoration: "none",
                        fontSize: 12, letterSpacing: 2, fontWeight: 500,
                    }}>
                        MULAI BELANJA →
                    </Link>
                </div>
            ) : (
                <div className="fp-cart-page-grid" style={{ display: "grid", gap: 32, alignItems: "start" }}>

                    {/* Item list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="fp-cart-item"
                                style={{
                                    display: "flex",
                                    gap: 16,
                                    padding: "20px 0",
                                    borderBottom: "1px solid #1a1a1a",
                                    alignItems: "center",
                                    width: "100%",
                                    boxSizing: "border-box",
                                }}
                            >
                                {/* Image */}
                                <div style={{
                                    width: 80,
                                    height: 80,
                                    flexShrink: 0,
                                    background: "#151515",
                                    overflow: "hidden",
                                }}>
                                    <img
                                        src={item.image || "/no-image.png"}
                                        alt={item.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 9, letterSpacing: 2, color: "#87CEFA", marginBottom: 4 }}>
                                        FALLPROJECT COLLECTION
                                    </p>
                                    <h3 style={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: "#fff",
                                        marginBottom: 4,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}>
                                        {item.name}
                                    </h3>
                                    <p style={{ fontSize: 13, color: "#F189B8", fontWeight: 700 }}>
                                        Rp {Number(item.price).toLocaleString("id-ID")}
                                    </p>
                                </div>

                                {/* Qty + Subtotal + Delete — ini yang di-stack saat mobile */}
                                <div
                                    className="fp-cart-item-right"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        gap: 8,
                                        flexShrink: 0,
                                    }}
                                >
                                    {/* Subtotal */}
                                    <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                                        Rp {(item.price * item.qty).toLocaleString("id-ID")}
                                    </p>

                                    {/* Qty controls */}
                                    <div
                                        className="fp-cart-qty"
                                        style={{ display: "flex", alignItems: "center" }}
                                    >
                                        <button
                                            onClick={() => updateQty(item.id, "dec")}
                                            style={{
                                                width: 30, height: 30,
                                                background: "#1a1a1a",
                                                border: "1px solid #2a2a2a",
                                                color: "#fff", cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <Minus size={11} />
                                        </button>
                                        <span style={{
                                            width: 36, height: 30,
                                            background: "#111",
                                            border: "1px solid #2a2a2a",
                                            borderLeft: "none", borderRight: "none",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 12,
                                        }}>
                                            {item.qty}
                                        </span>
                                        <button
                                            onClick={() => updateQty(item.id, "inc")}
                                            style={{
                                                width: 30, height: 30,
                                                background: "#1a1a1a",
                                                border: "1px solid #2a2a2a",
                                                color: "#fff", cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <Plus size={11} />
                                        </button>
                                    </div>

                                    {/* Hapus */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        style={{
                                            background: "none", border: "none",
                                            cursor: "pointer", color: "#F189B8",
                                            display: "flex", alignItems: "center",
                                            gap: 4, fontSize: 10, letterSpacing: 1,
                                        }}
                                    >
                                        <Trash2 size={12} /> HAPUS
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div style={{
                        background: "#111",
                        border: "1px solid #1e1e1e",
                        padding: 24,
                        position: "sticky",
                        top: 90,
                        boxSizing: "border-box",
                    }}>
                        <p style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 18, letterSpacing: 3, color: "#87CEFA",
                            marginBottom: 20,
                        }}>
                            RINGKASAN ORDER
                        </p>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                            <span style={{ fontSize: 13, color: "#fff" }}>Subtotal</span>
                            <span style={{ fontSize: 13, color: "#fff" }}>
                                Rp {total.toLocaleString("id-ID")}
                            </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                            <span style={{ fontSize: 13, color: "#fff" }}>Pengiriman</span>
                            <span style={{ fontSize: 12, color: "#87CEFA" }}>Dihitung saat checkout</span>
                        </div>

                        <div style={{
                            borderTop: "1px solid #1e1e1e", paddingTop: 20,
                            display: "flex", justifyContent: "space-between", marginBottom: 24,
                        }}>
                            <span style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: 18, letterSpacing: 2,
                            }}>TOTAL</span>
                            <span style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: 22, color: "#F189B8",
                            }}>
                                RP {total.toLocaleString("id-ID")}
                            </span>
                        </div>

                        <Link href="/checkout">
                            <button
                                style={{
                                    width: "100%", background: "#87CEFA", color: "#080808",
                                    border: "none", padding: "14px 0",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 13, fontWeight: 700, letterSpacing: 2,
                                    cursor: "pointer",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "#F189B8"}
                                onMouseLeave={e => e.currentTarget.style.background = "#87CEFA"}
                            >
                                CHECKOUT →
                            </button>
                        </Link>

                        <Link href="/products" style={{
                            display: "block", textAlign: "center",
                            marginTop: 16, fontSize: 12, color: "#F189B8",
                            letterSpacing: 1, textDecoration: "none",
                        }}>
                            ← Lanjut Belanja
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}