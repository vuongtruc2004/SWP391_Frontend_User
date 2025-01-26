'use server'

export interface FieldResponse {
    username?: {
        error: boolean;
        value: string;
        message?: string;
    },
    password?: {
        error: boolean;
        value: string;
        message?: string;
    }
}
export const validateLoginForm = async (prev: any, formData: FormData): Promise<FieldResponse> => {
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    const fieldResponse: FieldResponse = {}

    if (!username || username.length === 0) {
        fieldResponse.username = {
            error: true,
            value: username || "",
            message: 'Vui lòng không để trống tên tài khoản!'
        };
    } else {
        fieldResponse.username = {
            error: false,
            value: username
        }
    }

    if (!password || password.length === 0) {
        fieldResponse.password = {
            error: true,
            value: password || "",
            message: 'Vui lòng không để trống mật khẩu!'
        };
    } else {
        fieldResponse.password = {
            error: false,
            value: password
        }
    }
    return fieldResponse;
}