import { User, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/prisma/client";

type UserWithLikesandMatches = Prisma.UserGetPayload<{
  include: { likes: true; who_matched: true };
}>;

export const AuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }
        const { email, password } = credentials as any;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // const { data: session } = useSession();

      if (token?.id) {
        try {
          const res = await fetch(
            `http://localhost:3000/api/users/getUser/${token.id}`
          );
          if (res.ok) {
            const fullUser: UserWithLikesandMatches = await res.json();
            return { ...token, ...user, ...fullUser };
          }
        } catch (e) {
          console.log(e);
        }
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(AuthOptions);
