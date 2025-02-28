import { sumOriginalPrice } from "@/helper/course.cart.helper";
import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper";
import { Box, Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaymentInstruction from "@/features/course/course-details/payment.instruction";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const CartSummary = () => {
    const { cart } = useCartContext();
    const { status } = useSession();
    const { push } = useRouter();
    const pathname = usePathname();

    const [openInstruction, setOpenInstruction] = useState(false);

    const handleOpenInstruction = () => {
        if (status !== "authenticated") {
            sessionStorage.setItem('prevUrl', pathname);
            push("/login");
        } else {
            setOpenInstruction(true);
        }
    }

    return (
        <Box sx={{
            bgcolor: 'black',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '6px',
            height: 'max-content',
        }}>
            <h1 className="font-semibold text-gray-300">Tổng</h1>
            <h2 className="text-3xl font-semibold mb-1">
                <span className="text-gray-400 line-through text-base">
                    {sumOriginalPrice(cart)}₫
                </span>
            </h2>
            <Button variant="contained" color="primary" fullWidth endIcon={<ChevronRightIcon />} onClick={handleOpenInstruction}>
                Tiến hành thanh toán
            </Button>

            <PaymentInstruction open={openInstruction} setOpen={setOpenInstruction} courses={cart} />
        </Box>
    )
}

export default CartSummary