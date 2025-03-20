import { Box, Button, Divider, Popover } from '@mui/material';
import Link from 'next/link';
import { Fragment, SetStateAction } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import { storageUrl } from '@/utils/url';
import { formatPrice } from '@/helper/course.list.helper';
import ListEmpty from '@/components/empty/list.empty';
import { useCart } from '@/wrapper/course-cart/course.cart.wrapper';
import { slugifyText } from '@/helper/blog.helper';

const CartPopover = ({ anchorEl, setAnchorEl }: {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: React.Dispatch<SetStateAction<HTMLButtonElement | null>>;
}) => {
    const { cart } = useCart();

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{
                padding: '20px',
                width: '388px',
                bgcolor: '#101010',
            }}>
                <h1 className='text-xl font-semibold mb-5'>Giỏ hàng của bạn ({cart.length})</h1>
                {cart && cart.length > 0 ? (
                    <>
                        <Box sx={{
                            maxHeight: '307px',
                            overflow: 'auto',
                            marginBottom: '20px',
                            '&::-webkit-scrollbar': {
                                display: 'block',
                                width: '2px',
                                borderRadius: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#495057',
                                borderRadius: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#60a5fa',
                                borderRadius: '6px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#1976D2',
                            },
                            'img': {
                                objectFit: 'contain'
                            }
                        }}>
                            {cart.map((item, index) => {
                                return (
                                    <Fragment key={item.courseId}>
                                        <div className={`flex items-center gap-x-2 ${index === 0 ? 'pb-5' : 'py-5'}`}>
                                            <Link href={`/course/${slugifyText(item.courseName + "-" + item.courseId)}`} onClick={handleClose} style={{
                                                display: 'block',
                                                width: '110px',
                                                height: `66px`,
                                                position: 'relative',
                                            }}>
                                                <Image src={`${storageUrl}/course/${item.thumbnail}`} alt="course image" fill sizes="(max-width: 1000px) 100vw" priority={true} style={{
                                                    objectFit: 'cover',
                                                    borderRadius: '6px',
                                                    objectPosition: 'center',
                                                    cursor: 'pointer'
                                                }} />
                                            </Link>

                                            <div className='max-w-[200px]'>
                                                <Link href={`/course/${slugifyText(item.courseName + "-" + item.courseId)}`} onClick={handleClose} className='line-clamp-1 font-semibold hover:underline hover:text-blue-500'>{item.courseName}</Link>
                                                <p className='text-sm text-gray-300'>Bởi {item.author}</p>
                                                <p className='font-semibold'>{formatPrice(item.price)}₫</p>
                                            </div>
                                        </div>
                                        <Divider />
                                    </Fragment>
                                )
                            })}
                        </Box>
                        <Link href={"/cart"}>
                            <Button variant='outlined' color='info' fullWidth endIcon={<ChevronRightIcon />} onClick={handleClose}>
                                Chuyển đến giỏ hàng
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <ListEmpty text='Giỏ hàng của bạn đang trống' height={220} />
                        <Button variant='text' color='info' fullWidth onClick={handleClose}>
                            Tiếp tục mua sắm
                        </Button>
                    </>
                )}
            </Box>
        </Popover >
    )
}

export default CartPopover