"use client"
import { signIn, useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import Link from "next/link"

export default function Page() {
  const { data: session } = useSession()
  const heroRef = useRef(null)

  useEffect(() => {
    const items = document.querySelectorAll('.fp-reveal')
    items.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`
      el.classList.add('fp-animate')
    })
  }, [])

  return (
    <>

      <div className="fp-body">

        {/* NAV */}
        <nav className="fp-nav fp-reveal">
          <Link href="/" className="fp-logo-wrap">
            <img src="/logo.png" alt="FALLPROJECT" style={{width:40,height:40,objectFit:'contain'}} />
            <span className="fp-brandname">FALLPROJECT</span>
          </Link>
          <div className="fp-nav-links">
            
            <Link href="/products">PRODUCTS</Link>
            <a href="#">LOOKBOOK</a>
            <a href="#">SALE</a>
          </div>
          <div className="fp-nav-icons">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <Link href="/cart">
              <svg viewBox="0 0 24 24" style={{width:20,height:20,stroke:'#080808',fill:'none',strokeWidth:1.8}}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </Link>
            {session ? (
              <Link href="/dashboard">
                <svg viewBox="0 0 24 24" style={{width:20,height:20,stroke:'#080808',fill:'none',strokeWidth:1.8}}>
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
            ) : null}
          </div>
        </nav>

        {/* HERO */}
        <div className="fp-hero" ref={heroRef}>
          {[
            { label: 'MODEL 1', cls: '' },
            { label: 'MODEL 2', cls: '' },
            { label: 'MAIN', cls: 'center' },
            { label: 'MODEL 4', cls: '' },
            { label: 'MODEL 5', cls: '' },
          ].map((m, i) => (
            <div key={i} className={`fp-model-slot ${m.cls}`}>
              {/* Ganti src berikut dengan foto model kamu */}
               <img src={`/models/model-${i+1}.jpeg`} alt={m.label} />
              {/* <div className="fp-add-icon">+</div>
              <span className="fp-slot-badge">{m.label}</span> */}
            </div>
          ))}

          {/* OVERLAY */}
          <div className="fp-overlay">
            <p className="fp-tagline fp-reveal">— STREETWEAR COLLECTION 2025 —</p>
            <h1 className="fp-headline fp-reveal">
              FALL<span className="blue">PRO</span><span className="pink">JECT</span>
            </h1>
            <div className="fp-cta-row fp-reveal">
              <button className="fp-btn-blue" onClick={() => window.location.href='/products'}>
                SHOP NOW
              </button>
              <button 
                  className="fp-btn-outline"
                  onClick={() => signIn("google", { callbackUrl: "/products" })}
                >
                  LOGIN
              </button>
            </div>
          </div>
        </div>

        {/* TICKER */}
        <div className="fp-ticker">
          <div className="fp-ticker-inner">
            {Array(8).fill(null).map((_, i) => (
              <span key={i}>
                <span className="fp-ticker-item">FALLPROJECT</span>
                <span className="fp-ticker-item fp-ticker-dot">✦</span>
                <span className="fp-ticker-item">NEW COLLECTION</span>
                <span className="fp-ticker-item fp-ticker-dot">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <section className="fp-section">
          <div className="fp-section-head">
            <span className="fp-section-label fp-reveal">— NEW ARRIVAL</span>
            <Link href="/products" className="fp-section-link">VIEW ALL →</Link>
          </div>
          <div className="fp-product-grid">
            {[
              { name: 'FP Classic Tee', price: 'Rp 299.000', badge: 'NEW' },
              { name: 'FP Oversized Vol.3', price: 'Rp 399.000', badge: null },
              { name: 'RISOL MAYO JAMAL', price: 'Rp 3.500', badge: 'HOT' },
              { name: 'FP Cargo Pants', price: 'Rp 479.000', badge: 'NEW' },
            ].map((p, i) => (
              <div key={i} className="fp-product-card fp-reveal">
                <div className="fp-product-img">
                  {p.badge && <span className="fp-product-badge">{p.badge}</span>}
                   <img src={`/products/product-${i+1}.jpg`} alt={p.name} /> 
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1">
                    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
                  </svg>
                </div>
                <div className="fp-product-info">
                  <div className="fp-product-name">{p.name}</div>
                  <div className="fp-product-price">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LOGIN */}
        <div className="fp-login-section fp-reveal">
          <div>
            <h2 className="fp-login-heading">
              {session ? `WELCOME, ${session.user?.name?.split(' ')[0]?.toUpperCase()}` : 'JOIN THE COMMUNITY NOW!'}
            </h2>
            <p className="fp-login-sub">
              {session ? 'Kamu sudah login — akses member exclusive tersedia' : 'Login untuk akses member exclusive, promo & lookbook terbaru'}
            </p>
          </div>
          {!session ? (
            <button
              className="fp-google-btn"
              onClick={() => signIn("google", { callbackUrl: "/products" })}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              LOGIN WITH GOOGLE
            </button>
          ) : (
            <Link href="/products">
              <button className="fp-google-btn">YUK LOGIN →</button>
            </Link>
          )}
        </div>

        {/* FOOTER */}
        <footer className="fp-footer">
          <span className="fp-footer-brand">FALLPROJECT</span>
          <span className="fp-footer-copy">© 2025 FALLPROJECT. ALL RIGHTS RESERVED.</span>
          <span className="fp-footer-copy">BEKASI, ID</span>
        </footer>

      </div>
    </>
  )
}