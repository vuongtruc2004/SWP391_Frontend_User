import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Box, Pagination } from '@mui/material';
import SingleAllPurchased from '@/features/history-purchased/single.all.purchased';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ListEmpty from '../empty/list.empty';

const PendingPurchased = (props: { courseData: ApiResponse<PageDetailsResponse<CourseDetailsResponse[]>> }) => {
    const { courseData } = props
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        router.replace(`${pathname}?${params}`);
    }

    return (
        <div>
            <Box sx={{
                display: 'grid',
                gap: '20px'
            }}>

                {(!courseData?.data?.content?.length || courseData.data.content.length === 0) ? (
                    <ListEmpty text="Không có lịch sửa mua hàng nào để hiển thị!" />
                ) : (
                    courseData?.data.content.map((item, index) => {
                        return (
                            <SingleAllPurchased course={item} key={index} />
                        )
                    }))}
            </Box>
            <Pagination
                count={courseData?.data?.totalPages}
                page={courseData?.data?.currentPage || 1}
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px',
                }}
                onChange={handleChangePage}
            />
        </div>
    )
};

export default PendingPurchased