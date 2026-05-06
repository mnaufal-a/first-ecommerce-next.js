

import { prisma } from "../../../lib/prisma";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function ProductDetail({ params }) {
    const { id } = await params
    

    const product = await prisma.product.findUnique({
        where: { id }
    })
    
    if (!product) return <div className="p-10">Produk tidak ditemukan!</div>

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price)
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">

                <div className="w-full">
                    <img
                        src={product.image || "https://picsum.photos/600"}
                        className="w-full h-[400px] object-cover rounded-xl shadow hover:scale-105 transition"
                    />
                </div>

                <div className="space-y-5">
                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <p className="text-2xl font-semibold text-gray-800">
                        {formatPrice(product.price)}
                    </p>

                    <span className="inline-block bg-gray-200 px-3 py-1 rounded text-sm">
                        Stock Tersedia!
                    </span>

                    <p className="text-gray-600 leading-relaxed">
                        Produk ini adalah pilihan terbaik untuk kebutuhan kamu.
                        Kualitas terjamin, desain modern, dan cocok untuk penggunaan sehari-hari.
                    </p>

                    <div className="flex gap-3 pt-4">
                        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                            Beli Sekarang
                        </button>

                        <AddToCartButton product={product}/>
                    </div>
                </div>
            </div>



        </div>
    )
}