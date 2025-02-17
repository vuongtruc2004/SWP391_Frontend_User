export const sumSalePrice = (cart: CartCourse[]): string => {
    return cart.reduce((sum, item) => sum + item.salePrice, 0).toLocaleString('vi-VN');
}

export const sumOriginalPrice = (cart: CartCourse[]): string => {
    return cart.reduce((sum, item) => sum + item.originalPrice, 0).toLocaleString('vi-VN');
}

export const savePrice = (cart: CartCourse[]): string => {
    return cart.reduce((sum, item) => sum + (item.originalPrice - item.salePrice), 0).toLocaleString('vi-VN');
}