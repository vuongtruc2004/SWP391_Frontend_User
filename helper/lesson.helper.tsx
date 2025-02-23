import { calculateReadingTime } from "./blog.helper";

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

export const getFirstLectureOfCourse = (course: CourseDetailsResponse) => {
    return course.lessons[0].videos[0];
}

export const countCompletionOfALesson = (lesson: LessonResponse, userProgress: UserProgressResponse[]) => {
    const completed = userProgress.filter(progress => progress.lessonId === lesson.lessonId).length;
    const total = lesson.videos.length + lesson.documents.length;
    return total > 0 ? (completed / total) * 100 : 0;
}
