'use client'
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import SingleBlogList from "../../components/blog/single.blog"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogListEmpty from "../../components/blog/blog.list.empty";

const BlogList = ({ page }: { page: PageDetailsResponse<BlogResponse[]> }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        router.replace(`${pathname}?${params}`);
    }

    return (
        <>
            {(page.content && page.content.length) ? (
                <>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        width: '100%',
                        gap: '20px',
                    }}>
                        {page.content.map((blog) => {
                            return (
                                <SingleBlogList blog={blog} key={blog.blogId} />
                            )
                        })}
                    </Box>
                    <Pagination
                        count={page.totalPages}
                        shape="rounded"
                        showFirstButton
                        showLastButton
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px',
                        }}
                        onChange={handleChangePage}
                    />
                </>
            ) : (
                <BlogListEmpty />
            )}
        </>
    )
}

export default BlogList