import { apiUrl } from "@/utils/url";
import { Avatar, Box, Button, CircularProgress, IconButton, InputAdornment, Popover, Rating, Snackbar, SnackbarContent, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { sendRequest } from "@/utils/fetch.api";
import { useCourseRate } from "@/wrapper/course-rate/course.rate.wrapper";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import ClearIcon from '@mui/icons-material/Clear';

const CreateCourseRating = ({ course, setOpenSnackbarSuccess }: { course: CourseDetailsResponse, setOpenSnackbarSuccess: Dispatch<SetStateAction<boolean>> }) => {
    const { fetchRatePage } = useCourseRate();
    const { avatarSrc } = useUserAvatar();
    const { data: session, status } = useSession();
    const [star, setStar] = useState<number | null>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleEmojiClick = (emojiObject: any) => {
        setText((prevText) => prevText + emojiObject.emoji);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (text.trim() === "") {
                    setStar(0)
                    setIsFocused(false)
                };
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [text]);

    const handleOk = async () => {
        if (status === 'authenticated') {
            setLoading(true);
            setTimeout(async () => {
                if (text.split(/\s+/).length > 50) {
                    setOpenSnackbar(true)
                    setTimeout(() => {
                        setOpenSnackbar(false);
                    }, 3000);
                    setLoading(false)
                    return
                }
                const rateRequest: RateRequest = {
                    content: text,
                    stars: star,
                    courseId: course?.courseId
                };

                const ratingResponse = await sendRequest<ApiResponse<RateResponse>>({
                    url: `${apiUrl}/rates`,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: rateRequest
                });

                if (ratingResponse.status === 200) {
                    setIsFocused(false)
                    setOpenSnackbarSuccess(true);
                    setTimeout(() => {
                        setOpenSnackbarSuccess(false);
                    }, 3000)
                }

                fetchRatePage();

                setLoading(false);
            }, 500);
        }
    };

    return (
        <>
            <Snackbar open={openSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <SnackbarContent message="Vui lòng bình luận không quá 50 từ!" sx={{ backgroundColor: "red", color: "white", fontWeight: "bold" }} />
            </Snackbar>

            {loading ? (
                <div className="flex items-center justify-center">
                    <CircularProgress />
                </div>
            ) : (
                <div className="my-8" ref={containerRef}>
                    <div className="flex gap-5 items-center">
                        <Avatar alt='User avatar' src={avatarSrc} sx={{ width: "60px", height: "60px" }} />

                        <div className="flex-1 pr-8">
                            {isFocused && (
                                <Rating value={star} size="small" onChange={(event, newStar) => setStar(newStar)} />
                            )}

                            <TextField
                                multiline
                                maxRows={4}
                                variant="standard"
                                placeholder={!isFocused ? "Nhập đánh giá của bạn" : ""}
                                onChange={(e) => setText(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                fullWidth
                                value={text}
                                slotProps={{
                                    input: {
                                        endAdornment: isFocused && (
                                            <InputAdornment position="end">
                                                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                                                    <EmojiEmotionsIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />

                            <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                            >
                                <Box sx={{
                                    '.epr_-6npj90': { backgroundColor: 'black' },
                                    '.epr_-xuzz9z': { backgroundColor: 'black' },
                                    '.epr_-2zpaw9': { backgroundColor: '#212529' },
                                    '.epr_qyh4cg': { display: 'none' },
                                }}>
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </Box>
                            </Popover>

                            {isFocused && (
                                <div className='mt-3 flex justify-end gap-x-3'>
                                    <Button sx={{ borderRadius: '20px' }} variant="outlined" color="secondary" startIcon={<ClearIcon />} onClick={() => {
                                        setIsFocused(false);
                                        setText("");
                                    }}>
                                        Hủy
                                    </Button>

                                    <Button sx={{ borderRadius: '20px' }} variant="contained" disabled={text.trim() === "" || !star} onClick={handleOk}>
                                        Đánh giá
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateCourseRating;
