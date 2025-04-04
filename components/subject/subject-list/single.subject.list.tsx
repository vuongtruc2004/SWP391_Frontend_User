import { storageUrl } from "@/utils/url";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

const SingleSubjectList = ({ subject }: { subject: SubjectResponse; }) => {
    return (
        <Link href={`/course?subjectIds=${subject.subjectId}`}>
            <Box sx={{
                bgcolor: 'black',
                color: 'white',
                padding: '30px',
                borderRadius: '6px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                '&:hover': {
                    'span': {
                        marginLeft: '30px',
                        color: '#60a5fa'
                    },
                    'img': {
                        transform: 'scale(1.35)'
                    },
                    'h1': {
                        color: '#60a5fa'
                    },
                }
            }}>
                <div className="w-full flex items-center justify-center h-[180px] rounded-sm">
                    <Image
                        src={`${storageUrl}/subject/${subject.thumbnail}`}
                        alt={subject.subjectName}
                        width={0}
                        height={0}
                        sizes="(max-width: 1000px) 100vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: 'auto',
                            height: '80px',
                            margin: '0 auto',
                            transition: 'all .5s',
                        }}
                    />
                </div>
                <h1 className="text-2xl font-semibold my-2 transition-all duration-300">{subject.subjectName}</h1>
                <p className="text-gray-400 h-[55px]">{subject.description}</p>
                <div className="flex items-center">
                    <p>
                        Xem các khóa học {subject.subjectName}
                    </p>
                    <span className="ml-3 transition-all duration-500">
                        <ChevronRightIcon />
                    </span>
                </div>
            </Box>
        </Link>
    )
}

export default SingleSubjectList;