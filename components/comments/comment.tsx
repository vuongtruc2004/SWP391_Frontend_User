'use client'
import { apiUrl, storageUrl } from '@/utils/url'
import { Avatar, Button, IconButton, Popover, Tooltip } from '@mui/material'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CommentList from './list.comments';
import { sendRequest } from '@/utils/fetch.api';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PestControlIcon from '@mui/icons-material/PestControl';
import { useSession } from 'next-auth/react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Client } from '@stomp/stompjs';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
})
const Comment = ({ commentResponse, blog, setComments, refreshBlog }: {
    commentResponse: CommentResponse,
    blog: BlogResponse,
    setComments: Dispatch<SetStateAction<CommentResponse[]>>,
    refreshBlog: () => void,
}) => {
    const [childCommentList, setChildCommentList] = useState<CommentResponse[]>(commentResponse.replies);
    const [childrenVisibility, setChildrenVisibility] = useState<{ [key: number]: boolean }>({});
    const [likeComment, setLikeComment] = useState<Boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { data: session, status } = useSession();
    const [likeCount, setLikeCount] = useState(commentResponse?.likes?.length || 0);
    const [stompClient, setStompClient] = useState<Client | null>(null);



    useEffect(() => {
        const fetchCheckLikeComment = async () => {
            const checkTym = await sendRequest<ApiResponse<Boolean>>({
                url: `${apiUrl}/likes/check-like-comment/${commentResponse.commentId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`,
                }
            });
            if (checkTym.status === 200) {
                setLikeComment(checkTym.data)
            }
        }

        fetchCheckLikeComment();
    }, [session?.accessToken]);

    useEffect(() => {

        const client = new Client({
            brokerURL: "ws://localhost:8386/ws/websocket",
            reconnectDelay: 5000, // Thử kết nối lại sau 5s nếu mất kết nối
            onConnect: () => {

                // Subscribe đến topic nhận bình luận mới
                client.subscribe(`/topic/comments/${blog.blogId}`, (message) => {
                    const newComment = JSON.parse(message.body);
                    if (newComment.parentComment.commentId !== commentResponse.commentId) return;
                    setChildCommentList((prev) => {
                        if (!prev || !Array.isArray(prev)) {
                            return [newComment]; // Nếu prev là null hoặc không phải mảng, gán thành mảng mới
                        }
                        const isDuplicate = prev.some(comment => comment.commentId === newComment.commentId);
                        return isDuplicate ? prev : [...prev, newComment];
                    });
                    // getPageComment();
                });

                client.subscribe(`/topic/likes/${commentResponse.commentId}`, (message) => {
                    const newLikeComment = JSON.parse(message.body);
                    if (newLikeComment.comment.commentId === commentResponse.commentId) {
                        setLikeCount(newLikeComment?.comment.likes.length);
                    }

                });

                client.subscribe(`/topic/likes/dislike/${commentResponse.commentId}`, (message) => {
                    const refreshComment = JSON.parse(message.body);
                    if (refreshComment.commentId === commentResponse.commentId) {
                        setLikeCount(refreshComment?.likes?.length);
                    }
                })
                // Gọi API lấy danh sách bình luận ban đầu
                client.subscribe('/topic/comments/delete', (message) => {
                    if (message.body.toString() === "deleteSuccess") {
                        // setComments(prev => prev.filter(comment => comment !== commentResponse));
                        refreshBlog()
                    }
                })

            },
            onStompError: (error) => {
                console.error("STOMP Error", error);
            },
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [commentResponse.commentId, likeCount]);

    const handleDeleteComment = async () => {
        const deleteComment = await sendRequest<ApiResponse<String>>({
            url: `${apiUrl}/comments/delete-comment/${commentResponse.commentId}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        });
        if (deleteComment.status === 200) {
            setComments(prev => prev.filter(comment => comment !== commentResponse));
            refreshBlog()
        }
    }



    const likeAComment = async () => {
        if (!likeComment) {
            const likeRequest: LikeRequest = {
                blogId: undefined,
                commentId: commentResponse.commentId || undefined,
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
                setLikeComment(true);
                // router.refresh();
            }

        } else {
            const dislikeComment = await sendRequest<ApiResponse<String>>({
                url: `${apiUrl}/likes/dislike-comment/${commentResponse.commentId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`,
                },

            });
            if (dislikeComment.status === 200) {
                setLikeComment(false);
            }
        }

    }

    // Hàm toggle trạng thái của từng comment dựa vào commentId
    const toggleChildrenVisibility = (commentId: number) => {
        setChildrenVisibility(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        const fetchChildComment = async () => {
            if (!childrenVisibility[commentResponse.commentId] || childCommentList?.length > 0) return;
            const getChildrenComment = await sendRequest<ApiResponse<CommentResponse[]>>({
                url: `${apiUrl}/comments/child-comment/${commentResponse.commentId}`,
                method: 'GET',
            });

            if (getChildrenComment.status === 200) {
                setChildCommentList(getChildrenComment.data)
            }
        }
        fetchChildComment();

    }, [childrenVisibility[commentResponse.commentId]])

    return (
        <>
            <div className='flex justify-between'>
                <div>
                    <div className='flex gap-x-5 my-5'>

                        <div>
                            <Avatar alt={commentResponse.user.fullname} src={`${storageUrl}/avatar/${commentResponse.user.avatar}`} />
                        </div>
                        <div>
                            <p>{commentResponse.user.fullname}</p>
                            {/* <span className='text-sm text-[#bde0fe]'>{dayjs(commentResponse.createdAt).format("DD-MM-YYYY")}</span> */}
                            <span className='text-sm text-[#bde0fe]'>{dateFormatter.format(Date.parse(commentResponse.createdAt))}</span>
                        </div>
                    </div>
                    <div className='pl-3'>
                        {commentResponse.content}
                    </div>
                    <div className='flex gap-x-8'>
                        <div className='flex gap-x-3'>
                            <Tooltip title="Nhấn để thích bài viết này" placement="top" arrow>
                                {/* <IconButton color={statusLike === false ? "default" : "primary"}> */}
                                <IconButton color={likeComment ? 'error' : 'default'} onClick={likeAComment}>
                                    <FavoriteSharpIcon />
                                </IconButton>
                            </Tooltip>
                            <p className='self-center'>{likeCount}</p>
                        </div>

                        <div className='flex gap-x-3'>
                            <Tooltip title="Nhấn để trả lời bình luận này" placement="top" arrow>
                                {/* <IconButton color={statusLike === false ? "default" : "primary"}> */}
                                <IconButton color={childCommentList?.length > 0 ? 'primary' : 'default'} onClick={() => toggleChildrenVisibility(commentResponse.commentId)}>
                                    <ChatBubbleOutlineOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            {/* <p className='self-center'>{commentResponse?.replies?.length}</p> */}
                            <p className='self-center'>{childCommentList?.length | 0}</p>
                        </div>
                    </div>
                </div>
                <div className='self-center'>
                    {/* <IconButton color={statusLike === false ? "default" : "primary"}> */}
                    <IconButton color='primary' onClick={handleOpenPopover}>
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
                        <div className="flex flex-col items-start p-2 bg-[#101010] max-w-[250px]">
                            {session?.user.userId === commentResponse.user.userId && (
                                <Button startIcon={<CancelPresentationIcon />} color="secondary" variant="text" fullWidth sx={{
                                    justifyContent: 'flex-start'
                                }} onClick={handleDeleteComment}>
                                    Xóa thông báo này
                                </Button>
                            )}

                            <Button startIcon={<PestControlIcon />} color="secondary" variant="text" sx={{
                                textAlign: 'left',
                            }} fullWidth>
                                Báo cáo sự cố cho đội ngũ phụ trách thông báo
                            </Button>
                        </div>

                    </Popover>
                </div>
            </div>
            {childCommentList !== null && (
                <>
                    <div className={`flex ${!childrenVisibility[commentResponse.commentId] ? 'hidden' : ''}`}>
                        <div className='w-[2px] bg-gray-500'></div>
                        <div className='pl-6 grow box-border'>
                            <CommentList
                                comments={childCommentList}
                                blog={blog}
                                setComments={setChildCommentList}
                                hasParent={commentResponse.commentId}
                                refreshBlog={refreshBlog}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Comment
