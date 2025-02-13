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
