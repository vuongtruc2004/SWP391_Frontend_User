import Header from "@/components/header/header"

const SignedLayout = ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) => {
    return (
        <div className="min-h-screen h-max bg-[#101010] pb-10 relative">
            <Header />
            {children}
            {modal}
        </div>
    )
}

export default SignedLayout