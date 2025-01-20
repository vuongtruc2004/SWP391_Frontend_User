import { Avatar, Box, Button } from '@mui/material'
import React from 'react'

const SingleBlogSlider = () => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            bgcolor: 'black',
            width: '100%',
            height: '100%',
            borderRadius: '6px',
            '.mui-lxrpex-MuiButtonBase-root-MuiButton-root': {
                fontSize: '14px',
                textTransform: 'capitalize',
                padding: '5px 30px'
            },
        }}>
            <Box sx={{
                color: 'white',
                borderRight: '1px solid white',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className='max-w-96 p-10'>
                    <div className='flex items-center gap-x-5'>
                        <Avatar>
                            N
                        </Avatar>
                        <p>Nguyen Vuong Truc</p>
                    </div>
                    <p className='mt-2 mb-6'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam nemo voluptas cumque at? Officiis excepturi reiciendis nulla, optio qui et?
                    </p>
                    <Button variant='contained' color='primary'>Xem chi tiết</Button>
                </div>
            </Box>
            <div className='p-10'>
                <div className='bg-blue-500 h-full rounded-md'></div>
            </div>
        </Box>
    )
}

export default SingleBlogSlider