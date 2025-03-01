'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useCoursePurchased } from "../course-purchased/course.purchased.wrapper";

interface ICartCourse {
    change: number;
    setChange: Dispatch<SetStateAction<number>>;
    cart: CartCourse[];
    setCart: Dispatch<SetStateAction<CartCourse[]>>;
    loading: boolean;
}
const CartContext = createContext<ICartCourse | null>(null);

export const CourseCartWrapper = ({ children }: { children: React.ReactNode }) => {
    const { purchasedCourseIds } = useCoursePurchased();
    const [cart, setCart] = useState<CartCourse[]>([]);
    const [change, setChange] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedCart: CartCourse[] = JSON.parse(localStorage.getItem("cart") || "[]");

        if (purchasedCourseIds.length) {
            const newStoredCart = storedCart.filter(course => !purchasedCourseIds.some(courseId => courseId === course.courseId));

            if (newStoredCart.length !== cart.length) {
                localStorage.setItem('cart', JSON.stringify(newStoredCart));
                setCart(newStoredCart);
            }
        } else {
            setCart(storedCart);
        }

        setLoading(false);
    }, [purchasedCourseIds]);

    return (
        <CartContext.Provider value={{ cart, setCart, loading, change, setChange }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error('useCart must be used within a Cart');
    }
    return cartContext;
}