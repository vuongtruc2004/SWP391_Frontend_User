import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BlogList from '@/components/blog/blog.list';
import BlogSearch from '@/components/blog/blog.search';
import SingleBlogList from '@/components/blog/single.blog';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

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
    const session = await getServerSession(authOptions);
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

    let blogListResponse;
    if (category === 'all') {
        blogListResponse = sendRequest<ApiResponse<PageDetailsResponse<BlogResponse[]>>>({
            url: `${apiUrl}/blogs?${queryParams}`,
        });
    } else {
        blogListResponse = sendRequest<ApiResponse<PageDetailsResponse<BlogResponse[]>>>({
            url: `${apiUrl}/blogs?${queryParams}`,
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        });
    }

    const pinnedBlogResponse = sendRequest<ApiResponse<BlogResponse>>({
        url: `${apiUrl}/blogs/pinned`
    });

    const [blogListData, pinnedBlogData] = await Promise.all([blogListResponse, pinnedBlogResponse]);

    if (blogListData.status !== 200) {
        console.log(">>> check response: ", blogListData);
        throw new Error("Không thể lấy dữ liệu các bài viết!");
    }

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
                {pinnedBlogData.status === 200 && <SingleBlogList blog={pinnedBlogData.data} lineClamp={5} imageHeight={300} priority={true} />}
            </Box>
            <BlogSearch category={category} totalElements={blogListData.data.totalElements ?? 0} />
            <BlogList page={blogListData.data} />
        </Box>
    )
}

export default BlogPage