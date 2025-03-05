'use client'
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useUserAvatar } from "@/wrapper/user-avatar/user.avatar.wrapper";
import Link from "next/link";
import ChatBox from "@/features/ai-support/chatbox";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { storageUrl } from "@/utils/url";
import AiIcon from "./ai.icon";

const AiConversation = ({ setOpen }: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { fullname } = useUserAvatar();
  const [messages, setMessages] = useState([]);

  return (
    <Box sx={{
      bgcolor: '#171717',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '420px'
    }}>
      <div className="flex items-center justify-between pl-5 pr-[10px] pt-[10px]">

        <div className="flex items-center gap-x-1">
          <Image src={`/logo.webp`} alt="app logo" width={40} height={40} />
          <h1 className="font-semibold text-lg">LearnGo AI</h1>
        </div>

        <div className="flex items-center gap-x-3">
          <Tooltip title="Xem toàn màn hình" arrow>
            <Link href={"/home"}>
              <IconButton color="secondary">
                <FullscreenIcon />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Đóng cửa sổ chat" arrow>
            <IconButton color="secondary" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>

      </div>

      <Divider sx={{ marginBlock: '10px 20px' }} />

      <div className="flex items-center justify-center">
        <AiIcon />
      </div>

      <div className="flex-1 px-5">
        {messages.length ? (
          <>
            <h1 className="text-blue-500 text-2xl">
              Xin chào, {fullname ? fullname.trim().split(/\s+/).pop() : "bạn"}
            </h1>
            <h2 className="text-xl text-gray-300">Tôi có thể giúp gì cho bạn?</h2>
          </>
        ) : (
          <>
            <h1 className="text-blue-500 text-2xl">
              Xin chào, {fullname ? fullname.trim().split(/\s+/).pop() : "bạn"}
            </h1>
            <h2 className="text-xl text-gray-300">Tôi có thể giúp gì cho bạn?</h2>
          </>
        )}
      </div>

      <Divider />

      <ChatBox />
    </Box>
  )
}

export default AiConversation