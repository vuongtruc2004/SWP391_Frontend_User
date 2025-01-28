import { formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import { Box, Button } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from "next/image";
import Link from "next/link";

interface IProps {
    blogList: BlogResponse[];
}
const BlogSuggest = (props: IProps) => {
    const { blogList } = props;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
        }}>
            <div className="bg-black px-5 py-10 rounded-md">
                <h1 className="text-lg font-semibold mb-5">Xem thêm các bài viết của tác giả</h1>
                <ul className="flex flex-col gap-y-5">
                    {blogList?.map(blog => {
                        return (
                            <li key={blog.blogId} className="flex items-center gap-x-3">
                                <Link href={`/blog/${blog.blogId}`} style={{
                                    display: 'block',
                                    width: '100px',
                                    height: `100px`,
                                    position: 'relative',
                                    flexShrink: 0
                                }}>
                                    <Image src={`${storageUrl}/blog/${blog.thumbnail}`} alt={blog.title} fill sizes="(max-width: 1000px) 100vw" style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                    }} />
                                </Link>
                                <div>
                                    <Link href={`/blog/${blog.blogId}`} className="text-sm font-semibold hover:underline">{blog.title}</Link>
                                    <section className="flex items-center gap-x-1 text-gray-400 mt-2">
                                        <AccessTimeIcon sx={{ fontSize: '1.25rem' }} />
                                        <p className="text-[0.8125rem]">{formatCreateDate(blog.createdAt)}</p>
                                    </section>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="bg-black p-5 rounded-md flex items-center justify-center gap-x-5">
                <Button variant="text" color="primary" startIcon={<ChevronLeftIcon />}>Bài viết trước</Button>
                <Button variant="text" color="primary" endIcon={<ChevronRightIcon />}>Bài viết tiếp</Button>
            </div>
        </Box>
    )
}

export default BlogSuggest