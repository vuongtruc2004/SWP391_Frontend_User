import NotificationList from "@/components/notification/notification.list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thông báo",
};
const NotificationPage = () => {
    return (
        <NotificationList />
    )
}

export default NotificationPage