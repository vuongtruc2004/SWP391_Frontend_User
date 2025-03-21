import LeftSidebar from "@/components/chapter-view/left.sidebar";
import RightSidebar from "@/components/chapter-view/right.sidebar";
import PlayingLesson from "@/components/lesson/playing.lesson";
import AiMessageWrapper from "@/wrapper/ai-message/ai.message.wrapper";
import { Box } from "@mui/material";

const CourseLearningPage = () => {
    return (
        <AiMessageWrapper>
            <Box sx={{
                bgcolor: '#101010',
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                position: 'relative',
                height: '100vh',
                overflow: 'hidden'
            }}>
                <LeftSidebar />
                <div className="flex">
                    <PlayingLesson />
                    <RightSidebar />
                </div>
            </Box>
        </AiMessageWrapper>
    )
}

export default CourseLearningPage