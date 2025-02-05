'use server'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

interface EmailFieldResponse {
    email: ErrorResponse,
    ok: boolean;
    message?: string;
}
export const sendEmail = async (prev: any, formData: FormData): Promise<EmailFieldResponse> => {
    const email = formData.get('email')?.toString() || "";
    const result: EmailFieldResponse = {
        email: {
            error: false,
            value: email,
        },
        ok: false,
    }

    if (email.trim() === "") {
        result.email.error = true;
        result.email.message = 'Vui lòng không để trống email!';
        return result;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        result.email.error = true;
        result.email.message = 'Email không đúng định dạng!';
        return result;
    }

    const emailResponse = await sendRequest<ApiResponse<void>>({
        url: `${apiUrl}/users/request_change_password`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            email: email
        }
    });

    if (emailResponse.status === 200) {
        result.ok = true;
    } else {
        result.message = emailResponse.errorMessage;
    }
    return result;
}

interface PasswordFieldResponse {
    password: ErrorResponse;
    rePassword: ErrorResponse;
    ok: boolean;
    message?: string;
}
export const sendChangePasswordRequest = async (code: string, prev: any, formData: FormData): Promise<PasswordFieldResponse> => {
    const password = formData.get("password")?.toString() || "";
    const rePassword = formData.get("rePassword")?.toString() || "";

    const result: PasswordFieldResponse = {
        password: {
            error: false,
            value: password,
        },
        rePassword: {
            error: false,
            value: rePassword
        },
        ok: false
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password.trim() === "") {
        result.password.error = true;
        result.password.message = "Vui lòng không để trống mật khẩu!";
    } else if (!passwordRegex.test(password)) {
        result.password.error = true;
        result.password.message = "Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm chữ cái và số!";
    }

    if (rePassword.trim() === "") {
        result.rePassword.error = true;
        result.rePassword.message = "Vui lòng không để trống mật khẩu!";
    }

    if (result.password.error || result.rePassword.error) {
        return result;
    }

    if (password !== rePassword) {
        result.rePassword.error = true;
        result.rePassword.message = "Mật khẩu không trùng khớp!";
        return result;
    }

    const changePasswordRequest: ChangePasswordRequest = {
        code: code,
        password: password,
        rePassword: rePassword
    }
    const sendChangePasswordResponse = await sendRequest<ApiResponse<void>>({
        url: `${apiUrl}/users/change_password`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: changePasswordRequest
    });

    if (sendChangePasswordResponse.status === 200) {
        result.ok = true;
    } else {
        result.message = sendChangePasswordResponse.message.toString();
    }
    return result;
}