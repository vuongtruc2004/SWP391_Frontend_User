'use client'
import SingleLessonDetails from "./single.lesson.details";
import { useState } from "react"
import { getNumberOfDocuments, getNumberOfVideos } from "@/helper/course.details.helper";

const CourseContent = ({ course }: { course: CourseDetailsResponse }) => {
    const [lessonsExpand, setLessonsExpand] = useState<Set<number>>(new Set());
    const [allExpand, setAllExpand] = useState(false);

    const toggleLesson = (id: number) => {
        setLessonsExpand(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
                if (newSet.size === 0) {
                    setAllExpand(false);
                }
            } else {
                newSet.add(id);
                if (newSet.size === course?.lessons.length) {
                    setAllExpand(true);
                }
            }
            return newSet;
        });
    }

    const toggleAllLessons = () => {
        if (allExpand) {
            setLessonsExpand(new Set());
        } else {
            const allLessonIds = new Set(course.lessons.map(lesson => lesson.lessonId));
            setLessonsExpand(allLessonIds);
        }
        setAllExpand(prev => !prev);
    };

    return (
        <>
            <h1 className="text-xl font-semibold mt-5 mb-1 flex items-center gap-x-1">III. Nội dung khóa học</h1>
            <div className="flex items-center justify-between text-gray-300 mb-4 px-1 text-sm">
                <p><strong className="text-white">{course?.lessons.length}</strong> chương • <strong className="text-white">{getNumberOfVideos(course)}</strong> bài giảng • <strong className="text-white">{getNumberOfDocuments(course)}</strong> bài đọc • <strong className="text-white">{12}</strong> bài kiểm tra</p>
                <p className="text-blue-500 hover:text-blue-700 cursor-pointer font-semibold" onClick={toggleAllLessons}>
                    {allExpand ? "Đóng tất cả" : "Mở rộng tất cả"}
                </p>
            </div>
            {course.lessons.map((lesson, index) => {
                return (
                    <SingleLessonDetails key={lesson.lessonId} lesson={lesson} index={index} lessonsExpand={lessonsExpand} toggleLesson={toggleLesson} />
                )
            })}
        </>
    )
}

export default CourseContent