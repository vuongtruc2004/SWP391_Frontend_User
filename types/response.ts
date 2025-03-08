export { }
declare global {
    interface UserResponse {
        userId: number;
        password: string;
        rePassword: string;
        phone: string;
        avatar: string;
        fullname: string;
        email: string;
        gender: string;
        dob: string;
        accountType: string;
        createdAt: string;
        updatedAt: string;
    }
    interface ApiResponse<T> {
        status: number;
        errorMessage: string;
        message: object;
        data: T;
    }

    interface ErrorResponse {
        error: boolean;
        value: string;
        message?: string;
    }

    interface LoginResponse {
        user: UserResponse;
        accessToken: string;
        expireAt: string;
        refreshToken: string;
    }

    interface PageDetailsResponse<T> {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalElements: number;
        content: T;
    }

    interface BlogResponse {
        blogId: number;
        title: string;
        content: string;
        thumbnail: string;
        createdAt: string;
        updatedAt: string;
        published: boolean;
        accepted: boolean;
        totalLikes: number;
        totalComments: number;
        user: UserResponse;
        hashtags: HashtagResponse[];
    }

    interface HashtagResponse {
        tagId: number;
        tagName: string;
    }

    interface CourseResponse {
        courseId: number;
        courseName: string;
        description: string;
        thumbnail: string;
        introduction: string;
        price: number;
        expert: ExpertResponse;
        totalPurchased: number;
        totalLessons: number;
        createdAt: string;
        updatedAt: string;
    }

    interface CourseDetailsResponse extends CourseResponse {
        introduction: string;
        objectives: string[];
        accepted: boolean;
        expert: ExpertDetailsResponse;
        subjects: SubjectResponse[];
        chapters: ChapterResponse[];
        averageRating: number;
        totalRating: number;
    }

    interface ChapterResponse {
        chapterId: number;
        title: string;
        description: string;
        lessons: LessonResponse[];
    }

    interface LessonResponse {
        lessonId: number;
        title: string;
        description: string;
        duration: number;
        createdAt: string;
        updatedAt: string;
        lessonType: "VIDEO" | "DOCUMENT";
        videoUrl: string | null;
        documentContent: string | null;
    }

    interface ExpertResponse {
        expertId: number;
        user: UserResponse;
        totalCourses: number;
    }

    interface ExpertDetailsResponse extends ExpertResponse {
        achievement: string;
        job: string;
        description: string;
        yearOfExperience: string;
        totalStudents: number;
        totalFollowers: number;
    }

    interface RateResponse {
        rateId: number;
        content: string;
        stars: number;
        createdAt: string;
        updatedAt: string;
        user: UserResponse;
    }

    interface SubjectResponse {
        subjectId: number;
        subjectName: string;
        description: string;
        thumbnail: string;
        totalCourses: number;
    }

    interface UserProgressResponse {
        progressId: number;
        userId: number;
        courseId: number;
        chapterId: number;
        lessonId: number;
    }

    interface UserNotificationResponse {
        userNotificationId: number;
        user: UserResponse;
        notification: NotificationResponse;
        isRead: boolean;
    }

    interface NotificationResponse {
        notificationId: number;
        title: string;
        content: string;
        createdAt: string;
    }

    interface PurchaseResponse {
        order: OrderResponse;
        redirectUrl: string;
    }

    interface OrderResponse {
        orderId: number;
        orderCode: string;
        orderStatus: string;
        createdAt: string;
        updatedAt: string;
        expiredAt: string;
        userId: number;
        orderDetails: OrderDetailsResponse[];
    }

    interface OrderDetailsResponse {
        orderDetailsId: number;
        courseId: number;
    }

    interface ChatResponse {
        chatId: number;
        title: string;
        createdAt: string;
        messages: MessageResponse[];
    }

    interface ChatHistoryResponse {
        todayChats: {
            chatId: number;
            title: string;
        }[];
        yesterdayChats: {
            chatId: number;
            title: string;
        }[];
        weekAgoChats: {
            chatId: number;
            title: string;
        }[];
    }

    interface MessageResponse {
        content: string;
        role: "USER" | "MODEL" | "FUNCTION" | "SYSTEM";
    }
}