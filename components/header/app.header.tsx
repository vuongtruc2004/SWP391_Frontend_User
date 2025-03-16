'use client'
import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import HeaderSearchBox from "./header.search.box";
import HeaderButtons from "./header.buttons";

const AppHeader = () => {
    const pathname = usePathname();

    const links = [
        {
            key: 'home',
            link: '/home',
            name: 'Trang chủ',
        },
        {
            key: 'course',
            link: '/course',
            name: 'Khóa học',
        },
        {
            key: 'blog',
            link: '/blog',
            name: 'Bài viết',
        },
        {
            key: 'expert',
            link: '/expert',
            name: 'Đội ngũ chuyên gia',
        }
    ]

    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0
    });

    useEffect(() => {
        const activeLink = links.find(item => pathname.startsWith(item.link));
        if (activeLink) {
            const ref = document.querySelector(`a[data-key="${activeLink.key}"]`) as HTMLAnchorElement;
            if (ref) {
                const { width } = ref.getBoundingClientRect();
                setPosition({
                    width,
                    left: ref.offsetLeft,
                    opacity: 1
                });
            }
        } else {
            setPosition({
                width: 0,
                left: 0,
                opacity: 0
            });
        }
    }, [pathname]);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: '20px',
            width: '100%',
            paddingInline: '20px',
            'img': {
                objectFit: 'cover',
                borderRadius: '50%',
            },
            bgcolor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(25px)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 15
        }}>
            <div className="flex items-center justify-center gap-x-6">
                <Link href={"/home"} className="items-center flex justify-center cursor-pointer gap-x-2 mr-3">
                    <Image src={`/logo.webp`} alt="app logo" width={40} height={40} />
                    <p className="font-semibold text-2xl tracking-wide">LearnGo</p>
                </Link>

                <div className="flex items-center gap-x-6 relative h-[70px]">
                    {links.map(item => {
                        return (
                            <Link
                                href={item.link}
                                className={`flex items-center h-full transition-all duration-200 hover:text-blue-500 ${pathname.startsWith(item.link) ? "text-blue-500" : ""}`}
                                key={item.key}
                                data-key={item.key}
                            >
                                {item.name}
                            </Link>
                        )
                    })}

                    <motion.div
                        animate={position}
                        className="absolute bottom-0 h-1 rounded-sm bg-blue-500"
                    />
                </div>

                <HeaderSearchBox />
            </div>

            <HeaderButtons />
        </Box>
    )
}

export default AppHeader