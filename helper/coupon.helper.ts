export const countDiscountValue = (coupon: CouponResponse, totalPrice: number): number => {
    if (coupon.discountType === 'FIXED') return parseFloat(coupon.discountValue.toFixed(3));

    const discountAmount = (coupon.discountPercent * totalPrice) / 100;
    const finalDiscount = coupon.maxDiscountAmount ? Math.min(coupon.maxDiscountAmount, discountAmount) : discountAmount;

    return parseFloat(finalDiscount.toFixed(3));
};

export const optimizeDisplayCoupons = (coupons: CouponResponse[], totalPrice: number): CouponResponse[] => {
    const availableCoupons: CouponResponse[] = [];
    const notAvailableCoupons: CouponResponse[] = [];

    coupons.forEach(coupon => {
        if (!coupon.minOrderValue || coupon.minOrderValue <= totalPrice) {
            availableCoupons.push(coupon);
        } else {
            notAvailableCoupons.push(coupon);
        }
    });

    availableCoupons.sort((c1, c2) => countDiscountValue(c2, totalPrice) - countDiscountValue(c1, totalPrice));
    notAvailableCoupons.sort((c1, c2) => countDiscountValue(c2, totalPrice) - countDiscountValue(c1, totalPrice));

    return [...availableCoupons, ...notAvailableCoupons];
};

