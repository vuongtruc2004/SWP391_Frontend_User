import { calculateReadingTime } from "./blog.helper";
import { getNumberOfDocuments, getNumberOfVideos } from "./course.details.helper";

export const countTotalTimeInALesson = (lesson: LessonResponse) => {
    const videoLength = lesson.videos.reduce((sum, video) => sum + video.duration, 0);
    const documentLength = lesson.documents.reduce((sum, document) => sum + calculateReadingTime(document.plainContent), 0);
    const totalSeconds = videoLength + documentLength;

    const hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.ceil((totalSeconds % 3600) / 60);

    let result = "";
    if (hours > 0) {
        result += `${hours} giờ `;
    }
    if (minutes > 0) {
        result += `${minutes} phút`;
    }
    return result.trim();
};

export const countCompletionOfALesson = (lesson: LessonResponse, userProgress: UserProgressResponse[]) => {
    const completed = userProgress.filter(progress => progress.lessonId === lesson.lessonId).length;
    const total = lesson.videos.length + lesson.documents.length;
    return total > 0 ? (completed / total) * 100 : 0;
}

export const countCompletionOfACourse = (userProgress: UserProgressResponse[], course: CourseDetailsResponse, userId: number) => {
    const totalVideos = getNumberOfVideos(course);
    const totalDocuments = getNumberOfDocuments(course);
    const total = totalDocuments + totalVideos;
    const completed = userProgress.filter(progress => progress.userId === userId && progress.courseId === course.courseId).length;
    return total > 0 ? (completed / total) * 100 : 0;
}