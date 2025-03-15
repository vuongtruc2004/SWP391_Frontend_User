import { Avatar, Button, Divider, IconButton, Popover, Rating, Snackbar, SnackbarContent } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { formatDate } from "@/helper/blog.helper";
import { useSession } from "next-auth/react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCourseRating from "@/features/course/course-rating/delete.rating";
import UpdateCourseRating from "@/features/course/course-rating/update.course.rating";

const SingleCourseRating = ({ rate, index, avatarSrc }: {
    rate: RateResponse;
    index: number;
    avatarSrc: string;
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { data: session } = useSession();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openSnackbarUpdate, setOpenSnackbarUpdate] = useState(false);
    const [openSnackbarDelete, setOpenSnackbarDelete] = useState(false);

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <div className={index === 0 ? "pb-5" : "py-5"}>
                <div className="flex items-center gap-x-3 justify-between pr-3">
                    <div className="flex items-center gap-x-3">
                        <Avatar alt="user avatar" src={avatarSrc} sx={{
                            width: '40px',
                            height: '40px'
                        }}>
                            {rate?.user?.fullname.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                            <p className="font-semibold line-clamp-1 text-sm">{rate?.user?.fullname}</p>
                            <p className="text-sm text-gray-300">{formatDate(rate.updatedAt)}</p>
                        </div>
                    </div>

                    <IconButton onClick={handleOpenPopover}>
                        <MoreVertIcon />
                    </IconButton>

                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {rate?.user?.userId === session?.user?.userId ?
                            <div className="flex flex-col items-start p-2">
                                <Button
                                    startIcon={<EditIcon />}
                                    color="secondary"
                                    variant="text"
                                    onClick={() => {
                                        setOpenUpdate(true)
                                        setAnchorEl(null);
                                    }}
                                    sx={{ "&:hover": { color: "#2b7fff" } }}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button startIcon={<DeleteIcon />}
                                    color="secondary"
                                    variant="text"
                                    onClick={() => {
                                        setOpenDeleteModal(true);
                                        setAnchorEl(null);
                                    }}
                                    sx={{ "&:hover": { color: "red" }, width: '100%', justifyContent: 'flex-start' }}
                                >
                                    Xóa
                                </Button>
                            </div>
                            :
                            <Button startIcon={<FlagIcon />} color="secondary" variant="text">
                                Báo Cáo
                            </Button>
                        }

                    </Popover>

                </div >
                <p className="text-gray-100 mt-3 line-clamp-3">{rate.content}</p>
                <p className="flex items-center gap-x-1 mt-1 ml-1 text-sm text-gray-300">Đã đánh giá<Rating name="read-only" value={rate.stars} readOnly size="small" /></p>
            </div >

            <Divider />

            <DeleteCourseRating
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                rate={rate}
                setOpenSnackbarDelete={setOpenSnackbarDelete}
            />

            {openUpdate &&
                <UpdateCourseRating
                    rate={rate}
                    setOpenUpdate={setOpenUpdate}
                    setOpenSnackbarUpdate={setOpenSnackbarUpdate}
                />
            }

            <Snackbar
                open={openSnackbarUpdate}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <SnackbarContent
                    message="Cập nhật đánh giá thành công!"
                    sx={{ backgroundColor: "#212529", color: "white", fontWeight: "bold" }}
                />
            </Snackbar>

            <Snackbar
                open={openSnackbarDelete}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <SnackbarContent
                    message="Xóa đánh giá thành công!"
                    sx={{ backgroundColor: "#212529", color: "white", fontWeight: "bold" }}
                />
            </Snackbar>

        </>
    )
}

export default SingleCourseRating