import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const SelectJob = (props: {
    setStep: React.Dispatch<SetStateAction<number>>,
    userRequest: UserRequest,
    setUserRequest: React.Dispatch<SetStateAction<UserRequest>>
}) => {
    const { setStep, userRequest, setUserRequest } = props;
    const prevJob = (userRequest.job && userRequest.job !== "") ? userRequest.job : "student";
    const [job, setJob] = useState(prevJob);

    const handleChange = (event: SelectChangeEvent) => {
        setJob(event.target.value);
    };

    const handleNextStep = () => {
        setUserRequest({
            ...userRequest,
            job: job
        });
        setStep(prev => prev + 1);
    }

    return (
        <>
            <div className="flex justify-center mb-2">
                <span className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-[15px] border border-gray-500">
                    <WorkOutlineIcon sx={{ fontSize: '2.25rem' }} />
                </span>
            </div>

            <h1 className="text-2xl text-center font-semibold mb-8">Công việc</h1>

            <label className="text-white"><span className="text-red-500 mr-1">*</span>Chọn công việc hiện tại của bạn:</label>
            <Select
                value={job}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                    marginBlock: '5px 8px'
                }}
            >
                <MenuItem value="student">Học sinh / Sinh viên</MenuItem>
                <MenuItem value="freelancer">Freelancer</MenuItem>
                <MenuItem value="intern">Intern</MenuItem>
                <MenuItem value="fresher">Fresher</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
            </Select>

            <div className="flex items-center gap-x-1 text-sm text-gray-300 mb-2">
                <p>Bạn đã có tài khoản?</p>
                <Link href={"/login"} className="text-blue-500 hover:underline">
                    Đăng nhập
                </Link>
            </div>

            <div className="flex justify-end">
                <Button
                    variant='contained'
                    onClick={handleNextStep}
                >
                    Next
                </Button>
            </div>
        </>
    );
};

export default SelectJob;