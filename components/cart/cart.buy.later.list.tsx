import { useCart } from '@/wrapper/course-cart/course.cart.wrapper';
import { Box } from '@mui/material';
import SingleCartCourse from '../../features/cart/single.cart.course';

const CartBuyLaterList = () => {
    const { cart } = useCart();

    if (!cart.filter(item => item.buyLater).length) {
        return null;
    }

    return (
        <Box sx={{
            bgcolor: 'black',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '6px',
        }}>
            <h1 className="text-2xl font-semibold">Danh sách lưu để mua sau</h1>
            <p className="text-sm text-gray-400 mb-1 font-semibold">Có {cart.filter(item => item.buyLater).length || 0} khóa học trong danh sách</p>

            <Box sx={{
                marginBottom: '20px',
                'img': {
                    objectFit: 'contain'
                }
            }}>
                {cart.map(item => {
                    if (item.buyLater) {
                        return (
                            <SingleCartCourse course={item} key={item.courseId + "_" + item.courseName} />
                        )
                    }
                    return null;
                })}
            </Box>
        </Box >
    )
}

export default CartBuyLaterList