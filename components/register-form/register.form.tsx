'use client'
import { Box, Button, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from "next/link";
import './style.scss'
import { handleRegister } from "./register.action";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [isBottom, setIsBottom] = useState(false);

    const [showPassword, setShowPassWord] = useState(false)

    const [showPassword2, setShowPassWord2] = useState(false)

    const [gender, setGender] = useState('male');

    const router = useRouter();

    const [state, formAction, pending] = useActionState(handleRegister, null);

    const handleScroll = (e: any) => {
        const element = e.target;
        const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight;
        setIsBottom(atBottom);
    };

    useEffect(() => {
        if (state?.path) {
            router.push(state.path)
        }
    }, [state])

    return (
        <Box sx={{
            background: 'linear-gradient(to bottom right, #010009, #15171c)',
            color: 'white',
            padding: '40px',
            position: 'relative',
            '.mui-1b1fjlj-MuiFormControl-root-MuiTextField-root': {
                width: '100%'
            },
            '.mui-1odytgm-MuiInputBase-root-MuiOutlinedInput-root': {
                height: '40px'
            },
            '.mui-1ll44ll-MuiOutlinedInput-notchedOutline': {
                borderColor: '#6c757d',
                '&:hover': {
                    borderColor: '#6c757d',
                }
            },
            '.mui-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input, .mui-13meb6w-MuiInputBase-input-MuiOutlinedInput-input, .mui-1dune0f-MuiInputBase-input-MuiOutlinedInput-input': {
                '&::placeholder': {
                    color: '#adb5bd'
                },
                color: 'white'
            },
            '.mui-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.mui-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.mui-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': { color: 'white' },
            borderRadius: '50px 0 0 0',

        }}>
            <div className="div-spin1" />
            <p className="text-center text-3xl font-semibold mb-[20px]">Đăng kí</p>
            <form
                action={formAction}
                className="relative  flex flex-col gap-y-2"
                onScroll={handleScroll}
            >
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Họ và Tên:</label>
                    <TextField
                        placeholder="Nhập họ và tên"
                        type="text"
                        fullWidth
                        size="small"
                        name="fullname"
                    />
                </div>
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Ngày sinh:</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name="dob" format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </div>
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Giới tính:</label>
                    <Select
                        name="gender"
                        sx={{ height: '40px' }}
                        fullWidth
                        value={gender}
                        onChange={(event) => { setGender(event.target.value) }}
                    >
                        <MenuItem value={'male'}>Nam</MenuItem>
                        <MenuItem value={'female'}>Nữ</MenuItem>
                    </Select>
                </div>
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Số điện thoại:</label>
                    <TextField
                        name="phone"
                        placeholder="+84"
                        type="text"
                        fullWidth
                        size="small"
                    />
                </div>
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Email:</label>
                    <TextField
                        defaultValue={state && state?.password?.value}
                        error={(state && state?.email?.error) ? true : false}
                        helperText={state && state?.email?.message}
                        name="email"
                        placeholder="Nhập email"
                        type="text"
                        fullWidth
                        size="small"
                    />
                </div>
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Tên tài khoản:</label>
                    <TextField
                        name="username"
                        placeholder="Nhập tên tài khoản"
                        type="text"
                        fullWidth
                        size="small"
                    />
                </div>
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Mật khẩu:</label>
                    <TextField
                        fullWidth
                        defaultValue={state && state?.password?.value}
                        error={(state && state?.password?.error) ? true : false}
                        helperText={state && state?.password?.message}
                        name="password"
                        size="small"
                        type={showPassword ? 'text' : 'password'}
                        // error={true}
                        // helperText="Loi"
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={() => setShowPassWord(prev => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        }}
                    />
                </div>
                <div>
                    <label className="mb-[10px] block"><span className="text-red-500 mr-1">*</span>Nhập lại mật khẩu:</label>
                    <TextField
                        // error={true}
                        fullWidth
                        name="rePassword"
                        size="small"
                        // helperText="Loi cmm r"
                        type={showPassword2 ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword2 ? 'hide the password' : 'display the password'
                                        }
                                        onClick={() => setShowPassWord2(prev => !prev)}
                                        edge="end"
                                    >
                                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            },
                        }}
                    />
                </div>
                <Button type="submit" sx={{ marginTop: '8px' }} disabled={pending ? true : false} fullWidth variant="contained">Đăng kí</Button>
                <div className="flex mt-2">
                    <p className="mr-4">Bạn đã có tài khoản?</p>
                    <Link className="text-blue-500 hover:underline hover:text-blue-800" href={"/login"}>Đăng nhập</Link>
                </div>
                <Link className="text-blue-500 hover:underline hover:text-blue-800" href={"/home"}>Về trang chủ</Link>
            </form>
            {/* <span className={`transition-all duration-500 absolute bottom-3 left-1/2 -translate-x-1/2 ${isBottom ? 'opacity-0' : 'opacity-1'}`}>
                <KeyboardArrowDownIcon sx={{
                    position: 'absolute',
                    top: '2px',
                    left: "50%",
                    fontSize: '1rem',
                    transform: 'translateX(-50%)',
                    color: "#343a40"
                }} />
                <KeyboardArrowDownIcon sx={{ fontSize: '2rem' }} />
            </span> */}
        </Box>
    );
};

export default RegisterForm;
