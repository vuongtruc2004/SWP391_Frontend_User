'use client'
import Box from "@mui/material/Box";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { bottomLinks, topLinks } from "./sidebar.properties";
import { Tooltip } from "@mui/material";
import { useUserSidebar } from "@/wrapper/user-sidebar/user.sidebar.wrapper";
import Image from "next/image";

const UserSidebar = () => {
    const pathname = usePathname();
    const { collapse } = useUserSidebar();

    return (
        <Box sx={{
            padding: '20px 10px',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            borderRight: '1px solid #25272c',
            width: collapse ? '80px' : '280px',
            height: '100vh',
            position: 'sticky',
            bgcolor: 'black',
            top: 0,
            left: 0,
            transition: 'all .3s'
        }}>
            <Link href={"/home"} className="items-center flex justify-center cursor-pointer gap-x-2 mb-5">
                <Image src={`/logo.webp`} alt="app logo" width={40} height={40} style={{
                    objectFit: 'cover',
                    borderRadius: '50%',
                }} />
                {!collapse && (
                    <p className="font-semibold text-2xl tracking-wide">LearnGo</p>
                )}
            </Link>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
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
                <div className={`flex flex-col gap-y-3 ${collapse && 'items-center'}`}>
                    {topLinks.map(item => {
                        return (
                            <Tooltip title={collapse && item.name} placement="left" arrow key={item.key}>
                                <Link
                                    href={item.link}
                                    className={`flex items-center gap-x-5 rounded-md py-1.5 px-3 ${pathname.startsWith(item.link) && "active"}`}
                                >
                                    {item.icon}
                                    {!collapse && item.name}
                                </Link>
                            </Tooltip>
                        )
                    })}
                </div>

                <div className={`flex flex-col gap-y-3 ${collapse && 'items-center'}`}>
                    {bottomLinks.map(item => {
                        return (
                            <Tooltip title={collapse && item.name} placement="left" arrow key={item.key}>
                                <Link
                                    href={item.link}
                                    className={`flex items-center gap-x-5 rounded-md py-1.5 px-3 ${pathname.startsWith(item.link) && "active"}`}
                                    key={item.key}
                                >
                                    {item.icon}
                                    {!collapse && item.name}
                                </Link>
                            </Tooltip>
                        )
                    })}
                </div>
            </Box>
        </Box>
    )
}

export default UserSidebar