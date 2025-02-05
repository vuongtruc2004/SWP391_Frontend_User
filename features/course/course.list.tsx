'use client'
import { Box, MenuItem, Select, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CourseList = (props: {
    coursePage: PageDetailsResponse<CourseResponse[]>
}) => {
    const { coursePage } = props;
    const [orderBy, setOrderby] = useState("id");
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%'
        }}>
            <Box sx={{
                bgcolor: 'black',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 25px',
                borderRadius: '6px',
                'a': {
                    borderColor: '#343a40',
                    '&:hover': {
                        borderColor: '#e5e7eb',
                    },
                    '&.active': {
                        borderColor: '#90caf9',
                    }
                }
            }}>
                <p>{coursePage.totalElements} khóa học</p>

                <div className="flex items-center gap-x-10">
                    <label>Sắp xếp theo:</label>

                    <div className="flex items-center gap-x-3">
                        <Select
                            value={orderBy}
                            onChange={(e) => setOrderby(e.target.value)}
                            size="small"
                        >
                            <MenuItem value={"id"}>Mặc định</MenuItem>
                            <MenuItem value={"price"}>Giá</MenuItem>
                            <MenuItem value={"purchaser"}>Số lượt mua</MenuItem>
                            <MenuItem value={"like"}>Số lượt thích</MenuItem>
                        </Select>

                        <Tooltip title="Tăng dần" placement="top" arrow>
                            <Link href={`/course`}
                                className="active transition-all duration-200 border rounded-sm w-[40px] h-[40px] flex items-center justify-center"
                            >
                                <Image
                                    src={`/asc.png`}
                                    alt={"ascending icon"}
                                    width={0}
                                    height={0}
                                    sizes="(max-width: 1000px) 100vw"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: 'auto',
                                        height: '24px',
                                        margin: '0 auto',
                                        transition: 'all .5s',
                                    }}
                                />
                            </Link>
                        </Tooltip>

                        <Tooltip title="Giảm dần" placement="top" arrow>
                            <Link href={`/course`}
                                className="transition-all duration-200 border rounded-sm w-[40px] h-[40px] flex items-center justify-center"
                            >
                                <Image
                                    src={`/desc.png`}
                                    alt={"descending icon"}
                                    width={0}
                                    height={0}
                                    sizes="(max-width: 1000px) 100vw"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: 'auto',
                                        height: '24px',
                                        margin: '0 auto',
                                        transition: 'all .5s',
                                    }}
                                />
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </Box>

            <Box>

            </Box>
        </Box>
    )
}

export default CourseList