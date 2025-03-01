'use client'
import { storageUrl } from "@/utils/url";
import { Avatar, Rating } from "@mui/material";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useState } from "react";
import Image from "next/image";
import { getEmojiOnAvgStars } from "@/helper/course.details.helper";
import ListEmpty from "@/components/empty/list.empty";
import { formatTotalFollowers } from "@/helper/lesson.helper";
import HowToRegIcon from '@mui/icons-material/HowToReg';

const CourseExpert = ({ course }: { course: CourseDetailsResponse }) => {
    const [expandDescription, setExpandDescription] = useState(false);
    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;
    return (
        <>
            <div className="bg-black rounded-md p-5 my-5 flex items-center justify-between" style={{
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            }}>
                {course.totalRating ? (
                    <>
                        <div className="flex items-center gap-x-3">
                            <Image src={`${storageUrl}/icon/${getEmojiOnAvgStars(course.averageRating)}`} alt="emoji" width={46} height={46} />
                            <div>
                                <p className="font-semibold">Đánh giá</p>
                                <p className="text-sm text-gray-400 font-semibold">{course.totalRating} bài đánh giá</p>
                            </div>
                        </div>
                        <div>
                            <Rating name="read-only" value={course.averageRating} readOnly size="small" precision={0.1} />
                            <p className="text-sm text-gray-400 font-semibold">{course.averageRating.toFixed(1)} sao</p>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center w-full">
                        <ListEmpty text="Không có đánh giá" height={100} />
                    </div>
                )}
            </div>

            <div className="bg-black p-5 rounded-md" style={{
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            }}>
                <h1 className="font-semibold text-xl">Giảng viên</h1>
                <div className="flex items-center gap-x-2 mt-3 mb-2">
                    <Avatar src={avatarSrc} sx={{
                        width: '50px',
                        height: '50px',
                    }}>
                        {course?.expert?.user?.fullname.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                        <p className="font-semibold">{course?.expert?.user?.fullname}</p>
                        <p className="text-sm text-gray-400 font-semibold">{course?.expert?.job}</p>
                    </div>
                </div>

                <p className={`text-gray-300 ${expandDescription ? "" : "line-clamp-3"} mb-0.5 cursor-pointer`}
                    onClick={() => setExpandDescription(prev => !prev)}>
                    {course?.expert?.description}
                </p>

                <ul className="text-sm">
                    <li className="flex items-center gap-x-2 py-1.5">
                        <HowToRegIcon sx={{ fontSize: '1.2rem' }} />
                        <p><span className="font-semibold text-blue-500">{formatTotalFollowers(course.expert.totalFollowers)}</span> người theo dõi</p>
                    </li>
                    <li className="flex items-center gap-x-2 py-1.5">
                        <WorkspacePremiumIcon sx={{ fontSize: '1.2rem' }} />
                        <p>{course?.expert?.achievement}</p>
                    </li>
                    <li className="flex items-center gap-x-2 py-1.5">
                        <WorkHistoryIcon sx={{ fontSize: '1.2rem' }} />
                        <p><span className="font-semibold text-green-500">{course?.expert?.yearOfExperience}</span> năm kinh nghiệm</p>
                    </li>
                    <li className="flex items-center gap-x-2 py-1.5">
                        <SchoolIcon sx={{ fontSize: '1.2rem' }} />
                        <p>{course?.expert?.totalStudents} học sinh</p>
                    </li>
                    <li className="flex items-center gap-x-2 py-1.5">
                        <SmartDisplayIcon sx={{ fontSize: '1.2rem' }} />
                        <p><span className="font-semibold text-purple-300">{course?.expert?.totalCourses}</span> khóa học</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CourseExpert