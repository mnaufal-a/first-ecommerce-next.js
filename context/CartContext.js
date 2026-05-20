"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("cart")
        if (saved) setCart(JSON.parse(saved))
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart, mounted])

    
    useEffect(() => {
    setCart((prev) => {
        const map = {}

        prev.forEach((item) => {
            if (map[item.id]) {
                map[item.id].qty += item.qty
            } else {
                map[item.id] = { ...item }
            }
        })

        return Object.values(map)
    })
}, [])

    const addToCart = (product) => {
    setCart((prev) => {
        const exist = prev.find(
            (item) => String(item.id) === String(product.id)
        )

        if (exist) {
            return prev.map((item) =>
                String(item.id) === String(product.id)
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        }

        return [...prev, { ...product, qty: 1 }]
    })
    }

    // ✅ REMOVE ITEM
    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    // ✅ UPDATE QTY
    const updateQty = (id, type) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty =
                        type === "inc" ? item.qty + 1 : item.qty - 1

                    return {
                        ...item,
                        qty: newQty < 1 ? 1 : newQty,
                    }
                }
                return item
            })
        )
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>

    )
}

export const useCart = () => useContext(CartContext)