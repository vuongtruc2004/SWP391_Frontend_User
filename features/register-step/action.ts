'use server'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";

interface InfoFieldResponse {
    fullname: ErrorResponse,
    email: ErrorResponse;
    phone: ErrorResponse;
    dob: ErrorResponse;
    gender: string;
    ok: boolean;
    message?: string;
}
export const validInfoInput = async (prev: any, formData: FormData): Promise<InfoFieldResponse> => {
    const fullname = formData.get('fullname')?.toString() || "";
    const email = formData.get('email')?.toString() || "";
    const phone = formData.get('phone')?.toString() || "";
    const gender = formData.get('gender')?.toString() || "";
    const dob = formData.get('dob')?.toString() || "";

    const result: InfoFieldResponse = {
        fullname: {
            error: false,
            value: fullname
        },
        email: {
            error: false,
            value: email
        },
        phone: {
            error: false,
            value: phone
        },
        dob: {
            error: false,
            value: dob
        },
        gender: gender,
        ok: false
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fullnameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    const phoneRegex = /^(0)(3[2-9]|5[2-9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;

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

    if (phone.trim() === "") {
        result.phone.error = true;
        result.phone.message = "Vui lòng không để trống số điện thoại!";
    } else if (!phoneRegex.test(phone)) {
        result.phone.error = true;
        result.phone.message = "Số điện thoại sai định dạng!";
    }

    dayjs.extend(customParseFormat);
    if (dayjs(dob, 'DD/MM/YYYY').isAfter(dayjs().subtract(7, 'years'))) {
        result.dob.error = true;
        result.dob.message = 'Tuổi đời còn quá trẻ!';
    }

    return result;
}