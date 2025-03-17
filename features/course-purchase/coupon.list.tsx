import { Box, Button, CircularProgress, Dialog, DialogContent, Divider, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import SingleCoupon from "./single.coupon";

const CouponList = ({ open, setOpen, courseIds }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    courseIds: number[];
}) => {
    const [coupons, setCoupons] = useState<CouponResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await sendRequest<ApiResponse<CouponResponse[]>>({
                url: `${apiUrl}/coupons/available`,
                queryParams: {
                    courseIds: courseIds
                }
            });
            if (response.status === 200) {
                setCoupons(response.data);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <Dialog open={open} sx={{
            '.mui-16bx961-MuiPaper-root-MuiDialog-paper': {
                width: '580px',
                boxShadow: 'none',
                backgroundImage: 'none'
            }
        }}>
            <DialogContent sx={{
                bgcolor: '#101010',
                borderRadius: '6px',
                padding: 0
            }}>
                <div className="flex items-center justify-between p-5">
                    <h1 className="font-semibold text-lg">Chọn hoặc nhập mã giảm giá</h1>
                    <CloseIcon sx={{ fontSize: '1.25rem' }} className="transition-all duration-300 hover:text-gray-300 cursor-pointer" onClick={() => setOpen(false)} />
                </div>

                <Divider />

                <div className="flex items-start justify-between gap-x-3 p-5">
                    <form action="" className="flex-1">
                        <TextField
                            placeholder="Nhập mã giảm giá"
                            fullWidth
                            size="small"
                        />
                    </form>
                    <Button variant="contained" color="warning" sx={{ height: '40px' }}>
                        Áp Dụng
                    </Button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="px-5">
                        <h2 className="text-lg font-semibold">Mã giảm giá có thể áp dụng cho hóa đơn này ({coupons.length})</h2>
                        <p className="text-gray-300 mb-5">Có thể chọn 1 mã</p>

                        <div className="flex flex-col gap-y-5">
                            {coupons.map(coupon => {
                                return (
                                    <SingleCoupon coupon={coupon} key={coupon.couponId + "_" + coupon.couponCode} />
                                )
                            })}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-end gap-x-3 p-5">
                    <Button variant="outlined" color="secondary" startIcon={<CloseIcon />} onClick={() => setOpen(false)}>
                        Hủy
                    </Button>
                    <Button variant="contained" color="warning">
                        Áp Dụng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CouponList