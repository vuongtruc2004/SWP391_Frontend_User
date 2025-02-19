import { useCartContext } from "@/wrapper/course-cart/course.cart.wrapper"
import { Box, Button, IconButton, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SingleCartCourse from "./single.cart.course";
import { useSession } from "next-auth/react";

const CartList = () => {
    const { cart, setCart } = useCartContext();
    const { data: session, status } = useSession();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
        setAnchorEl(null);
    }

    useEffect(() => {
        if (status === "authenticated") {

        }
    }, [session]);

    return (
        <Box sx={{
            bgcolor: 'black',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '6px',
        }}>
            <div className="flex items-center justify-between mb-5 pr-5">
                <div>
                    <h1 className="text-2xl font-semibold">Giỏ hàng</h1>
                    <p className="text-sm text-gray-400 mb-1 font-semibold">Có {cart?.length || 0} khóa học trong giỏ hàng</p>
                </div>
                <IconButton color="info" onClick={(event) => setAnchorEl(event.currentTarget)} size="small">
                    <DeleteOutlineIcon />
                </IconButton>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{
                        '.mui-vhqfcu-MuiPaper-root-MuiPopover-paper': {
                            backgroundImage: 'none'
                        }
                    }}
                >
                    <div className="bg-[#101010] p-3 rounded-md">
                        <h3 className="font-semibold text-white"><ErrorOutlineIcon className="text-red-500" sx={{ fontSize: '1.35rem' }} /> Xóa giỏ hàng</h3>
                        <p className="text-sm text-gray-300 font-semibold ml-5">Bạn có muốn xóa toàn bộ giỏ hàng không?</p>
                        <div className="flex justify-end gap-x-2 mt-3">
                            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>Hủy</Button>
                            <Button size="small" variant="contained" color="error" onClick={handleDeleteCart}>Xóa</Button>
                        </div>
                    </div>
                </Popover>
            </div>

            <Box sx={{
                marginBottom: '20px',
                'img': {
                    objectFit: 'contain'
                }
            }}>
                {cart.map((item, index) => {
                    return (
                        <SingleCartCourse course={item} setCart={setCart} index={index} key={item.courseId + "_" + item.courseName} />
                    )
                })}
            </Box>
        </Box >
    )
}

export default CartList