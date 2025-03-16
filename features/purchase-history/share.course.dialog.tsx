import { Dialog, InputAdornment, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { slugifyText } from '@/helper/blog.helper';

const ShareCourseDialog = ({ open, setOpen, course }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    course: CourseResponse | null
}) => {
    const [copied, setCopied] = useState(false);
    const [link, setLink] = useState("");

    const handleCopyLink = (event: React.MouseEvent<HTMLDivElement>) => {
        navigator.clipboard.writeText(link)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            })
            .catch(err => console.error("Copy failed:", err));
    };

    useEffect(() => {
        if (course) {
            setLink(`http://localhost:3000/course/${slugifyText(course.courseName + "-" + course.courseId)}`)
        }
    }, [course]);

    if (!course) {
        return null;
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <div className='bg-[#101010] p-5 rounded-md w-[500px]'>

                <div className='flex justify-between'>
                    <h1 className='font-semibold text-lg'>Chia sẻ khóa học</h1>
                    <CloseIcon onClick={() => setOpen(false)} className='hover:text-gray-400 cursor-pointer transition-all duration-200' />
                </div>

                <TextField
                    label="Sao chép liên kết"
                    type='text'
                    slotProps={{
                        input: {
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {copied ? (
                                        <div className="flex items-center gap-x-1 text-green-500 pl-5">
                                            <DoneAllIcon sx={{ fontSize: '1.2rem' }} />
                                            <p className="text-sm">Đã copy</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-x-1 pl-5 cursor-pointer">
                                            <ContentCopyIcon sx={{ fontSize: '1.2rem' }} />
                                            <p className="text-sm">Copy</p>
                                        </div>
                                    )}
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className="w-[40px] h-[40px] rounded-tl-md rounded-bl-md flex items-center justify-center">
                                        <ShareIcon sx={{ fontSize: '1.2rem' }} />
                                    </div>
                                </InputAdornment>
                            )
                        }
                    }}
                    size='small'
                    fullWidth
                    defaultValue={link}
                    sx={{
                        '.mui-1w7ezew-MuiInputBase-root-MuiOutlinedInput-root': {
                            borderRadius: '0 6px 6px 0',
                        },
                        marginBlock: '20px 15px',
                    }}
                    onClick={handleCopyLink}
                />
            </div>
        </Dialog>
    )
}

export default ShareCourseDialog