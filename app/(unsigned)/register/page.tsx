import Register from "@/components/register/register"

const RegisterPage = () => {
    return (
        <div className='bg-black min-h-screen flex items-center justify-center ' style={{
            // backgroundImage: 'url(/register-background.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <Register />
        </div>
    )
}

export default RegisterPage