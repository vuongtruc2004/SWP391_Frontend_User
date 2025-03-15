import { Box, Button, Pagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ListEmpty from '../empty/list.empty';
import SingleOrder from '@/features/history-purchased/single.order';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const PendingPurchased = ({ orderPage }: { orderPage: PageDetailsResponse<OrderResponse[]> | null }) => {
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
            <div className='text-center'>
                <ListEmpty text="Không có lịch sửa mua hàng nào để hiển thị!" />
                <Box sx={{ '.mui-1pnqca8-MuiButtonBase-root-MuiButton-root': { marginTop: '-25vh', borderRadius: '20px' } }}>
                    <Link href={'/course'}>
                        <Button variant='outlined'><ShoppingCartIcon className='mr-2' />Mua sắm ngay!</Button>
                    </Link>
                </Box>

            </div>
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

export default PendingPurchased