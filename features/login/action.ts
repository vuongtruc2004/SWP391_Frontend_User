'use server'

interface LoginFieldResponse {
    email: ErrorResponse;
    password: ErrorResponse;
}
export const validateLoginForm = async (prev: any, formData: FormData): Promise<LoginFieldResponse> => {
    let email = formData.get('email')?.toString() || "";
    const password = formData.get('password')?.toString() || "";
    const result: LoginFieldResponse = {
        email: {
            error: false,
            value: email,
        },
        password: {
            error: false,
            value: password,
        }
    };

    if (email.trim().length === 0) {
        result.email = {
            error: true,
            value: email,
            message: 'Vui lòng không để trống email!'
        };
    }

    if (password.trim().length === 0) {
        result.password = {
            error: true,
            value: password,
            message: 'Vui lòng không để trống mật khẩu!'
        };
    }

    return result;
};
