import MyOrderTabs from '@/components/my-order/my.order.tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Hóa đơn của tôi",
};

const MyOrderPage = () => {
    return (
        <MyOrderTabs />
    )
}

export default MyOrderPage