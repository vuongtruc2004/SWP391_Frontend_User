'use client'
import CartList from "@/components/cart/cart.list"
import CartSummary from "@/components/cart/cart.summary"
import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper";
import Box from "@mui/material/Box"
import ListEmpty from "../empty/list.empty";
import { Button } from "@mui/material";
import Link from "next/link";

const Cart = () => {
    const { cart } = useCartContext();

    if (!cart || cart.length === 0) {
        return (
            <Box sx={{
                paddingTop: '120px',
            }}>
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
            </Box>
        )
    }
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '2.5fr 1fr',
            columnGap: '20px',
            paddingTop: '120px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
        }}>
            <CartList />
            <CartSummary />
        </Box>
    )
}

export default Cart