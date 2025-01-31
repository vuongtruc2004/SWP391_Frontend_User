import { Box, Button, Chip, LinearProgress } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link'
import FacebookCircularProgress, { BorderLinearProgress } from './custom.progress';
import { storageUrl } from '@/utils/url';
import Image from 'next/image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { formatPrice, getOriginalPrice } from '@/helper/course.helper';
import { formatCreateDate } from '@/helper/blog.helper';

interface IProps {
    course: CourseResponse;
}
const SingleCourseSlider = (props: IProps) => {
    const { course } = props;
    const status = ['not buy', 'not start', 'studying', 'completed'];
    const current = status[0];
    return (
        <Box sx={{
            borderRadius: '4px',
            bgcolor: 'black',
            color: 'white',
        }}>
            <Link href={`/blog/${course.courseId}`} style={{
                display: 'block',
                width: '100%',
                height: `220px`,
                position: 'relative',
            }}>
                <Image src={`${storageUrl}/course/${course.thumbnail}`} alt={course.courseName} fill sizes="(max-width: 1000px) 100vw" style={{
                    objectFit: 'cover',
                    borderRadius: '4px',
                    objectPosition: 'center',
                    cursor: 'pointer'
                }} />
            </Link>
            <Box sx={{
                padding: '20px'
            }}>
                <h1 className='text-xl font-semibold'>{course.courseName}</h1>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    'section': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                    marginBlock: '10px'
                }}>
                    <section className='gap-x-2'>
                        <BorderLinearProgress variant="determinate" value={30} sx={{ flexShrink: 0, width: '180px' }} />
                        <p className='text-purple-500'>30%</p>
                    </section>
                    <section className='transition-all duration-200 gap-x-1 justify-end cursor-pointer text-purple-500 hover:text-green-500'>
                        <PlayArrowIcon />
                        <p>Tiếp tục</p>
                    </section>
                </Box>
                <p
                    className='text-gray-400'
                    style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                    }}
                >
                    {course.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni debitis nisi deserunt odio incidunt possimus. Rem, cupiditate temporibus necessitatibus nostrum tempore repellat laborum, ut quibusdam commodi quisquam et, voluptatibus aut.
                </p>

                <div className='mt-2 text-[15px]'>
                    <div className="flex items-center gap-x-2 text-blue-500">
                        <p className="text-green-400">Giảng viên:</p>
                        <Link href={"/home"} className="hover:underline">{course.expert.user.fullname}</Link>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-gray-300'>Cập nhật lần cuối:</p>
                        <p className='text-purple-300'>{formatCreateDate(course.updatedAt ?? course.createdAt)}</p>
                    </div>
                </div>

                <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-end gap-x-2'>
                        <h1 className='text-xl font-semibold'>{formatPrice(course.price)}đ</h1>
                        <p className='text-sm line-through text-gray-300 italic'>{getOriginalPrice(course.price)}đ</p>
                    </div>
                    <p className='text-sm'>{course.lessons.length} bài giảng</p>
                </div>
            </Box>
        </Box >
    )
}

export default SingleCourseSlider