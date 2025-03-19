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

    interface BlogDetailsResponse extends BlogResponse {
        comments: CommentResponse[],
        likes: LikeResponse[],
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
        totalQuizzes: number;
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
        orderStatus: string;
        orderDetails: OrderDetailsResponse[];
        totalAmount: number;
        course: CourseResponse;
    }

    interface ChapterResponse {
        chapterId: number;
        title: string;
        description: string;
        lessons: LessonResponse[];
        quizInfo: QuizInfoResponse;
    }

    interface QuizInfoResponse {
        quizId: number;
        title: string;
        published: boolean;
        allowSeeAnswers: boolean;
        duration: number;
        description: string;
        updatedAt: string;
        totalQuestions: number;
        chapterId: number;
    }

    interface QuizResponse {
        quizId: number;
        title: string;
        published: boolean;
        allowSeeAnswers: boolean;
        description: string;
        duration: number;
        createdAt: string;
        updatedAt: string;
        questions: QuestionResponse[];
    }

    interface QuizAttemptResponse {

    }

    interface QuestionResponse {
        questionId: number;
        title: string;
        answers: AnswerResponse[];
    }

    interface AnswerResponse {
        answerId: number;
        content: string;
        correct: boolean;
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
        chapterId: number;
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
        lessonId?: number;
        quizId?: number;
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
        orderStatus: "PENDING" | "COMPLETED" | "EXPIRED";
        createdAt: string;
        updatedAt: string;
        expiredAt: string;
        userId: number;
        totalAmount: number;
        orderDetails: OrderDetailsResponse[];
    }

    interface OrderDetailsResponse {
        orderDetailsId: number;
        course: CourseResponse;
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

    interface CouponResponse {
        couponId: number;
        couponName: string;
        couponDescription: string;
        couponCode: string;
        discountType: 'FIXED' | 'PERCENTAGE';
        discountPercent: number;
        discountValue: number;
        maxDiscountAmount: number;
        minOrderValue: number;
        maxUses: number;
        usedCount: number;
        startTime: string;
        endTime: string;
    }

    interface CommentResponse {
        commentId: number,
        content: string,
        createdAt: string,
        updatedAt: string,
        user: UserResponse,
        parentComment: CommentResponse,
        replies: CommentResponse[],
        likes: LikeResponse[],
        blog: BlogResponse,

    }

    interface LikeResponse {
        user: UserResponse,
        blog: BlogResponse,
        comment: CommentResponse,
        createdAt: string,
    }
}