'use client'
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import Link from "next/link";
import ChatBox from "@/features/ai-support/chatbox";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import ChatContent from "@/features/ai-support/chat.content";
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";

const ChatDrawer = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { fullname } = useUserAvatar();
  const { messages, loading } = useAiMessage();

  return (
    <Box sx={{
      bgcolor: '#171717',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div className="flex items-center justify-between pl-5 pr-3 pt-3">

        <div className="flex items-center gap-x-1">
          <Image src={`/logo.webp`} alt="app logo" width={32} height={32} />
          <h1 className="font-semibold text-lg">LearnGo AI</h1>
        </div>

        <div className="flex items-center gap-x-3">
          <Tooltip title="Xem toàn màn hình" arrow>
            <Link href={"/home"}>
              <IconButton color="secondary" size="small">
                <FullscreenIcon />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Đóng cửa sổ chat" arrow>
            <IconButton color="secondary" onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>

      </div>

      <Divider sx={{ marginBlock: '10px' }} />

      <div className="flex-1 px-5 overflow-y-auto mb-[10px]">
        {messages.length ? (
          <>
            <ChatContent />
            {loading && (
              <p>Loading...</p>
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

      <Divider />

      <ChatBox />
    </Box>
  )
}

export default ChatDrawer