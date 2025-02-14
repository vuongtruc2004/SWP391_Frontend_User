'use client'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useActionState, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { comment } from "@/features/blog/blog-details/blog.interact.action";
import { Avatar, Popover, Rating } from "@mui/material";
import { storageUrl } from "@/utils/url";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagIcon from '@mui/icons-material/Flag';

const InteractOnCourse = ({ course }: { course: CourseDetailsResponse }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

    };

    const { data: session } = useSession();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [state, formAction, pending] = useActionState(comment, null);

    const redirectToLogin = () => {
        if (!session) {
            sessionStorage.setItem('prevUrl', `/course/${course.courseId}`);
            router.push("/login");
        }
    }

    const likeBlog = () => {

    }

    return (
        <>
            <h1 className="text-xl font-semibold mt-5 mb-1">Đánh giá về khóa học</h1>
            <p className="text-gray-300 mb-4 px-1 text-sm"><strong className="text-white">{course?.totalLikes}</strong> lượt thích • <strong className="text-white">{course?.totalComments}</strong> bình luận</p>

            <div className="grid grid-cols-2 gap-10">
                {Array.from({ length: 6 }).map((_, index) => {
                    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;
                    return (
                        <div key={index}>
                            <div className="flex items-center gap-x-3 justify-between">
                                <div className="flex items-center gap-x-3">
                                    <Avatar src={avatarSrc} sx={{
                                        width: '40px',
                                        height: '40px'
                                    }}>
                                        {course?.expert?.user?.fullname.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold line-clamp-1 text-sm">{course?.expert?.user?.fullname}</p>
                                        <p className="text-sm text-gray-300">1 tuần trước</p>
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
                                    <Button startIcon={<FlagIcon />} color="warning" variant="contained">
                                        Báo Cáo
                                    </Button>
                                </Popover>

                            </div>
                            <p className="text-gray-100 mt-3 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, delectus.</p>
                            <p className="flex items-center gap-x-1 mt-1 ml-1 text-sm text-gray-300">Đã đánh giá<Rating name="read-only" value={4} readOnly size="small" /></p>
                        </div>
                    )
                })}
            </div >
        </>
    )
}

export default InteractOnCourse