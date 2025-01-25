import { Box } from "@mui/material"
import Link from "next/link";
import PushPinIcon from '@mui/icons-material/PushPin';

const PinBlog = () => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            alignItems: 'center',
            columnGap: '20px',
            paddingTop: '120px'
        }}>
            <div style={{
                background: '#60a5fa',
                width: '100%',
                height: '250px',
                borderRadius: '30px',
                position: 'relative',
                cursor: 'pointer'
            }}>
                <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    width: '32px',
                    aspectRatio: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'rotate(-30deg)',
                    color: '#fb6107'
                }}>
                    <PushPinIcon />
                </span>
            </div>

            <Box sx={{
                color: 'white'
            }}>
                <Link href={"/home"} className="font-semibold mt-2 hover:underline">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, nihil!</Link>

                <p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                    color: '#adb5bd',
                    fontSize: '14px',
                    marginBlock: '4px'
                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. In nemo harum animi aut fugiat maxime necessitatibus vitae exercitationem? Illo esse sunt id sequi, ipsa eveniet inventore ex sint voluptatum fugiat autem natus, porro totam quibusdam, veritatis ipsam voluptas vel magnam nam ducimus perferendis doloribus delectus vero! Rem, voluptatibus qui assumenda necessitatibus cupiditate libero saepe veritatis perferendis quis aspernatur consequuntur rerum officia blanditiis doloribus praesentium ratione repudiandae consectetur autem architecto itaque facilis. Consectetur, enim excepturi nulla asperiores alias voluptate nobis sunt doloremque explicabo eaque voluptatem sequi repudiandae, fugiat odit ad sit nam rerum aut consequuntur deserunt. Blanditiis veniam maxime cupiditate minima!</p>

                <div className="flex items-center gap-x-2 text-blue-500 text-sm">
                    <p className="text-green-400">Đăng bởi:</p>
                    <Link href={"/home"} className="hover:underline">Nguyen Vuong Truc</Link>
                </div>

                <div className="flex items-center gap-x-2 text-sm text-purple-300">
                    <p>August 20, 2024</p>
                    <p>•</p>
                    <p>13 phút đọc</p>
                </div>
            </Box>
        </Box>
    )
}

export default PinBlog