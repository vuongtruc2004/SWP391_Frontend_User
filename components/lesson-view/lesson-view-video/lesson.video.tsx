'use client'
import { formatCreateDate } from "@/helper/blog.helper"
import { Box, Divider } from "@mui/material"
import Link from "next/link";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getVideoIdFromUrl } from "@/helper/course.details.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";

const LessonVideo = () => {
    const { currentPlayIndex, setCurrentPlayIndex, course, lectures } = useCourseView();

    const handleNextLecture = () => {
        if (currentPlayIndex < lectures.length - 1) {
            setCurrentPlayIndex(prev => prev + 1);
        }
    };

    const handlePrevLecture = () => {
        if (currentPlayIndex > 0) {
            setCurrentPlayIndex(prev => prev - 1);
        }
    }

    return (
        <Box sx={{
            'iframe': {
                width: '100%',
                height: '100%',
                borderRadius: '6px',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                aspectRatio: 16 / 9,
            }
        }}>
            <div className="flex items-center gap-x-1 text-sm">
                <Link href={`/course`} className="text-gray-300 hover:text-white">
                    Khóa học
                </Link>
                <p className="text-gray-300">/</p>
                <Link href={`/course/${course.courseId}`} className="text-gray-300 hover:text-white">
                    Thông tin khóa học
                </Link>
                <p className="text-gray-300">/</p>
                <Link href={`/course/learning/${course.courseId}`}>
                    Chi tiết bài giảng
                </Link>
            </div>

            <div className="mt-4 mb-5 flex items-start justify-between">
                <div className="max-w-[500px]">
                    <h1 className="text-xl font-semibold flex items-center gap-x-1">{lectures[currentPlayIndex].title}</h1>
                    <p className="text-gray-300 text-sm">Cập nhật lần cuối: <span className="text-purple-300 font-semibold">{formatCreateDate(lectures[currentPlayIndex].updatedAt)}</span></p>
                </div>
                <div className="flex items-center">
                    <span className="px-2 py-0.5 bg-[#25272c] rounded-tl-full rounded-bl-full cursor-pointer" onClick={handlePrevLecture}>
                        <ChevronLeftIcon className="text-gray-500" />
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500 rounded-tr-full rounded-br-full cursor-pointer" onClick={handleNextLecture}>
                        <ChevronRightIcon />
                    </span>
                </div>
            </div>

            {"videoUrl" in lectures[currentPlayIndex] && (
                <iframe
                    src={`https://www.youtube.com/embed/${getVideoIdFromUrl(lectures[currentPlayIndex].videoUrl)}?autoplay=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                />
            )}

            {"content" in lectures[currentPlayIndex] && (
                <>
                    <Divider sx={{ marginBlock: '10px' }} />
                    <div dangerouslySetInnerHTML={{ __html: lectures[currentPlayIndex].content }} />
                </>
            )}
        </Box>
    )
}

export default LessonVideo