import BlogDetails from "@/components/blog/blog-details/blog.details";
import InteractOnBlog from "@/features/blog/blog-details/interact.on.blog";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

const DetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const slug = (await params).slug;
    const id = slug.split("-").pop() || "";
    const blogResponse = await sendRequest<ApiResponse<BlogResponse>>({
        url: `${apiUrl}/blogs/${id}`,
    });

    if (blogResponse.status !== 200) {
        throw new Error(blogResponse.message.toString());
    }

    return (
        <div className="flex flex-col gap-y-5">
            <BlogDetails blog={blogResponse.data} />
            <InteractOnBlog blog={blogResponse.data} />
        </div>
    )
}

export default DetailsPage