import { calculateReadingTime, slugifyText } from '@/helper/blog.helper';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import Image from 'next/image';
import { storageUrl } from '@/utils/url';
import { Divider } from '@mui/material';
import { formatDate } from '@/utils/format';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const SingleBlogSlider = ({ blog }: { blog: BlogResponse; }) => {
    return (
        <Box sx={{
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '55% 45%',
            background: 'black',
            width: '700px',
            borderRadius: '6px',
            boxShadow: '-2px -2px 5px rgba(0,0,0,0.5)'
        }}>
            <Box sx={{
                display: 'block',
                width: '100%',
                height: `280px`,
                position: 'relative',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,3) 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0) 100%)',
            }}>
                <Image src={`${storageUrl}/blog/${blog.thumbnail}`} alt={blog.title} fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                    objectFit: 'cover',
                    borderRadius: '6px',
                    objectPosition: 'center',
                }} />
            </Box>
            <Box sx={{
                color: 'white',
                padding: '20px'
            }}>
                <Link href={`/blog/${slugifyText(blog.title + "-" + blog.blogId)}`} className="transition-all duration-200 font-semibold hover:underline hover:text-blue-500 line-clamp-1">
                    {blog.title}
                </Link>

                <div className='line-clamp-3 my-1 text-sm text-gray-300'>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            img: () => null,
                        }}
                    >
                        {blog.content}
                    </Markdown>
                </div>

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
            </Box>
        </Box>
    )
}

export default SingleBlogSlider