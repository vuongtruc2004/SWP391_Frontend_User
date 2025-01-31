'use client'
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useRef } from 'react';
import Link from 'next/link';

interface IProps {
    category: string;
    keyword: string;
    tag_name: string;
    totalElements: number;
}
const BlogSearch = (props: IProps) => {
    const { category, keyword, tag_name, totalElements } = props;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const formRef = useRef<HTMLFormElement | null>(null);
    const filter: BlogFilter[] = [
        {
            key: 'all',
            name: 'Tất cả',
            icon: <AlignHorizontalLeftIcon sx={{ color: '#c77dff !important', fontSize: '16px' }} />
        },
        {
            key: 'post',
            name: 'Đã đăng',
            icon: <LibraryAddIcon sx={{ color: '#38b000 !important', fontSize: '16px' }} />
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
        //@ts-ignore
        const tagNameList = e.target[2].value;

        const params = new URLSearchParams(searchParams);
        params.set('keyword', keyword);
        params.set('tag_name', tagNameList);
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
                <form onSubmit={handleSubmit} ref={formRef}>
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
                        name='keyword'
                        defaultValue={keyword}
                    />
                    <div className='flex items-start gap-x-5 justify-between mt-3'>
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
                            placeholder='Nhập tên các hashtag'
                            name='hashtag'
                            defaultValue={tag_name}
                            helperText={<span className='flex items-center gap-x-1 text-green-500'>
                                <AutoAwesomeOutlinedIcon sx={{ fontSize: '16px' }} />
                                Bạn có thể nhập nhiều tên của hashtag ngăn cách nhau bằng dấu phẩy để tìm kiếm (VD: java, python,...)
                            </span>}
                        />
                        <Button type='submit' variant='contained' sx={{ height: '40px', textWrap: 'nowrap', paddingInline: '50px' }}>Tìm Kiếm</Button>
                        <Button
                            variant='contained'
                            color='info'
                            sx={{ height: '40px', textWrap: 'nowrap', paddingInline: '50px' }}
                            onClick={() => {
                                formRef.current?.reset();
                                router.push("/blog")
                            }}
                            startIcon={<RefreshIcon />}
                        >
                            Làm mới bộ lọc
                        </Button>
                        <Link href={"/blog/post"}>
                            <Button
                                variant='contained'
                                color='success'
                                sx={{ height: '40px', textWrap: 'nowrap', paddingInline: '50px' }}
                                startIcon={<AddIcon />}
                            >
                                Đăng bài
                            </Button>
                        </Link>
                    </div>
                </form>

                <div className='flex items-center justify-between gap-5 mt-5'>
                    <Box sx={{
                        display: 'grid',
                        alignItems: 'center',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        columnGap: '20px',
                        flexShrink: 0,
                        flex: 1
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
                </div>
            </Box>
        </Box >
    )
}

export default BlogSearch