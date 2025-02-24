'use client'
import { formatCreateDate } from "@/helper/blog.helper"
import { Box, Divider } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getVideoIdFromUrl } from "@/helper/course.details.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { storageUrl } from "@/utils/url";

const LessonVideo = () => {
    const { currentPlayIndex, setCurrentPlayIndex, lectures } = useCourseView();

    return (
        <Box sx={{
            'iframe, video': {
                width: '100%',
                height: '100%',
                borderRadius: '4px',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                aspectRatio: 16 / 9,
            }
        }}>
            <div className="mb-5 flex items-start justify-between">
                <div className="max-w-[500px]">
                    <h1 className="text-xl font-semibold flex items-center gap-x-1">{lectures[currentPlayIndex].title}</h1>
                    <p className="text-gray-300 text-sm">Cập nhật lần cuối: <span className="text-purple-300 font-semibold">{formatCreateDate(lectures[currentPlayIndex].updatedAt)}</span></p>
                </div>
                <ul className="flex items-center gap-x-5">
                    <li className={`cursor-pointer hover:text-purple-300 flex items-center gap-x-1 ${currentPlayIndex === 0 ? "text-gray-400 pointer-events-none" : ""}`}
                        onClick={() => setCurrentPlayIndex(prev => prev - 1)}>
                        <ChevronLeftIcon sx={{ fontSize: '1.2rem' }} />
                        <p>Trước</p>
                    </li>
                    <li className={`cursor-pointer hover:text-purple-300 flex items-center gap-x-1 ${currentPlayIndex === lectures.length - 1 ? "text-gray-400 pointer-events-none" : ""}`}
                        onClick={() => setCurrentPlayIndex(prev => prev + 1)}>
                        <p>Sau</p>
                        <ChevronRightIcon sx={{ fontSize: '1.2rem' }} />
                    </li>
                </ul>

            </div>

            {"videoUrl" in lectures[currentPlayIndex] && (
                lectures[currentPlayIndex].videoUrl.startsWith("http") ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${getVideoIdFromUrl(lectures[currentPlayIndex].videoUrl)}?autoplay=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                    />
                ) : (
                    <video src={`${storageUrl}/video/${lectures[currentPlayIndex].videoUrl}`} controls autoPlay />
                )
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