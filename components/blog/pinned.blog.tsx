import { calculateReadingTime, slugifyText } from "@/helper/blog.helper";
import { formatDate } from "@/utils/format";
import { storageUrl } from "@/utils/url";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Link from "next/link";

const PinnedBlog = ({ blog }: { blog: BlogResponse }) => {
    return (
        <>
            <Link href={`/blog/${slugifyText(blog.title + "-" + blog.blogId)}`} style={{
                display: 'block',
                width: '100%',
                height: `300px`,
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
                <Link href={`/blog/${slugifyText(blog.title + "-" + blog.blogId)}`} className="transition-all duration-200 font-semibold hover:underline hover:text-blue-500 line-clamp-1">
                    📌
                    {blog.title}
                </Link>

                <div className="line-clamp-5 text-sm my-1 text-gray-300" dangerouslySetInnerHTML={{ __html: blog.content }} />

                <div className="flex items-center gap-x-2 text-blue-500 text-sm">
                    <p className="text-green-400">Đăng bởi:</p>
                    <Link href={"/home"} className="hover:underline">{blog.user.fullname}</Link>
                </div>

                <div className="flex items-center gap-x-2 text-sm text-purple-300">
                    <p>{formatDate(blog.createdAt)}</p>
                    <p>•</p>
                    <p>{calculateReadingTime(blog.content)} phút đọc</p>
                </div>

                <Divider sx={{ marginBlock: '10px' }} />

                <Link href={`/blog/${slugifyText(blog.title + "-" + blog.blogId)}`}>
                    <Button variant="outlined" color="primary" endIcon={<ChevronRightIcon />} fullWidth>
                        Xem chi tiết
                    </Button>
                </Link>
            </Box >
        </>
    )
}

export default PinnedBlog