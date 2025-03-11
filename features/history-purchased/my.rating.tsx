'use client'
import { Avatar, Box, Button, Divider, Fade, InputAdornment, Modal, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { slugifyText } from '@/helper/blog.helper';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import { apiUrl, storageUrl } from '@/utils/url';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/fetch.api';
import ListEmpty from '@/components/empty/list.empty';

const MyCourseRating = (props: { open: boolean, closeRatingModal: any, currentCourse: CourseDetailsResponse }) => {
    const { open, closeRatingModal, currentCourse } = props;
    const textRef = useRef<HTMLParagraphElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { data: session } = useSession();
    const [myRating, setMyRating] = useState<RateResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.accessToken || !currentCourse?.course?.courseId) return;
            try {
                const response = await sendRequest<ApiResponse<RateResponse>>({
                    url: `${apiUrl}/rates/my-rate/${currentCourse?.courseId}`,
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                setMyRating(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [session?.accessToken, currentCourse]);


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={closeRatingModal}
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
                    boxShadow: 55,
                    p: 4
                }}
                >
                    <div className='flex justify-between'>
                        <p>Đánh Giá Khóa Học</p>
                        <CloseIcon onClick={closeRatingModal} />
                    </div>
                    <Divider sx={{ bgcolor: "white", marginTop: '10px', marginBottom: '30px' }} />
                    <div>
                        <Grid container spacing={0} alignItems="center">
                            <Grid size={5}>
                                <Link href={`/course/${slugifyText(currentCourse?.course?.courseName + "-" + currentCourse?.course?.courseId)}`}>
                                    <img
                                        src={`${storageUrl}/course/${currentCourse?.course?.thumbnail}`}
                                        alt={currentCourse?.course?.courseName}
                                        width={200}
                                        height={180}
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                            objectPosition: 'center',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Link>
                            </Grid>

                            <Grid size={7}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    {currentCourse?.course?.courseName}
                                </Typography>

                                <Typography
                                    ref={textRef}
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: expanded ? "unset" : 2,
                                    }}
                                >
                                    <span className='font-bold'>Mô tả:</span> {currentCourse?.course?.description}
                                </Typography>

                                {isOverflowing && (
                                    <Button onClick={() => setExpanded(!expanded)} size="small">
                                        {expanded ? "Thu gọn" : "Xem thêm"}
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                    <div className='bg-white mt-5 mb-5'>
                        <div className="w-full h-[0.1875rem] bg-[repeating-linear-gradient(45deg,_#6fa6d6,_#6fa6d6_33px,_transparent_0,_transparent_41px,_#f18d9b_0,_#f18d9b_74px,_transparent_0,_transparent_82px)] bg-[length:7.25rem_0.1875rem] bg-[position-x:-1.875rem]"></div>
                    </div>
                    <div className='mt-10'>
                        {myRating !== null ?
                            <div className="flex gap-5 mb-7 ml-7 ">
                                <Avatar alt={session?.user.fullname} src={`${storageUrl}/avatar/${session?.user.avatar}`} sx={{ width: 55, height: 55 }} />
                                <div className='flex flex-col gap-1'>
                                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                                        {session?.user.fullname}
                                    </Typography>
                                    <Rating value={myRating?.stars} readOnly size="small" />
                                    <Typography sx={{ fontSize: '15px' }} variant="h2" color="text.secondary">
                                        {myRating?.createdAt}
                                    </Typography>
                                    <Typography variant="body1" sx={{ margin: '10px 0' }}>
                                        {myRating?.content}
                                    </Typography>
                                </div>
                            </div>
                            :
                            <ListEmpty text="Bạn vẫn chưa đánh giá khóa học này!" />

                        }

                    </div>
                    <div className='flex justify-end'>
                        <Button onClick={closeRatingModal} variant='contained'>OK</Button>
                    </div>
                </Box>
            </Fade>
        </Modal >
    )
}

export default MyCourseRating