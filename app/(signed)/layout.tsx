import Header from "@/components/header/header"
import MessengerIcon from "@/components/messenger-icon/messenger.icon"
import { CourseCartWrapper } from "@/wrapper/course-cart/course.cart.wrapper"
import { CoursePurchasedWrapper } from "@/wrapper/course-purchased/course.purchased.wrapper"

const SignedLayout = ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) => {
    return (
        <CoursePurchasedWrapper>
            <CourseCartWrapper>
                <div className="min-h-screen h-max bg-[#101010] pb-10 relative">
                    <Header />
                    {children}
                    {modal}
                    <MessengerIcon />
                </div>
            </CourseCartWrapper>
        </CoursePurchasedWrapper>
    )
}

export default SignedLayout