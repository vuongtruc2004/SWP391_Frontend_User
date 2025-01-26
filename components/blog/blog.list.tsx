'use client'
import { Box, Pagination } from "@mui/material"
import SingleBlogList from "./single.blog"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                width: '100%%',
                gap: '20px',
            }}>
                {page.content.map((blog) => {
                    return (
                        <div key={blog.blogId} >
                            <SingleBlogList blog={blog} lineClamp={2} imageHeight={250} />
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
    )
}

export default BlogList