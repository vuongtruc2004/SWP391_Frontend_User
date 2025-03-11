import { Avatar, Box, Button, Divider } from "@mui/material"
import { getVideoIdFromUrl } from "@/helper/course.details.helper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { storageUrl } from "@/utils/url";
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers/icons';
import { formatDate } from "@/helper/blog.helper";
import { useState } from "react";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { formatTotalFollowers } from "@/helper/lesson.helper";
import ChapterCourseRate from "../chapter-view/chapter-course-rate/chapter.course.rate";

const LessonVideo = () => {
    const { course, setCurrentPlayIndex, currentPlayIndex, lessons } = useCourseView();

    const [showDescription, setShowDescription] = useState(false);

    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;
    const currentLesson = lessons[currentPlayIndex];

    if (!("lessonId" in currentLesson) || !currentLesson.videoUrl) {
        return null;
    }

    return (
        <Box sx={{
            'iframe, video': {
                width: '100%',
                height: '100%',
                borderRadius: '6px',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                aspectRatio: 16 / 9,
            }
        }}>
            {currentLesson.videoUrl.startsWith("http") ? (
                <iframe
                    src={`https://www.youtube.com/embed/${getVideoIdFromUrl(currentLesson.videoUrl)}?autoplay=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                />
            ) : (
                <video src={`${storageUrl}/video/${currentLesson.videoUrl}`} controls autoPlay />
            )}
            <div className="pt-5 pr-3">
                <h1 className="text-xl font-semibold">{currentLesson.title}</h1>

                <div className='flex items-center justify-between'>
                    <div className="flex items-center my-2">
                        <Avatar src={avatarSrc} sx={{
                            width: '46px',
                            height: '46px',
                        }}>
                            {course?.expert?.user?.fullname.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className='ml-3 mr-10 max-w-[280px]'>
                            <p className="font-semibold">{course?.expert?.user?.fullname}</p>
                            <div className="flex items-center gap-x-1.5 text-sm text-gray-300">
                                <p>{course?.expert?.job}</p>
                                <p>•</p>
                                <p>{formatTotalFollowers(course.expert.totalFollowers || 1237856912)} người theo dõi</p>
                            </div>
                        </div>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: '40px', height: '36px' }}>
                            Theo dõi
                        </Button>
                    </div>

                    <ul className='flex items-center rounded-full bg-[#ffffff0d]'>
                        <li className={`flex items-center gap-x-1 rounded-tl-full rounded-bl-full py-1 px-3 cursor-pointer hover:text-blue-400 ${currentPlayIndex === 0 && "pointer-events-none text-gray-400"}`}
                            onClick={() => setCurrentPlayIndex(prev => prev - 1)}
                        >
                            <ArrowLeftIcon sx={{ fontSize: '1.2rem' }} />
                            <p>Trước</p>
                        </li>
                        <Divider orientation='vertical' sx={{ height: '20px' }} />
                        <li className={`flex items-center gap-x-1 rounded-tr-full rounded-br-full py-1 px-3 cursor-pointer hover:text-blue-400 ${currentPlayIndex === lessons.length - 1 && "pointer-events-none text-gray-400"}`}
                            onClick={() => setCurrentPlayIndex(prev => prev + 1)}
                        >
                            <p>Tiếp</p>
                            <ArrowRightIcon sx={{ fontSize: '1.2rem' }} />
                        </li>
                    </ul>
                </div>

                <div className="text-sm bg-[#ffffff0d] p-3 rounded-md mt-2">
                    <p className="font-semibold">Cập nhật lần cuối: <span className="text-purple-300">{formatDate(currentLesson.updatedAt)}</span></p>
                    <p className={`${!showDescription && "line-clamp-3 cursor-pointer"}`} onClick={() => setShowDescription(true)}>
                        {currentLesson.description}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, eaque omnis ipsum perferendis perspiciatis maiores veniam odio doloribus voluptatum eius.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores commodi enim sit impedit id labore inventore, harum iusto incidunt minima quae minus quasi excepturi dolorem autem rerum amet consequuntur reiciendis.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti illo asperiores provident eius hic cupiditate dolore totam repudiandae. Doloremque nam voluptatem molestias alias dolore accusamus ab quod tenetur unde est.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi et, dicta consequuntur consequatur voluptatibus cupiditate provident quaerat. Velit vero quam esse dolorum itaque, nihil cumque neque hic voluptatum officia id.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis nam delectus, possimus aliquid ea consequuntur repellendus eligendi fuga illo modi sequi. Asperiores eius, odit odio sequi deserunt voluptas quaerat dicta!
                    </p>

                    {showDescription && (
                        <>
                            <Divider sx={{ marginBlock: '20px' }} />
                            <p className="mt-2 cursor-pointer font-semibold flex items-center gap-x-1 hover:text-purple-300 w-max" onClick={() => setShowDescription(false)}>
                                <KeyboardDoubleArrowUpIcon sx={{ fontSize: '1rem' }} />
                                <span>Ẩn bớt</span>
                            </p>
                        </>
                    )}
                </div>

                <ChapterCourseRate />
            </div>
        </Box>
    )
}

export default LessonVideo