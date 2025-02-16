'use client'
import { calculateReadingTime, formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import Link from "next/link";
import Image from "next/image";

const BlogDetails = ({ blog }: { blog: BlogResponse }) => {
    const avatarSrc = blog?.user?.avatar?.startsWith("http") ? blog?.user?.avatar : `${storageUrl}/avatar/${blog?.user?.avatar}`;

    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            padding: '40px 20px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        }}>
            <h1 className="text-2xl font-semibold">{blog.title}</h1>
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
                    <Avatar src={avatarSrc} sx={{ width: '24px', height: '24px' }} alt="avatar">
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