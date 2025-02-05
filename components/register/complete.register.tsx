import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';

const CompleteRegister = () => {
    return (
        <>
            <div className="flex justify-center mb-2">
                <span className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-[15px] border border-green-500">
                    <CheckIcon sx={{ fontSize: '2.25rem', color: '#22c55e ' }} />
                </span>
            </div>

            <h1 className="text-2xl text-center font-semibold">Bạn đã đăng kí thành công!</h1>
            <p className="text-center text-gray-300 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi!</p>

            <Link href={"/login"} className="mt-5 flex justify-center">
                <Button
                    variant="text"
                    color="primary"
                    startIcon={<KeyboardBackspaceIcon />}
                    sx={{
                        textTransform: 'none',
                    }}
                >
                    Về trang đăng nhập
                </Button>
            </Link>
        </>
    )
}

export default CompleteRegister