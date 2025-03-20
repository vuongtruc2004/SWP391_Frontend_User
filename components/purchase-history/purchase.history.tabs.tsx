"use client";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import ListEmpty from "../empty/list.empty";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { orderStatuses } from "./order.status.properties";
import SingleOrder from "@/features/purchase-history/single.order";

const PurchaseHistoryTabs = () => {
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
        <>
            <h1 className="font-semibold text-xl mb-5">Lịch sử mua hàng của bạn</h1>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '12px',
                bgcolor: 'black',
                padding: '8px',
                borderRadius: '6px',
                width: 'max-content',
                'div': {
                    '&.active': {
                        bgcolor: '#212121',
                    },
                    ':not(.active):hover': {
                        color: '#2b7fff'
                    }
                }
            }}>
                {orderStatuses.map(item => {
                    return (
                        <div className={`transition-all duration-300 py-1.5 px-5 rounded-md cursor-pointer ${selectedTab === item.en && 'active'}`}
                            key={item.key}
                            onClick={() => setSelectedTab(item.en)}
                        >
                            {item.vi}
                        </div>
                    )
                })}
            </Box>

            {loading ? (
                <div className="flex items-center justify-center mt-20">
                    <CircularProgress />
                </div>
            ) : (
                <div className="mt-5">
                    {orderList.length ? (
                        <ul className="flex flex-col gap-y-3">
                            {orderList.map(order => {
                                return (
                                    <SingleOrder order={order} key={order.orderCode} orderList={orderList} />
                                )
                            })}
                        </ul>
                    ) : (
                        <div className='flex items-center justify-center'>
                            <div>
                                <ListEmpty text="Không có lịch sửa mua hàng nào để hiển thị" height={110} />
                                <Link href={'/expert'} className='flex items-center justify-center'>
                                    <Button sx={{ borderRadius: '30px' }} variant='outlined' startIcon={<ShoppingCartIcon />}>Mua sắm ngay</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </>
    );
};

export default PurchaseHistoryTabs;