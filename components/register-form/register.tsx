import { Box } from '@mui/material'
import React from 'react'
import RegisterForm from './register.form'
import RegisterBanner from './register.banner'
import './style.scss'

const Register = () => {
    return (
        <Box sx={{
            bgcolor: 'white',
            color: 'black',
            borderRadius: '50px 6px 50px 6px',
            width: '100%',
            maxWidth: '1000px',
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            alignItems: 'center',
            ".mui-eayzbu-MuiInputBase-root-MuiOutlinedInput-root": {
                height: '40px'
            },
            marginBlock: '50px',
            zIndex: 10,
            position: 'relative',
            border: '2px solid #60a5fa',

        }}>
            <RegisterForm />
            <RegisterBanner />
            <div className='div-spin' />

        </Box>
    )
}

export default Register