'use client'
import { storageUrl } from "@/utils/url"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import Image from "next/image";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useState } from "react";

const CourseVideoIntro = ({ course }: { course: CourseDetailsResponse }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{
                height: '280px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                marginBottom: '10px',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-100%',
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    transition: 'bottom 0.4s ease-in-out',
                    borderRadius: '6px'
                },
                'img': {
                    height: 'auto',
                    transition: 'all .4s',
                    objectFit: 'cover',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,3) 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0) 100%)',
                    objectPosition: 'center',
                    borderRadius: '6px'
                },
                '&:hover': {
                    '&::after': {
                        bottom: 0,
                    },
                    'img': {
                        filter: 'blur(4px)'
                    },
                    'div': {
                        bottom: '50%',
                        transform: 'translateY(50%)',
                        columnGap: '12px',
                    }
                }
            }} onClick={handleClickOpen}>
                <Image
                    src={`${storageUrl}/course/${course.thumbnail}`}
                    alt={course.courseName}
                    fill
                    sizes="(max-width: 1000px) 100vw"
                    priority={true}
                />

                <div className="transition-all duration-500 flex items-center justify-center gap-x-1 absolute bottom-3 left-1/2 -translate-x-1/2 z-[2] font-semibold">
                    <p className="text-sm">Xem video giới thiệu khóa học</p>
                    <ChevronRightOutlinedIcon sx={{ fontSize: '16px' }} />
                </div>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CourseVideoIntro