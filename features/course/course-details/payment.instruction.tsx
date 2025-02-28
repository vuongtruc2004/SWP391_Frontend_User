import { Dialog, DialogContent, Divider, InputAdornment, TextField } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import KeyIcon from '@mui/icons-material/Key';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useSession } from "next-auth/react";
import { encryptWithAES } from "@/utils/aes.encryption";

const PaymentInstruction = ({ open, setOpen, courses }: {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    courses: CourseDetailsResponse[] | CartCourse[] | CourseResponse[];
}) => {

    const { data: session, status } = useSession();

    const [copied, setCopied] = useState(false);
    const [textToCopy, setTextToCopy] = useState("");

    const handleClose = () => {
        setOpen(false);
    }

    const handleCopyKey = (event: React.MouseEvent<HTMLDivElement>) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            })
            .catch(err => console.error("Copy failed:", err));
    };

    useEffect(() => {
        if (status === "authenticated") {
            setTextToCopy(encryptWithAES({
                userId: session.user.userId,
                email: session.user.email,
                fullname: session.user.fullname,
                gender: session.user.gender,
                courses: courses.map(course => {
                    return {
                        courseId: course.courseId,
                        courseName: course.courseName,
                        price: course.price,
                        expertName: "author" in course ? course.author : course.expert.user.fullname,
                        thumbnail: course.thumbnail
                    }
                })
            }));
        }
    }, [session, courses]);

    return (
        <Dialog
            aria-hidden={false}
            onClose={handleClose}
            open={open}
            sx={{
                '.mui-16bx961-MuiPaper-root-MuiDialog-paper': {
                    maxWidth: 'max-content',
                    boxShadow: 'none',
                    backgroundImage: 'none'
                }
            }}
        >
            <DialogContent sx={{
                padding: '25px',
                bgcolor: '#101010',
                borderRadius: '6px',
                position: 'relative',
            }}>
                <span className="absolute top-2.5 right-2.5 transition-all duration-150 hover:text-purple-300 cursor-pointer" onClick={handleClose}>
                    <CloseIcon />
                </span>
                <h1 className="text-2xl font-semibold text-center">Hướng dẫn mua khóa học</h1>
                <p className="text-center">Cảm ơn bạn đã lựa chọn LearnGo</p>

                <TextField
                    type='text'
                    slotProps={{
                        input: {
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {copied ? (
                                        <div className="flex items-center gap-x-1 text-green-500">
                                            <DoneAllIcon sx={{ fontSize: '1.2rem' }} />
                                            <p className="text-sm">Đã copy</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-x-1 pl-3">
                                            <ContentCopyIcon sx={{ fontSize: '1.2rem' }} />
                                            <p className="text-sm">Copy</p>
                                        </div>
                                    )}
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className="w-[40px] h-[40px] rounded-tl-md rounded-bl-md flex items-center justify-center">
                                        <KeyIcon sx={{ fontSize: '1.2rem' }} />
                                    </div>
                                </InputAdornment>
                            )
                        }
                    }}
                    helperText={<span className='flex items-center gap-x-1 text-green-500'>
                        <AutoAwesomeOutlinedIcon sx={{ fontSize: '16px' }} />
                        Bạn hãy copy đoạn mã này nhé!
                    </span>}
                    size='small'
                    fullWidth
                    defaultValue={textToCopy}
                    sx={{
                        '.mui-1w7ezew-MuiInputBase-root-MuiOutlinedInput-root': {
                            borderRadius: '0 6px 6px 0',
                        },
                        marginBlock: '20px 15px',
                    }}
                    onClick={handleCopyKey}
                />

                <ul className="flex flex-col gap-y-5">
                    <li className="flex items-start gap-x-1">
                        <span className="font-semibold text-purple-300">• Bước 1:</span>
                        <div>
                            <p>
                                Inbox qua Fanpage LearnGo và gửi đoạn mã bạn copy ở trên
                            </p>
                            <p>
                                <span className="mr-1">Link Fanpage:</span>
                                <a target="_blank" href={"https://www.facebook.com/profile.php?id=61573093011541"} className="text-blue-500 hover:underline">https://www.facebook.com/profile.php?id=61573093011541</a>
                            </p>
                        </div>
                    </li >
                    <li>
                        <span className="mr-1 font-semibold text-purple-300">• Bước 2:</span>
                        Chuyển khoản vào mã QR nhân viên của chúng tôi sẽ gửi cho bạn trong đoạn chat
                    </li>
                    <li>
                        <span className="mr-1 font-semibold text-purple-300">• Bước 3:</span>
                        Học trên website LearnGo
                    </li>
                </ul >

                <Divider sx={{ marginTop: '10px' }} />
            </DialogContent >
        </Dialog >
    )
}

export default PaymentInstruction