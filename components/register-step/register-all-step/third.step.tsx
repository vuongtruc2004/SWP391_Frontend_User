import { Box, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

const ThirdStep = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    return (
        <Box sx={{

        }}>
            <form action="" className="flex flex-col gap-y-2">
                <div className='mb-2'>
                    <label><span className='text-red-500 mr-1'>*</span>Tên tài khoản:</label>
                    <TextField
                        placeholder="Nhập tên tài khoản"
                        size="small"
                        name="username"
                        fullWidth
                        type="text"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "1px solid black", // Viền mặc định
                                borderRadius: "10px", // Bo góc
                                "&:hover": {
                                    borderColor: "grey", // Màu viền khi hover
                                },
                                "&.Mui-focused": {
                                    borderColor: "grey", // Màu viền khi focus
                                },
                            },
                            "& .MuiOutlinedInput-input": {
                                color: "grey", // Màu chữ
                            },
                        }}
                    />

                </div>
                <div className='mb-2'>
                    <label><span className='text-red-500 mr-1'>*</span>Mật khẩu:</label>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        sx={{
                            border: '1px solid black',
                            borderRadius: '10px',
                            color: 'grey'
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility sx={{ fontSize: '1.2rem', color: '#6c757d' }} /> : <VisibilityOff sx={{ fontSize: '1.2rem', color: '#6c757d' }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder='Nhập mật khẩu'
                        autoComplete='password'
                        size='small'
                        name='password'
                        fullWidth
                    />
                </div>

                <div className='mb-3'>
                    <label><span className='text-red-500 mr-1'>*</span>Nhập lại mật khẩu:</label>
                    <OutlinedInput
                        type={showPassword2 ? 'text' : 'password'}
                        sx={{
                            border: '1px solid black',
                            borderRadius: '10px',
                            color: 'grey'
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword2(prev => !prev)}
                                    edge="end"
                                >
                                    {showPassword2 ? <Visibility sx={{ fontSize: '1.2rem', color: '#6c757d' }} /> : <VisibilityOff sx={{ fontSize: '1.2rem', color: '#6c757d' }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder='Nhập mật khẩu'
                        autoComplete='password'
                        size='small'
                        name='password'
                        fullWidth
                    />
                </div>

            </form>
        </Box>
    )
}

export default ThirdStep