import Header from "@/components/header/header"

const SignedLayout = ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#101010] pb-10">
            <Header />
            {children}
            {modal}
        </div>
    )
}

export default SignedLayout