import CourseFilter from "@/features/course/course.filter";
import CourseList from "@/features/course/course.list";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { Box } from "@mui/material";

const CoursePage = async () => {
    const fakeResponse = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
        url: `${apiUrl}/courses/purchased`,
        queryParams: {
            page: 1,
            size: 6
        }
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%'
        }}>
            <CourseFilter totalElements={fakeResponse.data.totalElements} />
            <CourseList coursePage={fakeResponse.data} />
        </Box>
    )
}

export default CoursePage