export const countTotalTimeInAChapter = (chapter: ChapterResponse) => {
    const totalSeconds = chapter.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);

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

export const countCompletionOfAChapter = (chapter: ChapterResponse, userProgress: UserProgressResponse[]) => {
    const completed = userProgress.filter(progress => progress.chapterId === chapter.chapterId).length;
    const total = chapter.lessons.length;
    return total > 0 ? (completed / total) * 100 : 0;
}

export const formatTotalFollowers = (total: number): string => {
    if (total >= 1000000000) {
        const value = total / 1000000000;
        return value % 1 === 0 ? `${value} T` : `${value.toFixed(1)} T`;
    } else if (total >= 1000000) {
        const value = total / 1000000;
        return value % 1 === 0 ? `${value} Tr` : `${value.toFixed(1)} Tr`;
    } else if (total >= 1000) {
        const value = total / 1000;
        return value % 1 === 0 ? `${value} N` : `${value.toFixed(1)} N`;
    } else {
        return `${total}`;
    }
};
