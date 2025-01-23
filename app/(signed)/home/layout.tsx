import Banner from '@/components/banner/banner';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Trang chủ",
};

const HomeLayout = ({ blog, subject, course }: { blog: React.ReactNode, subject: React.ReactNode, course: React.ReactNode }) => {
    return (
        <>
            <Banner />
            {blog}
            {subject}
            {course}
        </>
    )
}

export default HomeLayout