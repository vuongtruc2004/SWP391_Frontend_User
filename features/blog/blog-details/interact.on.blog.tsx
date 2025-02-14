'use client'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useActionState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { comment, CommentFieldResponse } from "./blog.interact.action";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const initState: CommentFieldResponse | null = null;
const InteractOnBlog = ({ blog }: { blog: BlogResponse }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [state, formAction, pending] = useActionState(comment, initState);

    const redirectToLogin = () => {
        if (!session) {
            sessionStorage.setItem('prevUrl', `/blog/${blog.blogId}`);
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
                    disabled={status !== "authenticated"}
                />
                <Button
                    disabled={pending || status !== "authenticated"}
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