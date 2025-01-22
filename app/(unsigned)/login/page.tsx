import Login from "@/components/login-form/login"
import { Box } from "@mui/material"
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Đăng nhập",
};

const LoginPage = async () => {
    const session = await getServerSession();

    console.log(">>> check session: ", session);
    if (session) {
        redirect("/home");
    }

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'black',
        }}>
            <Login />
        </Box>
    )
}

export default LoginPage