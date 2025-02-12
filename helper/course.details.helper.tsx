import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

export const getCourseById = async (id: string): Promise<ApiResponse<CourseResponse>> => {
    const courseResponse = await sendRequest<ApiResponse<CourseResponse>>({
        url: `${apiUrl}/courses/${id}`
    });
    if (courseResponse.status === 200) {
        return courseResponse;
    }
    throw new Error(courseResponse.message.toString());
}

export const getNumberOfVideos = (course: CourseResponse): number => {
    const numberOfVideos = course.lessons.map(item => item.videos.length);
    return numberOfVideos.reduce((sum, num) => sum + num, 0);
}

export const getNumberOfDocuments = (course: CourseResponse): number => {
    const numberOfVideos = course.lessons.map(item => item.documents.length);
    return numberOfVideos.reduce((sum, num) => sum + num, 0);
}