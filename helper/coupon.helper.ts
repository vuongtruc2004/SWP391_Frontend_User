export const countDiscountValue = (coupon: CouponResponse, totalPrice: number) => {
    if (coupon.discountType === 'FIXED') {
        return coupon.discountValue;
    } else {
        if (!coupon.maxDiscountAmount) {
            return coupon.discountPercent * totalPrice / 100;
        }
        return Math.min(coupon.maxDiscountAmount, coupon.discountPercent * totalPrice / 100);
    }
}