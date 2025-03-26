import BlogSuggest from "@/features/blog/blog.suggest";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const SuggestPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const slug = (await params).slug;
    const id = slug.split("-").pop() || "";
    const blogListResponse = await sendRequest<ApiResponse<PageDetailsResponse<BlogResponse[]>>>({
        url: `${apiUrl}/blogs/author`,
        queryParams: {
            blogId: id,
            page: 1,
            size: 5,
            sort: 'createdAt,asc'
        }
    });

    if (blogListResponse.status !== 200) {
        return <div />;
    }
    return (
        <BlogSuggest blogList={blogListResponse.data.content} currentId={Number(id)} />
    )
}

export default SuggestPage