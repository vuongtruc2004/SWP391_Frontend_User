import CampaignIcon from "@/components/campaign/campaign.icon"
import AppHeader from "@/components/header/app.header"
import MessengerIcon from "@/components/messenger-icon/messenger.icon"
import { CourseCartWrapper } from "@/wrapper/course-cart/course.cart.wrapper"
import { NotificationWrapper } from "@/wrapper/notification/notification.wrapper"

const SignedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <NotificationWrapper>
            <CourseCartWrapper>
                <div className="min-h-screen h-max bg-[#101010] relative">
                    <AppHeader />
                    {children}
                    <CampaignIcon />
                    <MessengerIcon />
                </div>
            </CourseCartWrapper>
        </NotificationWrapper>
    )
}

export default SignedLayout