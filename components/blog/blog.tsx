'use client'
import { useState } from 'react'
import BlogSearch from './blog.search'
import BlogList from './blog.list';
import { Box } from '@mui/material';
import PinBlog from './pin.blog';

const Blog = () => {
    const [currentFilter, setCurrentFilter] = useState('all');

    return (
        <Box sx={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <PinBlog />
            <BlogSearch currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
            <BlogList />
        </Box>
    )
}

export default Blog