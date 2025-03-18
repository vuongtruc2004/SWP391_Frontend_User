import { Box } from "@mui/material"
import './style.scss'
import { formatDateTime } from "@/helper/blog.helper"
import { formatSalePrice } from "@/helper/course.list.helper"

const SingleCoupon = ({ coupon }: { coupon: CouponResponse }) => {
    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            columnGap: '20px'
        }}>
            <div className="relative bg-[#101010] w-[118px] h-[116px]">
                <div className="P8Mfoo">
                    <div className="PcmVqR" />
                </div>
            </div>

            <div>
                <div className="flex items-center gap-x-2 font-semibold">
                    <p>Giảm {coupon.discountType === 'FIXED' ? `₫${formatSalePrice(coupon.discountValue)}` : `${coupon.discountValue}%`}</p>
                    {coupon.maxDiscountAmount && (
                        <>
                            <p>|</p>
                            <p>Giảm tối đa ₫{formatSalePrice(coupon.maxDiscountAmount)}</p>
                        </>
                    )}
                </div>

                <p className="text-gray-300">Đơn tối thiểu ₫{formatSalePrice(coupon.minOrderValue)}</p>
                <p className="text-sm text-gray-300 flex items-center gap-x-2">
                    <span>Hạn sử dụng:</span>
                    <span>{formatDateTime(coupon.endTime)}</span>
                    <span>|</span>
                    <span className="text-blue-500 cursor-pointer hover:underline font-semibold">Điều kiện</span>
                </p>
            </div>
        </Box>
    )
}

export default SingleCoupon