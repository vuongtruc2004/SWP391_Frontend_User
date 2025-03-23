import { useEffect, useState } from "react";
import { formatDurationToDayHoursMinuteAndSecond, formatDurationToMinuteAndSecond } from "@/helper/quiz.helper";
import { calculateCourseSalePrice, formatPrice } from "@/helper/course.list.helper";
import dayjs from "dayjs";

const DisplayCoursePrice = ({ course, fontSize }: { course: CourseResponse, fontSize: 'small' | 'base' }) => {
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const salePrice = calculateCourseSalePrice(course);

    const fontSizes = [];
    if (fontSize === 'small') {
        fontSizes.push("text-xl");
        fontSizes.push("text-sm")
    } else {
        fontSizes.push("text-3xl");
        fontSizes.push("text-sm");
    }

    useEffect(() => {
        if (course.campaign) {
            const endTime = dayjs(course.campaign.endTime);
            const timeLeft = endTime.diff(dayjs(), 'second');
            setRemainingTime(timeLeft > 0 ? timeLeft : 0);

            const interval = setInterval(() => {
                const updatedTime = endTime.diff(dayjs(), 'second');
                setRemainingTime(updatedTime > 0 ? updatedTime : 0);

                if (updatedTime <= 0) {
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
            {salePrice !== 0 && remainingTime && (
                <p className={`text-gray-300 ${fontSizes[1]}`}>{formatDurationToDayHoursMinuteAndSecond(remainingTime)}</p>
            )}
        </div>
    )
}

export default DisplayCoursePrice