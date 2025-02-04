import { SetStateAction, useActionState, useEffect, useState } from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { validInfoInput } from "./action";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Link from "next/link";

const UserInfoForm = (props: {
    setStep: React.Dispatch<SetStateAction<number>>,
    userRequest: UserRequest,
    setUserRequest: React.Dispatch<SetStateAction<UserRequest>>
}) => {
    const { setStep, userRequest, setUserRequest } = props;

    const [gender, setGender] = useState("male");
    const [state, formAction, pending] = useActionState(validInfoInput, null);

    useEffect(() => {
        if (state?.ok) {
            setStep(prev => prev + 1);
        }
    }, [state]);

    return (
        <>
            <div className="flex justify-center mb-2">
                <span className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-[15px] border border-gray-500">
                    <InfoOutlinedIcon sx={{ fontSize: '2.25rem' }} />
                </span>
            </div>

            <h1 className="text-2xl text-center font-semibold mb-8">Hãy cho chúng tôi biết thêm về bạn</h1>

            <form action={formAction}>
                <div className="mb-3">
                    <label className="block mb-1"><span className='text-red-500 mr-1'>*</span>Họ và tên:</label>
                    <TextField
                        placeholder="Nhập họ và tên"
                        size="small"
                        name="fullname"
                        fullWidth
                        type="text"
                        error={state?.fullname.error}
                        helperText={state?.fullname.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.fullname.message}
                            </span>
                        )}
                        defaultValue={state?.fullname.value}
                    />
                </div>
                <div className="mb-3">
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
                <div className="mb-3">
                    <label className="block mb-1"><span className='text-red-500 mr-1'>*</span>Số điện thoại:</label>
                    <TextField
                        placeholder="Nhập số điện thoại"
                        size="small"
                        name="phone"
                        fullWidth
                        type="text"
                        error={state?.phone.error}
                        helperText={state?.phone.error && (
                            <span className="flex items-center gap-x-1">
                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                {state?.phone.message}
                            </span>
                        )}
                        defaultValue={state?.phone.value}
                    />
                </div>
                <div className="flex items-start gap-x-5 justify-between mb-3">
                    <Box sx={{
                        width: '100%',
                        '.mui-mjgnrh-MuiInputBase-root-MuiOutlinedInput-root': {
                            height: '40px'
                        }
                    }}>
                        <label className="block mb-1"><span className='text-red-500 mr-1'>*</span>Ngày sinh:</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                defaultValue={state?.dob.value ? dayjs(state.dob.value) : null}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        helperText: state?.dob.error && (
                                            <span className="flex items-center gap-x-1">
                                                <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                                {state?.dob.message}
                                            </span>
                                        ),
                                        error: state?.dob.error
                                    },
                                }}
                                name="dob"
                            />
                        </LocalizationProvider>
                    </Box>

                    <div className="w-full">
                        <label className="block mb-1"><span className='text-red-500 mr-1'>*</span>Giới tính:</label>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            fullWidth
                            size="small"
                            name="gender"
                        >
                            <MenuItem value={"male"}>Nam</MenuItem>
                            <MenuItem value={"female"}>Nữ</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center gap-x-1 text-sm text-gray-300 mb-5">
                    <p>Bạn đã có tài khoản?</p>
                    <Link href={"/login"} className="text-blue-500 hover:underline">
                        Đăng nhập
                    </Link>
                </div>

                {(state && !state.ok && state.message) && (
                    <p className='text-red-500 text-sm mt-2 ml-2 flex items-center gap-x-1'>
                        <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                        {state?.message}
                    </p>
                )}
                <div className="flex justify-between items-center">
                    <Button
                        variant='contained'
                        onClick={() => setStep(prev => prev - 1)}
                    >
                        Prev
                    </Button>
                    <Button
                        variant='contained'
                        type="submit"
                        loading={pending}
                    >
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
}

export default UserInfoForm