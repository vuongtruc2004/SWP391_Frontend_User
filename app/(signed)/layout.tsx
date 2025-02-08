import Header from "@/components/header/header"
import MessengerIcon from "@/components/messenger-icon/messenger.icon"

const SignedLayout = ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) => {
    return (
        <div className="min-h-screen h-max bg-[#101010] pb-10 relative">
            <Header />
            {children}
            {modal}
            <MessengerIcon />
        </div>
    )
}

export default SignedLayout