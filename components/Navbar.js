"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const { data: session } = useSession()
    const { cart } = useCart()
    const { user } = useAuth()

    return (
        <div className="w-full border-b bg-white px-6 py-4 flex justify-between items-center">
            {/* Left */}
            <div className="flex gap-6 items-center">
                <Link href="/dashboard" className="font-bold">
                    MyApp
                </Link>

                <Link href="/products">Products</Link>

                {session?.user?.role === "ADMIN" && (
                    <Link href="/admin">Admin Panel</Link>
                )}

                <div className="relative text-2xl">
                    <Link href="/cart">
                        🛒
                    </Link>

                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {cart.length}
                        </span>
                    )}
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {session?.user && (
                    <>
                        <span className="text-sm">
                            {session.user.name}
                        </span>

                        <Avatar className="w-8 h-8 rounded-full">
                            <AvatarImage src={session.user.image} />
                        </Avatar>
                            
                    </>
                )}
            </div>
        </div>
    )
}