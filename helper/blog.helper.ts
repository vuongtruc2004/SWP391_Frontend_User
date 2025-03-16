import slugify from 'slugify';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

export const formatDate = (date: string) => {
    return dayjs(date).locale('vi').format('D [tháng] M, YYYY');
};

export const formatDateTime = (dateTime: string) => {
    return dayjs(dateTime)
        .tz('Asia/Ho_Chi_Minh')
        .locale('vi')
        .format('HH:mm DD-MM-YYYY');
};

export const slugifyText = (text: string) => {
    return slugify(text, {
        lower: true
    })
}