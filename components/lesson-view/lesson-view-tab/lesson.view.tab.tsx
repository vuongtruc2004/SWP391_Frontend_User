'use client'
import { useState } from 'react';
import CourseDetails from './course.details';
import CourseRating from './course.rating';
import { TabsStyled, TabStyled } from '../style';
import { useCourseView } from '@/wrapper/course-view/course.view.wrapper';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}>
            {value === index && <>{children}</>}
        </div>
    );
}

const LessonViewTab = () => {
    const [value, setValue] = useState(0);
    const { currentPlayIndex, lectures } = useCourseView();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if ("plainContent" in lectures[currentPlayIndex]) {
        return null;
    }

    return (
        <>
            <div className='my-3'>
                <TabsStyled value={value} onChange={handleChange}>
                    <TabStyled label="Tổng quan về khóa học" />
                    <TabStyled label="Đánh giá" />
                    <TabStyled label="Tài liệu đọc thêm" />
                    <TabStyled label="Hỗ trợ" />
                </TabsStyled>
            </div>

            <CustomTabPanel value={value} index={0}>
                <CourseDetails />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CourseRating />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Tài liệu
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Hỗ trợ
            </CustomTabPanel>
        </>
    );
}

export default LessonViewTab;
