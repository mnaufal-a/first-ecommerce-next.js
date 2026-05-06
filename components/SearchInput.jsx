"use client";

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"

export default function SearchInput() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [value, setValue] = useState(searchParams.get("q") || "")

    useEffect(() => {
        const delay = setTimeout(() => {
            const params = new URLSearchParams(searchParams)

            if (value) {
                params.set("q", value)
            } else {
                params.delete("q")
            }

            router.replace(`/products?${params.toString()}`)
        }, 500)

        return () => clearTimeout(delay)
    }, [value, searchParams])

    return (
        <Input
            placeholder="Search produk..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-64"
        />
    )
}