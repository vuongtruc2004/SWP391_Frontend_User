'use client'
import { createContext, useContext, useEffect, useState } from "react";

interface ICartCourse {
    cart: CartCourse[];
    setCart: React.Dispatch<React.SetStateAction<CartCourse[]>>;
}
const CartContext = createContext<ICartCourse | null>(null);

export const CourseCartWrapper = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartCourse[]>([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error('useCartContext must be used within a CartContext');
    }
    return cartContext;
}