export { }
declare global {
    interface UserRequest {
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
}