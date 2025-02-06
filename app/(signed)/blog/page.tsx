import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BlogList from '@/features/blog/blog.list';
import BlogSearch from '@/features/blog/blog.search';
import SingleBlogList from '@/components/blog/single.blog';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Bài viết",
};

const BlogPage = async (props: {
    searchParams: Promise<{
        keyword?: string;
        page?: string;
        category?: string;
        tag_name: string;
    }>
}) => {
    const session = await getServerSession(authOptions);
    const searchParams = await props.searchParams;
    const keyword = searchParams.keyword || ""
    const page = searchParams.page || "1";
    const category = searchParams.category || 'all';
    const tagNameList = searchParams.tag_name || "";

    const queryParams = new URLSearchParams({
        filter: `title ~ '${keyword}' or plainContent ~ '${keyword}' or user.fullname ~ '${keyword}'`,
        page: page,
        size: '6',
        category: category,
        tag_name: tagNameList
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
        if (blogListData.status === 401) {
            redirect("/blog");
        }
        throw new Error(blogListData.message.toString());
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
            <BlogSearch
                category={category}
                keyword={keyword}
                tag_name={tagNameList}
                totalElements={blogListData.data.totalElements ?? 0}
            />
            <BlogList page={blogListData.data} />
        </Box>
    )
}

export default BlogPage