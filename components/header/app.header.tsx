'use client'
import Box from "@mui/material/Box";
import Link from "next/link";
import Image from "next/image";
import HeaderSearchBox from "./header.search.box";
import HeaderButtons from "./header.buttons";
import HeaderNavLinks from "./header.nav.links";

const AppHeader = () => {
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
                <HeaderNavLinks />

                <HeaderSearchBox />
            </div>
            <HeaderButtons />
        </Box>
    )
}

export default AppHeader