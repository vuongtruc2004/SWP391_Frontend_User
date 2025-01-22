export { }
declare global {
    interface UserResponse {
        userId: number;
        username: string;
        password: string;
        rePassword: string;
        phone: string;
        avatar: string;
        fullname: string;
        email: string;
        gender: string;
        dob: string;
        refreshToken: string;
    }
    interface ApiResponse<T> {
        statusCode: number;
        errorMessage: string;
        message: object;
        data: T;
    }

    interface LoginResponse {
        user: UserResponse;
        accessToken: string;
        expireAt: string;
        refreshToken: string;
    }
}