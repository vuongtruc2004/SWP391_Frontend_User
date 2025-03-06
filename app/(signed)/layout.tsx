import Header from "@/components/header/header"
import MessengerIcon from "@/components/messenger-icon/messenger.icon"
import AiMessageWrapper from "@/wrapper/ai-message/ai.message.wrapper"
import { CourseCartWrapper } from "@/wrapper/course-cart/course.cart.wrapper"
import { NotificationWrapper } from "@/wrapper/notification/notification.wrapper"

const SignedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AiMessageWrapper>
            <NotificationWrapper>
                <CourseCartWrapper>
                    <div className="min-h-screen h-max bg-[#101010] pb-10 relative">
                        <Header />
                        {children}
                        <MessengerIcon />
                    </div>
                </CourseCartWrapper>
            </NotificationWrapper>
        </AiMessageWrapper>
    )
}

export default SignedLayout