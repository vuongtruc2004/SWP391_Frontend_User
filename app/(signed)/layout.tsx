import Header from "@/components/header/header"
import MessengerIcon from "@/components/messenger-icon/messenger.icon"
import { CourseCartWrapper } from "@/wrapper/course-cart/course.cart.wrapper"

const SignedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <CourseCartWrapper>
            <div className="min-h-screen h-max bg-[#101010] pb-10 relative">
                <Header />
                {children}
                <MessengerIcon />
            </div>
        </CourseCartWrapper>
    )
}

export default SignedLayout