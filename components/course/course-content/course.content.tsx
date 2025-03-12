'use client'
import { getNumberOfLessonType } from "@/helper/course.details.helper";
import SingleChapterDetails from "./single.chapter.details";
import { useState } from "react"

const CourseContent = ({ course }: { course: CourseDetailsResponse }) => {
    const [chaptersExpand, setChaptersExpand] = useState<Set<number>>(new Set());
    const [allExpand, setAllExpand] = useState(false);

    const toggleChapter = (id: number) => {
        setChaptersExpand(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
                if (newSet.size === 0) {
                    setAllExpand(false);
                }
            } else {
                newSet.add(id);
                if (newSet.size === course?.chapters.length) {
                    setAllExpand(true);
                }
            }
            return newSet;
        });
    }

    const toggleAllLessons = () => {
        if (allExpand) {
            setChaptersExpand(new Set());
        } else {
            const allChapterIds = new Set(course.chapters.map(chapter => chapter.chapterId));
            setChaptersExpand(allChapterIds);
        }
        setAllExpand(prev => !prev);
    };

    return (
        <>
            <h1 className="text-xl font-semibold mt-5 mb-1 flex items-center gap-x-1">Nội dung khóa học</h1>
            <div className="flex items-center justify-between text-gray-300 mb-4 px-1 text-sm">
                <p className="flex items-center gap-x-1.5">
                    <strong className="text-white">{course?.chapters.length}</strong> chương
                    <span>•</span>
                    <strong className="text-white">{getNumberOfLessonType(course, "VIDEO")}</strong> bài giảng
                    <span>•</span>
                    <strong className="text-white">{getNumberOfLessonType(course, 'DOCUMENT')}</strong> bài đọc
                    <span>•</span>
                    <strong className="text-white">{course.totalQuizzes}</strong> bài kiểm tra
                </p>
                <p className="text-blue-500 hover:text-blue-700 cursor-pointer font-semibold" onClick={toggleAllLessons}>
                    {allExpand ? "Đóng tất cả" : "Mở rộng tất cả"}
                </p>
            </div>
            {course.chapters.map((chapter, index) => {
                return (
                    <SingleChapterDetails
                        key={chapter.chapterId}
                        chapter={chapter}
                        index={index}
                        chaptersExpand={chaptersExpand}
                        toggleChapter={toggleChapter}
                    />
                )
            })}
        </>
    )
}

export default CourseContent