import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

export const getCourseById = async (id: string): Promise<ApiResponse<CourseDetailsResponse>> => {
    const courseResponse = await sendRequest<ApiResponse<CourseDetailsResponse>>({
        url: `${apiUrl}/courses/${id}`
    });
    if (courseResponse.status === 200) {
        return courseResponse;
    }
    throw new Error(courseResponse.message.toString());
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

export const getNumberOfVideos = (course: CourseDetailsResponse): number => {
    const numberOfVideos = course.lessons.map(item => item.videos.length);
    return numberOfVideos.reduce((sum, num) => sum + num, 0);
}

export const getNumberOfDocuments = (course: CourseDetailsResponse): number => {
    const numberOfVideos = course.lessons.map(item => item.documents.length);
    return numberOfVideos.reduce((sum, num) => sum + num, 0);
}

export const convertSecondToTime = (second: number): string => {
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

export const countTotalTime = (course: CourseDetailsResponse): string => {
    let totalMinutes = 0;
    const wordsPerMinute = 200;

    for (const lesson of course.lessons) {
        // Tính tổng thời lượng video
        for (const video of lesson.videos) {
            totalMinutes += Math.ceil(video.duration / 60);
        }

        // Tính tổng thời gian đọc tài liệu
        for (const doc of lesson.documents) {
            const wordCount = doc.content.split(/\s+/).length;
            totalMinutes += Math.ceil(wordCount / wordsPerMinute);
        }
    }

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    let result = "";
    if (days > 0) result += `${days} ngày `;
    if (hours > 0) result += `${hours} giờ `;
    if (minutes > 0 || result === "") result += `${minutes} phút`;

    return result.trim();
}

export const getVideoIdFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf("/") + 1, url.indexOf("?"));
}