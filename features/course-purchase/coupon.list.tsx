import { Button, CircularProgress, Dialog, DialogContent, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import SingleCoupon from "./single.coupon";
import dayjs from "dayjs";
import { countDiscountValue } from "@/helper/coupon.helper";
import { formatSalePrice } from "@/helper/course.list.helper";
import ListEmpty from "@/components/empty/list.empty";

const CouponList = ({ open, setOpen, totalPrice, selectedCoupon, setSelectedCoupon }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    totalPrice: number;
    selectedCoupon: CouponResponse | null,
    setSelectedCoupon: Dispatch<SetStateAction<CouponResponse | null>>;
}) => {
    const [coupons, setCoupons] = useState<CouponResponse[]>([]);
    const [searchCode, setSearchCode] = useState("");
    const [loading, setLoading] = useState(true);

    const handleCancel = () => {
        setSearchCode("");
        setSelectedCoupon(null);
        setOpen(false);
    }

    const handleSearchCoupon = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get('keyword')?.toString() || "";
        setSearchCode(keyword);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await sendRequest<ApiResponse<CouponResponse[]>>({
                url: `${apiUrl}/coupons/available`,
                queryParams: {
                    searchCode: searchCode
                }
            });
            if (response.status === 200) {
                setCoupons(response.data);
            }
            setLoading(false);
        }
        fetchData();
    }, [searchCode]);

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
                padding: '20px'
            }}>
                <h1 className="font-semibold text-lg text-center">Chọn hoặc nhập mã giảm giá</h1>

                <form className="flex items-start gap-x-3 my-3" onSubmit={handleSearchCoupon}>
                    <TextField
                        placeholder="Nhập mã giảm giá"
                        fullWidth
                        size="small"
                        name="keyword"
                    />
                    <Button variant="contained" className="text-nowrap h-[40px]" type="submit">
                        Tìm kiếm
                    </Button>
                </form>

                {loading ? (
                    <div className="flex items-center justify-center">
                        <CircularProgress />
                    </div>
                ) : (
                    coupons.length ? (
                        <div className="max-h-[360px] overflow-auto">
                            <h2 className="font-semibold">Mã giảm giá có thể áp dụng cho hóa đơn này ({coupons.length})</h2>
                            <p className="text-gray-300 mb-3">Có thể chọn 1 mã</p>

                            <div className="flex flex-col gap-y-5">
                                {coupons.map(coupon => {
                                    const canApply = !dayjs().isAfter(coupon.endTime) && (!coupon.minOrderValue || totalPrice >= coupon.minOrderValue);
                                    return (
                                        <SingleCoupon
                                            canApply={canApply}
                                            coupon={coupon}
                                            key={coupon.couponId + "_" + coupon.couponCode}
                                            selectedCoupon={selectedCoupon}
                                            setSelectedCoupon={setSelectedCoupon}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <ListEmpty text="Không có mã giảm giá nào" height={280} />
                    )
                )}

                {selectedCoupon && (
                    <p className="mt-3 text-gray-300">Đã áp dụng mã <span className="font-semibold">{selectedCoupon.couponCode}</span>, giảm <span className="text-green-500 font-semibold text-lg">₫{formatSalePrice(countDiscountValue(selectedCoupon, totalPrice))}</span></p>
                )}

                <div className="flex items-center justify-end gap-x-3 mt-3">
                    <Button variant="outlined" color="secondary" startIcon={<CloseIcon />} onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>
                        Áp Dụng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CouponList