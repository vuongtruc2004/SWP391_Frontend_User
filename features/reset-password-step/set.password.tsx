import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { SetStateAction, useActionState, useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { sendChangePasswordRequest } from "./action";

const SetPassword = ({ setStep, code }: { setStep: React.Dispatch<SetStateAction<number>>, code: string }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const sendChangePasswordRequestExpand = sendChangePasswordRequest.bind(null, code);
    const [state, formAction, pending] = useActionState(sendChangePasswordRequestExpand, null);

    useEffect(() => {
        if (state && state.ok) {
            setStep(prev => prev + 1);
        }
    }, [state]);

    return (
        <>
            <div className="flex justify-center mb-2">
                <span className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-[15px] border border-gray-500">
                    <KeyboardAltOutlinedIcon sx={{ fontSize: '2.25rem' }} />
                </span>
            </div>

            <h1 className="text-2xl text-center font-semibold">Mật khẩu mới</h1>
            <p className="text-center text-gray-300 mb-5">Vui lòng nhập mật khẩu mới của bạn!</p>

            <form action={formAction}>
                <div className="mb-5">
                    <label className="block mb-1"><span className='text-red-500 mr-1'>*</span>Mật khẩu:</label>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility sx={{ fontSize: '1.2rem', color: '#6c757d' }} /> : <VisibilityOff sx={{ fontSize: '1.2rem', color: '#6c757d' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder='Nhập mật khẩu'
                        autoComplete='password'
                        size='small'
                        name='password'
                        fullWidth
                        defaultValue={state?.password.value}
                        error={state?.password.error}
                        helperText={state?.password.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.password.message}
                            </span>
                        )}
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1"><span className='text-red-500 mr-1'>*</span>Nhập lại mật khẩu:</label>
                    <TextField
                        type={showRePassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowRePassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showRePassword ? <Visibility sx={{ fontSize: '1.2rem', color: '#6c757d' }} /> : <VisibilityOff sx={{ fontSize: '1.2rem', color: '#6c757d' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder='Nhập lại mật khẩu'
                        autoComplete='rePassword'
                        size='small'
                        name='rePassword'
                        fullWidth
                        defaultValue={state?.rePassword.value}
                        error={state?.rePassword.error}
                        helperText={state?.rePassword.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.rePassword.message}
                            </span>
                        )}
                    />
                </div>
                <Button loading={pending} type="submit" variant="contained" color="primary" fullWidth endIcon={<RestartAltOutlinedIcon />} sx={{ textTransform: 'none' }}>
                    Đặt lại mật khẩu
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

export default SetPassword