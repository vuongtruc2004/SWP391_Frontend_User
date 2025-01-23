import { Box } from "@mui/material"
import SingleBlogList from "./single.blog.list"

const BlogList = () => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%%',
            gap: '20px',
            marginTop: '50px'
        }}>
            {Array.from({ length: 6 }).map((_, index) => {
                return (
                    <SingleBlogList key={index} />
                )
            })}
        </Box>
    )
}

export default BlogList