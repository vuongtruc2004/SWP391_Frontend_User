import PurchaseHistory from '@/components/purchase-history/purchase.history';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lịch sử mua hàng",
};

const HistoryPurchased = () => {
    return (
        <PurchaseHistory />
    )
}

export default HistoryPurchased