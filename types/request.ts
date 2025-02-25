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

    interface OrderRequest {
        userId: number;
        email: string;
        fullname: string;
        gender: string;
        courses: {
            courseId: number;
            courseName: string;
            thumbnail: string;
            expertName: string;
            price: number;
        }[];
    }

    interface UserProgressRequest {
        courseId: number;
        lessonId: number;
        videoId: number | null;
        documentId: number | null;
    }
}