import CourseListEmpty from "@/components/course/course.list.empty";
import CourseList from "@/features/course/course.list";
import CourseSort from "@/features/course/course.sort";
import { getInputPrice } from "@/helper/course.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { Box } from "@mui/material";

const CoursePage = async (props: {
    searchParams: Promise<{
        page: string;
        keyword: string;
        priceFrom: string;
        priceTo: string;
        courseSort: string;
        direction: string;
    }>
}) => {
    const searchParams = await props.searchParams;
    const page = searchParams.page || 1;
    const keyword = searchParams.keyword || "";
    const priceFrom = getInputPrice(searchParams.priceFrom);
    const priceTo = getInputPrice(searchParams.priceTo);
    let courseSort = searchParams.courseSort || 'default';
    const direction = searchParams.direction || 'asc';

    let filter = `(courseName ~ '${keyword}' or description ~ '${keyword}')`;

    if (priceFrom !== "") {
        filter += ` and price >: ${priceFrom}`
    }
    if (priceTo !== "") {
        filter += ` and price <: ${priceTo}`
    }

    const queryParams: Record<string, any> = {
        page: page,
        size: 4,
        filter: filter,
    };

    if (courseSort === "default") {
        queryParams.sort = `courseId,${direction}`;
    } else if (["price", "updatedAt"].includes(courseSort)) {
        queryParams.sort = `${courseSort},${direction}`;
    } else if (["purchaser", "like"].includes(courseSort)) {
        queryParams.specialSort = `${courseSort},${direction}`;
    }

    console.log(">>> check filter: ", filter);

    const coursePageResponse = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
        url: `${apiUrl}/courses`,
        queryParams: queryParams
    });

    // console.log(">>> check rs: ", coursePageResponse.data.content);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%'
        }}>
            <CourseSort
                totalElements={coursePageResponse.data.totalElements}
                courseSort={courseSort}
                direction={direction}
            />

            {(!coursePageResponse.data?.content?.length || coursePageResponse.data.content.length === 0) ? (
                <CourseListEmpty />
            ) : (
                <CourseList coursePage={coursePageResponse.data} />
            )}
        </Box>
    )
}

export default CoursePage