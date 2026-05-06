"use client"

import { useCart } from "../../context/CartContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ShoppingBag, MapPin, Phone, User, Send } from "lucide-react"

// Komponen Shadcn
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
    const { cart, clearCart } = useCart()
    const router = useRouter()

    const [form, setForm] = useState({
        nama: "",
        alamat: "",
        hp: ""
    })
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        // Hapus error saat user mulai mengetik
        if (error) setError("")
    }

    const FormatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(angka)
    }

    const total = cart.reduce((a, b) => a + b.price * b.qty, 0)

    const handleCheckout = () => {
        if (!form.nama || !form.alamat || !form.hp) {
            setError("Semua Form wajib diisi!")
            return
        }

        const pesanItems = cart.map(item => {
            return `- ${item.name} x ${item.qty} = ${FormatRupiah(item.price * item.qty)}`
        }).join("\n")

        const pesan = `Halo, saya ingin memesan :\n\n${pesanItems}\n\n*Total: ${FormatRupiah(total)}*\n\nData Pengiriman:\nNama: ${form.nama}\nAlamat: ${form.alamat}\nNo HP: ${form.hp}`

        const phone = "6281511004406"
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(pesan)}`

        window.open(url, "_blank")
        clearCart()
        router.push("/cart")
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-50" />
                <h1 className="text-xl font-medium text-muted-foreground">Keranjang belanja Anda kosong 😓</h1>
                <Button onClick={() => router.push("/products")}>Mulai Belanja</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                    <p className="text-muted-foreground mt-1">Selesaikan pesanan Anda di bawah ini.</p>
                </div>

                {/* 2-Column Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI: Form Pengiriman */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-sm ring-1 ring-slate-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Informasi Pengiriman
                                </CardTitle>
                                <CardDescription>Pastikan data yang Anda masukkan valid.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nama" className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-muted-foreground"/> Nama Lengkap
                                    </Label>
                                    <Input 
                                        id="nama"
                                        name="nama" 
                                        placeholder="Contoh: Budi Santoso" 
                                        value={form.nama}
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hp" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-muted-foreground"/> Nomor WhatsApp
                                    </Label>
                                    <Input 
                                        id="hp"
                                        name="hp" 
                                        type="tel"
                                        placeholder="Contoh: 08123456789" 
                                        value={form.hp}
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="alamat" className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-muted-foreground"/> Alamat Lengkap
                                    </Label>
                                    <Textarea 
                                        id="alamat"
                                        name="alamat" 
                                        placeholder="Sertakan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan dan kota..." 
                                        className="min-h-[100px] resize-none"
                                        value={form.alamat}
                                        onChange={handleChange} 
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                                        {error}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* KOLOM KANAN: Ringkasan Pesanan */}
                    <div className="lg:col-span-1">
                        {/* Sticky positioning agar ringkasan tetap terlihat saat scroll ke bawah di layar besar */}
                        <Card className="border-none shadow-sm ring-1 ring-slate-200 sticky top-6">
                            <CardHeader className="bg-slate-50/50 border-b pb-4">
                                <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
                            </CardHeader>
                            
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-start text-sm">
                                            <div className="flex flex-col gap-1 pr-4">
                                                <span className="font-medium line-clamp-2">{item.name}</span>
                                                <span className="text-muted-foreground">Total: {item.qty}</span>
                                            </div>
                                            <span className="font-medium whitespace-nowrap text-right">
                                                {FormatRupiah(item.price * item.qty)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">{FormatRupiah(total)}</span>
                                </div>
                            </CardContent>

                            <CardFooter className="bg-slate-50/50 border-t pt-4">
                                <Button 
                                    onClick={handleCheckout} 
                                    className="w-full h-12 text-md font-semibold"
                                    size="lg"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Pesan via WhatsApp
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}