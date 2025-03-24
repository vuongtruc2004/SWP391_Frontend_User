import { useEffect, useState } from "react";
import { calculateCourseSalePrice } from "@/helper/course.list.helper";
import dayjs from "dayjs";
import { formatPrice, formatToText_DaysHHMMSS } from "@/utils/format";
import { useCampaign } from "@/wrapper/course-campaign/course.campaign.wrapper";

const DisplayCoursePrice = ({ course, fontSize, displayEndTime, direction }: {
    course: CourseResponse | CartCourse,
    fontSize: 'small' | 'base' | 'large',
    displayEndTime?: boolean,
    direction?: 'vertical' | 'horizontal'
}) => {
    const { campaigns } = useCampaign();
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [applyCampaign, setApplyCampaign] = useState<CampaignResponse | null>(null);
    const fontSizes = fontSize === 'small' ? ["text-base", "text-sm"] : fontSize === 'base' ? ["text-xl", "text-sm"] : ["text-3xl", "text-sm"];

    useEffect(() => {
        const campaign = campaigns.find(campaign =>
            campaign.courses.some(c => c.courseId === course.courseId)
        );
        setApplyCampaign(campaign || null);
    }, [campaigns]);

    useEffect(() => {
        if (applyCampaign) {
            const endTime = dayjs(applyCampaign.endTime);
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
    }, [applyCampaign]);

    return (
        <>
            {fontSize === 'small' || fontSize === 'base' ? (
                <div className="flex items-end justify-between">
                    {applyCampaign ? (
                        <div className={`flex items-end ${direction === 'vertical' ? 'flex-col' : 'gap-x-2'}`}>
                            <h1 className={`${fontSizes[0]} font-semibold`}>{formatPrice(calculateCourseSalePrice(course, applyCampaign))}₫</h1>
                            <h2 className={`font-semibold line-through text-gray-300 ${fontSizes[1]}`}>{formatPrice(course.price)}₫</h2>
                        </div>
                    ) : (
                        <h1 className={`${fontSizes[0]} font-semibold`}>{formatPrice(course.price)}₫</h1>
                    )}
                    {applyCampaign && remainingTime !== null && remainingTime > 0 && displayEndTime && (
                        <p className={`font-semibold text-green-500 ${fontSizes[1]}`}>{formatToText_DaysHHMMSS(remainingTime)}</p>
                    )}
                </div>
            ) : (
                <div className="flex flex-col">
                    {applyCampaign ? (
                        <div className="flex items-end gap-x-2">
                            <h1 className={`${fontSizes[0]} font-semibold`}>{formatPrice(calculateCourseSalePrice(course, applyCampaign))}₫</h1>
                            <h2 className={`font-semibold line-through text-gray-300`}>{formatPrice(course.price)}₫</h2>
                        </div>
                    ) : (
                        <h1 className={`${fontSizes[0]} font-semibold`}>{formatPrice(course.price)}₫</h1>
                    )}
                    {applyCampaign && remainingTime !== null && remainingTime > 0 && displayEndTime && (
                        <p className={`font-semibold text-green-500 ${fontSizes[1]}`}>{formatToText_DaysHHMMSS(remainingTime)}</p>
                    )}
                </div>
            )}
        </>
    )
}

export default DisplayCoursePrice