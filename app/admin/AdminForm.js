"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import ImageUpload from "../../components/ImageUpload"


export default function AdminForm( {editingProduct, setEditingProduct, addProduct, updateProduct, onSuccess} ) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name ?? "")
      setPrice(
        new Intl.NumberFormat("id-ID").format(editingProduct.price ?? 0)
      )
      setImage(editingProduct.image ?? "")
    }
  }, [editingProduct])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("");

    if (!name.trim()) {
          setError("Nama Produk harus diisi!");
          setLoading(false);
          return;
    }

    const numericPrice = Number(price.replace(/\./g, ""))

    if (isNaN(numericPrice) || numericPrice <= 0) {
          setError("Harga wajib dengan angka dan lebih dari 0!");
          setLoading(false);
          return;
    }

    const isEdit = !!editingProduct

    const backup = editingProduct

    const optimisticData = {
      id :  editingProduct?.id || Date.now(),
      name,
      price: numericPrice,
    }

    if (isEdit) {
      updateProduct(optimisticData)
    } else {
      addProduct(optimisticData)
    }

    try {
      const endpoint = "/api/products"
      const method = editingProduct ? "PUT" : "POST"
  
        const res = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: editingProduct?.id,
            name,
            price: numericPrice,
            image,
          })
        })
        
        if (!res.ok) {
          throw new Error("Gagal menyimpan produk! ❌")
        }

        const realData = await res.json()

        if (isEdit) {
          updateProduct(realData)
        }

    } catch (err) {
      alert("Gagal, data dikembalikan!")

      if (isEdit && backup) {
        updateProduct(backup)
      }
      
    } finally {
      setLoading(false)
      setName("")
      setPrice("")
      setImage("")
      setEditingProduct(null)

    }

    
  }

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")

    const formatted = new Intl.NumberFormat("id-ID").format(value)

    setPrice(formatted)
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && (
        <div className="bg-red-200 border border-red-400 text-red-700 font-bold px-4 py-7 rounded mb-4">
          <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setError("");
        }}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Harga"
        value={price}
        onChange={(e) => {
          handlePriceChange(e)
          setError("")
        }}
        className="w-full border p-2 rounded"
      />

      <ImageUpload onChange={(url) => setImage(url)}/>
      {/* <ImageUpload onUpload={(url) => setImage(url)}/> */}

        {image && (
          <div className="mt-4">
            <p className="text-sm mb-2 text-gray-500">Preview:</p>
            <img 
              src={image} 
              className="w-40 h-40 object-cover rounded border"
            />
          </div>
        )}

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-black"
        }`}
      >
        {loading 
        ? "Saving..."
        : "Tambah Produk"
        ? "Menambahkan..." 
        : editingProduct
        ? "Update Produk"
        : ""}
      </button>

      <div>
          <h2 className="text-xl font-semibold mt-4 mb-4">
            Daftar Produk
          </h2>
      </div>
    </form>
  )
}