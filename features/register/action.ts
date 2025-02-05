'use server'

import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

export interface RegisterFieldResponse {
    fullname: ErrorResponse,
    email: ErrorResponse;
    password: ErrorResponse;
    rePassword: ErrorResponse;
    ok: boolean;
}
export const validateRegisterForm = async (prev: any, formData: FormData): Promise<RegisterFieldResponse> => {
    const fullname = formData.get('fullname')?.toString() || "";
    const email = formData.get('email')?.toString() || "";
    const password = formData.get('password')?.toString() || "";
    const rePassword = formData.get('rePassword')?.toString() || "";

    const result: RegisterFieldResponse = {
        fullname: {
            error: false,
            value: fullname
        },
        email: {
            error: false,
            value: email
        },
        password: {
            error: false,
            value: password
        },
        rePassword: {
            error: false,
            value: rePassword
        },
        ok: false
    }

    const fullnameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (fullname.trim() === "") {
        result.fullname.error = true;
        result.fullname.message = "Vui lòng không để trống họ và tên!";
    } else if (!fullnameRegex.test(fullname)) {
        result.fullname.error = true;
        result.fullname.message = "Họ và tên chỉ được chứa chữ cái!";
    }

    if (email.trim() === "") {
        result.email.error = true;
        result.email.message = "Vui lòng không để trống email!";
    } else if (!emailRegex.test(email)) {
        result.email.error = true;
        result.email.message = "Email không đúng định dạng!";
    }

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
    }

    if (result.fullname.error || result.email.error || result.password.error || result.rePassword.error) {
        return result;
    }

    const registerRequest: RegisterRequest = {
        fullname: fullname,
        email: email,
        password: password
    };

    const registerResponse = await sendRequest<ApiResponse<void>>({
        url: `${apiUrl}/users/request_register`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: registerRequest
    });

    if (registerResponse.status !== 200) {
        result.email.error = true;
        result.email.message = registerResponse.message.toString();
    } else {
        result.ok = true;
    }

    return result;
}