import React, { Dispatch, SetStateAction, useActionState, useEffect, useRef, useState } from 'react'
import { Box, Button, IconButton, InputAdornment, Popover, TextField } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import { comment } from '@/features/blog/blog.interact.action';
import { Client } from '@stomp/stompjs';
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const ReplyComment = ({ blog, parentId, setChildComment, refreshBlog }: {
    blog: BlogResponse,
    parentId: number | null,
    setChildComment: Dispatch<SetStateAction<CommentResponse[]>>,
    refreshBlog: () => void,
}) => {
    const [state, formAction, pending] = useActionState(comment, null);
    const { data: session, status } = useSession();
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState("");

    const formRef = useRef<HTMLFormElement>(null);  // Ref cho form
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEmojiClick = (emojiObject: any) => {
        if (inputRef.current) {
            inputRef.current.value += emojiObject.emoji; // Thêm emoji vào text
        }
    };

    useEffect(() => {
        if (state && !state.comment.error) {

            const commentRequest: CommentRequest = {
                content: state?.comment.value ?? '',
                blog: blog.blogId,
                parentComment: parentId ?? null,
            }
            const fetchCreateComment = async () => {
                const createComment = await sendRequest<ApiResponse<CommentResponse>>({
                    url: `${apiUrl}/comments/create-comment`,
                    method: 'POST',
                    body: commentRequest,
                    headers: {
                        'Authorization': `Bearer ${session?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                });
                if (createComment.status === 200) {
                    // setChildComment(prev => [...prev, createComment.data])
                    refreshBlog()
                }
            };
            fetchCreateComment();
        }
    }, [state]);



    return (
        <div>
            <form ref={formRef} action={formAction} className="my-5">
                <TextField
                    placeholder="Nhập bình luận của bạn"
                    multiline
                    fullWidth
                    minRows={5}
                    inputRef={inputRef}
                    name="comment"
                    error={state?.comment.error}
                    helperText={state && state.comment.error && (
                        <span className="flex items-center gap-x-1">
                            <ErrorOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                            {state?.comment.message}
                        </span>
                    )}
                    disabled={status !== "authenticated"}
                    slotProps={{
                        input: {
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                                        <EmojiEmotionsIcon />
                                    </IconButton>
                                </InputAdornment>

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
        </div>
    )
}

export default ReplyComment
