export const sortDatesByProximity = (dates: UserNotificationResponse[]): UserNotificationResponse[] => {
    const today = new Date();

    return dates.sort((a, b) => {
        const dateA = new Date(a.notification?.createdAt);
        const dateB = new Date(b.notification?.createdAt);

        // Tính khoảng cách theo số mili giây (giá trị tuyệt đối)
        const diffA = Math.abs(dateA.getTime() - today.getTime());
        const diffB = Math.abs(dateB.getTime() - today.getTime());

        return diffA - diffB; // Sắp xếp khoảng cách tăng dần
    });
}

// Helper notification