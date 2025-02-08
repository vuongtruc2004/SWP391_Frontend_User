import Box from "@mui/material/Box";
import Image from "next/image";

const BlogListEmpty = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
        }}>
            <Image src="/empty.svg" alt="empty box" width={60} height={60} />
            <p className="text-white text-sm">Không có bài viết nào để hiển thị</p>
        </Box>
    )
}

export default BlogListEmpty