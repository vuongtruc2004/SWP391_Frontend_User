'use client'
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface IProps {
    category: string;
    totalElements: number;
}
const BlogSearch = (props: IProps) => {
    const { category, totalElements } = props;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

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
        const params = new URLSearchParams(searchParams);
        params.set('filter', `title ~ '${keyword}' or content ~ '${keyword}' or user.fullname ~ '${keyword}'`);
        router.replace(`${pathname}?${params}`);
    }

    const handleFilter = (key: string) => {
        if (key !== 'all' && !session) {
            return router.push("/login");
        }
        const params = new URLSearchParams(searchParams);
        params.set('category', key);
        router.replace(`${pathname}?${params}`);
    }

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
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: '60px',
                                    paddingInline: '20px',
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
                                onClick={() => handleFilter(item.key)}
                                className={category === item.key ? 'active' : ''}
                            >
                                <div className='flex items-center'>
                                    {item.icon}
                                    <p className='text-sm font-semibold ml-2'>{item.name}</p>
                                </div>
                                {category === item.key && (
                                    <p className='text-sm text-gray-400 ml-2'>{totalElements} bài viết</p>
                                )}
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Box >
    )
}

export default BlogSearch