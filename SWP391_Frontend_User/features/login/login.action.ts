'use server'

export interface LoginFieldResponse {
    username: {
        error: boolean;
        value: string;
        message?: string;
    },
    password: {
        error: boolean;
        value: string;
        message?: string;
    }
}
export const validateLoginForm = async (prev: any, formData: FormData): Promise<LoginFieldResponse> => {
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    const fieldResponse: LoginFieldResponse = {
        username: {
            error: false,
            value: username || "",
        },
        password: {
            error: false,
            value: password || "",
        }
    };

    if (!username || username.trim().length === 0) {
        fieldResponse.username = {
            error: true,
            value: username || "",
            message: 'Vui lòng không để trống tên tài khoản!'
        };
    }

    if (!password || password.trim().length === 0) {
        fieldResponse.password = {
            error: true,
            value: password || "",
            message: 'Vui lòng không để trống mật khẩu!'
        };
    }

    return fieldResponse;
};
