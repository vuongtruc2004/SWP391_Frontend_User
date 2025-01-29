'use client'
import { formatCreateDate } from "@/helper/blog.helper";
import { storageUrl } from "@/utils/url";
import { Box, Button } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
    blogList: BlogResponse[];
    currentId: number;
}
const BlogSuggest = (props: IProps) => {
    const { blogList, currentId } = props;
    const router = useRouter();
    const suggestList: BlogResponse[] = blogList.filter(blog => blog.blogId !== currentId);
    const hashtags: HashtagResponse[] = blogList.find(blog => blog.blogId === currentId)?.hashtags || [];

    const findBlogsByHashtag = (tagName: string) => {
        router.push(`/blog?tag_name=${tagName}`);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
        }}>
            <div className="bg-black px-5 py-10 rounded-md">
                <h1 className="text-lg font-semibold mb-5">Hashtags</h1>
                <ul className="flex flex-wrap items-center gap-1">
                    {hashtags.map(tag => {
                        return (
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                sx={{
                                    fontSize: '14px',
                                    paddingInline: '16px'
                                }}
                                key={tag.tagId}
                                onClick={() => findBlogsByHashtag(tag.tagName)}
                            >
                                {tag.tagName}
                            </Button>
                        )
                    })}
                </ul>
            </div>

            <div className="bg-black px-5 py-10 rounded-md">
                <h1 className="text-lg font-semibold mb-5">Xem thêm các bài viết của tác giả</h1>
                <ul className="flex flex-col gap-y-5">
                    {suggestList?.map(blog => {
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
        </Box>
    )
}

export default BlogSuggest