import { Box, Button, Divider, Fade, InputAdornment, Modal, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { slugifyText } from '@/helper/blog.helper';

const HandleShare = (props: { open: boolean, closeShareModal: any, currentCourse: CourseDetailsResponse }) => {
    const { open, closeShareModal, currentCourse } = props;
    const link = `http://localhost:3000/course/${slugifyText(currentCourse?.course?.courseName + "-" + currentCourse?.courseId)}`;
    const [copySuccess, setCopySuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
            setOpenSnackbar(true)
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 3000);
        }).catch(err => console.error("Failed to copy: ", err));
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={closeShareModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                    >
                        <div className='flex justify-between'>
                            <p>Chia sẻ khóa học này</p>
                            <CloseIcon onClick={closeShareModal} />
                        </div>
                        <Divider sx={{ bgcolor: "white", marginTop: '10px', marginBottom: '30px' }} />
                        <div>
                            <TextField
                                label="Sao chép liên kết"
                                id="outlined-start-adornment"
                                defaultValue={link}
                                sx={{
                                    m: 1,
                                    width: '100%',
                                    marginLeft: '-3px'
                                }}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                        startAdornment:
                                            <InputAdornment position="start">
                                                <ShareIcon />
                                            </InputAdornment>,
                                        endAdornment:
                                            <InputAdornment position="start">
                                                <Button variant="text"
                                                    className='!p-0 !w-[24px]'
                                                    onClick={handleCopy}
                                                >
                                                    <ContentCopyIcon />
                                                </Button>
                                            </InputAdornment>
                                    },
                                }}

                            />
                        </div>

                    </Box>
                </Fade>
            </Modal >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                message="Đã sao chép"
            />
        </>
    )
}

export default HandleShare