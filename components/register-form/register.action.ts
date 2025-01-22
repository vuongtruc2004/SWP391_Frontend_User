'use server'
import { apiUrl } from "@/utils/url";

export const handleRegister = async (prevState: any, formData: FormData) => {
    console.log('checkFormData: ', formData)
    const userRequest: UserRequest = {
        fullname: formData.get('fullname')?.toString()!,
        dob: formData.get('dob')?.toString()!,
        gender: formData.get('gender')?.toString().toUpperCase()!,
        phone: formData.get('phone')?.toString()!,
        email: formData.get('email')?.toString()!,
        username: formData.get('username')?.toString()!,
        password: formData.get('password')?.toString()!,
        rePassword: formData.get('rePassword')?.toString()!,
    }

    const responseRaw = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userRequest)
    });

    const response: ApiResponse<any> = await responseRaw.json();
    if (response.statusCode === 201) {
        return {
            path: '/login'
        };
    }
    return {
        password: {
            message: response.data.password,
            value: userRequest.password,
            error: true
        },

        email: {
            message: response.data.email,
            value: userRequest.email,
            error: true
        },

    }

    // console.log('Check Response: ', response)

    // console.log('checkRequest: ', userRequest)
    // await new Promise(res => setTimeout(res, 5000))
}