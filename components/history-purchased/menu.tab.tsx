"use client";

import { Box, Button, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AllPurchased from "./all.purchased";
import PendingPurchased from "./pending.purchase";
import CompletePurchased from "./complete.purchased";
import CancelPurchased from "./cancel.purchased";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";

interface TabPanelProps {
    children?: React.ReactNode;
    value: string;
    index: string;
}

const CustomTabPanel = ({ children, value, index }: TabPanelProps) => {
    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const MenuTabClient = (props: { searchParams: any, keyword: string, page: string | number }) => {

    const { searchParams, keyword, page } = props
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState<string>("all");
    const { data: session } = useSession();
    const [courseData, setCourseData] = useState<any>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
                    url: `${apiUrl}/users/all_history_purchased/${selectedTab.toUpperCase()}`,
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                    queryParams: {
                        page: page,
                        size: 5,
                        // filter: filter
                    }
                });
                setCourseData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        if (session?.accessToken) {
            fetchData();
        }
    }, [selectedTab, session?.accessToken, page]);


    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
        router.push("/user/history-purchased")
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{
                position: "sticky",
                top: "70px",
                zIndex: 1000,
                borderBottom: 1,
                backgroundColor: 'black'
            }}>
                <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tất cả" value="all" />
                    <Tab label="Chờ thanh toán" value="pending" />
                    <Tab label="Hoàn thành" value="completed" />
                    <Tab label="Đã hủy" value="cancelled" />
                </Tabs>
            </Box>


            <CustomTabPanel value={selectedTab} index="all">
                <AllPurchased courseData={courseData} />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index="pending">
                <PendingPurchased courseData={courseData} />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index="completed">
                <CompletePurchased courseData={courseData} />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index="cancelled">
                <CancelPurchased courseData={courseData} />
            </CustomTabPanel>

        </Box>
    );
};

export default MenuTabClient;
