import { useEffect, useRef, useState } from "react";
import { Box, Fade, Modal, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { storageUrl } from "@/utils/url";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const SingleExpertList = ({ expert }: { expert: ExpertDetailsResponse }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef<HTMLDivElement | null>(null);
    const [openDescription, setOpenDescription] = useState(false);

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
            const maxHeight = lineHeight * 2;
            setIsOverflowing(textRef.current.scrollHeight > maxHeight);
        }
    }, [expert.description]);

    return (
        <Box sx={{
            borderRadius: "10px",
            bgcolor: "black",
            color: "white",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
            minHeight: "30vh",
            width: "50vw",
            overflow: "hidden",
            display: "flex",
            gap: "30px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
                transform: "scale(1.05)",
            },
        }}>
            <Link href={`/course?page=1&expertIds=${expert.expertId}`}>
                <img
                    src={`${storageUrl}/avatar/${expert.user.avatar}`}
                    alt="Your expert's image"
                    className="w-[15vw] h-full"
                    style={{
                        WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                        maskImage: "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                    }}
                />
            </Link>

            <div className="flex flex-col gap-3 pt-7">
                <Typography fontWeight={700} fontSize="1.2rem">
                    {expert.user.fullname}
                </Typography>

                <div className="flex items-center">
                    <EmojiEventsIcon sx={{ color: "#ffd500", mr: 2 }} />
                    <Typography
                        ref={textRef}
                        sx={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            maxWidth: "25vw",
                            WebkitLineClamp: 2,
                            position: "relative",
                        }}
                    >

                        <span className="text-gray-300 text-justify">
                            {expert.achievement}
                        </span>
                    </Typography>
                </div>

                <div className="flex items-center">
                    <InfoIcon sx={{ color: "#ffd500", mr: 2 }} />
                    <Typography
                        ref={textRef}
                        sx={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            maxWidth: "25vw",
                            WebkitLineClamp: 2,
                            position: "relative",
                        }}
                    >

                        <span className="text-gray-300 text-justify">
                            {expert.description}
                        </span>
                    </Typography>
                    {isOverflowing && (
                        <span onClick={() => setOpenDescription(true)} className="text-blue-400 ml-1 self-end text-sm cursor-pointer">Xem thêm</span>
                    )}
                </div>

                <div className="flex gap-5">
                    <Tooltip
                        title={`${expert.yearOfExperience} năm kinh nghiệm`}
                        placement="bottom"
                        slotProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: "#3dd857",
                                    color: "white",
                                    fontSize: "14px",
                                    boxShadow: 1,
                                }
                            }
                        }}
                    >
                        <div className="bg-[#dcfce7] rounded-full p-2 shadow-[0_0_15px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110">
                            <AssignmentIndIcon className="text-[#3dd857]" />
                        </div>
                    </Tooltip>

                    <Tooltip
                        title={`${expert.totalCourses} khóa học`}
                        placement="bottom"
                        slotProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: "#fa5a7d",
                                    color: "white",
                                    fontSize: "14px",
                                    boxShadow: 1,
                                }
                            }
                        }}
                    >
                        <div className="bg-[#ffe2e6] rounded-full p-2 shadow-[0_0_15px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110">
                            <AutoStoriesIcon className="text-[#fa5a7d]" />
                        </div>
                    </Tooltip>

                    <Tooltip
                        title={`${expert.totalStudents} học viên theo học`}
                        placement="bottom"
                        slotProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: "#bf83ff",
                                    color: "white",
                                    fontSize: "14px",
                                    boxShadow: 1,
                                }
                            }
                        }}
                    >
                        <div className="bg-[#f4e8ff] rounded-full p-2 shadow-[0_0_15px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110">
                            <PeopleAltIcon className="text-[#bf83ff]" />
                        </div>
                    </Tooltip>

                    <Tooltip
                        title={`${expert.totalFollowers} người theo dõi`}
                        placement="bottom"
                        slotProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: "#1e96fc",
                                    color: "white",
                                    fontSize: "14px",
                                    boxShadow: 1,
                                }
                            }
                        }}
                    >
                        <div className="bg-[#a2d6f9] rounded-full p-2 shadow-[0_0_15px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110">
                            <GroupAddIcon className="text-[#1e96fc]" />
                        </div>
                    </Tooltip>

                </div>
            </div>

            <Modal
                open={openDescription}
                onClose={() => setOpenDescription(false)}
            >
                <Fade in={openDescription}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '20px'
                    }}
                    >
                        <div className='flex justify-between mb-10'>
                            <p className="text-lg font-bold">Mô tả</p>
                            <CloseIcon onClick={() => setOpenDescription(false)} />
                        </div>
                        <div>
                            <Typography
                                sx={{
                                    position: "relative",
                                }}
                            >
                                <span className="text-gray-300 text-justify">
                                    {expert.description}
                                </span>
                            </Typography>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default SingleExpertList;
