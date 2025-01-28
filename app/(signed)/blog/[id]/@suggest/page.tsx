import BlogSuggest from "@/components/blog-details/blog.suggest";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const SuggestPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const id = (await params).id;
    const blogListResponse = await sendRequest<ApiResponse<PageDetailsResponse<BlogResponse[]>>>({
        url: `${apiUrl}/blogs/author`,
        queryParams: {
            blogId: id,
            page: 1,
            size: 3,
            sort: 'createdAt,asc'
        }
    });
    return (
        <BlogSuggest blogList={blogListResponse.data.content} />
    )
}

export default SuggestPage