import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL)

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile) {
        return {
          id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,

                role: "ADMIN"
        }
      }
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
  async jwt({ token, user }) {
  // ⬅️ saat login pertama
    if (user) {
      token.role = user.role || "USER"
    }

  // ⬅️ ambil dari DB setiap request
    if (token.email) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email }
      })

      token.role = dbUser?.role ?? "USER"
    }

    console.log("ROLE FINAL:", token.role)

    return token
  },

  async session({ session, token }) {
  
    if (!session.user) session.user = {}

    session.user.role = token.role ?? "USER"

    return session
  }
},
}

console.log(
  "GOOGLE CALLBACK:",
  `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
)

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }