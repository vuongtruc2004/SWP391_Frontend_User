import { Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ConstructionIcon from '@mui/icons-material/Construction';
import PublicIcon from '@mui/icons-material/Public';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import Link from 'next/link';

const Banner = () => {
    return (
        <Box sx={{
            height: '60vh',
            minHeight: '500px',
            backgroundImage: `url(/banner.jpg)`,
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            color: 'white'
        }}>
            <Box sx={{
                width: '550px',
                '.mui-lxrpex-MuiButtonBase-root-MuiButton-root': {
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    padding: '5px 30px'
                },
                position: 'absolute',
                top: '50%',
                left: '50px',
                transform: 'translateY(-50%)',
            }}>
                <p className="text-3xl font-bold">HỌC. THỰC HÀNH. THÀNH CÔNG.</p>
                <p className="mb-6 mt-2">
                    Học lập trình dễ dàng với các khóa học chất lượng, lộ trình rõ ràng, bài bản cùng với các dự án thực tế.
                    Học mọi lúc, mọi nơi, nâng cao kỹ năng ngay hôm nay!
                    Chinh phục công nghệ và mở ra cơ hội nghề nghiệp mới cùng chúng tôi.
                </p>
                <Link href={"/course"} className='transition-all duration-300 bg-[#90caf9] hover:bg-blue-400 px-8 py-2 rounded-md text-[#000000de]'>Bắt Đầu</Link>
            </Box>

            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translate(-50%, 50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '20px',
                'div': {
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '20px',
                    width: '280px',
                    background: 'linear-gradient(to bottom right, #010009, #15171c)',
                    borderRadius: '6px',
                    padding: '20px',
                    color: 'white',
                }
            }}>
                <div>
                    <PublicIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Khám phá 100+ khóa học khác nhau với đa dạng đề tài.</p>
                </div>
                <div>
                    <EmojiEventsIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Đội ngũ giảng dạy chuyên nghiệp, dày dặn kinh nghiệm.</p>
                </div>
                <div>
                    <ConstructionIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Xây dựng dự án thực tế, làm bài kiểm tra trong các khóa học.</p>
                </div>
                <div>
                    <ShutterSpeedIcon sx={{ fontSize: '2.5rem' }} />
                    <p>Tiết kiệm thời gian với các video thời lượng ngắn.</p>
                </div>
            </Box>
        </Box >
    )
}

export default Banner