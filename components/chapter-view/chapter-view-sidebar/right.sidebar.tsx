'use client'
import ChatSmallScreen from "@/components/ai-support/chat.small.screen";
import ChatHistory from "@/features/ai-support/chat.history";
import ChaptersList from "@/features/chapter-view/chapter-view-video/chapters.list"
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";
import { useCourseView } from "@/wrapper/course-view/course.view.wrapper"
import { Box } from "@mui/material";

const RightSidebar = () => {
    const { openProgressBar, openAI } = useCourseView();
    const { openHistory, setOpenHistory } = useAiMessage();

    if ((!openProgressBar && !openAI) || (openProgressBar && openAI)) {
        return null;
    }

    return (
        <Box sx={{
            bgcolor: 'rgba(255, 255, 255, .05)',
            position: 'sticky',
            top: 0,
            right: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
            borderLeft: '1px solid #25272c',
            flexShrink: 0,
            width: '380px',
        }}>
            {openProgressBar && (
                <ChaptersList />
            )}
            {openAI && !openHistory && (
                <ChatSmallScreen />
            )}
            {openAI && openHistory && (
                <ChatHistory />
            )}
        </Box>
    )
}

export default RightSidebar