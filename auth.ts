import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./lib/prisma";

// function to generate a random username
function randomUsername() {
  return Math.random().toString(36).substring(2, 15);
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const existingUser = profile?.email
          ? await prisma.user.findUnique({ where: { email: profile.email } })
          : null;

        if (existingUser) {
          return true;
        }

        console.log("Creating new user");

        await prisma.user.create({
          data: {
            email: profile?.email as string,
            name: profile?.name as string,
            username: randomUsername(),
            profile: {
              create: {}, // create an empty profile for the user
            },
          },
        }); // Create a new user with these details
        return true;
      }

      // TODO: handle other providers
      return false;
    },
    async session({ session, token }) {
      const dbUser = token.email
        ? await prisma.user.findUnique({
            where: { email: token.email },
          })
        : null;

      // eslint-disable-next-line no-param-reassign
      session.userId = dbUser?.id as string;
      return session;
    },
  },
  // TODO: this wasnt in docs but seems to be required
  secret: process.env.NEXT_AUTH_SECRET,
});
