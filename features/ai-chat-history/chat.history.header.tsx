import { sendRequest } from '@/utils/fetch.api';
import { apiUrl } from '@/utils/url';
import { useAiMessage } from '@/wrapper/ai-message/ai.message.wrapper';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, IconButton, Popover, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ChatHistoryHeader = () => {
    const { data: session, status } = useSession();
    const { setOpenHistory, setHistoryChats, setCurrentChatID, setMessages, historyChats } = useAiMessage();
    const [deleteAllEl, setDeleteAllEl] = useState<HTMLElement | null>(null);

    const handleDeleteAllChats = async () => {
        if (!historyChats || (!historyChats.todayChats.length && !historyChats.yesterdayChats.length && !historyChats.weekAgoChats.length)) {
            setDeleteAllEl(null);
            return;
        }

        if (status === "authenticated") {
            await sendRequest<void>({
                url: `${apiUrl}/chats/all`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            setDeleteAllEl(null);
            setHistoryChats(null);
            setCurrentChatID(null);
            setMessages([]);
        }
    }

    return (
        <div className="flex items-center justify-between pl-5 pr-3 pt-3">
            <h1>Lịch sử chat</h1>

            <div className="flex items-center gap-x-3">
                <Tooltip title="Xóa toàn bộ lịch sử" arrow onClick={(e) => setDeleteAllEl(e.currentTarget)}>
                    <IconButton color="secondary" size="small">
                        <DeleteOutlineIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Đóng" arrow>
                    <IconButton color="secondary" onClick={() => setOpenHistory(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <Popover
                open={Boolean(deleteAllEl)}
                anchorEl={deleteAllEl}
                onClose={() => setDeleteAllEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className='py-2 px-4'>
                    <p>Bạn có muốn xóa toàn bộ lịch sử không?</p>
                    <div className='flex justify-end items-center gap-x-3 mt-3'>
                        <Button color='secondary' variant='outlined' startIcon={<CloseIcon />} size='small' onClick={() => setDeleteAllEl(null)}>
                            Không
                        </Button>

                        <Button color='error' variant='contained' size='small' onClick={handleDeleteAllChats}>
                            Xóa
                        </Button>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default ChatHistoryHeader