import { Avatar, Box, Button } from '@mui/material'

const SingleBlogSlider = () => {
    return (
        <Box sx={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(to bottom right, #15171c, #010009, #15171c)',
            width: '100%',
            height: '100%',
            borderRadius: '6px',
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
    )
}

export default SingleBlogSlider