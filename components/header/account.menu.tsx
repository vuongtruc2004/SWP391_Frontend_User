'use client'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { signOut, useSession } from 'next-auth/react';
import { apiUrl, storageUrl } from '@/utils/url';
import { sendRequest } from '@/utils/fetch.api';
import { useRouter } from 'next/navigation';

interface IProps {
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
export default function AccountMenu(props: IProps) {
    const { anchorEl, setAnchorEl } = props;
    const { data: session } = useSession();
    const open = Boolean(anchorEl);
    const router = useRouter();

    const avatarSrc = session?.user.avatar.startsWith("http") ? session?.user.avatar : `${storageUrl}/avatar/${session?.user.avatar}`

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await sendRequest({
            url: `${apiUrl}/auth/logout`,
            queryParams: {
                refresh_token: session?.refreshToken
            }
        })
        signOut();
    }

    const handleNavigating = (link: string) => {
        handleClose();
        router.push(link);
    }

    return (
        <Menu
            aria-hidden={false}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            sx={{
                '.mui-x6cj71-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                    width: 'max-content',
                    left: 0,
                    right: '28px',
                    paddingInline: '5px'
                },
                '.mui-96xlaj-MuiPaper-root-MuiPopover-paper-MuiMenu-paper .MuiAvatar-root': {
                    width: '45px',
                    height: '45px',
                    margin: '0'
                },
                '.mui-1toxriw-MuiList-root-MuiMenu-list': {
                    padding: '10px'
                }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <div className='flex items-center justify-between py-1.5 px-4 gap-x-5'>
                <Avatar src={session ? avatarSrc : ""}>
                    {session?.user.fullname?.charAt(0).toUpperCase()}
                </Avatar>
                <div className='min-w-44'>
                    <p className='text-sm text-gray-400'>Hello, <strong className='text-blue-500'>{session?.user.fullname}</strong></p>
                    <p className='text-sm text-gray-400'>UID: <strong className='text-blue-500'>{session?.user.userId}</strong></p>
                </div>
            </div>
            <Divider sx={{ marginBlock: '10px' }} />
            <MenuItem onClick={() => handleNavigating("/user/profile")}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                Tài khoản của tôi
            </MenuItem>
            <MenuItem onClick={() => handleNavigating("/user/my-course")}>
                <ListItemIcon>
                    <AutoStoriesIcon fontSize="small" />
                </ListItemIcon>
                Khóa học của tôi
            </MenuItem>
            <MenuItem onClick={() => handleNavigating("/user/settings")}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Cài đặt
            </MenuItem>
            <Divider sx={{ marginBlock: '10px' }} />
            <Button variant='contained' color='error' startIcon={<Logout />} size='small' fullWidth sx={{ textTransform: 'capitalize' }} onClick={handleLogout}>Đăng xuất</Button>
        </Menu>
    );
}
