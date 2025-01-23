import Blog from '@/components/blog/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
};

const BlogPage = () => {
    return (
        <Blog />
    )
}

export default BlogPage