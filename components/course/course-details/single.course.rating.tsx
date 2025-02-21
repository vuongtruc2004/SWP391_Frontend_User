import { Avatar, Button, Divider, IconButton, Popover, Rating } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { formatCreateDate } from "@/helper/blog.helper";

const SingleCourseRating = ({ rate, index, avatarSrc }: {
    rate: RateResponse;
    index: number;
    avatarSrc: string;
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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
                            <p className="text-sm text-gray-300">{formatCreateDate(rate.updatedAt)}</p>
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
                        <Button startIcon={<FlagIcon />} color="secondary" variant="text">
                            Báo Cáo
                        </Button>
                    </Popover>

                </div>
                <p className="text-gray-100 mt-3 line-clamp-3">{rate.content}</p>
                <p className="flex items-center gap-x-1 mt-1 ml-1 text-sm text-gray-300">Đã đánh giá<Rating name="read-only" value={rate.stars} readOnly size="small" /></p>
            </div>
            <Divider />
        </>
    )
}

export default SingleCourseRating