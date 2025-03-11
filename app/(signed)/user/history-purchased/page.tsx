import MenuTab from '@/components/history-purchased/menu.tab'
import { Box } from '@mui/material'
import { Metadata } from 'next';
import React from 'react'

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
        <Box>
            <MenuTab
                searchParams={searchParams}
                keyword={keyword}
                page={page}
            />
        </Box>
    )
}

export default HistoryPurchased