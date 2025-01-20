import { Box, Button, Chip } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link'
import React from 'react'
import FacebookCircularProgress from './facebook.circular.progress';

interface IProps {
    index: number;
}
const SingleCourseSlider = (props: IProps) => {
    const { index } = props;

    return (
        <Box sx={{
            border: '1px solid #ced4da',
            borderRadius: '6px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
            '.mui-1txyin7-MuiLinearProgress-root': {
                bgcolor: '#ced4da'
            },
            '.mui-19m61dl-MuiChip-label': {
                paddingInline: '15px',
                fontSize: '11px'
            },
        }}>
            <div className='relative'>
                <div className='bg-black rounded-md w-full h-48 cursor-pointer'>

                </div>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                    background: 'white',
                    position: 'absolute',
                    left: '10px',
                    bottom: '10px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '14px'
                }}>
                    <GroupsIcon />
                    <p>32.8386</p>
                </Box>
            </div>

            <div className='p-5'>
                <Link href={"/test"} className='text-black font-semibold hover:underline hover:text-blue-500'>Khóa học Spring Boot từ A-Z</Link>
                <ul className='flex items-center gap-x-3 mt-1'>
                    <li>
                        <Chip size='small' variant="outlined" color="success" label="Java" />
                    </li>
                    <li>
                        <Chip size='small' variant="outlined" color="warning" label="HTML" />
                    </li>
                    <li>
                        <Chip size='small' variant="outlined" color="info" label="CSS" />
                    </li>
                </ul>
                <div>
                    {index % 2 === 0 ? (
                        <div className='flex items-center justify-between mt-2'>
                            <div>
                                <p className='text-gray-500 text-sm'>Sale off 30%</p>
                                <div className='flex items-center gap-x-3'>
                                    <p className='text-red-500 italic line-through'>300.000đ</p>
                                    <p>299.000đ</p>
                                </div>
                            </div>
                            <Button sx={{ textTransform: 'capitalize', marginTop: '10px' }} size='small' variant='outlined' color='primary'>Mua Ngay</Button>
                        </div>
                    ) : (
                        <div className='flex items-center justify-between mt-3'>
                            <div className='text-sm flex items-center gap-x-2'>
                                <p className='text-gray-500'>Hoàn thành:</p>
                                <FacebookCircularProgress variant="determinate" value={40} width={30} />
                                <p className='text-black font-semibold'>40%</p>
                            </div>
                            <Button sx={{ textTransform: 'capitalize', marginTop: '10px' }} size='small' variant='outlined' color='warning'>Tiếp tục học</Button>
                        </div>
                    )}
                </div>
            </div>
        </Box>
    )
}

export default SingleCourseSlider