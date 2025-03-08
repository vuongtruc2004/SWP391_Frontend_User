'use client'
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
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

const ProfileForm = ({ user }: {
    user: UserResponse;
}) => {
    const { data: session, update } = useSession();

    const [gender, setGender] = useState(user.gender ? user.gender : "none");
    const [fullname, setFullname] = useState(user.fullname ? user.fullname : "");
    const [dob, setDob] = useState(user.dob ? dayjs(user.dob) : null);
    const [fullNameError, setFullnameError] = useState("");
    const [dobError, setDobError] = useState("");
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const validateFullname = (value: string) => {
        if (!value.trim()) {
            setFullnameError("Tên không được để trống.");
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
        if (age < 6) {
            setDobError("Người dùng phải ít nhất 6 tuổi.");
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
                setOpen(true);
            }
            router.refresh();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitForm}>
                <Box sx={{
                    width: '100%',
                    display: 'grid',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '12px'
                }}>

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
                    marginBottom: '15px'
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
                                sx={{
                                    'div': {
                                        height: '40px'
                                    }
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

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert
                    severity="success"
                    onClose={() => setOpen(false)}
                    sx={{ width: '100%', color: 'white' }}
                    variant="filled"
                >
                    Cập nhật thành công!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ProfileForm;