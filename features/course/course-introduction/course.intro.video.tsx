import { getVideoIdFromUrl } from "@/helper/course.details.helper";
import { Dialog, DialogContent } from "@mui/material"
import { SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';

const CourseIntroVideo = ({ open, setOpen, course }: {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    course: CourseDetailsResponse;
}) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '.mui-16bx961-MuiPaper-root-MuiDialog-paper': {
                    maxWidth: 'max-content',
                    boxShadow: 'none',
                    backgroundImage: 'none'
                }
            }}
        >
            <DialogContent sx={{
                padding: '0px',
                bgcolor: '#101010',
                borderRadius: '6px',
                'iframe': {
                    borderRadius: '6px'
                }
            }}>
                <div className="px-6 pt-5 pb-0 flex items-start justify-between">
                    <div>
                        <h1 className="text-sm text-gray-300">Giới thiệu khóa học</h1>
                        <h1 className="text-xl font-semibold mb-2">{course.courseName}</h1>
                    </div>
                    <span className="transition-all duration-150 hover:text-purple-300 cursor-pointer" onClick={handleClose}>
                        <CloseIcon />
                    </span>
                </div>
                <iframe
                    width='800'
                    height='450'
                    src={`https://www.youtube.com/embed/${getVideoIdFromUrl(course.introduction)}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                ></iframe>
            </DialogContent>
        </Dialog>
    )
}

export default CourseIntroVideo