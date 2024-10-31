import { createUser, isExistUser } from "@/tools/userHandler";
import NextAuth, { Account, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      //   async profile(profile) {
      //     // Create User if user not exist
      //     if (!(await isExistUser(profile.email))) {
      //       await createUser(profile.email, profile.name);
      //     }
      //     return profile;
      //   },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account }) {
      if (account?.provider === "google") {
        try {
          if (!(await isExistUser(user.email as string))) {
            await createUser(user.email as string, user.name as string);
          }

          return true;
        } catch {
          return false;
        }
      }
    },
  },
});

export { handler as GET, handler as POST };
