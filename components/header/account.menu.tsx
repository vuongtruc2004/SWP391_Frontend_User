'use client'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import { signOut, useSession } from 'next-auth/react';
import { apiUrl } from '@/utils/url';
import { sendRequest } from '@/utils/fetch.api';
import Link from 'next/link';
import { useUserAvatar } from '@/wrapper/user-avatar/user.avatar.wrapper';
import { Box, PopoverOrigin } from '@mui/material';
import { usePathname } from 'next/navigation';
import { bottomLinks, topLinks } from '../user-sidebar/sidebar.properties';

export default function AccountMenu({ anchorEl, setAnchorEl, transformOrigin, anchorOrigin }: {
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    transformOrigin?: PopoverOrigin;
    anchorOrigin?: PopoverOrigin;
}) {
    const { data: session, status } = useSession();
    const { avatarSrc, fullname } = useUserAvatar();
    const pathname = usePathname();

    const handleLogout = async () => {
        if (status === 'authenticated') {
            if (pathname.startsWith("/course/learning")) {
                sessionStorage.removeItem('prevUrl');
            }
            localStorage.removeItem('cart');

            await sendRequest({
                url: `${apiUrl}/auth/logout`,
                queryParams: {
                    refresh_token: session.refreshToken
                }
            });
            signOut();
        }
    }

    return (
        <Menu
            aria-hidden={false}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            onClick={() => setAnchorEl(null)}
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
                },
            }}
            transformOrigin={transformOrigin ? transformOrigin : { horizontal: 'right', vertical: 'top' }}
            anchorOrigin={anchorOrigin ? anchorOrigin : { horizontal: 'right', vertical: 'bottom' }}
        >
            <div className='flex items-center justify-start py-1.5 px-4 gap-x-3'>
                <Avatar src={avatarSrc} alt='avatar'>
                    {fullname.charAt(0).toUpperCase()}
                </Avatar>
                <div className='min-w-44'>
                    <p className='text-sm text-gray-400'>Hello, <strong className='text-blue-500'>{fullname}</strong></p>
                    <p className='text-sm text-gray-400'>UID: <strong className='text-blue-500'>{session?.user.userId}</strong></p>
                </div>
            </div>

            <Divider sx={{ marginBlock: '10px' }} />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '4px',
                'a': {
                    transition: 'all .3s',
                    '&.active': {
                        bgcolor: '#212121',
                    },
                    ':not(.active):hover': {
                        color: '#2b7fff'
                    }
                }
            }}>
                {[...topLinks, ...bottomLinks].map(item => {
                    return (
                        <Link
                            href={item.link}
                            key={item.key}
                            className={`flex items-center gap-x-5 rounded-md py-1.5 px-3 ${pathname.startsWith(item.link) && "active"}`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    )
                })}
            </Box>

            <Divider sx={{ marginBlock: '10px 15px' }} />

            <Button variant='contained' color='error' startIcon={<Logout />} size='small' fullWidth onClick={handleLogout}>Đăng xuất</Button>
        </Menu>
    );
}
