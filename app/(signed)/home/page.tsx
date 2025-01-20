import Banner from '@/components/banner/banner';
import BlogSlider from '@/components/blog-slider/blog.slider';
import CourseSlider from '@/components/course-slider/course.slider';
import Header from '@/components/header/header';
import SubjectList from '@/components/subject-list/subject.list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Trang chủ",
};

const HomePage = () => {
    return (
        <div className='min-h-screen bg-black pb-10'>
            <Header />
            <Banner />
            <BlogSlider />
            <SubjectList />
            <CourseSlider />
        </div>
    )
}

export default HomePage