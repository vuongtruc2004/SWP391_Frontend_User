import { Box } from "@mui/material"

const CourseListEmpty = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            bgcolor: 'black',
            borderRadius: '6px',
            'img': {
                width: '60px',
                color: 'white'
            }
        }}>
            <img src="http://localhost:3000/empty.svg" alt="empty box" />
            <p className="text-white text-sm">Không có khóa học nào để hiển thị</p>
        </Box>
    )
}

export default CourseListEmpty