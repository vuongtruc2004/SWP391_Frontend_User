import CourseCartButton from '@/features/course/course-details/course.cart.button';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const CourseTooltip = ({ course }: { course: CourseResponse }) => {
    return (
        <div className='bg-[#171717] p-5'>
            <h1 className='font-semibold text-xl'>{course.courseName}</h1>

            <p className='text-base text-gray-300 mt-1 mb-2 line-clamp-2'>{course.description}</p>
            <ul className='flex flex-col gap-y-2 mb-5'>
                {course.objectives.map((item, index) => {
                    return (
                        <li key={item + index} className='flex items-center gap-x-3 text-base'>
                            <CheckOutlinedIcon sx={{ fontSize: '1.2rem' }} className='text-green-500' />
                            <p>{item}</p>
                        </li>
                    )
                })}
            </ul>
            <CourseCartButton course={course} />
        </div>
    )
}

export default CourseTooltip