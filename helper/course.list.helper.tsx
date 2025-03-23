import Link from "next/link";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BorderLinearProgress } from "@/components/course/course-slider/custom.progress";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Box, Button } from "@mui/material";
import { slugifyText } from "./blog.helper";
import dayjs from "dayjs";

export const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN');
};

export const formatSalePrice = (price: number): string => {
    if (price >= 1000000) {
        return (Number.isInteger((price / 1000000)) ? (price / 1000000) : (price / 1000000).toFixed(1)) + 'tr';
    } else if (price >= 1000) {
        return (Number.isInteger((price / 1000)) ? (price / 1000) : (price / 1000).toFixed(1)) + 'k';
    } else {
        return Number.isInteger(price) ? price.toString() : price.toFixed(1);
    }
}

export const getSalePercent = (originalPrice: number, salePrice: number): number => {
    const percent = (originalPrice - salePrice) / originalPrice * 100;
    return Math.round(percent);
}

export const sumOriginalPrice = (cart: CartCourse[]): string => {
    return cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('vi-VN');
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
        (courseSort !== "price" &&
            courseSort !== "updatedAt" &&
            courseSort !== "purchaser" &&
            courseSort !== "rate")
    ) {
        return "updatedAt";
    }
    return courseSort;
}

export const displayProgressbar = (status: number, course: CourseResponse): React.ReactNode => {
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
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`} className='text-nowrap inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-gray-300 hover:text-purple-500'>
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
                <Link href={`/course/learning/${slugifyText(course.courseName + "-" + course.courseId)}`} className='text-nowrap inline-flex items-center gap-x-1 transition-all duration-200 cursor-pointer text-purple-400 hover:text-green-500'>
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

export const calculateCourseSalePrice = (course: CourseResponse) => {
    const campaign = course.campaign;
    let salePrice = 0;
    if (campaign && !dayjs(campaign.startTime).isAfter(dayjs()) && dayjs(campaign.endTime).isAfter(dayjs())) {
        salePrice = course.price - ((course.price * campaign.discountPercentage) / 100)
    }
    return salePrice;
}


