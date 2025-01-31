import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Trang chủ",
};

const HomeLayout = ({ children, blog, subject, course }: { children: React.ReactNode, blog: React.ReactNode, subject: React.ReactNode, course: React.ReactNode }) => {
    return (
        <>
            {children}
            {blog}
            {subject}
            {course}
        </>
    )
}

export default HomeLayout