import Login from "@/components/login/login"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
};
const LoginPage = () => {
    return (
        <Login />
    )
}

export default LoginPage