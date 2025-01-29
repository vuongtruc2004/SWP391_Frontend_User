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
        accountType: string;
    }
    interface ApiResponse<T> {
        status: number;
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
        totalLikes: number;
        totalComments: number;
        user: UserResponse;
        hashtags: HashtagResponse[];
    }

    interface HashtagResponse {
        tagId: number;
        tagName: string;
    }
}