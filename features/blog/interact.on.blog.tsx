'use client'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { slugifyText } from "@/helper/blog.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import CommentList from "@/components/comments/list.comments";
import { Divider, InputAdornment, Popover } from "@mui/material";
import { Client } from "@stomp/stompjs";
import { comment } from "./blog.interact.action";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const InteractOnBlog = ({ blog }: { blog: BlogResponse }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [state, formAction, pending] = useActionState(comment, null);
    const [statusLike, setStatusLike] = useState<Boolean>(false);
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [blogRefresh, setBlogRefresh] = useState<BlogResponse>(blog);
    const [stompClient, setStompClient] = useState<Client | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState("");

    const formRef = useRef<HTMLFormElement>(null);  // Ref cho form

    const handleEmojiClick = (emojiObject: any) => {
        if (inputRef.current) {
            inputRef.current.value += emojiObject.emoji; // Thêm emoji vào text
        }
    };

    const redirectToLogin = () => {
        if (!session) {
            sessionStorage.setItem('prevUrl', `/blog/${slugifyText(blog.title + "-" + blog.blogId)}`);
            router.push("/login");
        }
    }

    const refreshBlog = async () => {
        const blogResponse = await sendRequest<ApiResponse<BlogResponse>>({
            url: `${apiUrl}/blogs/${blog.blogId}`,
        });
        if (blogResponse.status === 200) {
            setBlogRefresh(blogResponse.data);
        }
    }

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const checkMethod = await sendRequest<ApiResponse<Boolean>>({
                    url: `${apiUrl}/likes/check-like/${blog.blogId}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${session?.accessToken}`
                    },
                });

                if (checkMethod.status === 200) {
                    setStatusLike(checkMethod.data); // Gán giá trị trả về từ API
                }
            } catch (error) {
                console.error("Lỗi khi kiểm tra like:", error);
            }
        };

        fetchLikeStatus();
    }, [session?.accessToken]);

    useEffect(() => {
        const createComment = async () => {
            if (status === 'authenticated') {
                const commentRequest: CommentRequest = {
                    content: state?.comment.value ?? '',
                    blog: blog.blogId,
                    parentComment: null,
                }
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
                    setComments(prev => [createComment.data, ...prev]);
                    refreshBlog();
                }
            }
        };

        if (state && !state.comment.error) {
            createComment();

        }
    }, [state]);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8386/ws/websocket',
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connect websocket in interact");
                client.subscribe(`/topic/comments/${blog.blogId}`, (message) => {
                    refreshBlog();
                });

                client.subscribe(`/topic/likes`, (message) => {
                    refreshBlog();
                })
            },
            onStompError: (error) => {
                console.log('Connect websocket interact error', error);
            },
        });
        client.activate();
        setStompClient(client);
        return () => {
            client.deactivate();
        };
    }, [blog.blogId])



    const likeBlog = async () => {
        if (!statusLike) {
            const likeRequest: LikeRequest = {
                blogId: blog.blogId,
                commentId: undefined,
            }
            const likeBlog = await sendRequest<ApiResponse<LikeResponse>>({
                url: `${apiUrl}/likes`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: likeRequest
            });

            if (likeBlog.status === 200) {
                setStatusLike(true)
                refreshBlog()
            }

        } else {

            const dislikeBlog = await sendRequest<ApiResponse<String>>({
                url: `${apiUrl}/likes/dislike-blog/${blog.blogId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`,
                },

            });
            if (dislikeBlog.status === 200) {
                setStatusLike(false)
                refreshBlog()
            }
        }

    }

    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: '6px',
            padding: '20px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            position: 'relative'
        }}>
            <ul className="flex items-center gap-x-10">
                <li className="flex items-center gap-x-1">
                    <Tooltip title="Nhấn để thích bài viết này" placement="top" arrow>
                        <IconButton color={statusLike === false ? "default" : "primary"} onClick={likeBlog}>
                            <ThumbUpOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <p>{blogRefresh.totalLikes}</p>
                </li>
                <li className="flex items-center gap-x-1">
                    <IconButton color="primary" onClick={() => inputRef.current?.focus()}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                    <p>{blogRefresh.totalComments}</p>
                </li>
            </ul>
            <Divider />

            <form ref={formRef} action={formAction} className="my-5">
                <TextField
                    placeholder="Nhập bình luận của bạn"
                    multiline
                    fullWidth
                    inputRef={inputRef}
                    minRows={5}
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
                    loading={pending}
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none', marginTop: '20px' }}
                    type="submit"
                >
                    Đăng bình luận
                </Button>
            </form>

            <CommentList
                blog={blog}
                comments={comments}
                setComments={setComments}
                hasParent={-1}
                refreshBlog={refreshBlog}
            />
        </Box>
    )
}

export default InteractOnBlog