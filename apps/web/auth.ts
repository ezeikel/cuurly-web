import NextAuth from "next-auth";
// eslint-disable-next-line import/no-extraneous-dependencies
import type { AuthConfig, Account, Profile, Session } from "@auth/core/types";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import { db } from "@cuurly/db";

// function to generate a random username
const randomUsername = () => Math.random().toString(36).substring(2, 15);

// Create the configuration object first
const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile;
    }) {
      if (account?.provider === "google") {
        const existingUser = profile?.email
          ? await db.user.findUnique({ where: { email: profile.email } })
          : null;

        if (existingUser) {
          return true;
        }

        await db.user.create({
          data: {
            email: profile?.email as string,
            name: profile?.name as string,
            username: randomUsername(),
            profile: {
              create: {}, // create an empty profile for the user
            },
          },
        });
        return true;
      }
      return false;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const dbUser = token.email
        ? await prisma.user.findUnique({
            where: { email: token.email as string },
          })
        : null;

      return {
        ...session,
        user: {
          ...session.user,
          dbId: dbUser?.id,
        },
      };
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
} satisfies AuthConfig;

// pass the config to NextAuth
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  // @ts-ignore - Type 'typeof import("next-auth")' has no call signatures
} = NextAuth(config);
