import Link from "next/link";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

export const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN');
};

export const getSalePercent = (originalPrice: number, salePrice: number): number => {
    const percent = (originalPrice - salePrice) / originalPrice * 100;
    return Math.round(percent);
}

export const getInputPrice = (price: any): string => {
    if (!price || price.trim() === "") {
        return "";
    }
    const cleanedPrice = price.replace(/[.,]/g, '');

    if (!/^\d+$/.test(cleanedPrice)) {
        return "";
    }

    return cleanedPrice + "000";
}

export const getCourseSort = (courseSort: string): string => {
    if (!courseSort ||
        (courseSort !== "default" &&
            courseSort !== "salePrice" &&
            courseSort !== "updatedAt" &&
            courseSort !== "purchaser" &&
            courseSort !== "rate")
    ) {
        return "default";
    }
    return courseSort;
}

export const displayProgressbar = (status: number): React.ReactNode => {
    if (status < 0) {
        return null;
    }
    else if (status === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBlock: '8px',
                columnGap: '25px'
            }}>
                <div className='flex items-center gap-x-2 w-full'>
                    <BorderLinearProgress variant="determinate" value={0} sx={{ flex: 1 }} />
                    <p className='text-gray-300 font-semibold'>{0}%</p>
                </div>
                <Link href={"/course"} className='text-nowrap inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-gray-300 hover:text-purple-500'>
                    <PlayArrowIcon />
                    <p>Bắt đầu</p>
                </Link>
            </Box>
        )
    } else if (status > 0 && status < 100) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBlock: '8px',
                columnGap: '25px'
            }}>
                <div className='flex items-center gap-x-2 w-full'>
                    <BorderLinearProgress variant="determinate" value={status} sx={{ flex: 1 }} />
                    <p className='text-purple-500 font-semibold'>{status.toFixed(1)}%</p>
                </div>
                <Link href={"/course"} className='text-nowrap inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-purple-400 hover:text-green-500'>
                    <PlayArrowIcon />
                    <p>Tiếp tục</p>
                </Link>
            </Box>
        )
    } else if (status === 100) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBlock: '8px',
                columnGap: '25px',
            }}>
                <BorderLinearProgress variant="determinate" value={100} sx={{ width: '100%' }} thumb_color="#00c951" />
                <div className='text-sm text-nowrap inline-flex items-center gap-x-1 text-green-500'>
                    <DoneAllIcon />
                    <p>Đã hoàn thành</p>
                </div>
            </Box>
        )
    } else {
        return null;
    }
}

export const displayPrice = (course: CourseResponse, status: number): React.ReactNode => {
    if (status < 0) {
        return (
            <>
                <div className='flex items-center justify-between mt-2'>
                    {course.salePrice !== course.originalPrice && (
                        <p>Giảm giá {getSalePercent(course.originalPrice, course.salePrice)}%</p>
                    )}
                    <div className='flex items-end gap-x-2'>
                        {course.salePrice !== course.originalPrice && (
                            <p className='text-sm line-through text-red-500 italic'>{formatPrice(course.originalPrice)}₫</p>
                        )}
                        <h1 className='text-xl font-semibold'>{formatPrice(course.salePrice)}₫</h1>
                    </div>
                </div>
                <Link href={`/course/${course.courseId}`} className="block mt-2" color="secondary">
                    <Button variant="outlined" startIcon={<ShoppingCartIcon />} fullWidth>
                        Mua ngay
                    </Button>
                </Link>
            </>
        )
    } else if (status === 0) {
        return (
            <Link href={"/course"}>
                <Button variant='outlined' fullWidth startIcon={<PlayArrowIcon />}>
                    Bắt đầu học
                </Button>
            </Link>
        )

    } else if (status > 0 && status < 100) {
        return (
            <Link href={"/course"}>
                <Button variant='outlined' fullWidth startIcon={<PlayArrowIcon />}>
                    Tiếp tục học
                </Button>
            </Link>
        )
    }
    else if (status === 100) {
        return (
            <Link href={"/course"}>
                <Button variant='outlined' fullWidth startIcon={<ReplayIcon />}>
                    Xem lại khóa học
                </Button>
            </Link>
        )
    } else {
        return null;
    }
}