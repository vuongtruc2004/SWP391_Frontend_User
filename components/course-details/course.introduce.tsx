import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import { getNumberOfDocuments, getNumberOfVideos } from "@/helper/course.details.helper";

const CourseIntroduce = ({ course }: { course: CourseResponse }) => {
    return (
        <Box sx={{
            bgcolor: 'black',
            padding: '20px',
            borderRadius: '6px'
        }}>
            <h1 className="text-2xl font-semibold mb-2">{course.courseName}</h1>
            <p className="text-gray-300">{course.description}</p>
            <h2 className="text-xl font-semibold mt-5 mb-1">Mục tiêu của khóa học</h2>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                'p': {
                    color: '#d1d5dc'
                }
            }}>
                {course?.objectives.map((item, index) => {
                    return (
                        <div className="flex items-center gap-x-3" key={index + "_" + item}>
                            <CheckIcon sx={{ color: '#05df72' }} />
                            <p>{item}</p>
                        </div>
                    )
                })}
            </Box>

            <h2 className="text-xl font-semibold mt-5 mb-1">Nội dung khóa học</h2>

            <div className="flex items-center justify-between text-gray-300">
                <div className="flex items-center gap-x-2">
                    <p>{course?.lessons.length} chương</p>
                    <p className="text-white">•</p>
                    <p>{getNumberOfVideos(course)} bài giảng</p>
                    <p className="text-white">•</p>
                    <p>{getNumberOfDocuments(course)} bài đọc</p>
                    <p className="text-white">•</p>
                    <p>{0} bài kiểm tra</p>
                </div>
                <p className="text-blue-500 hover:text-blue-400 cursor-pointer">
                    Mở rộng tất cả
                </p>
            </div>

            <div className="h-screen"></div>
        </Box>
    )
}

export default CourseIntroduce