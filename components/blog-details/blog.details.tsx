import { calculateReadingTime, formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import { Avatar, Box, Divider } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import Link from "next/link";
import Image from "next/image";

interface IProps {
    blog: BlogResponse;
}
const BlogDetails = (props: IProps) => {
    const { blog } = props;
    const avatarSrc = blog?.user.accountType === "CREDENTIALS" ?
        `${storageUrl}/avatar/${blog.user.avatar}` : blog?.user.avatar;

    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            padding: '40px 20px'
        }}>
            <Link href={"/blog"} className="transition-all duration-300 bg-[#dd397b] hover:bg-rose-600 px-4 py-2 rounded-md">Xem tất cả bài viết</Link>
            <h1 className="text-2xl font-semibold mt-5">{blog.title}</h1>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '16px',
                'section': {
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '8px',
                    fontSize: '0.8125rem',
                    'p': {
                        color: '#ced4da'
                    }
                },
                marginBlock: '10px 28px'
            }}>
                <section>
                    <Avatar src={avatarSrc} sx={{ width: '24px', height: '24px' }}>
                        {blog.user.fullname?.charAt(0).toUpperCase() || "N"}
                    </Avatar>
                    <p>Đăng bởi <Link href={"/"} className="text-[#e9ecef] font-bold hover:underline">{blog.user.fullname}</Link></p>
                </section>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: '#6c757d', height: '16px' }} />

                <section>
                    <AccessTimeIcon sx={{ fontSize: '1.35rem' }} />
                    <p>{formatCreateDate(blog.createdAt)}</p>
                </section>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: '#6c757d', height: '16px' }} />

                <section>
                    <LocalLibraryOutlinedIcon sx={{ fontSize: '1.35rem' }} />
                    <p>{calculateReadingTime(blog.content)}</p>
                </section>
            </Box>

            <div className="w-full h-[300px] relative">
                <Image src={`${storageUrl}/blog/${blog.thumbnail}`} alt={blog.title} fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                    objectFit: 'cover',
                    borderRadius: '6px',
                    objectPosition: 'center',
                }} />
            </div>

            <div style={{
                color: '#fff',
                marginTop: '28px'
            }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </Box>
    )
}

export default BlogDetails