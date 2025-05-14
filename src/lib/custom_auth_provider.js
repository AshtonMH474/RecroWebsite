// lib/custom-auth-provider.ts
import { AbstractAuthProvider } from "tinacms";
import { signOut } from "next-auth/react";

export class CustomAuthProvider extends AbstractAuthProvider {
  async authenticate() {
    // after authentication u return to admin
     window.location.href = '/api/auth/signin/google?callbackUrl=/admin';// NextAuth sign-in page
  }

  async getUser() {
    // sees if theres a user
    const res = await fetch('/api/auth/session');
    const session = await res.json();
    return session?.user || null;
  }

  async getToken() {
    const res = await fetch('/api/auth/session');
    const session = await res.json();
    return { id_token: session?.id_token };
  }

  async logout() {
      await signOut({ });
  }
    async authorize() {
    const res = await fetch("/api/auth/session");
    const session = await res.json();
    return !!session?.user;
  }

}
