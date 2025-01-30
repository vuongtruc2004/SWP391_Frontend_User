import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import SubjectSlider from './subject.slider';

interface IProps {
    subjectList: SubjectResponse[];
}
const Banner = (props: IProps) => {
    const { subjectList } = props;

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '60vh',
            minHeight: '550px',
            position: 'relative',
            color: 'white',
            bgcolor: 'black'
        }}>
            <Box sx={{
                width: 'max-content',
                position: 'absolute',
                top: '50%',
                left: '60px',
                transform: 'translateY(-46%)',
                zIndex: 2
            }}>
                <Typography sx={{
                    fontSize: '56px',
                    lineHeight: '0.98em',
                    fontWeight: 'bold'
                }}>
                    HỌC. THỰC HÀNH.
                    <br />
                    THÀNH CÔNG.
                </Typography>
                <p className="mb-6 mt-3 w-[525px] text-[#adb5bd] font-semibold">
                    Học lập trình dễ dàng với các khóa học chất lượng, lộ trình rõ ràng, bài bản cùng với các dự án thực tế.
                    Học mọi lúc, mọi nơi, nâng cao kỹ năng ngay hôm nay!
                </p>

                <div className='flex items-center gap-x-3'>
                    <Link
                        href={"/course"}
                        className='transition-all duration-300 bg-[#90caf9] hover:bg-blue-400 px-8 py-2 rounded-md text-[#000000de]'
                    >
                        Bắt đầu học
                    </Link>
                    <Link
                        href={"/blog"}
                        className='transition-all duration-300 border border-white hover:border-gray-400 hover:text-gray-400  px-8 py-2 rounded-md text-white'
                    >
                        Khám phá bài viết
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

            <SubjectSlider subjectList={subjectList} />
        </Box >
    )
}

export default Banner