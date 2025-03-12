import MyFollowing from '@/components/my-follow-experts/my.following.slider';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react'

const MyFollowingExpert = async (props: {
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
            <MyFollowing
                searchParams={searchParams}
                keyword={keyword}
                page={page}
            />
        </Box>)
}

export default MyFollowingExpert