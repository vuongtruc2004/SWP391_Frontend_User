export const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN');
};

export const getOriginalPrice = (price: number): string => {
    const originalPrice = price + price * 30 / 100;
    return originalPrice.toLocaleString('vi-VN');
}