'use client'
import { useCourseListContext } from "@/wrapper/course-list/course.list.wrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CourseSort = ({ totalElements, courseSort, direction }: {
    totalElements: number,
    courseSort: string;
    direction: string;
}) => {
    const { orderBy, setOrderby } = useCourseListContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChangeSortOption = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setOrderby(value);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('courseSort', value);
        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleChangeDirection = (direction: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('direction', direction);
        router.replace(`${pathname}?${newSearchParams}`);
    }

    useEffect(() => {
        setOrderby(courseSort);
    }, []);

    return (
        <Box sx={{
            bgcolor: 'black',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 25px',
            borderRadius: '6px',
            'button': {
                width: '40px',
                minWidth: '40px',
                padding: 0,
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&.active': {
                    borderWidth: '2px',
                    borderColor: '#90caf9'
                }
            }
        }}>
            <p><strong className="text-blue-500 text-lg">{totalElements}</strong> khóa học</p>

            <div className="flex items-center gap-x-10">
                <label>Sắp xếp theo:</label>

                <div className="flex items-center gap-x-3">
                    <Select
                        value={orderBy}
                        onChange={handleChangeSortOption}
                        size="small"
                    >
                        <MenuItem value={"default"}>Mặc định</MenuItem>
                        <MenuItem value={"salePrice"}>Giá</MenuItem>
                        <MenuItem value={"updatedAt"}>Mới nhất</MenuItem>
                        <MenuItem value={"purchaser"}>Số lượt mua</MenuItem>
                        <MenuItem value={"like"}>Số lượt thích</MenuItem>
                        <MenuItem value={"comment"}>Số lượt bình luận</MenuItem>
                    </Select>

                    <Tooltip title="Tăng dần" placement="top" arrow>
                        <Button
                            variant="outlined"
                            onClick={() => handleChangeDirection("asc")}
                            color={direction === "asc" ? 'primary' : 'secondary'}
                            className={`${direction === "asc" ? "active" : ""}`}
                        >
                            <Image
                                src={`/asc.webp`}
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
                        </Button>
                    </Tooltip>

                    <Tooltip title="Giảm dần" placement="top" arrow>
                        <Button
                            variant="outlined"
                            onClick={() => handleChangeDirection("desc")}
                            color={direction === "desc" ? 'primary' : 'secondary'}
                            className={`${direction === "desc" ? "active" : ""}`}
                        >
                            <Image
                                src={`/desc.webp`}
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
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </Box >
    )
}

export default CourseSort