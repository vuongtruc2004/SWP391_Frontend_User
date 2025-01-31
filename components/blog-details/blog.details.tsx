'use client'
import { calculateReadingTime, formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import { Avatar, Box, Button, Divider } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import AlignHorizontalLeftOutlinedIcon from '@mui/icons-material/AlignHorizontalLeftOutlined';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
    blog: BlogResponse;
}
const BlogDetails = (props: IProps) => {
    const { blog } = props;
    const router = useRouter();
    const avatarSrc = blog?.user.accountType === "CREDENTIALS" ?
        `${storageUrl}/avatar/${blog.user.avatar}` : blog?.user.avatar;

    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            padding: '40px 20px'
        }}>
            <div className="flex items-center justify-between">
                <Button onClick={() => router.back()} sx={{ textTransform: 'none' }} variant="contained" startIcon={<ReplyAllOutlinedIcon />}>Trở lại</Button>
                <Link href={"/blog"}>
                    <Button sx={{ textTransform: 'none' }} variant="contained" startIcon={<AlignHorizontalLeftOutlinedIcon />}>Xem tất cả bài viết</Button>
                </Link>
            </div>

            <h1 className="text-2xl font-semibold mt-10">{blog.title}</h1>
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