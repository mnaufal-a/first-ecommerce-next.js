export default function SuccessPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl  font-bold">✅Pembayaran berhasil!</h1>
            <p className="text-gray-600 mt-2">
                Terima kasih sudah belanja ☺️🙏
            </p>

            <a
                href="/products"
                className="mt-6 bg-black text-white px-6 py-2 rounded"
            >
                Belanja Lagi
            </a>
        </div>
    )
}