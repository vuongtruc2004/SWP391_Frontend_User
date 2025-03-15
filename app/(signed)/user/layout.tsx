import UserSidebar from "@/components/user/user.sidebar"
import Box from "@mui/material/Box";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#101010]">
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '300px 1fr',
                width: '100%',
            }}>
                <UserSidebar />
                <Box sx={{
                    padding: '90px 20px 20px',
                    color: 'white',
                    overflowX: 'hidden',
                }}>
                    {children}
                </Box>
            </Box>
        </div>
    )
}

export default UserLayout