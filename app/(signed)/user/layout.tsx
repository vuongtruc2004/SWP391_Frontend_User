import UserSidebar from "@/components/user/user.sidebar"
import { Box } from "@mui/material"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{
            bgcolor: '#101010',
            width: '100%',
            minHeight: '100vh',
            paddingTop: '120px'
        }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '25% 75%',
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
                    color: 'white'
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default UserLayout