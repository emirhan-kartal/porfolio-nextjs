import { passwordCheck } from "@/lib/auth";
import { addUser, findUserByEmail } from "@/models/user-model";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

type KartalUser = Omit<Omit<User, "image">, "name">;

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<KartalUser | null> {
                const { email, password } = credentials;
                const user = await findUserByEmail(email);
                if (user) {
                    const passwordMatch = await passwordCheck(
                        password,
                        user.password
                    );
                    if (passwordMatch) {
                        return {
                            email: user.email,
                            id: user._id.toString(),
                            image: "none-authorize",
                        } as KartalUser;
                    } else {
                        return null;
                    }
                } else if (email === "e.kartal115@gmail.com") {
                    addUser({ email: email, password: password });

                    return {
                        email: email,
                        id: "new-user-id",
                        image: "none-new-user",
                    } as KartalUser;
                } else {
                    throw new Error("User not found");
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email; // Add the user email to the token
                token.name = "Emirhan Kartal";
                token.image = "none";
            }
            return token; // Return the token
        },
        async session({ session, token }) {
            if (session && session.user) {
                session.user.email = token.email; // Add the token's email to the session object
                session.user.name = "Emirhan Kartal";
                session.user.image = "none"; // Ensure image is set
            }
            return session; // Return the session
        },
    },
    pages: {
        signIn: "/login/",
    },
};
export default NextAuth(authOptions);
