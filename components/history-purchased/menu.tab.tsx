"use client";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import AllPurchased from "./all.purchased";
import PendingPurchased from "./pending.purchase";
import CompletePurchased from "./complete.purchased";
import CancelPurchased from "./cancel.purchased";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";

interface TabPanelProps {
    children?: React.ReactNode;
    value: string;
    index: string;
}

const CustomTabPanel = ({ children, value, index }: TabPanelProps) => {
    return (
        <div hidden={value !== index}>
            {value === index && <div className="py-5 px-3">{children}</div>}
        </div>
    );
};

const MenuTabClient = ({ keyword, page }: { keyword: string, page: string | number }) => {
    const [selectedTab, setSelectedTab] = useState<string>("all");
    const { data: session, status } = useSession();
    const [orderPage, setOrderPage] = useState<PageDetailsResponse<OrderResponse[]> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                const response = await sendRequest<ApiResponse<PageDetailsResponse<OrderResponse[]>>>({
                    url: `${apiUrl}/users/my-history-purchased/${selectedTab.toUpperCase()}`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                    queryParams: {
                        page: page,
                        size: 5,
                    }
                });
                if (response.status === 200) {
                    setOrderPage(response.data);
                }
            }
        };

        fetchData();
    }, [selectedTab, session, page]);


    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label="Tất cả" value="all" />
                <Tab label="Chờ thanh toán" value="pending" />
                <Tab label="Hoàn thành" value="completed" />
                <Tab label="Đã hủy" value="cancelled" />
            </Tabs>

            <CustomTabPanel value={selectedTab} index="all">
                <AllPurchased orderPage={orderPage} />
            </CustomTabPanel>
            {/* <CustomTabPanel value={selectedTab} index="pending">
                <PendingPurchased orderPage={orderPage} />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index="completed">
                <CompletePurchased orderPage={orderPage} />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index="cancelled">
                <CancelPurchased orderPage={orderPage} />
            </CustomTabPanel> */}

        </>
    );
};

export default MenuTabClient;
