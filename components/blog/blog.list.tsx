'use client'
import { Box, Pagination } from "@mui/material"
import SingleBlogList from "./single.blog.list"

interface IProps {
    page: PageDetailsResponse<BlogResponse[]>;
}
const BlogList = (props: IProps) => {
    const { page } = props;

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(">>> current page: ", value);
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
                        <SingleBlogList key={blog.blogId} blog={blog} />
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