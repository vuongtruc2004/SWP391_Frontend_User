import BlogSlider from '@/components/blog/blog-slider/blog.slider'
import { sendRequest } from '@/utils/fetch.api'
import { apiUrl } from '@/utils/url'

const BlogPage = async () => {
    const blogListResponse = await sendRequest<ApiResponse<PageDetailsResponse<BlogResponse[]>>>({
        url: `${apiUrl}/blogs`,
        queryParams: {
            sort: 'createdAt,desc',
            page: 1,
            size: 6
        }
    });

    console.log(">>> check blog res: ", blogListResponse);

    if (blogListResponse.status !== 200) {
        return null;
    }

    return (
        <BlogSlider blogList={blogListResponse.data.content} />
    )
    // return null;
}

export default BlogPage