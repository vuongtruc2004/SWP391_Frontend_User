'use client'
import { Box, Pagination } from "@mui/material"
import SingleBlogList from "../../components/blog/single.blog"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogListEmpty from "../../components/blog/blog.list.empty";

interface IProps {
    page: PageDetailsResponse<BlogResponse[]>;
}
const BlogList = (props: IProps) => {
    const { page } = props;
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
                        width: '100%%',
                        gap: '20px',
                    }}>
                        {page.content.map((blog) => {
                            return (
                                <div key={blog.blogId}>
                                    <SingleBlogList blog={blog} lineClamp={2} imageHeight={250} priority={false} />
                                </div>
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