import { useEffect, useState } from "react";
import { calculateCourseSalePrice } from "@/helper/course.list.helper";
import dayjs from "dayjs";
import { formatPrice, formatToText_DaysHHMMSS } from "@/utils/format";

const DisplayCoursePrice = ({ course, fontSize, displayEndTime }: { course: CourseResponse, fontSize: 'small' | 'base' | 'large', displayEndTime?: boolean }) => {
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const salePrice = calculateCourseSalePrice(course);
    const fontSizes = fontSize === 'small' ? ["text-lg", "text-sm"] : fontSize === 'base' ? ["text-xl", "text-sm"] : ["text-3xl", "text-sm"];

    useEffect(() => {
        if (course.campaign) {
            const endTime = dayjs(course.campaign.endTime);
            const timeLeft = endTime.diff(dayjs(), 'second');
            setRemainingTime(timeLeft > 0 ? timeLeft : 0);

            const interval = setInterval(() => {
                const updatedTime = endTime.diff(dayjs(), 'second');
                setRemainingTime(updatedTime > 0 ? updatedTime : 0);

                if (updatedTime <= 0) {
                    course.campaign = null;
                    clearInterval(interval);
                };
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div className="flex items-end justify-between">
            {salePrice !== 0 ? (
                <div className="flex items-end gap-x-2">
                    <h1 className={`${fontSizes[0]} font-semibold`}>{formatPrice(salePrice)}₫</h1>
                    <h2 className={`font-semibold line-through text-gray-300 ${fontSizes[1]}`}>{formatPrice(course.price)}₫</h2>
                </div>
            ) : (
                <h1 className={`${fontSizes[0]} font-semibold`}>{formatPrice(course.price)}₫</h1>
            )}
            {salePrice !== 0 && remainingTime !== null && remainingTime > 0 && displayEndTime && (
                <p className={`text-gray-300 font-semibold ${fontSizes[1]}`}>{formatToText_DaysHHMMSS(remainingTime)}</p>
            )}
        </div>
    )
}

export default DisplayCoursePrice