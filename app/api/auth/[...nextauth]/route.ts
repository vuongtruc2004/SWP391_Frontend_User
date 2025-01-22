import { apiUrl } from "@/utils/url";
import NextAuth, { AuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { letRefreshToken, shouldRefreshToken } from "@/utils/refresh.token";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { type: "text" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                const request: CredentialsLoginRequest = {
                    username: credentials?.username ?? "",
                    password: credentials?.password ?? "",
                }

                const responseRaw = await fetch(`${apiUrl}/auth/login/credential`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request)
                });

                const response: ApiResponse<LoginResponse> = await responseRaw.json();

                if (response.statusCode === 200) {
                    const user: User = {
                        id: response.data.user.userId.toString(),
                        user: response.data.user,
                        accessToken: response.data.accessToken,
                        expireAt: response.data.expireAt,
                        refreshToken: response.data.refreshToken
                    }
                    return user;
                } else {
                    throw new Error("Sai tên tài khoản hoặc mật khẩu!");
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user, account, trigger }) {
            if (trigger === 'signIn') {
                if (account?.provider !== 'credentials') {
                    console.log(">>> check user: ", user);
                    const request: SocialsLoginRequest = {
                        username: user.email ?? "",
                        fullname: user.name ?? "",
                        avatar: user.image ?? "",
                        email: user.email ?? "",
                        accountType: account?.provider.toUpperCase() ?? ""
                    }

                    const responseRaw = await fetch(`${apiUrl}/auth/login/socials`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(request)
                    });

                    const response: ApiResponse<LoginResponse> = await responseRaw.json();

                    if (response.statusCode === 200) {
                        const data = response.data;
                        if (data) {
                            token.user = data.user;
                            token.accessToken = data.accessToken;
                            token.expireAt = data.expireAt;
                            token.refreshToken = data.refreshToken;
                        }
                    }
                } else {
                    token.user = user.user;
                    token.accessToken = user.accessToken;
                    token.expireAt = user.expireAt;
                    token.refreshToken = user.refreshToken;
                }
            }
            if (shouldRefreshToken(token.expireAt)) {
                return letRefreshToken(token);
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user;
                session.accessToken = token.accessToken;
                session.expireAt = token.expireAt;
                session.refreshToken = token.refreshToken;
            }
            return session;
        }
    }
}

const handler = NextAuth({
    ...authOptions
});

export { handler as GET, handler as POST };
