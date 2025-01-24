import { Box, Tooltip } from "@mui/material"
import Link from "next/link";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const SingleBlogList = () => {
    return (
        <Box>
            <div style={{
                background: '#60a5fa',
                width: '100%',
                height: '250px',
                borderRadius: '30px',
                position: 'relative'
            }}>
                <Tooltip title="Lưu bài viết" arrow placement="bottom-start">
                    <Box sx={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        width: '32px',
                        aspectRatio: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        transition: 'all .3s',
                        '&:hover': {
                            color: 'white'
                        }
                    }}>
                        <BookmarkBorderIcon />
                    </Box>
                </Tooltip>
            </div>

            <Box sx={{
                color: 'white'
            }}>
                <h1 className="font-semibold mt-2 mb-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, nihil!</h1>

                <p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    color: '#adb5bd',
                    fontSize: '14px'
                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. In nemo harum animi aut fugiat maxime necessitatibus vitae exercitationem? Illo esse sunt id sequi, ipsa eveniet inventore ex sint voluptatum fugiat autem natus, porro totam quibusdam, veritatis ipsam voluptas vel magnam nam ducimus perferendis doloribus delectus vero! Rem, voluptatibus qui assumenda necessitatibus cupiditate libero saepe veritatis perferendis quis aspernatur consequuntur rerum officia blanditiis doloribus praesentium ratione repudiandae consectetur autem architecto itaque facilis. Consectetur, enim excepturi nulla asperiores alias voluptate nobis sunt doloremque explicabo eaque voluptatem sequi repudiandae, fugiat odit ad sit nam rerum aut consequuntur deserunt. Blanditiis veniam maxime cupiditate minima!</p>

                <div className="flex items-center gap-x-2 text-blue-500 mt-1 text-sm">
                    <p className="text-[#adb5bd]">Đăng bởi:</p>
                    <Link href={"/home"} className="hover:underline">Nguyen Vuong Truc</Link>
                </div>

                <div className="flex items-center gap-x-2 text-sm text-orange-400">
                    <p>August 20, 2024</p>
                    <p>•</p>
                    <p>13 phút đọc</p>
                </div>
            </Box>
        </Box>
    )
}

export default SingleBlogList