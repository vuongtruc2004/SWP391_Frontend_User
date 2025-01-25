import { calculateReadingTime, formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import { Box } from "@mui/material"
import Link from "next/link";

interface IProps {
    blog: BlogResponse;
}
const SingleBlogList = (props: IProps) => {
    const { blog } = props;

    return (
        <Box>
            <div style={{
                background: '#60a5fa',
                width: '100%',
                height: '250px',
                borderRadius: '30px',
                cursor: 'pointer',
                backgroundImage: `url(${storageUrl}/blog/${blog.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} />

            <Box sx={{
                color: 'white'
            }}>
                <Link href={"/home"} className="block font-semibold mt-2 hover:underline" style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                }}>{blog.title}</Link>

                <p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    color: '#adb5bd',
                    fontSize: '14px',
                    marginBlock: '4px'
                }}>
                    {blog.content}
                </p>

                <div className="flex items-center gap-x-2 text-blue-500 text-sm">
                    <p className="text-green-400">Đăng bởi:</p>
                    <Link href={"/home"} className="hover:underline">{blog.user.fullname}</Link>
                </div>

                <div className="flex items-center gap-x-2 text-sm text-purple-300">
                    <p>{formatCreateDate(blog.createdAt)}</p>
                    <p>•</p>
                    <p>{calculateReadingTime(blog.content)}</p>
                </div>
            </Box>
        </Box>
    )
}

export default SingleBlogList