import { Box, TextField } from "@mui/material"

const ThirdStep = () => {
    return (
        <Box sx={{
            '.mui-1fe3xww-MuiInputBase-input-MuiOutlinedInput-input': {
                color: 'grey'
            },
            padding: '40px 0'
        }}>
            <form action="" className="flex flex-col gap-y-2">
                <div>
                    <label>Số điện thoại:</label>
                    <TextField
                        placeholder="+84"
                        size="small"
                        name="phone"
                        fullWidth
                        type="text"
                        sx={{
                            border: '1px solid black',
                            borderRadius: '10px',
                        }}
                    />

                </div>
                <div className='mb-2'>
                    <label><span className='text-red-500 mr-1'>*</span>Email:</label>
                    <TextField
                        placeholder="Nhập email"
                        size="small"
                        name="email"
                        fullWidth
                        type="text"
                        sx={{
                            border: '1px solid black',
                            borderRadius: '10px',
                        }}
                    />
                </div>

            </form>
        </Box>
    )
}

export default ThirdStep