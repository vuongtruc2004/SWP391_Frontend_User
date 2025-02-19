'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useCoursePurchased } from "../course-purchased/course.purchased.wrapper";

interface ICartCourse {
    cart: CartCourse[];
    setCart: React.Dispatch<React.SetStateAction<CartCourse[]>>;
    loading: boolean;
}
const CartContext = createContext<ICartCourse | null>(null);

export const CourseCartWrapper = ({ children }: { children: React.ReactNode }) => {
    const { purchasedCourses } = useCoursePurchased();
    const [cart, setCart] = useState<CartCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedCart: CartCourse[] = JSON.parse(localStorage.getItem("cart") || "[]");

        if (purchasedCourses.length) {
            const newStoredCart = storedCart.filter(course => !purchasedCourses.some(item => item.courseId === course.courseId));

            if (newStoredCart.length !== cart.length) {
                localStorage.setItem('cart', JSON.stringify(newStoredCart));
                setCart(newStoredCart);
            }
        } else {
            setCart(storedCart);
        }

        setLoading(false);
    }, [purchasedCourses]);

    return (
        <CartContext.Provider value={{ cart, setCart, loading }}>
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