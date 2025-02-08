'use client'
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";

const ProfileForm = (props: {
    user: UserResponse;
}) => {
    const { user } = props;
    const { data: session, update } = useSession();

    const [gender, setGender] = useState(user.gender ? user.gender : "none");
    const [fullname, setFullname] = useState(user.fullname ? user.fullname : "");
    const [dob, setDob] = useState(user.dob ? dayjs(user.dob) : null);
    const [fullNameError, setFullnameError] = useState("");
    const [dobError, setDobError] = useState("");

    const router = useRouter();

    const validateFullname = (value: string) => {
        if (!value.trim()) {
            setFullnameError("Tên không được để trống.");
            return false;
        }
        if (!/^[a-zA-Z\sÀ-ỹ]+$/.test(value)) {
            setFullnameError("Tên chỉ được chứa chữ cái.");
            return false;
        }
        setFullnameError("");
        return true;
    };

    const validateDob = (value: dayjs.Dayjs | null) => {
        if (!value) {
            return true;
        }
        const today = dayjs();
        const age = today.diff(value, 'year');
        if (age < 7) {
            setDobError("Người dùng phải ít nhất 7 tuổi.");
            return false;
        }
        setDobError("");
        return true;
    };

    const handleResetForm = () => {
        setFullname(user.fullname ? user.fullname : "");
        setDob(user.dob ? dayjs(user.dob) : null);
        setGender(user.gender ? user.gender : "none");
        setFullnameError("");
        setDobError("");
    };

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isFullnameValid = validateFullname(fullname);
        const isDobValid = validateDob(dob);

        if (isFullnameValid && isDobValid) {
            if (fullname === user.fullname &&
                (dob?.format('YYYY-MM-DD') || null) === user.dob &&
                (gender === "none" ? null : gender) === user.gender
            ) {
                return;
            }

            const updatedUser: UpdateUserRequest = {
                userId: user.userId,
                fullname,
                dob: dob?.format('YYYY-MM-DD') || null,
                gender: gender === "none" ? null : gender,
            };

            const updateResponse = await sendRequest<ApiResponse<UserResponse>>({
                url: `${apiUrl}/users/profile`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: updatedUser
            });

            if (updateResponse.status === 201) {
                await update({
                    user: {
                        ...session?.user,
                        fullname: updatedUser.fullname,
                        dob: updatedUser.dob,
                        gender: updatedUser.gender,
                    }
                });
            }
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <Box sx={{
                width: '100%',
                display: 'grid',
                alignItems: 'center',
                gap: '20px',
                gridTemplateColumns: '20% 1fr',
                marginBottom: '12px'
            }}>
                <div>
                    <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>UID:</label>
                    <TextField
                        variant="outlined"
                        size='small'
                        name='userId'
                        defaultValue={user.userId}
                        fullWidth
                        disabled
                    />
                </div>
                <div>
                    <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>Email:</label>
                    <TextField
                        variant="outlined"
                        size='small'
                        name='email'
                        defaultValue={user.email}
                        fullWidth
                        disabled
                    />
                </div>
            </Box>

            <div className="mb-3">
                <label className="mb-[10px] block text-white"><span className="text-red-500 mr-1">*</span>Họ và tên:</label>
                <TextField
                    variant="outlined"
                    size='small'
                    placeholder='Nhập họ và tên'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    name='fullname'
                    fullWidth
                    error={fullNameError !== ""}
                    helperText={fullNameError !== "" && (
                        <span className="flex items-center gap-x-1">
                            <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                            {fullNameError}
                        </span>
                    )}
                />
            </div>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '50% 1fr',
                columnGap: '20px',
                alignItems: 'start',
                '.mui-mjgnrh-MuiInputBase-root-MuiOutlinedInput-root': {
                    height: '40px'
                },
                '.mui-1b1fjlj-MuiFormControl-root-MuiTextField-root': {
                    width: '100%'
                },
                marginBottom: '12px'
            }}>
                <div>
                    <label className="mb-[10px] block text-white">Ngày sinh:</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={dob}
                            onChange={(newValue) => setDob(newValue)}
                            format="DD/MM/YYYY"
                            slotProps={{
                                textField: {
                                    error: dobError !== "",
                                    helperText: dobError !== "" && (
                                        <span className="flex items-center gap-x-1">
                                            <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                                            {dobError}
                                        </span>
                                    ),
                                },
                            }}
                        />
                    </LocalizationProvider>
                </div>

                <div>
                    <label className="mb-[10px] block text-white">Giới tính:</label>
                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        size="small"
                        name="gender"
                        fullWidth
                    >
                        <MenuItem value={"none"}>Chưa thiết lập</MenuItem>
                        <MenuItem value={"MALE"}>Nam</MenuItem>
                        <MenuItem value={"FEMALE"}>Nữ</MenuItem>
                    </Select>
                </div>
            </Box>

            <div className="flex items-center gap-x-5">
                <Button variant="outlined" color="secondary" sx={{ textTransform: 'none' }} onClick={handleResetForm}>
                    Hủy bỏ thay đổi
                </Button>

                <Button type="submit" variant="contained" startIcon={<AutorenewIcon />} sx={{
                    textTransform: 'none',
                    bgcolor: '#4ade80',
                    '&:hover': {
                        bgcolor: '#00c951'
                    }
                }}>
                    Cập nhật thông tin
                </Button>
            </div>
        </form>
    )
}

export default ProfileForm;