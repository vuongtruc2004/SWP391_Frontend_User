'use client'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import Comment from './comment'
import { CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import ReplyComment from './reply.comment';
import { Client } from '@stomp/stompjs';


const CommentList = ({ blog, comments, setComments, hasParent, refreshBlog }: {
    blog: BlogResponse,
    comments: CommentResponse[],
    setComments: Dispatch<SetStateAction<CommentResponse[]>>,
    hasParent: number,
    refreshBlog: () => void,

}) => {
    const { data: session, status } = useSession();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [commentUpdateByWS, setCommentUpdateByWS] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Client | null>(null);
    // const [listAllComment, setListAllComment] = useState<CommentResponse[]>()
    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastCommentElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || !hasMore) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        if (hasParent > -1) return;
        const fetch = async () => {
            setLoading(true);
            await new Promise(res => setTimeout(res, 3000));
            const commentPageResponse = await sendRequest<ApiResponse<PageDetailsResponse<CommentResponse[]>>>({
                url: `${apiUrl}/comments?page=${page}&size=5&filter=blog.blogId:${blog.blogId} and parentComment is null&sort=createdAt,desc&sort=commentId,asc`,
            });

            if (commentPageResponse.status === 200) {
                setComments(prev => {
                    //loc tat ca cac comment da ton tai de tranh trung key
                    const newComments = commentPageResponse.data.content.filter(newComment =>
                        !prev.some(comment => comment.commentId === newComment.commentId) //kiểm tra xem newComment.commentId đã tồn tại trong prev chưa. Nếu có thì loại bỏ nó, chưa thì giữ lại thêm vào danh sách
                    );
                    return [...prev, ...newComments];
                });
                if (page >= commentPageResponse.data.totalPages) {
                    setHasMore(false);
                }
            }
            setLoading(false);
        }


        fetch()
        if (hasMore) {
            fetch();
        }
    }, [page, hasMore]);



    useEffect(() => {
        if (hasParent > -1) return;
        const client = new Client({
            brokerURL: "ws://localhost:8386/ws/websocket",
            reconnectDelay: 5000, // Thử kết nối lại sau 5s nếu mất kết nối
            onConnect: () => {
                console.log("Connected to WebSocket");

                // Subscribe đến topic nhận bình luận mới
                client.subscribe(`/topic/comments/${blog.blogId}`, (message) => {
                    const newComment = JSON.parse(message.body);
                    console.log("session: ", session?.user.userId)
                    if (newComment.user.userId === session?.user.userId) return;
                    console.log("check newComment ", newComment.user.userId)
                    if (newComment.parentComment === null) {
                        setComments((prev) => {
                            const isDuplicate = prev.some(comment => comment.commentId === newComment.commentId);
                            return isDuplicate ? prev : [newComment, ...prev];
                        }
                        )
                    }
                    // getPageComment();
                });


                // Gọi API lấy danh sách bình luận ban đầu

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
    }, [blog.blogId, session]);

    return (
        <>
            <div className="mt-5">
                {comments.map((comment, index) => {
                    return (
                        <div key={`comment-${comment.commentId}-${comment.createdAt}-${index}`} ref={index === comments.length - 1 ? lastCommentElementRef : null}>
                            {/* {comment.commentId}. {comment.content} */}
                            <Comment
                                commentResponse={comment}
                                blog={blog}
                                setComments={setComments}
                                refreshBlog={refreshBlog}
                            />
                        </div>
                    );
                })}
                {session && hasParent > -1 && (
                    <div>
                        <ReplyComment
                            blog={blog}
                            parentId={hasParent}
                            setChildComment={setComments}
                            refreshBlog={refreshBlog}
                        />
                    </div>
                )}
                {loading && (
                    <div className="flex justify-center p-5">
                        <CircularProgress />
                    </div>
                )}
            </div>
        </>

    )
}

export default CommentList
