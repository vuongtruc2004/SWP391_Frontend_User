import ToTopIcon from "@/components/to-top-icon/to.top.icon"

const LessonViewLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-[#101010] pb-10 relative">
            {children}
            <ToTopIcon />
        </div>
    )
}

export default LessonViewLayout