const ChapterViewLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-[#101010] pb-10 relative">
            {children}
        </div>
    )
}

export default ChapterViewLayout