import React, { useState } from 'react';
import { Box, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const SecondStep = () => {
    const [gender, setGender] = useState('male');
    return (
        <Box sx={{
            position: 'relative',
            top: '5%',
            '.mui-1fe3xww-MuiInputBase-input-MuiOutlinedInput-input': {
                color: 'grey'
            },
        }}>
            <form action="" className="flex flex-col gap-y-2">
                <div>
                    <label className='mb-2'><span className='text-red-500 mr-1'>*</span>Họ và tên:</label>
                    <TextField
                        placeholder="Nhập họ và tên"
                        size="small"
                        name="fullname"
                        fullWidth
                        type="text"
                        sx={{
                            border: '1px solid black',
                            borderRadius: '10px',
                        }}
                    />

                </div>
                <div className='mb-2'>
                    <label><span className='text-red-500 mr-1'>*</span>Ngày sinh:</label><br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name="dob" format="DD/MM/YYYY" sx={{
                            width: '100%',
                            border: '1px solid black',
                            '.mui-mjgnrh-MuiInputBase-root-MuiOutlinedInput-root': { color: 'grey' },
                            '.mui-8a1qk4-MuiInputBase-input-MuiOutlinedInput-input': {
                                padding: '10px 0 0 10px'
                            },
                            '.mui-1umw9bq-MuiSvgIcon-root': { color: 'black' },
                            height: '40px',
                            borderRadius: '10px'
                        }} />
                    </LocalizationProvider>
                </div>
                <div className='mb-3'>
                    <label><span className='text-red-500 mr-1'>*</span>Giới tính:</label>
                    <Select
                        name="gender"
                        sx={{
                            height: '40px',
                            border: '1px solid black',
                            color: 'grey',
                            borderRadius: '10px'
                        }}
                        fullWidth
                        value={gender}
                        onChange={(event) => { setGender(event.target.value) }}
                    >
                        <MenuItem value={'male'}>Nam</MenuItem>
                        <MenuItem value={'female'}>Nữ</MenuItem>
                    </Select>
                </div>
            </form>
        </Box>
    );
}

export default SecondStep;
