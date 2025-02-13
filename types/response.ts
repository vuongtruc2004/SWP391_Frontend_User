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

    interface CourseDetailsResponse extends CourseResponse {
        objectives: string[];
        accepted: boolean;
        subjects: SubjectResponse[];
        lessons: LessonResponse[];
        totalLikes: number;
        totalComments: number;
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
        diploma: string;
        yearOfExperience: string;
        totalCourses: number;
        user: UserResponse;
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

    interface SubjectResponse {
        subjectId: number;
        subjectName: string;
        description: string;
        thumbnail: string;
        totalCourses: number;
    }
}