import UserSidebar from "@/components/user/user.sidebar"
import Box from "@mui/material/Box";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#101010] pt-[90px]">
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '20px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <UserSidebar />
                <Box sx={{
                    padding: '20px',
                    borderRadius: '6px',
                    bgcolor: 'black',
                    color: 'white',
                    overflowX: 'hidden',
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                }}>
                    {children}
                </Box>
            </Box>
        </div>
    )
}

export default UserLayout