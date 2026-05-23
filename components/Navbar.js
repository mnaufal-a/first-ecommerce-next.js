"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { ShoppingBag, User, Search, Menu } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function Navbar() {
  const { data: session } = useSession()
  const { cart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const cartCount = cart?.reduce((total, item) => total + item.qty, 0) || 0

  return (
    <>
      <nav className="fp-shop-nav">
        {/* LEFT */}
        <div className="fp-shop-left">
          <Link href="/" className="fp-logo-wrap">
            <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <span className="fp-brandname" style={{ color: "#080808" }}>FALLPROJECT</span>
          </Link>
        </div>

        {/* CENTER — Desktop only */}
        <div className="fp-shop-links fp-desktop-links">
          <Link href="/products">SHOP</Link>
          <a href="#">LOOKBOOK</a>
          <a href="#">SALE</a>
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" style={{ color: "#F189B8" }}>ADMIN</Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="fp-shop-right">
          <Search size={18} style={{ cursor: "pointer", color: "#080808" }} />

          {/* Cart badge */}
          <Link href="/cart" style={{ position: "relative", display: "inline-flex", color: "#080808" }}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -8, right: -8,
                background: "#F189B8", color: "#080808",
                fontSize: 10, fontWeight: 700,
                width: 18, height: 18, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {session ? (
            <div className="fp-user-box">
              <img src={session.user.image} alt="user" className="fp-user-avatar" />
              <div className="fp-user-dropdown">
                <Link href="/dashboard">Dashboard</Link>
                {session.user.role === "ADMIN" && <Link href="/admin">Admin Panel</Link>}
                <button onClick={() => signOut()}>Logout</button>
              </div>
            </div>
          ) : (
            <Link href="/" style={{ color: "#080808" }}>
              <User size={19} />
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="fp-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#080808" }}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 200,
          background: "#87CEFA", padding: "16px 24px",
          display: "flex", flexDirection: "column", gap: 0,
          borderBottom: "2px solid #080808",
        }}>
          {[
            { label: "SHOP", href: "/products" },
            { label: "NEW IN", href: "#" },
            { label: "LOOKBOOK", href: "#" },
            { label: "SALE", href: "#" },
          ].map(item => (
            <Link key={item.label} href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#080808", fontSize: 14, fontWeight: 500,
                letterSpacing: 2, padding: "14px 0",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                textDecoration: "none",
              }}>
              {item.label}
            </Link>
          ))}
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" onClick={() => setMenuOpen(false)}
              style={{ color: "#F189B8", fontSize: 14, fontWeight: 500, letterSpacing: 2, padding: "14px 0", textDecoration: "none" }}>
              ADMIN PANEL
            </Link>
          )}
          {!session && (
            <Link href="/" onClick={() => setMenuOpen(false)}
              style={{ color: "#080808", fontSize: 14, fontWeight: 500, letterSpacing: 2, padding: "14px 0", textDecoration: "none" }}>
              LOGIN
            </Link>
          )}
        </div>
      )}
    </>
  )
}