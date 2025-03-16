'use client'
import CartSummary from "@/components/cart/cart.summary"
import Box from "@mui/material/Box"
import ListEmpty from "../empty/list.empty";
import { Button, Skeleton } from "@mui/material";
import Link from "next/link";
import SuggestCourse from "@/features/cart/suggest.course";
import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";
import CartBuyList from "./cart.buy.list";
import CartBuyLaterList from "./cart.buy.later.list";

const Cart = () => {
    const { cart, loading } = useCart();

    if (loading) {
        return (
            <div className="pt-[90px] pb-10">
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '2.5fr 1fr',
                    columnGap: '20px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <Skeleton variant="rounded" width={"100%"} height={250} animation="wave" />
                    <Skeleton variant="rounded" width={"100%"} height={200} animation="wave" />
                </Box>
            </div>
        )
    }
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
                    <ListEmpty text='Giỏ hàng của bạn đang trống' height={220} />
                    <div className="flex justify-center">
                        <Link href={"/course"} className="inline-block max-w-[200px]">
                            <Button variant='text' color='info' fullWidth>
                                Tiếp tục mua sắm
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