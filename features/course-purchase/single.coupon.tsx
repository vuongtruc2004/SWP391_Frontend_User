import { Box, Checkbox, Radio } from "@mui/material"
import './style.scss'
import { formatDateTime } from "@/helper/blog.helper"
import { formatSalePrice } from "@/helper/course.list.helper"
import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import { storageUrl } from "@/utils/url";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

const SingleCoupon = ({ coupon, selectedCoupon, setSelectedCoupon, canApply }: {
    coupon: CouponResponse,
    selectedCoupon: CouponResponse | null,
    setSelectedCoupon: Dispatch<SetStateAction<CouponResponse | null>>;
    canApply: boolean;
}) => {
    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '10px',
            opacity: canApply ? 1 : 0.5,
            pointerEvents: canApply ? 'all' : 'none'
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
                        <p>Giảm {coupon.discountType === 'FIXED' ? `₫${formatSalePrice(coupon.discountValue)}` : `${coupon.discountPercent}%`}</p>
                        {coupon.maxDiscountAmount && (
                            <>
                                <p>|</p>
                                <p>Giảm tối đa ₫{formatSalePrice(coupon.maxDiscountAmount)}</p>
                            </>
                        )}
                    </div>

                    <p className="text-gray-300">Đơn tối thiểu <span className="font-semibold">₫{formatSalePrice(coupon.minOrderValue)}</span></p>

                    <p className="text-gray-300">Hạn sử dụng: <span className="font-semibold text-purple-300">{formatDateTime(coupon.endTime)}</span></p>
                </div>
            </div>

            <Checkbox
                checked={selectedCoupon !== null && selectedCoupon.couponId === coupon.couponId}
                onChange={() => selectedCoupon !== null && selectedCoupon.couponId === coupon.couponId ? setSelectedCoupon(null) : setSelectedCoupon(coupon)}
                icon={<CircleOutlinedIcon className="text-gray-300" />}
                checkedIcon={<RadioButtonCheckedOutlinedIcon className="text-[#ee4d2d]" />}
            />
        </Box>
    )
}

export default SingleCoupon