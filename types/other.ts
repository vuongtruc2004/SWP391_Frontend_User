export { }

declare global {
    interface BlogFilter {
        key: string;
        name: string;
        icon?: React.ReactNode;
    }

    interface CartCourse {
        courseId: number;
        courseName: string;
        thumbnail: string;
        salePrice: number;
        originalPrice: number;
        averageRating: number;
        totalRating: number;
        totalLessons: number;
        totalTime: string;
        totalPurchased: number;
        author: string;
    }
}