
import ProductCard from "../../components/ProductCard"
import { prisma } from "../../lib/prisma"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import  SearchInput  from "@/components/SearchInput"
import SortSelect from "../../components/SortSelect"
// import { motion } from "framer-motion"

export default async function ProductsPage({ searchParams }) {
    const params = await  searchParams
    const search = params?.q || ""
    const sort = params?.sort || ""

    
    let orderBy = {}

    if (sort === "price_asc") orderBy = { price : "asc" }
    if (sort === "price_desc") orderBy = { price : "desc" }
    if (sort === "name_asc") orderBy = { name : "asc" }
    if (sort === "name_desc") orderBy = { name : "desc" }

    const page = Number(params?.page) || 1
    const limit = 8
    const skip = (page - 1) * limit

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: search.toLowerCase()
            },
        },
        orderBy,
        skip,
        take: limit,
    })

    const totalProducts = await prisma.product.count({
        where: {
            name: {
                contains: search.toLowerCase()
            },
        },
    })

    const totalPages = Math.ceil(totalProducts/limit)


    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>

                <SearchInput/>
                <SortSelect/>
            </div>
            

            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        search={search}
                    />
                ))}
            </div>

            {products.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                    <div className="text-5xl mb-3">📦</div>
                    <div className="text-lg font-semibold">Produk tidak ditemukan!</div>
                    <div className="text-sm text-gray-500">Coba kata kunci lain!</div>
                </div>
            )}

            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length:totalPages }).map((_, i) => {
                    const p = i + 1
                    return (
                        <a 
                            key={p}
                            href={`?q=${search}&sort=${sort}&page=${p}`}
                            className={`px-3 py-1 rounded border ${
                                p === page ? "bg-black text-white" : ""
                            }`}
                        >
                            {p}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}