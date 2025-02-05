import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const CourseSubject = (props: {
    subjectList: SubjectResponse[];
}) => {
    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'black',
            borderRadius: '6px',
            padding: '30px 20px'
        }}>
            <form action="">
                <TextField
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    size='small'
                    placeholder='Nhập tên khóa học, tác giả,...'
                    name='keyword'
                    fullWidth
                />
            </form>
        </Box>
    )
}

export default CourseSubject