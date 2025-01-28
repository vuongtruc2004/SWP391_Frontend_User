import InteractOnBlog from "@/components/blog-interact/interact.on.blog";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const InteractPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const id = (await params).id;
    const blogResponse = await sendRequest<ApiResponse<BlogResponse>>({
        url: `${apiUrl}/blogs/${id}`
    });
    console.log(">>> check response: ", blogResponse);
    return (
        <InteractOnBlog blog={blogResponse.data} />
    )
}

export default InteractPage