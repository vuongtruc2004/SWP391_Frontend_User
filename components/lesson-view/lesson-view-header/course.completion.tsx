import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { FacebookCircularProgress } from "../style";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Popover } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCoursePurchased } from '@/wrapper/course-purchased/course.purchased.wrapper';
import { getNumberOfDocuments, getNumberOfVideos } from '@/helper/course.details.helper';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const CourseCompletion = ({ course }: { course: CourseDetailsResponse }) => {
    const { purchasedCourses, loading } = useCoursePurchased();
    const [percentageAnchorEl, setPercentageAnchorEl] = useState<HTMLElement | null>(null);
    const [percentage, setPercentage] = useState<number>(-1);
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        if (!loading) {
            const completionPercentage = purchasedCourses.find((purchasedCourse) => purchasedCourse.courseId === course.courseId)?.completionPercentage;
            const totalCompletionVideosAndDocuments = purchasedCourses.find((purchasedCourse) => purchasedCourse.courseId === course.courseId)?.totalCompletionVideosAndDocuments;

            if (completionPercentage !== undefined) {
                setPercentage(completionPercentage);
            }
            if (totalCompletionVideosAndDocuments) {
                setCompletion(totalCompletionVideosAndDocuments);
            }
        }
    }, [purchasedCourses, loading]);

    return (
        <>
            <div onClick={(e) => setPercentageAnchorEl(e.currentTarget)} className="flex items-center gap-x-3 cursor-pointer text-sm hover:text-blue-500 transition-all duration-150">
                <div className="w-[32px] h-[32px] relative">
                    <FacebookCircularProgress variant="determinate" value={percentage} />
                    <EmojiEventsIcon sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        fontSize: '1rem',
                        color: percentage === 100 ? '#faaf00' : '#6c757d'
                    }} />
                </div>
                <p>Tiến độ của bạn <span><ArrowDropDownIcon /></span></p>
            </div>

            <Popover
                aria-hidden={false}
                open={Boolean(percentageAnchorEl)}
                anchorEl={percentageAnchorEl}
                onClose={() => setPercentageAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className="p-5 bg-[#101010] max-w-[380px]">
                    {percentage === 0 ? (
                        <>
                            <p className="font-semibold flex items-center gap-x-3 mb-3"><PlayArrowIcon />Bạn đã hoàn thành 0/{getNumberOfVideos(course) + getNumberOfDocuments(course)}</p>
                            <p className="text-gray-300">Hãy bắt đầu ngay hôm nay để chinh phục khóa học và nâng cao kỹ năng của bạn!</p>
                        </>
                    ) : (
                        percentage === 100 ? (
                            <>
                                <p className="font-semibold flex items-center gap-x-3 mb-3"><DoneAllIcon className='text-green-500' />Bạn đã hoàn thành khóa học</p>
                                <p className="text-gray-300">Chúc mừng! Bạn đã hoàn thành khóa học. Đừng quên áp dụng kiến thức vào thực tế để đạt hiệu quả tốt nhất.</p>
                            </>
                        ) : (
                            <>
                                <p className="font-semibold flex items-center gap-x-3 mb-3"><PlayArrowIcon className='text-purple-300' />Bạn đã hoàn thành {completion}/{getNumberOfVideos(course) + getNumberOfDocuments(course)}</p>
                                <p className="text-gray-300">Bạn đang tiến bộ! Tiếp tục học để chinh phục toàn bộ khóa học và nắm vững kiến thức.</p>
                            </>
                        )
                    )}
                </div>
            </Popover>
        </>
    )
}

export default CourseCompletion