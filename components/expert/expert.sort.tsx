'use client'
import { useCourseList } from "@/wrapper/course-list/course.list.wrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { InputAdornment, TextField } from "@mui/material";

const ExpertSort = ({ totalElements }: {
    totalElements: number,
}) => {

    const [orderBy, setOrderby] = useState<string>("yearOfExperience");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const formRef = useRef<HTMLFormElement | null>(null);
    const currentKeyword = searchParams.get('keyword') || "";

    const handleChangeSortOption = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setOrderby(value);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('expertSort', value);
        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleChangeDirection = (direction: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('direction', direction);
        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        const keyword = e.target[0].value;
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('keyword', keyword);
        newSearchParams.set('page', '1');
        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleResetFilter = () => {
        formRef.current?.reset();
        setOrderby("yearOfExperience");
        router.push("/expert");
    }

    return (
        <Box sx={{ width: '50vw', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box sx={{
                bgcolor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 25px',
                borderRadius: '6px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
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
                <p><strong className="text-blue-500 text-lg">{totalElements}</strong> chuyên gia</p>

                <form ref={formRef} onSubmit={handleSubmitKeyword} className="flex items-center justify-center gap-x-1 w-[70%]">
                    <TextField
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        size='small'
                        placeholder='Nhập tên chuyên gia, thành tích, mô tả'
                        name='keyword'
                        defaultValue={currentKeyword}
                        fullWidth
                    />

                    <Tooltip title="Làm mới bộ lọc" arrow placement="top">
                        <Button
                            variant="contained"
                            color='info'
                            onClick={handleResetFilter}
                            sx={{
                                width: '40px',
                                minWidth: '40px',
                                aspectRatio: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <RefreshIcon />
                        </Button>
                    </Tooltip>
                </form>

            </Box >


        </Box>

    )
}

export default ExpertSort