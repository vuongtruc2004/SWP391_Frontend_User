import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from 'next/link';

const Banner = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '70vh',
            minHeight: '630px',
            position: 'relative',
            color: 'white',
            bgcolor: 'black',
        }}>
            <Box sx={{
                width: 'max-content',
                position: 'absolute',
                top: '50%',
                left: '60px',
                transform: 'translateY(-45%)',
                zIndex: 2
            }}>
                <h1 style={{
                    fontSize: '56px',
                    lineHeight: '0.98em',
                    fontWeight: 'bold'
                }}>
                    HỌC. THỰC HÀNH.
                    <br />
                    THÀNH CÔNG.
                </h1>
                <p className="mb-6 mt-3 w-[525px] text-[#adb5bd] font-semibold">
                    Học lập trình dễ dàng với các khóa học chất lượng, lộ trình rõ ràng, bài bản cùng với các dự án thực tế.
                    Học mọi lúc, mọi nơi, nâng cao kỹ năng ngay hôm nay!
                </p>

                <div className='flex items-center gap-x-3'>
                    <Link href={"/course"}>
                        <Button variant='contained' color='primary'>
                            Bắt đầu học
                        </Button>
                    </Link>
                    <Link href={"/blog"}>
                        <Button variant='outlined' color='secondary'>
                            Khám phá bài viết
                        </Button>
                    </Link>
                </div>
            </Box>

            <Box sx={{
                width: '65%',
                position: 'relative',
                mask: 'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, .76) 60%, rgba(0, 0, 0, 0) 100%) add',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100px',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))',
                }
            }}>
                <video loop autoPlay preload="auto" muted style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    backgroundColor: 'rgba(0,0,0,0)',
                    objectPosition: '50% 50%'
                }}>
                    <source src="/background.mp4" type="video/mp4" />
                </video>
            </Box>

        </Box >
    )
}

export default Banner