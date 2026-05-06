import { prisma } from "../../../lib/prisma"
import { redirect } from "next/navigation"

async function createProduct(formData:FormData) {
    "use server"

    const nama = formData.get("nama") as string
    const harga = Number(formData.get("harga"))

    await prisma.produk.create({
        data: {
            nama,
            harga,
        },
    })

    redirect("/produk")
}


export default function CreateProductPage() {
    return(
        <div className="max-w-md pl-7">
            <h1 className="text-xl mb-4 font-bold">Tambah Produk</h1>

            <form action={createProduct} className="space-y-4">
                <div>
                    <label>Nama Produk</label>
                    <input
                        name="nama"
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label>Harga Produk</label>
                    <input
                        name="harga"
                        className="border p-2 w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Simpan
                </button>
            </form>
        </div>
    )
}