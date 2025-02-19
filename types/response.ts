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
        originalPrice: number;
        salePrice: number;
        expert: ExpertResponse;
        totalPurchased: number;
        createdAt: string;
        updatedAt: string;
    }

    interface CourseStatusResponse {
        courseId: number;
        completionPercentage: number;
    }

    interface CourseDetailsResponse extends CourseResponse {
        introduction: string;
        objectives: string[];
        accepted: boolean;
        expert: ExpertDetailsResponse;
        subjects: SubjectResponse[];
        lessons: LessonResponse[];
        averageRating: number;
        totalRating: number;
    }

    interface DocumentResponse {
        documentId: number;
        title: string
        content: string
        plainContent: string;
        createdAt: string;
        updatedAt: string;
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
    }

    interface VideoResponse {
        videoId: number;
        title: string;
        description: string;
        videoUrl: string;
        duration: number;
        createdAt: string;
        updatedAt: string;
    }
    interface LessonResponse {
        lessonId: number;
        title: string;
        description: string;
        videos: VideoResponse[];
        documents: DocumentResponse[];
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

    interface OrderResponse {

    }
}