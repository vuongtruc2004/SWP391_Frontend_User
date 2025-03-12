import { formatDate } from '@/helper/blog.helper';
import { useCourseView } from '@/wrapper/course-view/course.view.wrapper';
import { Divider } from '@mui/material';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers/icons';

const PlayingLessonHeader = ({ title, updatedAt }: {
    title: string;
    updatedAt: string;
}) => {
    const { lessons, currentPlayIndex, setCurrentPlayIndex } = useCourseView();

    return (
        <>
            <div className="flex items-center justify-between p-5">
                <div>
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <p className="text-gray-300 text-sm">Cập nhật lần cuối: <span className="text-purple-300 font-semibold">{formatDate(updatedAt)}</span></p>
                </div>

                <ul className='flex items-center'>
                    <li className={`flex items-center gap-x-1 rounded-tl-full rounded-bl-full py-1 px-3 cursor-pointer hover:text-blue-400 ${currentPlayIndex === 0 && "pointer-events-none text-gray-400"}`}
                        onClick={() => setCurrentPlayIndex(prev => prev - 1)}
                    >
                        <ArrowLeftIcon sx={{ fontSize: '1.2rem' }} />
                        <p>
                            Trước
                        </p>
                    </li>

                    <Divider orientation='vertical' sx={{ height: '20px' }} />

                    <li className={`flex items-center gap-x-1 rounded-tr-full rounded-br-full py-1 px-3 cursor-pointer hover:text-blue-400 ${currentPlayIndex === lessons.length - 1 && "pointer-events-none text-gray-400"}`}
                        onClick={() => setCurrentPlayIndex(prev => prev + 1)}
                    >
                        <p>
                            Tiếp
                        </p>
                        <ArrowRightIcon sx={{ fontSize: '1.2rem' }} />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default PlayingLessonHeader