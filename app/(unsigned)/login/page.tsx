import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "@/components/login/login"
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Đăng nhập",
};
const LoginPage = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/home");
    }
    return (
        <Login />
    )
}

export default LoginPage