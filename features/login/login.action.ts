'use server'

interface LoginFieldResponse {
    email: ErrorResponse;
    password: ErrorResponse;
}
export const validateLoginForm = async (prev: any, formData: FormData): Promise<LoginFieldResponse> => {
    const email = formData.get('email')?.toString() || "";
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim().length === 0) {
        result.email = {
            error: true,
            value: email,
            message: 'Vui lòng không để trống email!'
        };
    } else if (!emailRegex.test(email)) {
        result.email.error = true;
        result.email.message = "Email không đúng định dạng!";
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
