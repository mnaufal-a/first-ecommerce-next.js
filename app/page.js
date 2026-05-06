"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-96 text-center">
        {!session ? (
          <>
            <h1 className="text-2xl font-bold mb-4">
              Welcome 👋
            </h1>

            <p className="text-gray-500 mb-6 ">
              Login to continue
            </p>
          
            <button 
              onClick={() => 
                  signIn("google", { callbackUrl: "/dashboard" })
              }
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"  
            >
              Login with Google
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold mb-2">
              welcome {session.user.name}
            </h1>
            <button 
              onClick={() => signOut()}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>

    </div>
  )
}