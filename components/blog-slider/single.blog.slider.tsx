import { formatCreateDate } from '@/helper/blog.helper';
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface IProps {
    blog: BlogResponse;
}
const SingleBlogSlider = (props: IProps) => {
    const { blog } = props;
    const { push } = useRouter();
    return (
        <Box sx={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(to bottom right, #15171c, #010009, #15171c)',
            width: '100%',
            height: '100%',
            borderRadius: '6px',
        }}>
            <div className='max-w-96 p-10'>
                <p className="font-semibold mt-2">{blog.title}</p>

                <div style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                    color: '#adb5bd',
                    fontSize: '14px',
                    marginTop: '10px'
                }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <p className='text-sm italic text-purple-300 mt-2 mb-5 text-right'>--{formatCreateDate(blog.createdAt)}</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => push(`/blog/${blog.blogId}`)}
                    endIcon={<ChevronRightIcon />}
                >
                    Đọc tiếp
                </Button>
            </div>
        </Box>
    )
}

export default SingleBlogSlider