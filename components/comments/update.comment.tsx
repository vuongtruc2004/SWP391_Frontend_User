import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { comment } from "@/features/blog/blog.interact.action";
import { Client } from "@stomp/stompjs";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const UpdateComment = ({
  blog,
  commentUpdate,
  setComments,
  setOpenUpdate,
}: {
  blog: BlogResponse;
  commentUpdate: CommentResponse;
  setComments: Dispatch<SetStateAction<CommentResponse[]>>;
  setOpenUpdate: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session, status } = useSession();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(commentUpdate?.content);
  const [error, setError] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null); // Ref cho form
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8386/ws/websocket",
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket connected!");
        client.subscribe("/topic/comments/update", (message) => {
          const updatedComment = JSON.parse(message.body); // Nhận bình luận đã cập nhật từ server
          console.log("Received updated comment:", updatedComment);

          // Cập nhật lại danh sách bình luận ngay lập tức
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.commentId === updatedComment.commentId
                ? updatedComment
                : comment
            )
          );
        });
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
  }, []);

  const handleEmojiClick = (emojiObject: any) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  console.log("check commentUpdate:", commentUpdate);

  const handleUpdate = async () => {
    if (text.trim() === "") {
      setError(true);
      return;
    }

    const commentUpdateRequest: CommentRequest = {
      content: text,
      blog: blog.blogId || null,
      parentComment:
        commentUpdate.parentComment === null
          ? null
          : commentUpdate.parentComment.commentId,
    };

    console.log("commentUpdateRequest", commentUpdateRequest);

    const sendUpdateRequest = await sendRequest<ApiResponse<CommentResponse>>({
      url: `${apiUrl}/comments/update/${commentUpdate.commentId}`,
      method: "PATCH",
      body: commentUpdateRequest,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (sendUpdateRequest.status === 200) {
      setOpenUpdate(false);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === sendUpdateRequest.data.commentId
            ? sendUpdateRequest.data
            : comment
        )
      );
    }
  };

  return (
    <div>
      <TextField
        placeholder="Nhập bình luận của bạn"
        value={text}
        multiline
        fullWidth
        minRows={5}
        onChange={(event) => setText(event?.target.value)}
        inputRef={inputRef}
        name="comment"
        error={error}
        helperText={
          error && (
            <span className="flex items-center gap-x-1">
              <ErrorOutlineRoundedIcon sx={{ fontSize: "16px" }} />
              Nội dung không được để trống
            </span>
          )
        }
        disabled={status !== "authenticated"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={(event) => setAnchorEl(event.currentTarget)}>
                  <EmojiEmotionsIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Box
          sx={{
            ".epr_-6npj90": { backgroundColor: "black" },
            ".epr_-xuzz9z": { backgroundColor: "black" },
            ".epr_-2zpaw9": { backgroundColor: "#212529" },
            ".epr_qyh4cg": { display: "none" },
          }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      </Popover>
      <Button
        disabled={status !== "authenticated"}
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", marginTop: "20px" }}
        onClick={handleUpdate}>
        Đăng bình luận
      </Button>
    </div>
  );
};

export default UpdateComment;
