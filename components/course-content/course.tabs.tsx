'use client'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import CourseContent from "./course.content";
import { CustomTabPanel } from "./style";

const CourseTabs = ({ course }: { course: CourseDetailsResponse }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', paddingInline: '20px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} textColor="primary">
                    <Tab label="Nội dung khóa học" />
                    <Tab label="Đánh giá" />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <CourseContent course={course} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </Box>
    )
}

export default CourseTabs