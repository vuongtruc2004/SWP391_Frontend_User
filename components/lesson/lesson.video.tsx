import CourseRate from "@/features/course/course-rating/course.rate";
import { sendRequest } from "@/utils/fetch.api";
import { formatDate, formatTotalFollowers } from "@/utils/format";
import { apiUrl, storageUrl } from "@/utils/url";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import { useUserExpert } from "@/wrapper/user-expert/user.expert.wrapper";
import { useUserProgress } from "@/wrapper/user-progress/user.progress.wrapper";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { Avatar, Box, Button, Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const LessonVideo = () => {
    const { data: session, status } = useSession();
    const { followExperts, setFollowExperts } = useUserExpert()
    const { course, currentPlayIndex, lessons } = useCourseView();
    const { userProgresses, handleChangeStatus } = useUserProgress();

    const [totalFollowers, setTotalFollowers] = useState(0);
    const [showDescription, setShowDescription] = useState(false);

    const avatarSrc = course.expert.user.avatar.startsWith("http") ? course.expert.user.avatar : `${storageUrl}/avatar/${course.expert.user.avatar}`;
    const currentLesson = lessons[currentPlayIndex];

    const handleFollow = async () => {
        if (status === 'authenticated') {
            const response = await sendRequest<ApiResponse<ExpertDetailsResponse>>({
                url: `${apiUrl}/experts/follow/${course.expert.expertId}`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`
                }
            });
            if (response.status === 200) {
                if (followExperts.find(expert => expert.expertId === course.expert.expertId)) {
                    setFollowExperts(prev => prev.filter(expert => expert.expertId !== course.expert.expertId));
                    setTotalFollowers(prev => prev - 1);
                } else {
                    setFollowExperts(prev => [...prev, response.data]);
                    setTotalFollowers(prev => prev + 1);
                }
            }
        }
    }

    const handleProgress = ({ played }: { played: number }) => {
        if (!("lessonId" in currentLesson) || !currentLesson.videoUrl) {
            return;
        }
        if (!userProgresses.find(progress => progress.lessonId === currentLesson.lessonId) && played >= 0.8) {
            handleChangeStatus(course.courseId, currentLesson.chapterId, currentLesson.lessonId, null);
        }
    };

    useEffect(() => {
        if (course) {
            setTotalFollowers(course.expert.totalFollowers);
        }
    }, [course]);

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
            <ReactPlayer
                url={currentLesson.videoUrl.startsWith("http") ? currentLesson.videoUrl : `${storageUrl}/video/${currentLesson.videoUrl}`}
                controls
                width="100%"
                height="100%"
                onProgress={handleProgress}
            />

            <div className="flex items-center my-4">
                <Avatar src={avatarSrc} sx={{
                    width: '46px',
                    height: '46px',
                }}>
                    {course.expert.user.fullname.charAt(0).toUpperCase()}
                </Avatar>
                <div className='ml-3 mr-10 max-w-[280px]'>
                    <p className="font-semibold">{course?.expert?.user?.fullname}</p>
                    <div className="flex items-center gap-x-1.5 text-sm text-gray-300">
                        <p>{course?.expert?.job}</p>
                        <p>•</p>
                        <p>{formatTotalFollowers(totalFollowers)} người theo dõi</p>
                    </div>
                </div>

                {followExperts.find(expert => expert.expertId === course.expert.expertId) ? (
                    <Button startIcon={<NotificationsActiveOutlinedIcon />} onClick={handleFollow} variant='outlined' color='secondary' sx={{ borderRadius: '40px', height: '36px' }}>
                        Hủy theo dõi
                    </Button>
                ) : (
                    <Button onClick={handleFollow} variant='contained' color='secondary' sx={{ borderRadius: '40px', height: '36px' }}>
                        Theo dõi
                    </Button>
                )}
            </div>

            <div className="text-sm bg-[#ffffff0d] p-3 rounded-md mb-5">
                <p className="font-semibold">Cập nhật lần cuối: <span className="text-purple-300">{formatDate(currentLesson.updatedAt)}</span></p>
                <p className={`${!showDescription && "line-clamp-3 cursor-pointer"}`} onClick={() => setShowDescription(true)}>
                    {currentLesson.description}
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dignissimos dolorem exercitationem quaerat perferendis sed possimus cumque rem fuga reiciendis in, est voluptatibus quidem provident neque assumenda libero quis voluptatem! Illo quae quasi autem asperiores, maxime facere vitae tempora ut iste mollitia similique! Reiciendis laudantium quas nihil saepe laborum ad, quidem dolor, nostrum temporibus perspiciatis modi vitae! Quisquam veritatis veniam quas reprehenderit nisi vero provident dolorum incidunt quo nam excepturi nostrum unde doloremque, inventore, cumque rem. Sed fugit consequatur vitae, ipsam, minus temporibus accusantium dolor et architecto harum quis accusamus tempora optio. Doloribus assumenda repellat corrupti unde quis ratione vel tempore rerum commodi corporis expedita, soluta aliquid exercitationem eligendi ipsa nam consequatur minus temporibus sint. Ipsa voluptate nam ut commodi cum fugit unde, tempora aliquam dolore. Mollitia, provident! Dolorem labore placeat fuga tempore, quaerat deleniti eos harum quisquam hic itaque? Repudiandae repellendus itaque ratione illum iusto incidunt, nemo quidem, a eligendi hic quibusdam blanditiis tempore harum iure adipisci? Laudantium, cum suscipit ducimus itaque quisquam molestiae voluptas saepe corporis quaerat non fugit eius minus est consectetur ad qui officia distinctio temporibus illo amet reiciendis. Nam delectus facere obcaecati provident mollitia consequatur vel ratione culpa. Esse ratione dicta asperiores ex perspiciatis quam.
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

            <CourseRate course={course} />
        </Box>
    )
}

export default LessonVideo