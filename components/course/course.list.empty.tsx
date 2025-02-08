import Box from "@mui/material/Box";
import Image from "next/image";

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
            <Image src="/empty.svg" alt="empty box" width={60} height={60} />
            <p className="text-white text-sm">Không có khóa học nào để hiển thị</p>
        </Box>
    )
}

export default CourseListEmpty