import { Box } from "@mui/material"
import './style.scss'

const SingleCoupon = ({ coupon }: { coupon: CouponResponse }) => {
    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            position: 'relative'
        }}>
            <div className="relative bg-[#101010] w-[118px] h-[116px]">
                <div className="P8Mfoo">
                    <div className="PcmVqR" />
                </div>
            </div>

            <div className="cnFM7k">
                <div>3</div>
            </div>
        </Box>
    )
}

export default SingleCoupon