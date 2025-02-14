import { formatPrice, getSalePercent } from "@/helper/course.list.helper";
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatCreateDate } from "@/helper/blog.helper";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LoopIcon from '@mui/icons-material/Loop';
import { countTotalTime } from "@/helper/course.details.helper";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PlayLessonOutlinedIcon from '@mui/icons-material/PlayLessonOutlined';
import StayCurrentPortraitOutlinedIcon from '@mui/icons-material/StayCurrentPortraitOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import { AnimationCounter } from "@/components/course/course-content/animation.counter";

const CoursePurchase = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-end gap-x-2">
                    <h1 className='text-3xl font-semibold'>{formatPrice(course.salePrice)}<span className="text-sm">đ</span></h1>
                    {course.salePrice !== course.originalPrice && (
                        <p className='line-through text-gray-400'>{formatPrice(course.originalPrice)}đ</p>
                    )}
                </div>
                {course.salePrice !== course.originalPrice && (
                    <p className="px-3 py-2 bg-green-700 text-sm rounded-md">-{getSalePercent(course)}%</p>
                )}
            </div>

            <ul className="grid grid-cols-3 my-3 text-sm">
                <li className="flex items-center gap-x-2 px-3 rounded-tl-lg rounded-bl-lg border border-[#343a40] py-1.5">
                    <PlayLessonOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                    <div>
                        <p className="text-gray-300">Chương</p>
                        <AnimationCounter from={0} to={course.lessons.length} />
                    </div>
                </li>
                <li className="flex items-center gap-x-2 px-3 border-t border-b border-[#343a40] py-1.5">
                    <HowToRegOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                    <div>
                        <p className="text-gray-300">Đăng kí</p>
                        <AnimationCounter from={0} to={course.totalPurchased} />
                    </div>
                </li>
                <li className="flex items-center gap-x-2 px-3 rounded-tr-lg rounded-br-lg border border-[#343a40] py-1.5">
                    <ThumbUpOffAltIcon sx={{ fontSize: '1.25rem' }} />
                    <div>
                        <p className="text-gray-300">Lượt thích</p>
                        <AnimationCounter from={0} to={course.totalLikes} />
                    </div>
                </li>
            </ul>

            <ul className="text-sm">
                <li className="flex items-center gap-x-2 py-1.5">
                    <StayCurrentPortraitOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Truy cập trên thiết bị di động và TV</p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <AccessTimeIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Tổng thời lượng: <span className="font-semibold text-green-500">{countTotalTime(course)}</span></p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <AllInclusiveOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Quyền truy cập đầy đủ suốt đời</p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <LoopIcon sx={{ fontSize: '1.2rem' }} />
                    <p>Cập nhật lần cuối: <span className="font-semibold text-purple-300">{formatCreateDate(course.updatedAt)}</span></p>
                </li>
            </ul>

            <Button variant="outlined" color="secondary" fullWidth startIcon={<AddShoppingCartIcon />} sx={{
                marginBlock: '10px 12px'
            }}>
                Thêm vào giỏ hàng
            </Button>

            <Button variant="contained" color="primary" fullWidth startIcon={<LocalMallOutlinedIcon />}>
                Mua ngay
            </Button>
        </>
    )
}

export default CoursePurchase