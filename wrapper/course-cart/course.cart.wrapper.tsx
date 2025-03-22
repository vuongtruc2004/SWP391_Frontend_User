'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

interface ICartCourse {
    cart: CartCourse[];
    setCart: Dispatch<SetStateAction<CartCourse[]>>;
}
const CartContext = createContext<ICartCourse | null>(null);

export const CourseCartWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [cart, setCart] = useState<CartCourse[]>([]);

    useEffect(() => {
        const getUserCart = async () => {
            const storedCart: CartCourse[] = JSON.parse(localStorage.getItem("cart") || "[]");

            if (status === 'authenticated') {
                const request: StorageCourseRequest[] = storedCart.map(item => ({
                    courseId: item.courseId,
                    status: item.buyLater ? "LATER" : "NOW"
                }));

                const response = await sendRequest<ApiResponse<CartResponse>>({
                    url: `${apiUrl}/carts`,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: request
                });

                if (response.status === 200) {
                    const userCart = response.data;
                    if (userCart) {
                        const cart = userCart.cartCourses.map(cartCourse => {
                            return {
                                courseId: cartCourse.course.courseId,
                                courseName: cartCourse.course.courseName,
                                price: cartCourse.course.price,
                                author: cartCourse.course.expert.user.fullname,
                                thumbnail: cartCourse.course.thumbnail,
                                buyLater: cartCourse.status === 'LATER' ? true : false
                            }
                        });
                        setCart(cart);
                    }
                }
                localStorage.removeItem('cart');
            } else {
                setCart(storedCart);
            }
        }

        getUserCart();
    }, [session]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
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