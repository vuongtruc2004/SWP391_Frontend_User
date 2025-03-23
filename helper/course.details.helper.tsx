import { sendRequest } from "@/utils/fetch.api";
import { formatToText_HoursMinutes_Short } from "@/utils/format";
import { apiUrl } from "@/utils/url";

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

export const countTotalTimeForACourse = (course: CourseDetailsResponse): string => {
    let totalSeconds = 0;
    for (let chapter of course.chapters) {
        totalSeconds += chapter.lessons.reduce((sum, lesson) => sum + Math.max(lesson.duration || 0, 60), 0);
        if (chapter.quizInfo) {
            totalSeconds += chapter.quizInfo.duration;
        }
    }
    return formatToText_HoursMinutes_Short(totalSeconds);
};

export const getVideoIdFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf("/") + 1, url.indexOf("?"));
}