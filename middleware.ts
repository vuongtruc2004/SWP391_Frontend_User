import withAuth from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/login'
    }
})

// neu nguoi dung chua dang nhap ma vao link nay thi se chuyen huong vao trang login
export const config = {
    matcher: [
        '/user/:path*',
        '/course/learning/:path*'
    ]
}