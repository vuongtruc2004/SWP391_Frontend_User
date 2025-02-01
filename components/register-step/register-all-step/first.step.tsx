import React, { useState } from 'react';
import { Box, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const FirstStep = () => {
    const [job, setJob] = useState('lecture');
    return (
        <Box sx={{
            position: 'relative',
            top: '5%',
            '.mui-1fe3xww-MuiInputBase-input-MuiOutlinedInput-input': {
                color: 'grey'
            },
        }}>
            <form action="" className="flex flex-col gap-y-2">
                <div className='mt-20 mb-20'>
                    <label><span className='text-red-500 mr-1'>*</span>Công việc hiện tại:</label>
                    <Select
                        name="gender"
                        sx={{
                            height: '40px',
                            border: '1px solid black',
                            color: 'grey',
                            borderRadius: '10px'
                        }}
                        fullWidth
                        value={job}
                        onChange={(event) => { setJob(event.target.value) }}
                    >
                        <MenuItem value={'lecture'}>Giảng viên/Giáo viên</MenuItem>
                        <MenuItem value={'student'}>Học sinh/Sinh viên</MenuItem>
                    </Select>
                </div>
            </form>
        </Box>
    );
}

export default FirstStep;
