import ToTopIcon from "@/components/to-top-icon/to.top.icon"
import AiMessageWrapper from "@/wrapper/ai-message/ai.message.wrapper"

const LessonViewLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AiMessageWrapper>
            <div className="h-screen bg-[#101010] pb-10 relative">
                {children}
                <ToTopIcon />
            </div>
        </AiMessageWrapper>
    )
}

export default LessonViewLayout