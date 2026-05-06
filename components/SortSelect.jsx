"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChange = (e) => {
        const value = e.target.value
        const params = new URLSearchParams(searchParams)

        if (value) params.set("sort", value)
        else params.delete("sort") 

        router.replace(`products?${params.toString()}`)
    }

    return (
        <select
            onChange={handleChange}
            defaultValue={searchParams.get("sort") || ""}
            className="border px-3 py-2 rounded-md"
        >
            <option value="">Sort</option>
            <option value="price_asc">Harga Termurah</option>
            <option value="price_desc">Harga Termahal</option>
            <option value="name_asc">Nama A-Z</option>
            <option value="name_desc">Nama Z-A</option>
        </select>
    )
}