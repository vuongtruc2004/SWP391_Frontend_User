"use client";
import { Box, Button, CircularProgress } from "@mui/material";
import ListEmpty from "../empty/list.empty";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { orderStatuses } from "./order.status.properties";
import SingleOrder from "@/features/purchase-history/single.order";
import { useUserOrder } from "@/wrapper/user-order/user.order.wrapper";

const PurchaseHistoryTabs = () => {
    const { setSelectedTab, orderList, loading, selectedTab } = useUserOrder();

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
                                    <SingleOrder order={order} key={order.orderCode} />
                                )
                            })}
                        </ul>
                    ) : (
                        <div className='flex items-center justify-center'>
                            <div>
                                <ListEmpty text="Không có lịch sửa mua hàng nào để hiển thị" height={110} />
                                <Link href={'/expert'} className='flex items-center justify-center'>
                                    <Button variant='outlined' startIcon={<ShoppingCartIcon />}>Mua sắm ngay</Button>
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