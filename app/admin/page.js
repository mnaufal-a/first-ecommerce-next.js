
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminForm from "./AdminForm";
import { prisma } from "../../lib/prisma";
import ProductItem from "./ProductItem"
import AdminClient from "./AdminClient";
// import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default async function  AdminPage() {
    // const { user } = useAuth()
    // const router = useRouter()
    
    // // const session = await getServerSession(authOptions)

    // useEffect(() => {
    //     if (user?.role !== "ADMIN") {
    //         router.push("/") // tendang ke home
    //     }
    // }, [user])
    
    // if (!session) {
    //     redirect("/")
    // }
    
    // if (session.user.role !== "ADMIN") {
    //     redirect("/dashboard")
    // }
    
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Admin Panel ⚠️ (Only ADMIN can see this page!)
            </h1>

            <AdminClient products={products} />

        </div>
    )
}