import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';



export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
        // only recro emails allowed
      const email = user?.email || ''
      if (email.endsWith('@recro.com')) {
        return true
      }
      return false 
    },
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token;
      return session;
    },
  },
  
});