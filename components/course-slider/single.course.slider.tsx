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
            background: '#15171c',
            borderRadius: '6px',
            '.mui-1txyin7-MuiLinearProgress-root': {
                bgcolor: '#ced4da'
            },
            '.mui-19m61dl-MuiChip-label': {
                paddingInline: '15px',
                fontSize: '11px'
            },
        }}>
            <div className='relative'>
                <div className='bg-blue-500 rounded-md w-full h-48 cursor-pointer'>

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

            <div className='p-5 text-white'>
                <Link href={"/test"} className='font-semibold hover:underline hover:text-blue-500'>Khóa học Spring Boot từ A-Z</Link>
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
                                <p className='text-gray-500 text-sm'>Giảm giá 30%</p>
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
                                <FacebookCircularProgress variant="determinate" value={40} width={30} />
                                <p className='font-semibold'>40%</p>
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