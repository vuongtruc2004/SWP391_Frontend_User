import { savePrice, sumOriginalPrice, sumSalePrice } from "@/helper/course.cart.helper";
import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper";
import { Box, Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CartSummary = () => {
    const { cart } = useCartContext();

    return (
        <Box sx={{
            bgcolor: 'black',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '6px',
            height: 'max-content',
        }}>
            <h1 className="font-semibold text-gray-300">Tổng</h1>
            <h2 className="text-3xl font-semibold mb-1">{sumSalePrice(cart)}₫ <span className="text-gray-400 line-through text-base">{sumOriginalPrice(cart)}₫</span></h2>
            <Button variant="contained" color="primary" fullWidth endIcon={<ChevronRightIcon />}>
                Tiến hành thanh toán
            </Button>
            <p className="text-sm text-green-500 mt-1">Tiết kiệm {savePrice(cart)}₫</p>
        </Box>
    )
}

export default CartSummary