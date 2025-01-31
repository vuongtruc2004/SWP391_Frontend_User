import BlogDetails from "@/components/blog-details/blog.details";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const DetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const id = (await params).id;
    const blogResponse = await sendRequest<ApiResponse<BlogResponse>>({
        url: `${apiUrl}/blogs/${id}`
    });
    return (
        <BlogDetails blog={blogResponse.data} />
    )
}

export default DetailsPage