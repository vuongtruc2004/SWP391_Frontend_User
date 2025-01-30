import { Box, Button, Chip } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link'
import FacebookCircularProgress from './facebook.circular.progress';
import { storageUrl } from '@/utils/url';
import Image from 'next/image';

interface IProps {
    course: CourseResponse;
}
const SingleCourseSlider = (props: IProps) => {
    const { course } = props;

    return (
        <Box sx={{
            borderRadius: '6px',
            '.mui-1txyin7-MuiLinearProgress-root': {
                bgcolor: '#ced4da'
            },
            '.mui-19m61dl-MuiChip-label': {
                paddingInline: '15px',
                fontSize: '11px'
            },
        }}>
            <div className='relative'>
                <Link href={`/blog/${course.courseId}`} style={{
                    display: 'block',
                    width: '100%',
                    height: `220px`,
                    position: 'relative',
                }}>
                    <Image src={`${storageUrl}/course/${course.thumbnail}`} alt={course.courseName} fill sizes="(max-width: 1000px) 100vw" style={{
                        objectFit: 'cover',
                        borderRadius: '6px',
                        objectPosition: 'center',
                        cursor: 'pointer'
                    }} />
                </Link>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                    background: 'white',
                    position: 'absolute',
                    left: '10px',
                    bottom: '10px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '14px'
                }}>
                    <GroupsIcon />
                    <p>{course.totalPurchased}</p>
                </Box>
            </div>

            <div className='p-5 text-white'>
                <Link href={"/test"} className='font-semibold hover:underline'>{course.courseName}</Link>
                <ul className='flex items-center gap-x-3 mt-1'>
                    <li>
                        <Chip size='small' variant="outlined" color="success" label="Java" />
                    </li>
                    <li>
                        <Chip size='small' variant="outlined" color="warning" label="HTML" />
                    </li>
                    <li>
                        <Chip size='small' variant="outlined" color="info" label="CSS" />
                    </li>
                </ul>
                <div>
                    <div className='flex items-center justify-between mt-2'>
                        <div>
                            <p className='text-gray-500 text-sm'>Giảm giá 30%</p>
                            <div className='flex items-center gap-x-3'>
                                <p className='text-red-500 italic line-through'>300.000đ</p>
                                <p>{course.price}đ</p>
                            </div>
                        </div>
                        <Button sx={{ textTransform: 'capitalize', marginTop: '10px' }} size='small' variant='outlined' color='primary'>Mua Ngay</Button>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default SingleCourseSlider