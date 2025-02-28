export const sumOriginalPrice = (cart: CartCourse[]): string => {
    return cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('vi-VN');
}