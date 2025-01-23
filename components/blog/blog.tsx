'use client'
import { useState } from 'react'
import BlogSearch from './blog.search'
import BlogList from './blog.list';
import { Box } from '@mui/material';

const Blog = () => {
    const [currentFilter, setCurrentFilter] = useState('all');

    return (
        <Box sx={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <BlogSearch currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
            <BlogList />
        </Box>
    )
}

export default Blog