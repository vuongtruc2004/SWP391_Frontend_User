'use client'
import { Button, Divider } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='w-full h-screen bg-black flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
                <div className='text-white mb-1.5 flex items-center justify-center'>
                    <p className='font-semibold text-2xl'>Error</p>
                    <Divider orientation="vertical" sx={{ borderColor: '#6c757d', height: '30px', marginInline: '10px' }} variant="middle" flexItem />
                    <h2 className='text-lg'>{error.message}</h2>
                </div>
                <Button onClick={() => reset()} variant='contained' color='error'>
                    Try again
                </Button>
            </div>
        </div>
    )
}