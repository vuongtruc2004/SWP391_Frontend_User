import BlogList from '@/components/blog/blog.list';
import BlogSearch from '@/components/blog/blog.search';
import SingleBlogList from '@/components/blog/single.blog';
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
    const category = searchParams.category || 'all';

    const queryParams = new URLSearchParams({
        filter: filter || '',
        page: page || '1',
        size: size || '6',
        category: category
    }).toString();

    const blogListRawResponse = await fetch(`${apiUrl}/blogs?${queryParams}`);
    const blogListResponse: ApiResponse<PageDetailsResponse<BlogResponse[]>> = await blogListRawResponse.json();

    if (blogListResponse.status === 200) {
    } else {
        throw new Error("Không thể lấy dữ liệu các bài viết!");
    }

    const pinnedBlogRawResponse = await fetch(`${apiUrl}/blogs/pinned`);
    const pinnedBlogResponse: ApiResponse<BlogResponse> = await pinnedBlogRawResponse.json();

    return (
        <Box sx={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                alignItems: 'center',
                columnGap: '20px',
                paddingTop: '120px'
            }}>
                {pinnedBlogResponse.status === 200 && <SingleBlogList blog={pinnedBlogResponse.data} lineClamp={5} imageHeight={300} />}
            </Box>
            <BlogSearch category={category} totalElements={blogListResponse.data.totalElements} />
            <BlogList page={blogListResponse.data} />
        </Box>
    )
}

export default BlogPage