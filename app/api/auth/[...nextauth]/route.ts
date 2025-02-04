import { apiUrl } from "@/utils/url";
import NextAuth, { AuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { letRefreshToken, shouldRefreshToken } from "@/utils/refresh.token";
import { sendRequest } from "@/utils/fetch.api";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "text" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                const request: CredentialsLoginRequest = {
                    email: credentials?.email ?? "",
                    password: credentials?.password ?? "",
                }

                const credentialsLoginResponse = await sendRequest<ApiResponse<LoginResponse>>({
                    method: 'POST',
                    url: `${apiUrl}/auth/login/credentials`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: request
                })

                if (credentialsLoginResponse.status === 200) {
                    const user: User = {
                        id: credentialsLoginResponse.data.user.userId.toString(),
                        user: credentialsLoginResponse.data.user,
                        accessToken: credentialsLoginResponse.data.accessToken,
                        expireAt: credentialsLoginResponse.data.expireAt,
                        refreshToken: credentialsLoginResponse.data.refreshToken
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
                    const request: SocialsLoginRequest = {
                        email: user.email ?? "",
                        fullname: user.name ?? "",
                        avatar: user.image ?? "",
                        accountType: account?.provider.toUpperCase() ?? ""
                    }

                    const socialsLoginResponse = await sendRequest<ApiResponse<LoginResponse>>({
                        method: 'POST',
                        url: `${apiUrl}/auth/login/socials`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: request
                    })

                    if (socialsLoginResponse.status === 200) {
                        const data = socialsLoginResponse.data;
                        if (data) {
                            token.user = data.user;
                            token.accessToken = data.accessToken;
                            token.expireAt = data.expireAt;
                            token.refreshToken = data.refreshToken;
                        }
                    } else {
                        throw new Error("Đăng nhập không thành công!");
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
