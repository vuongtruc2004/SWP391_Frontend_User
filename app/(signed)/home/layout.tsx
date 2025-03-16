import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Trang chủ",
};

const HomeLayout = ({ children, blog, subject, course }: { children: React.ReactNode, blog: React.ReactNode, subject: React.ReactNode, course: React.ReactNode }) => {
    return (
        <div className='flex flex-col pb-10'>
            {children}
            {blog}
            {subject}
            {course}
        </div>
    )
}

export default HomeLayout