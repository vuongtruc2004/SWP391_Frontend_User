'use client'
import { Button } from "@mui/material"
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper";
import LessonVideo from './lesson.video';
import LessonDocument from './lesson.document';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useRef, useState } from "react";
import LessonQuiz from "./lesson.quiz";
import PlayingLessonHeader from "./playing.lesson.header";

const PlayingLesson = () => {
    const { currentPlayIndex, lessons } = useCourseView();

    const [showScrollButton, setShowScrollButton] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        const handleShowScrollButton = () => {
            if (ref.current) {
                const { scrollTop } = ref.current;
                setShowScrollButton(scrollTop > 450);
            }
        }

        ref.current?.addEventListener('scroll', handleShowScrollButton);
        return () => ref.current?.removeEventListener('scroll', handleShowScrollButton);
    }, []);

    return (
        <div className="relative h-screen flex-1 flex flex-col">
            <PlayingLessonHeader title={lessons[currentPlayIndex].title} updatedAt={lessons[currentPlayIndex].updatedAt} />

            <div className="p-5 pt-0 flex-1 overflow-y-auto" ref={ref}>
                {"lessonId" in lessons[currentPlayIndex] && lessons[currentPlayIndex].lessonType === "VIDEO" && (
                    <LessonVideo />
                )}

                {"lessonId" in lessons[currentPlayIndex] && lessons[currentPlayIndex].lessonType === "DOCUMENT" && (
                    <LessonDocument />
                )}

                {"quizId" in lessons[currentPlayIndex] && (
                    <LessonQuiz />
                )}
            </div>

            <Button
                onClick={scrollToTop}
                variant="contained"
                color="secondary"
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transition: 'all .2s',
                    transform: `translate(-50%, ${showScrollButton ? '0' : '120%'})`,
                    pointerEvents: showScrollButton ? 'auto' : 'none',
                    opacity: showScrollButton ? 1 : 0,
                    width: '32px',
                    minWidth: '32px',
                    aspectRatio: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    padding: 0,
                }}
            >
                <KeyboardArrowUpIcon />
            </Button>
        </div>
    )
}

export default PlayingLesson