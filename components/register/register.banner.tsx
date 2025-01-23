import React from 'react'

const RegisterBanner = () => {
    return (
        <div className='w-full h-full bg-green-300' style={{
            backgroundImage: 'url(/register-banner.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: 10
        }}>
        </div>
    )
}

export default RegisterBanner