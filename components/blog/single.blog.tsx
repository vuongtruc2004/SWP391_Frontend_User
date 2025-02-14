import { calculateReadingTime, formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Link from "next/link";

const SingleBlogList = ({ blog }: { blog: BlogResponse }) => {
    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
        }}>
            <Link href={`/blog/${blog.blogId}`} style={{
                display: 'block',
                width: '100%',
                height: `220px`,
                position: 'relative',
            }}>
                <Image src={`${storageUrl}/blog/${blog.thumbnail}`} alt={blog.title} fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                    objectFit: 'cover',
                    borderRadius: '6px',
                    objectPosition: 'center',
                    cursor: 'pointer'
                }} />
            </Link>
            <Box sx={{
                color: 'white',
                padding: '20px'
            }}>
                <Link href={`/blog/${blog.blogId}`} className="transition-all duration-200 font-semibold hover:underline hover:text-blue-500 line-clamp-1">{blog.title}</Link>

                <div className="line-clamp-3 text-sm my-1 text-gray-300" dangerouslySetInnerHTML={{ __html: blog.content }} />

                <div className="flex items-center gap-x-2 text-blue-500 text-sm">
                    <p className="text-green-400">Đăng bởi:</p>
                    <Link href={"/home"} className="hover:underline">{blog.user.fullname}</Link>
                </div>

                <div className="flex items-center gap-x-2 text-sm text-purple-300">
                    <p>{formatCreateDate(blog.createdAt)}</p>
                    <p>•</p>
                    <p>{calculateReadingTime(blog.content)}</p>
                </div>

                <Divider sx={{ marginBlock: '10px' }} />

                <Link href={`/blog/${blog.blogId}`}>
                    <Button variant="outlined" color="primary" endIcon={<ChevronRightIcon />} fullWidth>
                        Xem chi tiết
                    </Button>
                </Link>
            </Box >
        </Box>
    )
}

export default SingleBlogList