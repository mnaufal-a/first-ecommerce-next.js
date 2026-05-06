"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductCard({ product, search,}) {

    const formatPrice = (price) => {
            return new Intl.NumberFormat("Id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(price)
        }
    
        function highlight(text, keyword) {
            if (!keyword) return text
    
            const parts = text.split(new RegExp(`(${keyword})`, "gi"))
    
            return parts.map((part, i) =>
                part.toLowerCase() === keyword.toLowerCase()
                    ? <span key={i} className="bg-yellow-200 px-1 rounded">{part}</span>
                    : part
            )
        }

    return (
        <motion.div
                        
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >

                        <Card
                            className="group-hover:shadow-xl hover:translate-y-1 transition-all duration-300"
                        >
                            <CardContent className="p-4 space-y-3">

                                {/* IMAGE */}
                                <div className="w-full h-40 bg-slate-100 rounded-md overflow-hidden">
                                    <img
                                        src={product.image || "/no-image.png"}
                                        onError={(e) =>  e.target.src = "/no-image.png"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                </div>

                                {/* NAME */}
                                <h2 className="font-semibold text-sm line-clamp-2">
                                    {highlight(product.name, search)}
                                </h2>

                                {/* PRICE */}
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">
                                    {formatPrice(product.price)}
                                    </span>

                                    <Badge variant="secondary">
                                    Stock
                                    </Badge>
                                </div>

                                {/* ACTION */}
                                <Link href={`/products/${product.id}`}>
                                    <Button className="w-full mt-2">
                                        Lihat Detail
                                    </Button>
                                </Link>

                            </CardContent>

                        </Card>
                    </motion.div>
    )
}