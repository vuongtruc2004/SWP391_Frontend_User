'use client'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import CourseContent from '@/components/course/course-content/course.content';
import CourseRate from './course.rate';

function CustomTabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default function CourseTabs({ course }: { course: CourseDetailsResponse }) {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Nội dung khóa học" />
                    <Tab label="Đánh giá về khóa học" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CourseContent course={course} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CourseRate course={course} />
            </CustomTabPanel>
        </Box>
    );
}
