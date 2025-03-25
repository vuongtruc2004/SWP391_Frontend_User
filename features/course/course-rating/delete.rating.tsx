import { Box, Button, Fade, Modal } from '@mui/material';
import { Dispatch, SetStateAction } from 'react'
import Backdrop from '@mui/material/Backdrop';
import { apiUrl } from '@/utils/url';
import { sendRequest } from '@/utils/fetch.api';
import { useCourseRate } from '@/wrapper/course-rate/course.rate.wrapper';
import { useSession } from 'next-auth/react';

const DeleteCourseRating = ({ open, setOpen, rate, setOpenSnackbarDelete, setMyRating }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    rate: RateResponse,
    setOpenSnackbarDelete: Dispatch<SetStateAction<boolean>>
    setMyRating: Dispatch<SetStateAction<RateResponse | null>>
}) => {
    const { data: session, status } = useSession();
    const { fetchRatePage } = useCourseRate();

    const handleDelete = async (rateId: number) => {
        if (status === 'authenticated') {
            const deleteResponse = await sendRequest<ApiResponse<string>>({
                url: `${apiUrl}/rates/delete/${rateId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            if (deleteResponse.status === 200) {
                setOpenSnackbarDelete(true);
                setTimeout(() => {
                    setOpenSnackbarDelete(false);
                }, 3000);
            }
            setOpen(false);
            setMyRating(null)
            fetchRatePage();
        }
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
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
                        width: 300,
                        bgcolor: '#212121',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 3,
                        paddingBottom: '10px',
                        borderRadius: '20px'
                    }}
                    >
                        <div className='flex flex-col gap-4'>
                            <p className='font-bold text-sx'>Xóa bình luận</p>
                            <p className="text-[#a8a8a8] text-sm">Xóa bình luận của bạn vĩnh viễn?</p>
                        </div>

                        <div className='flex justify-end mt-5'>
                            <Button variant='text'
                                onClick={() => setOpen(false)}
                                sx={{
                                    color: '#2b7fff',
                                    fontWeight: 'bold',
                                    borderRadius: "30px",
                                }}
                            >Hủy
                            </Button>
                            <Button variant='text'
                                onClick={() => handleDelete(rate?.rateId)}
                                sx={{
                                    color: '#2b7fff',
                                    borderRadius: "30px",
                                    fontWeight: 'bold',
                                }}
                            >
                                Xóa
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal >
        </>
    )
}

export default DeleteCourseRating