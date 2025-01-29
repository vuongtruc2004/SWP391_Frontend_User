'use client'
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useActionState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { comment, CommentFieldResponse } from "./blog.interact.action";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

interface IProps {
    blog: BlogResponse;
}
const initState: CommentFieldResponse | null = null;
const InteractOnBlog = (props: IProps) => {
    const { blog } = props;
    const { data: session } = useSession();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [state, formAction, pending] = useActionState(comment, initState);

    const redirectToLogin = () => {
        if (!session) {
            router.push("/login");
        }
    }

    const likeBlog = () => {

    }

    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            padding: '20px'
        }}>
            <ul className="flex items-center gap-x-10">
                <li className="flex items-center gap-x-1">
                    <Tooltip title="Nhấn để thích bài viết này" placement="top" arrow>
                        <IconButton color="primary" onClick={likeBlog}>
                            <ThumbUpOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <p>{blog.totalLikes}</p>
                </li>
                <li className="flex items-center gap-x-1">
                    <IconButton color="primary" onClick={() => inputRef.current?.focus()}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                    <p>{blog.totalComments}</p>
                </li>
            </ul>

            <form action={formAction} className="my-5">
                <TextField
                    placeholder="Nhập bình luận của bạn"
                    multiline
                    fullWidth
                    minRows={5}
                    inputRef={inputRef}
                    onFocus={redirectToLogin}
                    name="comment"
                    defaultValue={state?.comment.value}
                    error={state?.comment.error}
                    helperText={state?.comment.error && (
                        <span className="flex items-center gap-x-1">
                            <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                            {state?.comment.message}
                        </span>
                    )}
                />
                <Button
                    disabled={pending || !session}
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', marginTop: '20px' }}
                    type="submit"
                >
                    Đăng bình luận
                </Button>
            </form>
        </Box>
    )
}

export default InteractOnBlog