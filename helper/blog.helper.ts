import dayjs from 'dayjs';
import 'dayjs/locale/vi';

export const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

export const formatDate = (createdAt: string) => {
    return dayjs(createdAt).locale('vi').format('D [tháng] M, YYYY');
};
