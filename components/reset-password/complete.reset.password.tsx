import CheckIcon from '@mui/icons-material/Check';

const CompleteResetPassword = () => {
    return (
        <>
            <div className="flex justify-center mb-2">
                <span className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-[15px] border border-gray-500">
                    <CheckIcon sx={{ fontSize: '2.25rem' }} />
                </span>
            </div>

            <h1 className="text-2xl text-center font-semibold">Bạn đã đổi mật khẩu thành công!</h1>
            <p className="text-center text-gray-300 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi!</p>
        </>
    )
}

export default CompleteResetPassword