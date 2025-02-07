'use client'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RefreshIcon from '@mui/icons-material/Refresh';
import { ChangeEvent, useRef } from "react";
import { useCourseListContext } from "@/wrapper/course-list/course.list.wrapper";

const CourseSubject = (props: {
    subjectList: SubjectResponse[];
    subjectIds: string;
}) => {
    const { subjectList, subjectIds } = props;
    const { priceFormRef, setOrderby } = useCourseListContext();

    const subjectIdArray = subjectIds.split(",");

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement | null>(null);

    const currentKeyword = searchParams.get('keyword') || "";

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

    const handleResetFilter = () => {
        formRef.current?.reset();
        priceFormRef.current?.reset();
        setOrderby("default");
        router.push("/course");
    }

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'black',
            borderRadius: '6px',
            padding: '30px 20px'
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

            <div className="flex items-center justify-between mb-3 mt-5">
                <h1 className="text-lg font-semibold">Môn học</h1>
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
    )
}

export default CourseSubject