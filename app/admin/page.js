import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"
import AdminClient from "./AdminClient"

export default async function AdminPage() {
    const session = await getServerSession(authOptions)

    if (!session) redirect("/")
    if (session.user.role !== "ADMIN") redirect("/products")

    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <div style={{ background: "#080808", minHeight: "100vh", color: "#fff", padding: "40px" }}>

            {/* Header */}
            <div style={{ marginBottom: 40, borderBottom: "1px solid #1a1a1a", paddingBottom: 24 }}>
                <p style={{ fontSize: 10, letterSpacing: 4, color: "#F189B8", marginBottom: 8 }}>
                    — FALLPROJECT ADMIN —
                </p>
                <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(40px, 6vw, 64px)",
                    letterSpacing: 3, lineHeight: 0.9, color: "#fff",
                }}>
                    ADMIN <span style={{ color: "#87CEFA" }}>PANEL</span>
                </h1>
                <p style={{ fontSize: 12, color: "#555", marginTop: 8 }}>
                    ⚠️ Hanya ADMIN yang dapat mengakses halaman ini
                </p>
            </div>

            <AdminClient products={products} />
        </div>
    )
}