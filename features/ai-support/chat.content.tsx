import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAiMessage } from "@/wrapper/ai-message/ai.message.wrapper";
import { Fragment, useState } from 'react';
import ChatResponseFormat from './chat.response.format';

const ChatContent = () => {
    const { messages } = useAiMessage();
    const [copiedText, setCopiedText] = useState<string>("");

    const handleCopyText = (text: string, role: "USER" | "MODEL" | "FUNCTION" | "SYSTEM", messageId: number) => {
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
                const content = message.content;

                return (
                    <Fragment key={message.role + "_" + index}>
                        {message.role === "USER" ? (
                            <div className="flex justify-end py-5 group">
                                <div className="rounded-xl bg-[#303030] w-2/3 px-5 py-2.5 relative">
                                    {content}

                                    <Tooltip title="Sao chép" arrow placement="top">
                                        <span className=" absolute top-1 left-[-35px] group-hover:opacity-100 opacity-0 flex w-[30px] h-[30px] rounded-xl items-center justify-center cursor-pointer hover:bg-[#303030] transition-all duration-200"
                                            onClick={() => handleCopyText(content, "USER", index)}
                                        >
                                            {copiedText === `USER_${index}` ? (
                                                <CheckIcon sx={{ fontSize: '1rem' }} className="text-green-500" />
                                            ) : (
                                                <ContentCopyIcon sx={{ fontSize: '1rem' }} className="text-gray-300" />
                                            )}
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                        ) : (
                            <div className="py-5 group relative">
                                <ChatResponseFormat content={content} />

                                <Tooltip title="Sao chép" arrow>
                                    <span className={`absolute bottom-[-16px] left-0 ${index === messages.length - 1 ? "" : "opacity-0"} group-hover:opacity-100 flex w-[30px] h-[30px] rounded-xl items-center justify-center cursor-pointer hover:bg-[#303030] transition-all duration-200`}
                                        onClick={() => handleCopyText(content, "MODEL", index)}
                                    >
                                        {copiedText === `MODEL_${index}` ? (
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