import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"

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
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role || "USER"
      if (token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } })
        token.role = dbUser?.role ?? "USER"
      }
      return token
    },
    async session({ session, token }) {
      if (!session.user) session.user = {}
      session.user.role = token.role ?? "USER"
      return session
    }
  },
}