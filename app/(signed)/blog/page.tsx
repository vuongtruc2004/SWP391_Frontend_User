import Header from '@/components/header/header';
import { Box } from '@mui/material';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Bài viết",
};

const BlogPage = () => {
    return (
        <div className='min-h-screen bg-black pb-10'>
            <Box sx={{
                color: 'white',
            }}>
                <Header />
            </Box>
        </div>
    )
}

export default BlogPage