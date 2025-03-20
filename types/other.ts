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
        price: number;
        author: string;
        buyLater: boolean;
    }
}