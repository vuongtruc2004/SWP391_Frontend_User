'use client'

import { sortDatesByProximity } from "@/helper/notification.helper";
import { useWebSocket } from "@/hooks/use.websocket";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, SetStateAction, useContext, useEffect, useState } from "react";

interface INotification {
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<SetStateAction<HTMLElement | null>>;
    numNotification: number;
    notifications: UserNotificationResponse[];
    setNotifications: React.Dispatch<SetStateAction<UserNotificationResponse[]>>;
}


const NotificationContext = createContext<INotification | null>(null);
export const NotificationWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();

    const [notifications, setNotifications] = useState<UserNotificationResponse[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [numNotification, setNumNotification] = useState(0);

    const getNotification = async () => {
        const notificationRes = await sendRequest<ApiResponse<PageDetailsResponse<UserNotificationResponse[]>>>({
            url: `${apiUrl}/notifications`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                'content-type': 'application/json',
            },
            queryParams: {
                page: 1,
                size: 10,
            }
        })
        console.log("notificationRes: ", notificationRes)
        setNotifications(sortDatesByProximity(notificationRes.data.content));
        setNumNotification(notificationRes.data.content.length)
        console.log(notificationRes)
    };

    useWebSocket((message) => {
        if (message === "READ") {
            getNotification();
        }
    })
    useEffect(() => {

        if (status === "authenticated") {
            getNotification()
        }
    }, [session]);

    return (
        <NotificationContext.Provider value={{ anchorEl, setAnchorEl, numNotification, notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('Lỗi');
    }
    return context;
}

