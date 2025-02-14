import { storageUrl } from "@/utils/url";
import { Avatar, Box } from "@mui/material";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PeopleIcon from '@mui/icons-material/People';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const CourseExpert = ({ course }: { course: CourseDetailsResponse }) => {
    const avatarSrc = course?.expert?.user?.avatar?.startsWith("http") ? course?.expert?.user?.avatar : `${storageUrl}/avatar/${course?.expert?.user?.avatar}`;
    return (
        <>
            <h1 className="font-semibold text-xl">Giảng viên</h1>
            <div className="flex items-center gap-x-2 mt-3 mb-2">
                <Avatar src={avatarSrc} sx={{
                    width: '50px',
                    height: '50px'
                }}>
                    {course?.expert?.user?.fullname.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                    <p className="font-semibold">{course?.expert?.user?.fullname}</p>
                    <p className="text-sm text-gray-400 font-semibold">{course?.expert?.job}</p>
                </div>
            </div>

            <p className="text-gray-300 line-clamp-3 text-sm">{course?.expert?.description}</p>

            <ul className="text-sm">
                <li className="flex items-center gap-x-2 py-1.5">
                    <WorkspacePremiumIcon sx={{ fontSize: '1.2rem' }} />
                    <p>{course?.expert?.achievement}</p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <WorkHistoryIcon sx={{ fontSize: '1.2rem' }} />
                    <p><span className="font-semibold text-green-500">{course?.expert?.yearOfExperience}</span> năm kinh nghiệm</p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <SchoolIcon sx={{ fontSize: '1.2rem' }} />
                    <p>{course?.expert?.totalStudents} học sinh</p>
                </li>
                <li className="flex items-center gap-x-2 py-1.5">
                    <SmartDisplayIcon sx={{ fontSize: '1.2rem' }} />
                    <p><span className="font-semibold text-purple-300">{course?.expert?.totalCourses}</span> khóa học</p>
                </li>
            </ul>
        </>
    )
}

export default CourseExpert