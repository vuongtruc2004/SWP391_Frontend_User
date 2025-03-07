import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import remarkGfm from 'remark-gfm';
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { Box } from '@mui/material';

const ChatResponse = ({ content }: { content: string }) => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopyCode = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedCode(text);
            setTimeout(() => setCopiedCode(null), 2000);
        }).catch(error => console.log("Lỗi khi sao chép: ", error));
    };

    return (
        <div className="chat-message">
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table({ children }) {
                        return (
                            <Box sx={{
                                overflowX: 'auto',
                                marginBlock: '12px',
                                '&::-webkit-scrollbar': {
                                    display: 'block',
                                    height: '3px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: '#495057',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: '#60a5fa',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    background: '#1976D2',
                                },
                            }}>
                                <table className="border-collapse w-full text-left">
                                    {children}
                                </table>
                            </Box>
                        );
                    },
                    th({ children }) {
                        return (
                            <th className="bg-[#383738] text-white px-3 py-2 border border-[#595959]">
                                {children}
                            </th>
                        );
                    },
                    td({ children }) {
                        return (
                            <td className="px-3 py-2 border border-[#595959]">
                                {children}
                            </td>
                        );
                    },
                    ol({ children }) {
                        return (
                            <ol className='list-decimal my-3 px-5'>
                                {children}
                            </ol>
                        )
                    },
                    ul({ children }) {
                        return (
                            <ul className='list-disc my-3 px-5'>
                                {children}
                            </ul>
                        )
                    },
                    code({ children, className, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeText = String(children).replace(/\n$/, '');
                        const isTableFormat = codeText.includes('|') && codeText.split('\n').length > 1;

                        if (isTableFormat) {
                            return (
                                <Box sx={{
                                    overflowX: 'auto',
                                    marginBlock: '12px',
                                    '&::-webkit-scrollbar': {
                                        display: 'block',
                                        height: '3px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: '#495057',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#60a5fa',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        background: '#1976D2',
                                    },
                                }}>
                                    <code>
                                        {children}
                                    </code>
                                </Box>
                            );
                        }

                        return match ? (
                            <Box sx={{
                                overflowX: 'auto',
                                borderRadius: '6px',
                                marginBlock: '12px',
                                '.code-block': {
                                    '&::-webkit-scrollbar': {
                                        display: 'block',
                                        height: '5px',
                                        borderRadius: '6px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: '#495057',
                                        borderRadius: '6px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#60a5fa',
                                        borderRadius: '6px',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        background: '#1976D2',
                                    },
                                },
                            }}>
                                <div className="bg-[#2f2f2f] flex items-center justify-between text-gray-300 text-xs px-4 py-2">
                                    <p>{match[1].toLowerCase()}</p>
                                    <div className='flex items-center gap-x-1 cursor-pointer' onClick={() => handleCopyCode(codeText)}>
                                        {copiedCode === codeText ? (
                                            <CheckIcon sx={{ fontSize: '0.8rem' }} className="text-green-500" />
                                        ) : (
                                            <ContentCopyIcon sx={{ fontSize: '0.8rem' }} className="text-gray-300" />
                                        )}
                                        <p>{copiedCode === codeText ? "Đã sao chép" : "Sao chép"}</p>
                                    </div>
                                </div>

                                {/*@ts-ignore */}
                                <SyntaxHighlighter
                                    {...props}
                                    PreTag="div"
                                    language={match[1]}
                                    style={vscDarkPlus}
                                    className="!m-0 rounded-br-md rounded-bl-md code-block"
                                >
                                    {codeText}
                                </SyntaxHighlighter>
                            </Box>
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </Markdown>
        </div>
    );
};

export default ChatResponse;
