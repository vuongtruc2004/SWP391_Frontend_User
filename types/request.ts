export { }
declare global {
    interface UserRequest {
        userId?: number;
        password?: string;
        rePassword?: string;
        phone?: string;
        avatar?: string;
        fullname?: string;
        email?: string;
        gender?: string;
        dob?: string;
    }

    interface UpdateUserRequest {
        userId: number,
        fullname: string,
        dob: string | null,
        gender: string | null,
    }

    interface CredentialsLoginRequest {
        email: string;
        password: string;
        courseIds: number[];
    }

    interface SocialsLoginRequest {
        fullname: string;
        avatar: string;
        email: string;
        accountType: string;
    }

    interface ChangePasswordRequest {
        code: string;
        password: string;
        rePassword: string;
    }

    interface EmailRequest {
        email: string;
    }

    interface RegisterRequest {
        fullname: string;
        email: string;
        password: string;
    }

    interface UserProgressRequest {
        courseId: number;
        chapterId: number;
        lessonId: number;
    }

    interface CreateMessageRequest {
        chatId: number | null;
        messages: {
            content: string;
            role: "USER" | "MODEL" | "FUNCTION" | "SYSTEM";
        }[];
    }

    interface RateRequest {
        content: string;
        stars: number | null;
        courseId?: number;
    }

    interface LikeRequest {
        blogId: number | undefined,
        commentId: number | undefined,
    }

    interface CommentRequest {
        content: string,
        blog: number,
        parentComment: number | null,
    }

    interface QuizAttemptRequest {
        quizAttemptId: number;
        userAnswers: UserAnswerRequest[];
    }

    interface UserAnswerRequest {
        questionId: number;
        answerIds: number[];
    }

    interface CampaignRequest {
        campaignId?: number;
        campaignName: string;
        campaignDescription: string;
        discountPercentage?: number;
        discountType: string;
        discountRange: string;
        thumbnail: string;
        startTime: string;
        endTime: string;
        courseIds?: number[];
    }

    interface StorageCourseRequest {
        courseId: number;
        status: "NOW" | "LATER"
    }

    interface OrderRequest {
        courseIds: number[];
        couponId: number | null;
    }
}