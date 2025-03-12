import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import ReplayIcon from '@mui/icons-material/Replay';
import Link from "next/link";
import { slugifyText } from "./blog.helper";

export const getCourseById = async (id: string): Promise<ApiResponse<CourseDetailsResponse>> => {
    const courseResponse = await sendRequest<ApiResponse<CourseDetailsResponse>>({
        url: `${apiUrl}/courses/accepted/${id}`
    });
    if (courseResponse.status === 200) {
        return courseResponse;
    }
    throw new Error(courseResponse.message.toString());
}

export const getNumberOfLessonType = (
    course: CourseDetailsResponse,
    type: "VIDEO" | "DOCUMENT"
): number => {
    return course.chapters.reduce((rs, chapter) =>
        rs + chapter.lessons.reduce((sum, lesson) =>
            lesson.lessonType === type ? sum + 1 : sum
            , 0)
        , 0);
}

export const getEmojiOnAvgStars = (avg: number): string => {
    switch (true) {
        case avg < 1: return '05s.png';
        case avg === 1: return '1s.png';
        case avg < 2: return '15s.png';
        case avg === 2: return '2s.png';
        case avg < 3: return '25s.png';
        case avg === 3: return '3s.png';
        case avg < 4: return '35s.png';
        case avg === 4: return '4s.png';
        case avg < 5: return '45s.png';
        default: return '5s.png';
    }
};

export const formatDuration = (second: number): string => {
    const hours = Math.floor(second / 3600);
    const minutes = Math.floor((second % 3600) / 60);
    const seconds = second % 60;

    let arr: number[] = [];

    if (hours > 0) {
        arr.push(hours, minutes, seconds);
    } else if (minutes > 0) {
        arr.push(minutes, seconds);
    } else {
        arr.push(seconds);
    }

    return arr.map(unit => unit.toString().padStart(2, '0')).join(':');
};

export const formatDurationWithTail = (second: number): string => {
    const hours = Math.floor(second / 3600);
    const minutes = Math.ceil((second % 3600) / 60);

    let parts: string[] = [];

    if (hours > 0) {
        parts.push(`${hours} tiếng`);
    }
    if (minutes > 0) {
        parts.push(`${minutes} phút`);
    }

    return parts.join(' ');
};


export const countTotalTimeForACourse = (course: CourseDetailsResponse): string => {
    let totalSeconds = 0;
    for (let chapter of course.chapters) {
        totalSeconds += chapter.lessons.reduce((sum, lesson) => sum + Math.max(lesson.duration || 0, 60), 0);
        if (chapter.quizInfo) {
            totalSeconds += chapter.quizInfo.duration;
        }
    }

    const totalMinutes = Math.floor(totalSeconds / 60);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return [
        days > 0 ? `${days} ngày` : "",
        hours > 0 ? `${hours} giờ` : "",
        minutes > 0 ? `${minutes} phút` : ""
    ].filter(Boolean).join(" ") || "0 phút";
};


export const getVideoIdFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf("/") + 1, url.indexOf("?"));
}

export const displayPurchasedButton = (status: number, course: CourseResponse): React.ReactNode => {
    if (status === 0) {
        return (
            <>
                <div className='flex items-center gap-x-2 w-full my-2'>
                    <BorderLinearProgress variant="determinate" value={0} sx={{ flex: 1 }} />
                    <p className='text-gray-300 font-semibold'>{0}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                    <Button variant="outlined" color="primary" fullWidth startIcon={<PlayArrowIcon />}>
                        Bắt đầu học
                    </Button>
                </Link>
            </>
        )
    } else if (status > 0 && status < 100) {
        return (
            <>
                <div className='flex items-center gap-x-2 w-full my-2'>
                    <BorderLinearProgress variant="determinate" value={status} sx={{ flex: 1 }} />
                    <p className='text-purple-300 font-semibold'>{status.toFixed(1)}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                    <Button variant="outlined" color="primary" fullWidth startIcon={<PlayArrowIcon />}>
                        Tiếp tục học
                    </Button>
                </Link>
            </>
        )
    } else if (status === 100) {
        return (
            <>
                <div className='flex items-center gap-x-2 w-full my-2'>
                    <BorderLinearProgress variant="determinate" value={100} sx={{ flex: 1 }} thumb_color="#00c951" />
                    <p className='text-green-500 font-semibold'>{100}%</p>
                </div>
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`}>
                    <Button variant="outlined" color="primary" fullWidth startIcon={<ReplayIcon />}>
                        Xem lại khóa học
                    </Button>
                </Link>
            </>
        )
    } else {
        return null;
    }
}