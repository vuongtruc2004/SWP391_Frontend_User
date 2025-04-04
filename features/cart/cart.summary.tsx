import { Box, Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PaymentInstruction from "@/features/course-purchase/payment.instruction";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/wrapper/course-cart/course.cart.wrapper";
import { useCampaign } from "@/wrapper/course-campaign/course.campaign.wrapper";
import { formatPrice } from "@/utils/format";

const CartSummary = () => {
    const { cart } = useCart();
    const { campaigns } = useCampaign();
    const [buyCourses, setBuyCourses] = useState<CartCourse[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { status } = useSession();
    const { push } = useRouter();
    const pathname = usePathname();

    const [openInstruction, setOpenInstruction] = useState(false);

    const handleOpenInstruction = () => {
        if (status !== "authenticated") {
            sessionStorage.setItem('prevUrl', pathname);
            push("/login");
        } else {
            setOpenInstruction(true);
        }
    }

    useEffect(() => {
        setBuyCourses(cart.filter(item => !item.buyLater));
    }, [cart]);

    useEffect(() => {
        let totalPrice = 0;
        buyCourses.forEach(course => {
            const applyCampaign = campaigns.find(campaign => campaign.courses.some(item => item.courseId === course.courseId));
            if (applyCampaign) {
                totalPrice += course.price - course.price * applyCampaign.discountPercentage / 100;
            } else {
                totalPrice += course.price;
            }
        });
        setTotalPrice(totalPrice);
    }, [campaigns, buyCourses]);

    return (
        <Box sx={{
            bgcolor: 'black',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '6px',
            height: 'max-content',
            position: 'sticky',
            right: 0,
            top: 90
        }}>
            <h1 className="font-semibold text-gray-300">Tổng:</h1>
            <h2 className="font-semibold text-2xl mb-1">{formatPrice(totalPrice)}₫</h2>

            <Button variant="contained" color="primary" fullWidth endIcon={<ChevronRightIcon />} onClick={handleOpenInstruction}>
                Tiến hành thanh toán
            </Button>

            <p className="text-sm text-gray-300 mt-1">Bạn sẽ không bị tính phí ngay bây giờ</p>

            <PaymentInstruction open={openInstruction} setOpen={setOpenInstruction} courses={buyCourses} />
        </Box>
    )
}

export default CartSummary