import { Box, Pagination } from '@mui/material';
import SingleAllPurchased from '@/features/history-purchased/single.all.purchased';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ListEmpty from '../empty/list.empty';
import SingleOrder from '@/features/history-purchased/single.order';

const AllPurchased = ({ orderPage }: { orderPage: PageDetailsResponse<OrderResponse[]> | null }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        router.replace(`${pathname}?${params}`);
    }

    if (!orderPage || orderPage.content.length === 0) {
        return (
            <ListEmpty text="Không có lịch sửa mua hàng nào để hiển thị!" />
        )
    }

    return (
        <>
            <div className='flex flex-col gap-y-5 mb-5'>
                {orderPage.content.map((order, index) => {
                    return (
                        <SingleOrder order={order} key={order.orderCode} />
                    )
                })}
            </div>
            <Pagination
                count={orderPage.totalPages}
                page={orderPage.currentPage || 1}
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
                onChange={handleChangePage}
            />
        </>
    )
};

export default AllPurchased;
