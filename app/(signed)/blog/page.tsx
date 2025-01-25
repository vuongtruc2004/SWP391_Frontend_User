import BlogList from '@/components/blog/blog.list';
import BlogSearch from '@/components/blog/blog.search';
import PinBlog from '@/components/blog/pin.blog';
import { apiUrl } from '@/utils/url';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
};

const BlogPage = async (props: {
    searchParams: Promise<{
        filter?: string;
        page?: string;
        size?: string;
        category?: string;
    }>
}) => {
    const searchParams = await props.searchParams;
    const filter = searchParams.filter;
    const page = searchParams.page;
    const size = searchParams.size
    const category = searchParams.category;

    const queryParams = new URLSearchParams({
        filter: filter || '',
        page: page || '1',
        size: size || '6',
        category: category || 'all'
    }).toString();

    const responseRaw = await fetch(`${apiUrl}/blogs?${queryParams}`)
    const response: ApiResponse<PageDetailsResponse<BlogResponse[]>> = await responseRaw.json();

    if (response.status === 200) {
    } else {
        throw new Error("Không thể lấy dữ liệu các bài viết!");
    }

    return (
        <Box sx={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <PinBlog />
            <BlogSearch />
            <BlogList page={response.data} />
        </Box>
    )
}

export default BlogPage