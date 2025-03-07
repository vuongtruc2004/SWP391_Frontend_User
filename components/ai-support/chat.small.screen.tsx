'use client'
import { Button, Divider, Skeleton } from "@mui/material";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import { useEffect, useRef, useState } from "react";
import ChatContent from "@/features/ai-support/chat.content";
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatInput from "@/features/ai-support/chat.input";

const ChatSmallScreen = () => {
  const { fullname } = useUserAvatar();
  const { messages, loading } = useAiMessage();

  const chatRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (chatRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 50);
      }
    };

    chatRef.current?.addEventListener("scroll", handleScroll);
    return () => chatRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [loading]);

  return (
    <>
      <Divider sx={{ marginBlock: '10px' }} />

      <div className="flex-1 px-5 overflow-y-auto mb-[10px]" ref={chatRef}>
        {messages.length ? (
          <>
            <ChatContent />
            {loading && (
              <>
                <Skeleton animation="wave" variant="text" width={"100%"} sx={{ fontSize: '1rem' }} />
                <Skeleton animation="wave" variant="text" width={"90%"} sx={{ fontSize: '1rem' }} />
                <Skeleton animation="wave" variant="text" width={"80%"} sx={{ fontSize: '1rem' }} />
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-blue-500 text-lg font-semibold">
              Xin chào, {fullname ? fullname.trim().split(/\s+/).pop() : "bạn"}
            </h1>
            <h2 className="text-gray-300">Tôi có thể giúp gì cho bạn?</h2>
          </>
        )}
      </div>

      <Button
        onClick={scrollToBottom}
        variant="contained"
        color="secondary"
        sx={{
          position: 'absolute',
          bottom: '220px',
          left: '50%',
          transition: 'all .2s',
          transform: `translate(-50%, ${showScrollButton ? '0' : '120%'})`,
          pointerEvents: showScrollButton ? 'auto' : 'none',
          opacity: showScrollButton ? 1 : 0,
          width: '32px',
          minWidth: '32px',
          aspectRatio: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          padding: 0,
        }}
      >
        <KeyboardArrowDownIcon />
      </Button>

      <Divider />

      <ChatInput />
    </>
  )
}

export default ChatSmallScreen