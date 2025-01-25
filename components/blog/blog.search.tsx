'use client'
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { useEffect } from 'react';

const BlogSearch = () => {

    const filter: BlogFilter[] = [
        {
            key: 'all',
            name: 'Tất cả',
            icon: <AlignHorizontalLeftIcon sx={{ color: '#c77dff !important', fontSize: '16px' }} />
        },
        {
            key: 'like',
            name: 'Đã thích',
            icon: <ThumbUpIcon sx={{ color: '#0466c8 !important', fontSize: '16px' }} />
        },
        {
            key: 'comment',
            name: 'Đã bình luận',
            icon: <ChatBubbleIcon sx={{ color: '#adb5bd !important', fontSize: '16px' }} />
        }
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        const keyword = e.target[0].value;
        console.log(keyword);
    }

    // useEffect(() => {
    //     console.log('fetching...');
    // }, [currentFilter]);

    return (
        <Box sx={{
            marginBlock: '20px'
        }}>
            <Box sx={{
                width: '100%',
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
                        placeholder='Nhập tiêu đề, nội dung, tác giả,...'
                    />
                    <Button type='submit' variant='contained' sx={{ height: '40px', textWrap: 'nowrap', paddingInline: '50px' }}>Tìm Kiếm</Button>
                </form>

                <Box sx={{
                    display: 'grid',
                    alignItems: 'center',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: '20px',
                    marginTop: '20px'
                }}>
                    {filter.map((item) => {
                        return (
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px 20px',
                                    borderRadius: '15px',
                                    color: 'white',
                                    bgcolor: '#17181c',
                                    cursor: 'pointer',
                                    transition: 'all .3s',
                                    '&.active, &:hover': {
                                        bgcolor: '#343a40',
                                    },
                                    '&.active': {
                                        pointerEvents: 'none'
                                    }
                                }}
                                key={item.key}
                            // onClick={() => setCurrentFilter(item.key)}
                            // className={currentFilter === item.key ? 'active' : ''}
                            >
                                <div className='flex items-center'>
                                    {item.icon}
                                    <p className='text-sm font-semibold ml-2'>{item.name}</p>
                                </div>
                                <p className='text-sm text-gray-400 ml-2'>21 bài viết</p>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Box >
    )
}

export default BlogSearch