import CourseListEmpty from "@/components/course/course.list.empty";
import CourseList from "@/features/course/course.list";
import CourseSort from "@/features/course/course.sort";
import { getCourseSort, getInputPrice } from "@/helper/course.list.helper";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import Box from "@mui/material/Box";

const CoursePage = async (props: {
    searchParams: Promise<{
        page: string;
        keyword: string;
        priceFrom: string;
        priceTo: string;
        courseSort: string;
        direction: string;
        expertIds: string;
        subjectIds: string;
    }>
}) => {
    const searchParams = await props.searchParams;
    const page = searchParams.page || 1;
    const keyword = searchParams.keyword || "";
    const priceFrom = getInputPrice(searchParams.priceFrom);
    const priceTo = getInputPrice(searchParams.priceTo);
    const courseSort = getCourseSort(searchParams.courseSort);
    const direction = (!searchParams.direction || (searchParams.direction !== "asc" && searchParams.direction !== "desc")) ? "asc" : searchParams.direction;
    const expertIds = searchParams.expertIds || "";
    const subjectIds = searchParams.subjectIds || "";

    let filter = `(courseName ~ '${keyword}' or description ~ '${keyword}')`;

    if (priceFrom !== "") {
        filter += ` and salePrice >: ${priceFrom}`
    }
    if (priceTo !== "") {
        filter += ` and salePrice <: ${priceTo}`
    }

    const queryParams: Record<string, any> = {
        page: page,
        size: 4,
        filter: filter,
        expertIds: expertIds,
        subjectIds: subjectIds
    };

    if (["salePrice", "updatedAt"].includes(courseSort)) {
        queryParams.sort = `${courseSort},${direction}`;
    } else if (["purchaser", "like", "comment"].includes(courseSort)) {
        queryParams.specialSort = `${courseSort},${direction}`;
    } else {
        queryParams.sort = `courseId,${direction}`;
    }


    const coursePageResponse = await sendRequest<ApiResponse<PageDetailsResponse<CourseResponse[]>>>({
        url: `${apiUrl}/courses`,
        queryParams: queryParams
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%'
        }}>
            <CourseSort
                totalElements={coursePageResponse.data?.totalElements || 0}
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