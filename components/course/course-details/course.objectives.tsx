import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';

const CourseObjectives = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-2">{course.courseName}</h1>
            <p className="text-gray-300">{course.description}</p>
            <h2 className="text-xl font-semibold mt-5 mb-1 flex items-center gap-x-1">I. Mục tiêu của khóa học</h2>

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
        </>
    )
}

export default CourseObjectives