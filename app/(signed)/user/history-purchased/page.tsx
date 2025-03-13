import MenuTab from '@/components/history-purchased/menu.tab'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Lịch sử mua hàng",
};

const HistoryPurchased = async (props: {
    searchParams: Promise<{
        keyword?: string;
        page?: string;
    }>
}) => {

    const searchParams = await props.searchParams;
    const keyword = searchParams.keyword || ""
    const page = searchParams.page || 1;

    return (
        <MenuTab keyword={keyword} page={page} />
    )
}

export default HistoryPurchased