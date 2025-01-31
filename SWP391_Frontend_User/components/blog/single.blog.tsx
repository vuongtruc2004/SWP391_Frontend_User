import { calculateReadingTime, formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import { Box } from "@mui/material"
import Image from "next/image";
import Link from "next/link";

interface IProps {
    blog: BlogResponse;
    lineClamp: number;
    imageHeight: number;
    priority: boolean;
}
const SingleBlogList = (props: IProps) => {
    const { blog, lineClamp, imageHeight, priority } = props;

    return (
        <>
            <Link href={`/blog/${blog.blogId}`} style={{
                display: 'block',
                width: '100%',
                height: `${imageHeight}px`,
                position: 'relative',
            }}>
                <Image src={`${storageUrl}/blog/${blog.thumbnail}`} alt={blog.title} fill sizes="(max-width: 1000px) 100vw" priority={priority} style={{
                    objectFit: 'cover',
                    borderRadius: '20px',
                    objectPosition: 'center',
                    cursor: 'pointer'
                }} />
            </Link>
            <Box sx={{
                color: 'white'
            }}>
                <Link href={`/blog/${blog.blogId}`} className="block font-semibold mt-2 hover:underline" style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                }}>{blog.title}</Link>

                <div style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: lineClamp,
                    color: '#adb5bd',
                    fontSize: '14px',
                    marginBlock: '4px'
                }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="flex items-center gap-x-2 text-blue-500 text-sm">
                    <p className="text-green-400">Đăng bởi:</p>
                    <Link href={"/home"} className="hover:underline">{blog.user.fullname}</Link>
                </div>

                <div className="flex items-center gap-x-2 text-sm text-purple-300">
                    <p>{formatCreateDate(blog.createdAt)}</p>
                    <p>•</p>
                    <p>{calculateReadingTime(blog.content)}</p>
                </div>
            </Box >
        </>
    )
}

export default SingleBlogList