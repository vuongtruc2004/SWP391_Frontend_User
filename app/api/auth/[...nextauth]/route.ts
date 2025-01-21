import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    providers: [
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: { label: "Username", type: "text" },
        //         password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials) {
        //         const response = await sendRequest<IApiResponse<ILoginResponse>>({
        //             url: `${apiURL}/auth/login/credentials`,
        //             method: "POST",
        //             body: {
        //                 username: credentials?.username,
        //                 password: credentials?.password
        //             },
        //             useCredentials: true
        //         });

        //         if (response.status === 200) {
        //             return response.data as any;
        //         } else {
        //             throw new Error(response.message as string);
        //         }
        //     }
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID!,
        //     clientSecret: process.env.GOOGLE_SECRET!
        // })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user, account, trigger }) {
            // if (trigger === 'signIn') {
            //     if (account?.provider !== 'credentials') {
            //         const response = await sendRequest<IApiResponse<ILoginResponse>>({
            //             url: `${apiURL}/auth/login/socials`,
            //             method: "POST",
            //             body: {
            //                 username: user.email,
            //                 fullname: user.name,
            //                 avatar: user.image,
            //                 type: account?.provider.toUpperCase()
            //             }
            //         });

            //         if (response.status === 200) {
            //             const data = response.data;
            //             if (data) {
            //                 token.user = data.user;
            //                 token.accessToken = data.accessToken;
            //                 token.expireAt = data.expireAt;
            //                 token.refreshToken = data.refreshToken;
            //             }
            //         }
            //     } else {
            //         //@ts-ignore
            //         token.user = user.user;
            //         //@ts-ignore
            //         token.accessToken = user.accessToken;
            //         //@ts-ignore
            //         token.expireAt = user.expireAt;
            //         //@ts-ignore
            //         token.refreshToken = user.refreshToken;
            //     }
            // }
            // if (shouldRefreshToken(token.expireAt)) {
            //     return letRefreshToken(token);
            // }
            return token;
        },
        async session({ session, token }) {
            // if (token) {
            //     session.user = token.user;
            //     session.accessToken = token.accessToken;
            //     session.expireAt = token.expireAt;
            //     session.refreshToken = token.refreshToken;
            // }
            return session;
        }
    }
}

const handler = NextAuth({
    ...authOptions
});

export { handler as GET, handler as POST };
