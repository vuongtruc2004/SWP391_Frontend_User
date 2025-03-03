'use client'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RefreshIcon from '@mui/icons-material/Refresh';
import { ChangeEvent, useRef, useState } from "react";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import { useCourseList } from "@/wrapper/course-list/course.list.wrapper";

const CourseSubjectFilter = ({ subjectList, subjectIds }: {
    subjectList: SubjectResponse[];
    subjectIds: string;
}) => {
    const { priceFormRef, setOrderby } = useCourseList();
    const subjectIdArray = subjectIds.split(",");

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement | null>(null);

    const currentKeyword = searchParams.get('keyword') || "";
    const currentEvent = searchParams.get('event') || "all";

    const [selectedEvent, setSelectedEvent] = useState<string>(currentEvent);

    const handleSortSubject = () => {
        const currentSort = searchParams.get('sortSubject') || 'asc';
        const newSort = currentSort === "asc" ? "desc" : "asc";

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('sortSubject', newSort);
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

    const handleChangeSubject = (e: ChangeEvent<HTMLInputElement>, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        let subjectIds = newSearchParams.get('subjectIds')?.split(",").filter(id => id) || [];

        if (e.target.checked) {
            subjectIds.push(value);
        } else {
            subjectIds = subjectIds.filter(item => item !== value);
        }

        newSearchParams.set('page', '1');

        if (subjectIds.length) {
            newSearchParams.set('subjectIds', subjectIds.join(","));
        } else {
            newSearchParams.delete('subjectIds');
        }

        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleChangeSelectedEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedEvent(e.target.value);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', '1');
        newSearchParams.set('event', e.target.value);
        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleResetFilter = () => {
        formRef.current?.reset();
        priceFormRef.current?.reset();
        setOrderby("updatedAt");
        setSelectedEvent("all");
        router.push("/course");
    }

    return (
        <>
            <Box sx={{
                width: '100%',
                bgcolor: 'black',
                borderRadius: '6px',
                padding: '30px 20px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            }}>
                <h1 className="text-lg font-semibold mb-3">Tìm kiếm</h1>

                <form ref={formRef} onSubmit={handleSubmitKeyword} className="flex items-center justify-center gap-x-1">
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
                        placeholder='Nhập tên khóa học, mô tả'
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

                <h1 className="text-lg font-semibold mt-5">Chương trình</h1>
                <FormControl sx={{ paddingLeft: '12px' }}>
                    <RadioGroup value={selectedEvent} onChange={handleChangeSelectedEvent}>
                        <FormControlLabel value="all" control={<Radio size="small" />} label="Tất cả" />
                        <FormControlLabel value="sale" control={<Radio size="small" />} label="Có giảm giá" />
                        <FormControlLabel value="noSale" control={<Radio size="small" />} label="Không có giảm giá" />
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box sx={{
                width: '100%',
                bgcolor: 'black',
                borderRadius: '6px',
                padding: '30px 20px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            }}>
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Lĩnh vực</h1>
                    <IconButton color="primary" onClick={handleSortSubject}>
                        <SortByAlphaOutlinedIcon />
                    </IconButton>
                </div>

                <FormGroup sx={{
                    maxHeight: '228px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'block',
                        width: '3px',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#495057',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#60a5fa',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1976D2',
                    },
                    flexWrap: 'nowrap'
                }}>
                    {subjectList?.map(item => {
                        const isCheck = subjectIdArray.some(id => id === item.subjectId.toString());

                        return (
                            <FormControlLabel
                                label={
                                    <div className='flex items-center justify-between w-full'>
                                        <p>{item.subjectName}</p>
                                        <p>({item.totalCourses})</p>
                                    </div>
                                }
                                checked={isCheck}
                                key={item.subjectId}
                                control={
                                    <Checkbox size="small" onChange={(e) => handleChangeSubject(e, item.subjectId.toString())} />
                                }
                                sx={{
                                    margin: 0,
                                    'span:last-child': {
                                        flex: 1
                                    },
                                    paddingRight: '20px'
                                }}
                            />
                        )
                    })}
                </FormGroup>
            </Box>
        </>
    )
}

export default CourseSubjectFilter