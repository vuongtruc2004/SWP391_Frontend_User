import { Box, Checkbox } from "@mui/material"
import './style.scss'
import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import { storageUrl } from "@/utils/url";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { GradientLinearProgress } from "@/components/course/course-slider/custom.progress"
import { displayCouponNotOKStatus, getCouponStatus } from "@/helper/coupon.helper";
import { formatSalePrice } from "@/helper/course.list.helper";
import { formatDateTime } from "@/helper/blog.helper";

const SingleCoupon = ({ coupon, selectedCoupon, setSelectedCoupon, totalPrice }: {
    coupon: CouponResponse,
    selectedCoupon: CouponResponse | null,
    setSelectedCoupon: Dispatch<SetStateAction<CouponResponse | null>>;
    totalPrice: number;
}) => {
    const couponStatus = getCouponStatus(coupon, totalPrice);
    return (
        <div>
            <Box sx={{
                bgcolor: 'black',
                borderRadius: '6px',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: '10px',
                opacity: couponStatus === "ok" ? 1 : 0.5,
                pointerEvents: couponStatus === "ok" ? 'all' : 'none'
            }}>
                <div className="flex items-center gap-x-5">
                    <div className="relative bg-[#101010] w-[118px] h-[116px]">
                        <div className="P8Mfoo">
                            <div className="PcmVqR flex items-center justify-center">
                                <div className="flex items-center justify-center flex-col gap-y-2">
                                    <Image src={`${storageUrl}/icon/voucher_white.png`} alt="Logo" width={40} height={40} sizes="(max-width: 1000px) 100vw" priority={true} style={{
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                        objectPosition: 'center',
                                        cursor: 'pointer'
                                    }} />
                                    <p className="font-semibold">{coupon.couponCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-x-2 font-semibold">
                            <p>Giảm {coupon.discountType === 'FIXED' ? `₫${formatSalePrice(coupon.discountAmount)}` : `${coupon.discountPercent}%`}</p>
                            {coupon.maxDiscountAmount && (
                                <>
                                    <p>|</p>
                                    <p>Giảm tối đa ₫{formatSalePrice(coupon.maxDiscountAmount)}</p>
                                </>
                            )}
                        </div>

                        <p className="text-gray-300 mb-2">Đơn tối thiểu <span className="font-semibold">₫{formatSalePrice(coupon?.minOrderValue || 0)}</span></p>

                        {coupon.usedCount >= 1 && (
                            <GradientLinearProgress variant="determinate" value={coupon.usedCount / coupon.maxUses * 100} height={4} />
                        )}

                        <div className="flex items-center gap-x-1 text-gray-300 text-sm mt-1">
                            {coupon.usedCount >= 1 && (
                                <p>Đã sử dụng {Math.round(coupon.usedCount / coupon.maxUses * 100)}%,</p>
                            )}
                            <p className="text-gray-300">HSD: {formatDateTime(coupon.endTime)}</p>
                        </div>
                    </div>
                </div>

                <Checkbox
                    checked={selectedCoupon !== null && selectedCoupon.couponId === coupon.couponId}
                    onChange={() => selectedCoupon !== null && selectedCoupon.couponId === coupon.couponId ? setSelectedCoupon(null) : setSelectedCoupon(coupon)}
                    icon={<CircleOutlinedIcon className="text-gray-300" />}
                    checkedIcon={<RadioButtonCheckedOutlinedIcon className="text-[#ee4d2d]" />}
                />
            </Box >
            {displayCouponNotOKStatus(coupon, totalPrice, couponStatus)}
        </div>
    )
}

export default SingleCoupon