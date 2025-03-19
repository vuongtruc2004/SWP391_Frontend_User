"use client";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import ListEmpty from "../../empty/list.empty";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { courseStatuses } from "./order.status.properties";
import SingleOrder from "@/features/purchase-history/single.order";
import SingleCourseSlider from "../course-slider/single.course.slider";

const MyCourse = () => {
    const { data: session, status } = useSession();

    const [selectedTab, setSelectedTab] = useState<string>("ALL");
    const [courseList, setCourseList] = useState<CourseResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                setLoading(true);
                const response = await sendRequest<ApiResponse<CourseResponse[]>>({
                    url: `${apiUrl}/users/courses-register/${selectedTab}`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setCourseList(response.data);
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTab, session]);

    return (
        <>
            <h1 className="font-semibold text-xl mb-5">Khóa học của bạn: </h1>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '12px',
                bgcolor: 'black',
                padding: '8px',
                borderRadius: '6px',
                width: 'max-content',
                'div': {
                    '&.active': {
                        bgcolor: '#212121',
                    },
                    ':not(.active):hover': {
                        color: '#2b7fff'
                    }
                }
            }}>
                {courseStatuses.map(item => {
                    return (
                        <div className={`transition-all duration-300 py-1.5 px-5 rounded-md cursor-pointer ${selectedTab === item.en && 'active'}`}
                            key={item.key}
                            onClick={() => setSelectedTab(item.en)}
                        >
                            {item.vi}
                        </div>
                    )
                })}
            </Box>

            {loading ? (
                <div className="flex items-center justify-center mt-20">
                    <CircularProgress />
                </div>
            ) : (
                <div className="mt-5">
                    {courseList.length ? (
                        <ul className="grid grid-cols-3 gap-5">
                            {courseList.map(course => {
                                return (
                                    <SingleCourseSlider course={course} key={course.courseId} />
                                )
                            })}
                        </ul>
                    ) : (
                        <div className='flex items-center justify-center'>
                            <div>
                                <ListEmpty text="Không có khóa học nào đã đăng kí!" height={110} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MyCourse;