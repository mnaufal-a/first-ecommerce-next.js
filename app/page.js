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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --blue: #87CEFA;
          --pink: #F189B8;
          --black: #080808;
          --dark: #111111;
          --mid: #1c1c1c;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .fp-body {
          background: var(--black);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fp-animate { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }

        /* ── NAV ── */
        .fp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: var(--blue);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 58px;
        }
        .fp-logo-wrap { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .fp-brandname {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 3px; color: var(--black);
        }
        .fp-nav-links { display: flex; gap: 28px; }
        .fp-nav-links a {
          font-size: 12px; font-weight: 500; letter-spacing: 2px;
          color: var(--black); text-decoration: none; opacity: 0.8;
          transition: opacity .2s;
        }
        .fp-nav-links a:hover { opacity: 1; }
        .fp-nav-icons { display: flex; gap: 16px; align-items: center; }
        .fp-nav-icons svg { width: 20px; height: 20px; stroke: var(--black); fill: none; stroke-width: 1.8; cursor: pointer; }

        /* ── HERO ── */
        .fp-hero {
          padding-top: 58px;
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr;
          height: 100vh;
          min-height: 520px;
          gap: 3px;
          background: var(--black);
          position: relative;
        }

        .fp-model-slot {
          background: var(--mid);
          border: 1px dashed #2a2a2a;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-bottom: 24px;
          cursor: pointer; transition: border-color .25s;
          position: relative; overflow: hidden;
          gap: 6px;
        }
        .fp-model-slot img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
        }
        .fp-model-slot:hover { border-color: var(--blue); }
        .fp-model-slot.center { background: #161616; }
        .fp-model-slot.center:hover { border-color: var(--pink); }

        .fp-slot-badge {
          position: relative; z-index: 2;
          font-size: 10px; letter-spacing: 2px; color: #555;
          background: rgba(0,0,0,0.6); padding: 3px 10px; border-radius: 20px;
          backdrop-filter: blur(4px);
        }
        .fp-add-icon {
          position: relative; z-index: 2;
          width: 32px; height: 32px; border: 1px dashed #333;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #444; font-size: 18px; margin-bottom: 4px;
        }

        /* ── OVERLAY TEXT ── */
        .fp-overlay {
          position: absolute; inset: 58px 0 0 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          pointer-events: none; z-index: 10;
          gap: 20px;
        }
        .fp-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 11vw, 120px);
          line-height: .95;
          text-align: center;
          color: #fff;
          letter-spacing: 4px;
          text-shadow: 0 4px 40px rgba(0,0,0,0.9);
          mix-blend-mode: difference;
        }
        .fp-headline .blue { color: var(--blue); mix-blend-mode: normal; }
        .fp-headline .pink { color: var(--pink); mix-blend-mode: normal; }
        .fp-tagline {
          font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.5);
          text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .fp-cta-row {
          display: flex; gap: 12px;
          pointer-events: all;
        }
        .fp-btn-blue {
          background: var(--blue); color: var(--black);
          border: none; padding: 12px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 2px;
          cursor: pointer; border-radius: 2px;
          transition: background .2s, transform .15s;
        }
        .fp-btn-blue:hover { background: #fff; transform: translateY(-1px); }
        .fp-btn-outline {
          background: transparent; color: #fff;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 12px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 400; letter-spacing: 2px;
          cursor: pointer; border-radius: 2px;
          transition: border-color .2s, transform .15s;
        }
        .fp-btn-outline:hover { border-color: var(--pink); color: var(--pink); transform: translateY(-1px); }

        /* ── MARQUEE ── */
        .fp-ticker {
          background: var(--pink); height: 36px;
          overflow: hidden; display: flex; align-items: center;
        }
        .fp-ticker-inner {
          display: flex; gap: 0; white-space: nowrap;
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fp-ticker-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px; letter-spacing: 3px; color: var(--black);
          padding: 0 32px;
        }
        .fp-ticker-dot { color: var(--black); opacity: 0.4; }

        /* ── PRODUCTS ── */
        .fp-section { padding: 56px 40px; }
        .fp-section-head {
          display: flex; align-items: baseline;
          justify-content: space-between; margin-bottom: 28px;
        }
        .fp-section-label {
          font-size: 11px; letter-spacing: 3px; color: var(--blue);
        }
        .fp-section-link {
          font-size: 12px; color: #555; text-decoration: none; letter-spacing: 1px;
          transition: color .2s;
        }
        .fp-section-link:hover { color: var(--pink); }

        .fp-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .fp-product-card {
          background: var(--mid); border-radius: 4px;
          overflow: hidden; transition: transform .25s;
        }
        .fp-product-card:hover { transform: translateY(-4px); }
        .fp-product-img {
          height: 200px; background: #252525;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .fp-product-img img { width: 100%; height: 100%; object-fit: cover; }
        .fp-product-img svg { opacity: 0.2; }
        .fp-product-badge {
          position: absolute; top: 10px; left: 10px;
          background: var(--pink); color: var(--black);
          font-size: 9px; font-weight: 500; letter-spacing: 1.5px;
          padding: 3px 8px; border-radius: 2px;
        }
        .fp-product-info { padding: 12px 14px 16px; }
        .fp-product-name { font-size: 14px; font-weight: 500; color: #fff; }
        .fp-product-price { font-size: 13px; color: var(--blue); margin-top: 4px; }

        /* ── LOGIN BAR ── */
        .fp-login-section {
          background: var(--dark);
          border-top: 1px solid #1e1e1e;
          padding: 48px 40px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
        }
        .fp-login-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px; letter-spacing: 2px; color: #fff;
        }
        .fp-login-heading span { color: var(--blue); }
        .fp-login-sub { font-size: 13px; color: #555; margin-top: 4px; letter-spacing: 0.5px; }
        .fp-google-btn {
          background: var(--blue); color: var(--black);
          border: none; padding: 14px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500; letter-spacing: 1.5px;
          cursor: pointer; border-radius: 2px; white-space: nowrap;
          transition: background .2s, transform .15s;
          display: flex; align-items: center; gap: 10px;
        }
        .fp-google-btn:hover { background: var(--pink); transform: translateY(-1px); }
        .fp-google-btn svg { width: 18px; height: 18px; }

        /* ── FOOTER ── */
        .fp-footer {
          background: var(--black);
          border-top: 1px solid #1e1e1e;
          padding: 24px 40px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .fp-footer-brand {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px; letter-spacing: 3px; color: #333;
        }
        .fp-footer-copy { font-size: 11px; color: #444; letter-spacing: 1px; }
      `}</style>

      <div className="fp-body">

        {/* NAV */}
        <nav className="fp-nav fp-reveal">
          <Link href="/" className="fp-logo-wrap">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="#080808" strokeWidth="2">
              <circle cx="18" cy="18" r="15"/>
              <circle cx="18" cy="18" r="10" strokeWidth="1.5"/>
              <line x1="7" y1="25" x2="13" y2="18" strokeLinecap="round"/>
              <line x1="29" y1="25" x2="23" y2="18" strokeLinecap="round"/>
              <path d="M12 15 Q18 9 24 15" strokeLinecap="round" fill="none" strokeWidth="1.5"/>
              <line x1="14" y1="19" x2="14" y2="22" strokeLinecap="round" strokeWidth="2.5"/>
              <line x1="22" y1="19" x2="22" y2="22" strokeLinecap="round" strokeWidth="2.5"/>
              <path d="M13 24 Q18 28 23 24" strokeLinecap="round" fill="none" strokeWidth="1.5"/>
            </svg>
            <span className="fp-brandname">FALLPROJECT</span>
          </Link>
          <div className="fp-nav-links">
            <a href="#">NEW IN</a>
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
              {/* <img src={`/models/model-${i+1}.jpg`} alt={m.label} /> */}
              <div className="fp-add-icon">+</div>
              <span className="fp-slot-badge">{m.label}</span>
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
              <button className="fp-btn-outline">LOOKBOOK</button>
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
              { name: 'FP Hoodie Drop', price: 'Rp 549.000', badge: 'HOT' },
              { name: 'FP Cargo Pants', price: 'Rp 479.000', badge: 'NEW' },
            ].map((p, i) => (
              <div key={i} className="fp-product-card fp-reveal">
                <div className="fp-product-img">
                  {p.badge && <span className="fp-product-badge">{p.badge}</span>}
                  {/* Ganti dengan: <img src={`/products/product-${i+1}.jpg`} alt={p.name} /> */}
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
              {session ? `WELCOME, ${session.user?.name?.split(' ')[0]?.toUpperCase()}` : 'JOIN THE <span>COMMUNITY</span>'}
            </h2>
            <p className="fp-login-sub">
              {session ? 'Kamu sudah login — akses member exclusive tersedia' : 'Login untuk akses member exclusive, promo & lookbook terbaru'}
            </p>
          </div>
          {!session ? (
            <button
              className="fp-google-btn"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
            <Link href="/dashboard">
              <button className="fp-google-btn">DASHBOARD →</button>
            </Link>
          )}
        </div>

        {/* FOOTER */}
        <footer className="fp-footer">
          <span className="fp-footer-brand">FALLPROJECT</span>
          <span className="fp-footer-copy">© 2025 FALLPROJECT. ALL RIGHTS RESERVED.</span>
          <span className="fp-footer-copy">JAKARTA, ID</span>
        </footer>

      </div>
    </>
  )
}