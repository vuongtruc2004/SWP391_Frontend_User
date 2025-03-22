'use client'
import CartSummary from "@/features/cart/cart.summary"
import Box from "@mui/material/Box"
import ListEmpty from "../empty/list.empty";
import { Button } from "@mui/material";
import Link from "next/link";
import SuggestCourse from "@/components/cart/suggest.course";
import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";
import CartBuyList from "./cart.buy.list";
import CartBuyLaterList from "./cart.buy.later.list";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

const Cart = () => {
    const { cart } = useCart();

    if (!cart || cart.length === 0) {
        return (
            <div className="pt-[90px] pb-10">
                <Box sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    bgcolor: 'black',
                    padding: '20px',
                    borderRadius: '6px',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                }}>
                    <div className="flex flex-col items-center">
                        <ListEmpty text="Không có khóa học nào để hiển thị trong giỏ hàng" height={160} />
                        <Link href={"/course"}>
                            <Button color="info" variant="outlined" startIcon={<ShoppingCartCheckoutOutlinedIcon />}>
                                Thêm ngay
                            </Button>
                        </Link>
                    </div>
                </Box>
            </div>
        )
    }

    return (
        <Box sx={{
            paddingBlock: '90px 40px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative'
        }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '2.5fr 1fr',
                columnGap: '20px',
            }}>
                <div className="flex flex-col gap-y-5">
                    <CartBuyList />
                    <CartBuyLaterList />
                </div>
                <CartSummary />
            </Box>
            <SuggestCourse />
        </Box>

    )
}

export default Cart