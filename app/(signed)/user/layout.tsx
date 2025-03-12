import UserSidebar from "@/components/user/user.sidebar"
import Box from "@mui/material/Box";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{
            bgcolor: '#101010',
            width: '100%',
            minHeight: '100vh',
            paddingTop: '90px'
        }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '20px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <UserSidebar />
                <Box sx={{
                    padding: '40px 20px',
                    borderRadius: '6px',
                    bgcolor: 'black',
                    color: 'white',
                    overflowX: 'hidden'
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default UserLayout