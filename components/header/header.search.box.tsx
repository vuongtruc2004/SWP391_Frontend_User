import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HeaderSearchBox = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get('keyword')?.toString() || "";
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('keyword', keyword);
        newSearchParams.set('page', '1');

        e.currentTarget.reset();
        if (pathname.startsWith("/course")) {
            router.replace(`${pathname}?${newSearchParams}`);
        } else {
            router.push(`/course?${newSearchParams}`);
        }
    }

    return (
        <form onSubmit={handleSubmitKeyword}>
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
                placeholder='Tìm kiếm khóa học'
                name='keyword'
                sx={{
                    width: '280px',
                    transition: 'all .5s',
                    '&:focus-within': {
                        width: '350px'
                    }
                }}
            />
        </form>
    )
}

export default HeaderSearchBox