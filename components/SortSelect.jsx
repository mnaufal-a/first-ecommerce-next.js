"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentSort = searchParams.get("sort") || ""


    const handleChange = (e) => {
        
        const params = new URLSearchParams(searchParams.toString())

        params.set("sort", e.target.value)

        if (!e.target.value) {
        params.delete("sort")
        }

        params.set("page", "1")

        router.push(`/products?${params.toString()}`)
    }

    return (
        <select
            value={currentSort}
            onChange={handleChange}
            className="fp-sort-select"
        >
            <option value="">Sort</option>
            <option value="price_asc">Harga Termurah</option>
            <option value="price_desc">Harga Termahal</option>
            <option value="name_asc">Nama A-Z</option>
            <option value="name_desc">Nama Z-A</option>
        </select>
    )
}