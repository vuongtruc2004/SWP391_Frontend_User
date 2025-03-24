import dayjs from "dayjs";

export const getSalePercent = (originalPrice: number, salePrice: number): number => {
    const percent = (originalPrice - salePrice) / originalPrice * 100;
    return Math.round(percent);
}

export const sumOriginalPrice = (cart: CartCourse[]): string => {
    return cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('vi-VN');
}

export const getInputPrice = (price: any): string => {
    if (!price || price.trim() === "") {
        return "";
    }
    const cleanedPrice = price.replace(/[.,]/g, '');

    if (!/^\d+$/.test(cleanedPrice)) {
        return "";
    }

    return cleanedPrice + "000";
}

export const getCourseSort = (courseSort: string): string => {
    if (!courseSort ||
        (courseSort !== "price" &&
            courseSort !== "updatedAt" &&
            courseSort !== "purchaser" &&
            courseSort !== "rate")
    ) {
        return "updatedAt";
    }
    return courseSort;
}

export const calculateCourseSalePrice = (course: CourseResponse | CartCourse, campaign: CampaignResponse) => {
    if (campaign && !dayjs(campaign.startTime).isAfter(dayjs()) && dayjs(campaign.endTime).isAfter(dayjs())) {
        return course.price - ((course.price * campaign.discountPercentage) / 100)
    } else {
        return course.price;
    }
}