'use client'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
const ToTopIcon = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 450);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box sx={{
            width: '36px',
            aspectRatio: 1,
            bgcolor: 'black',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            bottom: '15px',
            right: '15px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            transition: 'all .25s',
            transform: `translateY(${show ? 0 : "60px"})`
        }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <KeyboardArrowUpIcon />
        </Box>
    )
}

export default ToTopIcon