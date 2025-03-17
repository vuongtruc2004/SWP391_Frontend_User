import { apiUrl, storageUrl } from "@/utils/url";
import { Avatar, Box, Button, CircularProgress, IconButton, InputAdornment, Popover, Rating, Snackbar, SnackbarContent, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { sendRequest } from "@/utils/fetch.api";
import { useCourseRate } from "@/wrapper/course-rate/course.rate.wrapper";

const CreateCourseRating = ({ course, setOpenSnackbarSuccess }: { course: CourseDetailsResponse, setOpenSnackbarSuccess: Dispatch<SetStateAction<boolean>> }) => {
    const { fetchRatePage } = useCourseRate();
    const { data: session } = useSession();
    const [star, setStar] = useState<number | null>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const isLearningPage = location.pathname.startsWith("/course/learning/");

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
    };

    return (
        <>
            <Snackbar
                open={openSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <SnackbarContent
                    message="Vui lòng bình luận không quá 50 từ!"
                    sx={{ backgroundColor: "red", color: "white", fontWeight: "bold" }}
                />
            </Snackbar>
            {loading ? <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
                :
                <Box sx={{ margin: "30px 0" }} ref={containerRef}>
                    <div className="flex gap-5 items-center">
                        <Avatar
                            alt={session?.user.fullname}
                            src={`${storageUrl}/avatar/${session?.user.avatar}`}
                            sx={{ width: "60px", height: "60px" }}
                        />
                        <div className="w-[42vw]">
                            {isFocused && (
                                <Rating
                                    value={star}
                                    size="small"
                                    onChange={(event, newStar) => setStar(newStar)}
                                />
                            )}

                            <TextField
                                id="standard-multiline-flexible"
                                multiline
                                maxRows={4}
                                variant="standard"
                                placeholder={!isFocused ? "Nhập đánh giá của bạn..." : ""}
                                onChange={(e) => setText(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                sx={{ width: isLearningPage ? "132%" : "100%" }}
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
                                <div className={`mt-3 flex justify-end ${isLearningPage ? "w-[132%]" : "w-[100%]"}`}>
                                    <Button
                                        sx={{ padding: "5px 10px", borderRadius: "20px" }}
                                        variant="text"
                                        onClick={() => {
                                            setIsFocused(false);
                                            setText("");
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        sx={{
                                            padding: "5px 10px",
                                            borderRadius: "20px",
                                            backgroundColor: text.trim() === "" && !star ? "#ccc" : "",
                                            "&:hover": {
                                                backgroundColor: text.trim() === "" && !star ? "#ccc" : "",
                                            },
                                        }}
                                        variant="contained"
                                        disabled={text.trim() === "" && !star}
                                        onClick={() => handleOk()}
                                    >
                                        Đánh giá
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Box>
            }


        </>

    );
};

export default CreateCourseRating;
