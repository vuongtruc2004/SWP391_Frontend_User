import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import CartPopover from './cart.popover';
import { useCartContext } from '@/wrapper/course-cart/course.cart.wrapper';

const CartButton = () => {
    const { cart } = useCartContext();
    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    return (
        <>
            <Tooltip title="Giỏ hàng" arrow>
                <IconButton color="secondary" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Badge color="error" overlap="circular" badgeContent={cart ? (cart.length > 99 ? '99+' : cart.length) : 0}>
                        <ShoppingCartOutlinedIcon sx={{ color: pathname === "/cart" ? "#60a5fa" : "#dee2e6" }} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <CartPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
    )
}

export default CartButton