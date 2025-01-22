export { }
declare global {
    interface UserResponse {
        userId?: number;
        username: string;
        password: string;
        rePassword: string;
        phone: string;
        avatar?: string;
        fullname: string;
        email: string;
        gender: string;
        dob?: string;
    }
    interface RestResponse<T> {
        statusCode: number;
        errorMessage: string;
        message: object;
        data: T;
    }
}