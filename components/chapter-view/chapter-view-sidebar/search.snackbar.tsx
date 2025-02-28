import { Box, InputAdornment, Slide, SlideProps, Snackbar, TextField } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateAction } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}
const SearchSnackbar = ({ open, setOpen }: {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const handleSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get('keyword')?.toString() || "";
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('keyword', keyword);
        newSearchParams.set('page', '1');

        e.currentTarget.reset();
        push(`/course?${newSearchParams}`);
    }

    return (
        <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            TransitionComponent={SlideTransition}
            key={SlideTransition.name}
        >
            <Box sx={{
                bgcolor: 'black',
                borderRadius: '6px',
                padding: '20px',
                width: '380px',
                position: 'relative',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5), -2px -2px 5px rgba(0,0,0,0.5)',
            }}>
                <h1 className="mb-2">Tìm kiếm khóa học</h1>
                <span className="absolute top-2 right-3 hover:text-purple-300 cursor-pointer" onClick={() => setOpen(false)}>
                    <CloseIcon sx={{ fontSize: '1.2rem' }} />
                </span>

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
                        placeholder='Tìm kiếm khóa học'
                        name='keyword'
                        size="small"
                        fullWidth
                    />
                </form>
            </Box>
        </Snackbar>

    )
}

export default SearchSnackbar