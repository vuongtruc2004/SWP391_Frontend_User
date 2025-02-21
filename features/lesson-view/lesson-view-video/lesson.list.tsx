'use client'
import { useState } from "react";
import SingleLesson from "./single.lesson";

const LessonList = ({ course }: { course: CourseDetailsResponse }) => {
    const [lessonsExpand, setLessonsExpand] = useState<Set<number>>(new Set());

    const toggleLesson = (id: number) => {
        setLessonsExpand(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }

    return (
        <>
            <div className="flex flex-col">
                {course.lessons.map((lesson, index) => {
                    return (
                        <SingleLesson lesson={lesson} index={index} lessonsExpand={lessonsExpand} toggleLesson={toggleLesson} key={lesson.lessonId + "_" + lesson.title} />
                    )
                })}
            </div>
        </>
    )
}

export default LessonList