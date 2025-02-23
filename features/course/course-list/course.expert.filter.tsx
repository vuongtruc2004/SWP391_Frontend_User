'use client'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useCourseList } from "@/wrapper/course-list/course.list.wrapper";

const CourseExpertFilter = ({ expertList, priceFrom, priceTo, expertIds }: {
    expertList: ExpertResponse[],
    priceFrom: string;
    priceTo: string;
    expertIds: string;
}) => {
    const { priceFormRef } = useCourseList();
    const expertIdArray = expertIds.split(",");

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortExpert = () => {
        const currentSort = searchParams.get('sortExpert') || 'asc';
        const newSort = currentSort === "asc" ? "desc" : "asc";

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('sortExpert', newSort);
        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleSubmitPrice = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const priceFrom = formData.get('priceFrom')?.toString() || "";
        const priceTo = formData.get('priceTo')?.toString() || "";

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('priceFrom', priceFrom);
        newSearchParams.set('priceTo', priceTo);
        newSearchParams.set('page', '1');
        router.replace(`${pathname}?${newSearchParams}`);
    }

    const handleChangeExpert = (e: ChangeEvent<HTMLInputElement>, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        let expertIds = newSearchParams.get('expertIds')?.split(",").filter(id => id) || [];

        if (e.target.checked) {
            expertIds.push(value);
        } else {
            expertIds = expertIds.filter(item => item !== value);
        }

        newSearchParams.set('page', '1');

        if (expertIds.length) {
            newSearchParams.set('expertIds', expertIds.join(","));
        } else {
            newSearchParams.delete('expertIds');
        }

        router.replace(`${pathname}?${newSearchParams}`);
    }

    return (
        <Box sx={{
            bgcolor: 'black',
            padding: '30px 20px',
            borderRadius: '6px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        }}>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Giảng viên</h1>
                <IconButton color="primary" onClick={handleSortExpert}>
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
            }}>
                {expertList?.map(item => {
                    const isCheck = expertIdArray.some(id => id === item.expertId.toString());

                    return (
                        <FormControlLabel
                            label={
                                <div className='flex items-center justify-between w-full'>
                                    <p>{item.user.fullname}</p>
                                    <p>({item.totalCourses})</p>
                                </div>
                            }
                            checked={isCheck}
                            key={item.expertId}
                            control={
                                <Checkbox size="small" onChange={(e) => handleChangeExpert(e, item.expertId.toString())} />
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

            <h1 className="text-lg font-semibold mb-3 mt-5">Khoảng giá</h1>

            <form onSubmit={handleSubmitPrice} ref={priceFormRef}>
                <div className='flex items-center justify-center gap-x-3 mb-3'>
                    <TextField
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        .000₫
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        size='small'
                        name='priceFrom'
                        placeholder='Từ'
                        defaultValue={priceFrom}
                        fullWidth
                    />

                    <TextField
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        .000₫
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        size='small'
                        name='priceTo'
                        placeholder='Đến'
                        defaultValue={priceTo}
                        fullWidth
                    />
                </div>
                <Button
                    variant='contained'
                    fullWidth
                    type='submit'
                    sx={{
                        textTransform: 'none',
                        bgcolor: '#4ade80',
                        '&:hover': {
                            bgcolor: '#00c951'
                        }
                    }}>
                    Áp Dụng
                </Button>
            </form>
        </Box>
    )
}

export default CourseExpertFilter