'use client'
import SingleCourseSlider from "@/components/course/course-slider/single.course.slider";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CourseList = ({ coursePage }: {
    coursePage: PageDetailsResponse<CourseResponse[]>
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        router.replace(`${pathname}?${params}`);
    }

    return (
        <div>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px'
            }}>
                {coursePage.content?.map(item => {
                    return (
                        <SingleCourseSlider course={item} key={item.courseId} />
                    )
                })}
            </Box>
            <Pagination
                count={coursePage.totalPages}
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px',
                }}
                onChange={handleChangePage}
            />
        </div>
    )
}

export default CourseList