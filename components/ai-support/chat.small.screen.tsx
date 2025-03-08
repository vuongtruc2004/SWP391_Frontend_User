'use client'
import { Button, Divider, Skeleton } from "@mui/material";
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import { useEffect, useRef, useState } from "react";
import ChatContent from "@/features/ai-support/chat.content";
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatInput from "@/features/ai-support/chat.input";
import AiHeader from "@/features/ai-support/ai.header";

const ChatSmallScreen = () => {
  const { fullname } = useUserAvatar();
  const { messages, loading } = useAiMessage();

  const ref = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const handleShowScrollButton = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 50);
      }
    };

    ref.current?.addEventListener("scroll", handleShowScrollButton);
    return () => ref.current?.removeEventListener("scroll", handleShowScrollButton);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [loading]);

  return (
    <div className="relative flex flex-col h-screen">
      <AiHeader />

      <Divider sx={{ marginBlock: '10px' }} />

      <div className="flex-1 relative overflow-hidden">
        <div className="px-5 overflow-y-auto h-full pb-10" ref={ref}>
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
            bottom: '20px',
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
      </div>

      <Divider />

      <ChatInput />
    </div>
  )
}

export default ChatSmallScreen;
