import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Danh sách chuyên gia đang theo dõi'
}

const MyFollowingExpertLayout = ({ course, expert }: { course: React.ReactNode, expert: React.ReactNode }) => {
    return (
        <>
            {expert}
            {course}
        </>
    )
}

export default MyFollowingExpertLayout