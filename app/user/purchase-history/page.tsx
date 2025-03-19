import PurchaseHistoryTabs from '@/components/purchase-history/purchase.history.tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lịch sử mua hàng",
};

const HistoryPurchased = () => {
    return (
        <PurchaseHistoryTabs />
    )
}

export default HistoryPurchased