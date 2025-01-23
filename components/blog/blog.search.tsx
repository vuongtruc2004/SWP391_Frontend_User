'use client'
import { Box, Button, Chip, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useEffect } from 'react';

interface IProps {
    currentFilter: string;
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
}
const BlogSearch = (props: IProps) => {
    const { currentFilter, setCurrentFilter } = props;

    const filter: BlogFilter[] = [
        {
            key: 'all',
            name: 'Tất cả',
            value: 'all'
        },
        {
            key: 'like',
            name: 'Lượt thích',
            value: 'like',
            icon: <ThumbUpIcon sx={{ color: '#0466c8 !important', marginRight: '2px !important' }} />
        },
        {
            key: 'comment',
            name: 'Bình luận',
            value: 'comment',
            icon: <ChatBubbleIcon sx={{ color: '#adb5bd !important', marginRight: '2px !important' }} />
        },
        {
            key: 'newest',
            name: 'Mới nhất',
            value: 'newest',
            icon: <WhatshotIcon sx={{ color: '#e36414 !important', marginRight: '2px !important' }} />
        },
        {
            key: 'save',
            name: 'Đã lưu',
            value: 'save',
            icon: <BookmarkIcon sx={{ color: '#38b000 !important', marginRight: '2px !important' }} />
        }
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        const keyword = e.target[0].value;
        console.log(keyword);
    }

    useEffect(() => {
        console.log('fetching...');
    }, [currentFilter]);

    return (
        <Box sx={{
            paddingTop: '120px'
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: '650px',
            }}>
                <form style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    columnGap: '20px'
                }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        size='small'
                        fullWidth
                        placeholder='Tìm bài viết'
                    />
                    <Button type='submit' variant='contained' sx={{ height: '40px', textWrap: 'nowrap', paddingInline: '20px' }}>Tìm Kiếm</Button>
                </form>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                    marginTop: '20px'
                }}>
                    {filter.map((item) => {
                        return (
                            <Chip
                                label={item.name}
                                variant={item.key === currentFilter ? 'filled' : "outlined"}
                                //@ts-ignore
                                icon={item.icon}
                                key={item.key}
                                size='small'
                                sx={{
                                    cursor: 'pointer',
                                    width: 'max-content',
                                    height: '28px',
                                    paddingInline: '15px',
                                    transition: 'all .3s',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.16)',
                                    }
                                }}
                                onClick={() => setCurrentFilter(item.key)}
                            />
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default BlogSearch