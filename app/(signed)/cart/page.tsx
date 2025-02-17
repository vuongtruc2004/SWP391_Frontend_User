import Cart from "@/components/cart/cart"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Giỏ hàng",
};

const CartPage = () => {
    return (
        <Cart />
    )
}

export default CartPage