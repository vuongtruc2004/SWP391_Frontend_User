import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";
import { Fragment, useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ChatContent = () => {
    const { messages } = useAiMessage();
    const [copiedText, setCopiedText] = useState<string>("");

    const handleCopyText = (text: string, role: "user" | "assistant", messageId: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(`${role}_${messageId}`);
            setTimeout(() => setCopiedText(""), 2000);

        }).catch(error => {
            console.log("Lỗi khi sao chép: ", error);
        });
    }

    return (
        <>
            {messages && messages.map((message, index) => {
                const content = message.parts[0].text;
                return (
                    <Fragment key={message.role + "_" + index}>
                        {message.role === "user" ? (
                            <div className="flex justify-end px-4 py-5 group">
                                <div className="rounded-xl bg-[#303030] w-2/3 px-5 py-2.5 relative">
                                    {content}

                                    <div className="flex items-center gap-x-2 absolute top-1 left-[-32%] group-hover:opacity-100 opacity-0 transition-all duration-200">
                                        <Tooltip title="Sao chép" arrow placement="top">
                                            <span className="flex w-[30px] h-[30px] rounded-xl items-center justify-center cursor-pointer hover:bg-[#303030] transition-all duration-200"
                                                onClick={() => handleCopyText(content, "user", index)}
                                            >
                                                {copiedText === `user_${index}` ? (
                                                    <CheckIcon sx={{ fontSize: '1rem' }} className="text-green-500" />
                                                ) : (
                                                    <ContentCopyIcon sx={{ fontSize: '1rem' }} className="text-gray-300" />
                                                )}
                                            </span>
                                        </Tooltip>

                                        <Tooltip title="Chỉnh sửa tin nhắn" arrow placement="top">
                                            <span className="flex w-[30px] h-[30px] rounded-xl items-center justify-center cursor-pointer hover:bg-[#303030] transition-all duration-200">
                                                <EditOutlinedIcon sx={{ fontSize: '1rem' }} className="text-gray-300" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 py-5 group relative">
                                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>

                                <Tooltip title="Sao chép" arrow>
                                    <span className={`absolute bottom-[-16px] left-4 ${index === messages.length - 1 ? "" : "opacity-0"} group-hover:opacity-100 flex w-[30px] h-[30px] rounded-xl items-center justify-center cursor-pointer hover:bg-[#303030] transition-all duration-200`}
                                        onClick={() => handleCopyText(content, "assistant", index)}
                                    >
                                        {copiedText === `assistant_${index}` ? (
                                            <CheckIcon sx={{ fontSize: '1rem' }} className="text-green-500" />
                                        ) : (
                                            <ContentCopyIcon sx={{ fontSize: '1rem' }} className="text-gray-300" />
                                        )}
                                    </span>
                                </Tooltip>
                            </div>
                        )}
                    </Fragment>
                )
            })}
        </>
    )
}

export default ChatContent