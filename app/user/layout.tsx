import UserHeader from "@/components/header/user.header";
import UserSidebar from "@/components/user-sidebar/user.sidebar"
import { CourseCampaignWrapper } from "@/wrapper/course-campaign/course.campaign.wrapper";
import { CourseCartWrapper } from "@/wrapper/course-cart/course.cart.wrapper";
import { NotificationWrapper } from "@/wrapper/notification/notification.wrapper";
import { UserSidebarWrapper } from "@/wrapper/user-sidebar/user.sidebar.wrapper";
import Box from "@mui/material/Box";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <CourseCampaignWrapper>
            <UserSidebarWrapper>
                <NotificationWrapper>
                    <CourseCartWrapper>
                        <div className="bg-[#101010] relative">
                            <div className="flex">
                                <UserSidebar />
                                <Box sx={{
                                    color: 'white',
                                    overflowX: 'hidden',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100vh',
                                    overflowY: 'auto'
                                }}>
                                    <UserHeader />
                                    <div className="p-5">
                                        {children}
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </CourseCartWrapper>
                </NotificationWrapper>
            </UserSidebarWrapper>
        </CourseCampaignWrapper>
    )
}

export default UserLayout