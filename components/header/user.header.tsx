'use client'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HeaderSearchBox from "./header.search.box";
import HeaderButtons from "./header.buttons";
import { Box, Tooltip } from '@mui/material';
import { useUserSidebar } from '@/wrapper/user-sidebar/user.sidebar.wrapper';

const UserHeader = () => {
    const { setCollapse, collapse } = useUserSidebar();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            bgcolor: 'black',
            borderBottom: '1px solid #25272c',
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 15
        }}>
            <div className="flex items-center gap-x-5">
                <Tooltip title={collapse ? 'Mở' : 'Đóng'} arrow>
                    <span onClick={() => setCollapse(prev => !prev)} className='flex items-center justify-center w-10 h-10 hover:bg-[#212121] rounded-md cursor-pointer transition-all duration-300'>
                        <MenuOpenIcon sx={{
                            transition: 'all .3s',
                            transform: collapse ? 'rotate(180deg)' : 'rotate(0)'
                        }} />
                    </span>
                </Tooltip>
                <HeaderSearchBox />
            </div>

            <HeaderButtons />
        </Box>
    )
}

export default UserHeader