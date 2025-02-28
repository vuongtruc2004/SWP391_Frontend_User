import { useCourseView } from '@/wrapper/course-view/course.view.wrapper'
import { useUserAvatar } from '@/wrapper/user/user.wrapper';
import { Avatar, TextField } from '@mui/material';

const CourseRateInput = () => {
    const { course } = useCourseView();
    const { avatarSrc, fullname } = useUserAvatar();

    return (
        <div className='flex items-center gap-x-5 mb-10'>
            <Avatar alt="user avatar" src={avatarSrc} sx={{
                width: '40px',
                height: '40px'
            }}>
                {fullname.charAt(0).toUpperCase()}
            </Avatar>
            <TextField
                placeholder="Đánh giá của bạn"
                variant="standard"
                fullWidth
                multiline
                rows={2}
            />
        </div>
    )
}

export default CourseRateInput