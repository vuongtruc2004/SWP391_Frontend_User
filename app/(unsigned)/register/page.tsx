import Register from "@/components/register/register"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng kí",
};

const RegisterPage = () => {
    return (
        <Register />
    )
}

export default RegisterPage