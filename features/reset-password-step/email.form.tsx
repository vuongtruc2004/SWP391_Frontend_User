import { Button, TextField } from "@mui/material";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SetStateAction, useActionState, useEffect } from "react";
import { sendEmail } from "./action";

const EmailForm = (props: { setStep: React.Dispatch<SetStateAction<number>>, setEmail: React.Dispatch<SetStateAction<string>> }) => {
    const { setStep, setEmail } = props;
    const [state, formAction, pending] = useActionState(sendEmail, null);

    useEffect(() => {
        if (state?.ok) {
            setStep(prev => prev + 1);
            setEmail(state.email.value);
        }
    }, [state]);

    return (
        <>
            <div className="flex justify-center mb-2">
                <span className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-[15px] border border-gray-500">
                    <LockResetOutlinedIcon sx={{ fontSize: '2.25rem' }} />
                </span>
            </div>

            <h1 className="text-2xl text-center font-semibold">Quên mật khẩu?</h1>
            <p className="text-center text-gray-300 mb-5">Vui lòng nhập email để tìm kiếm tài khoản.</p>

            <form action={formAction}>
                <div className="mb-5">
                    <label className="block mb-1"><span className='text-red-500 mr-1'>*</span>Email:</label>
                    <TextField
                        placeholder="Nhập email"
                        size="small"
                        name="email"
                        fullWidth
                        type="text"
                        error={state?.email.error}
                        helperText={state?.email.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.email.message}
                            </span>
                        )}
                        defaultValue={state?.email.value}
                    />
                </div>
                <Button loading={pending} type="submit" variant="contained" color="primary" fullWidth endIcon={<ArrowRightIcon />} sx={{ textTransform: 'none' }}>
                    Gửi mã OTP
                </Button>
                {(state && !state.ok && state.message) && (
                    <p className='text-red-500 text-sm mt-2 ml-2 flex items-center gap-x-1'>
                        <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                        {state?.message}
                    </p>
                )}
            </form>
        </>
    )
}

export default EmailForm