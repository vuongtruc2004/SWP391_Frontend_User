'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface IUserOrder {
    orderList: OrderResponse[];
    setOrderList: Dispatch<SetStateAction<OrderResponse[]>>;
    selectedTab: string;
    setSelectedTab: Dispatch<SetStateAction<string>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserOrderContext = createContext<IUserOrder | null>(null);

export const UserOrderWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [selectedTab, setSelectedTab] = useState<string>("ALL");
    const [orderList, setOrderList] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                setLoading(true);
                const response = await sendRequest<ApiResponse<OrderResponse[]>>({
                    url: `${apiUrl}/users/purchase-history/${selectedTab}`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setOrderList(response.data);
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTab, session]);

    return (
        <UserOrderContext.Provider value={{ orderList, setOrderList, selectedTab, setSelectedTab, loading, setLoading }}>
            {children}
        </UserOrderContext.Provider>
    )
}

export const useUserOrder = () => {
    const context = useContext(UserOrderContext);
    if (!context) {
        throw new Error("Loi");
    }
    return context;
}