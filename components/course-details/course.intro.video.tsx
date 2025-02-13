import { storageUrl } from "@/utils/url"
import { Box } from "@mui/material"
import Image from "next/image";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const CourseVideoIntro = ({ course }: { course: CourseDetailsResponse }) => {
    return (
        <Box sx={{
            height: '220px',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden',
            borderRadius: '6px',
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.5)',
                transition: 'bottom 0.4s ease-in-out',
                borderRadius: '6px'
            },
            'img': {
                height: 'auto',
                transition: 'all .4s',
                objectFit: 'cover',
                borderRadius: '6px',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,3) 60%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0) 100%)',
                objectPosition: 'center',
            },
            '&:hover': {
                '&::after': {
                    bottom: 0,
                },
                'img': {
                    filter: 'blur(4px)'
                },
                'div': {
                    bottom: '50%',
                    transform: 'translateY(50%)',
                    columnGap: '12px',
                }
            }
        }}>
            <Image
                src={`${storageUrl}/course/${course.thumbnail}`}
                alt={course.courseName}
                fill
                sizes="(max-width: 1000px) 100vw"
                priority={true}
            />

            <div className="transition-all duration-500 flex items-center justify-center gap-x-1 absolute bottom-3 left-1/2 -translate-x-1/2 z-[2] font-semibold">
                <p className="text-sm">Xem giới thiệu khóa học</p>
                <ChevronRightOutlinedIcon sx={{ fontSize: '16px' }} />
            </div>
        </Box>
    )
}

export default CourseVideoIntro