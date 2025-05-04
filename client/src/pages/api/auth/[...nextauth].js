import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // Optional: Add custom pages
  pages: {
    signIn: '/auth/signin',
  },

  // Optional: Customize the JWT or session
  session: {
    jwt: true,
  },

  callbacks: {
    async session({ session, token }) {
        return {
            ...session,
            user: {
              name: token.name,
              email: token.email,
              image: token.picture
            }
          }
    },
    async jwt({ token, user }) {
      // Store raw Google data in JWT (server-only)
       return token
    }
  }
});