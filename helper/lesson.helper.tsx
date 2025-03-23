import { formatToText_HoursMinutes } from "@/utils/format";

export const countTotalTimeOfAChapter = (chapter: ChapterResponse) => {
    let totalSeconds = chapter.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
    if (chapter.quizInfo) {
        totalSeconds += chapter.quizInfo.duration;
    }

    return formatToText_HoursMinutes(totalSeconds);
};

export const countCompletionOfAChapter = (chapter: ChapterResponse, userProgresses: UserProgressResponse[]) => {
    const completed = userProgresses.filter(progress => progress.chapterId === chapter.chapterId).length;
    const total = chapter.lessons.length + (chapter.quizInfo ? 1 : 0);
    return total > 0 ? (completed / total) * 100 : 0;
}

export const countCompletedLessonsOfACourse = (course: CourseDetailsResponse | CourseResponse, userProgresses: UserProgressResponse[]): number => {
    return userProgresses.filter(progress => progress.courseId === course.courseId).length;
}

export const countCompletedPercentOfACourse = (course: CourseDetailsResponse | CourseResponse, userProgresses: UserProgressResponse[]): number => {
    const completed = userProgresses.filter(progress => progress.courseId === course.courseId).length;
    return (completed / (course.totalLessons + course.totalQuizzes)) * 100;
}