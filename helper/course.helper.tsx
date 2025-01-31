import Link from "next/link";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BorderLinearProgress } from "@/components/course-slider/custom.progress";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button } from "@mui/material";

export const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN');
};

export const getOriginalPrice = (price: number): string => {
    const originalPrice = price + price * 30 / 100;
    return originalPrice.toLocaleString('vi-VN');
}

export const displayProgressbar = (status: 'not buy' | 'not start' | 'studying' | 'completed'): React.ReactNode => {
    if (status === 'not start') {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBlock: '10px'
            }}>
                <div className='flex items-center gap-x-2'>
                    <BorderLinearProgress variant="determinate" value={0} sx={{ flexShrink: 0, width: '180px' }} />
                    <p className='text-gray-300'>0%</p>
                </div>
                <Link href={"/course"} className='inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-gray-300 hover:text-purple-500'>
                    <PlayArrowIcon />
                    <p>Bắt đầu</p>
                </Link>
            </Box>
        )
    } else if (status === 'studying') {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBlock: '10px'
            }}>
                <div className='flex items-center gap-x-2'>
                    <BorderLinearProgress variant="determinate" value={30} sx={{ flexShrink: 0, width: '180px' }} />
                    <p className='text-purple-500'>30%</p>
                </div>
                <Link href={"/course"} className='inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-purple-500 hover:text-green-500'>
                    <PlayArrowIcon />
                    <p>Tiếp tục</p>
                </Link>
            </Box>
        )
    } else {
        return null;
    }
}

export const displayPrice = (course: CourseResponse, status: 'not buy' | 'not start' | 'studying' | 'completed'): React.ReactNode => {
    if (status === 'not buy') {
        return (
            <>
                <div className='flex items-center justify-between mt-2'>
                    <p>Giảm giá 30%</p>
                    <div className='flex items-end gap-x-2'>
                        <p className='text-sm line-through text-red-500 italic'>{getOriginalPrice(course.price)}đ</p>
                        <h1 className='text-xl font-semibold'>{formatPrice(course.price)}đ</h1>
                    </div>
                </div>
                <Link href={"/course"} className="block mt-2">
                    <Button variant="outlined" startIcon={<ShoppingCartIcon />} fullWidth>
                        Mua ngay
                    </Button>
                </Link>
            </>
        )
    } else if (status === 'completed') {
        return (
            <div className='flex items-center justify-between mt-2'>
                <Link href={"/course"}>
                    <Button variant='outlined' color='secondary'>
                        Xem lại khóa học
                    </Button>
                </Link>
                <p className='text-green-500'>
                    <DoneAllIcon />
                    Hoàn thành
                </p>
            </div>
        )
    } else {
        return null;
    }
}