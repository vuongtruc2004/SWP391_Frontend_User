import { AccordionDetails, Divider } from "@mui/material"
import { Accordion, AccordionSummary } from "./style"
import { Fragment } from "react"
import SingleCourseInOrder from "./single.course.in.order"
import OrderStatusBox from "./order.status.box"
import { formatDateTime, formatPrice } from "@/utils/format"

const SingleOrder = ({ order }: { order: OrderResponse }) => {

    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary>
                <ul className="flex items-center justify-between w-full rounded-tl-md rounded-tr-md">
                    <li className="flex flex-col gap-y-1.5 items-start w-[230px] shrink-0">
                        <p className="text-gray-400 font-semibold">Mã hóa đơn</p>
                        <p className="text-white">{order.orderCode}</p>
                    </li>

                    <li className="flex flex-col gap-y-1.5 items-start">
                        <p className="text-gray-400 font-semibold">Ngày tạo đơn</p>
                        <p className="text-white">{formatDateTime(order.createdAt)}</p>
                    </li>

                    <li className="flex flex-col gap-y-1.5 items-start">
                        <p className="text-gray-400 font-semibold">Tổng tiền</p>
                        <p className="text-white">{formatPrice(order.totalPrice)}₫</p>
                    </li>

                    <li className="flex flex-col gap-y-1.5 items-end w-[168px]">
                        <p className="text-gray-400 font-semibold">Trạng thái</p>
                        {order.paidAt !== null ? (
                            <p className="text-green-500">Đã thanh toán</p>
                        ) : (
                            <p className="text-orange-500">Chưa thanh toán</p>
                        )}
                    </li>
                </ul>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                <OrderStatusBox order={order} />

                <ul>
                    {order.orderDetails && order.orderDetails.map((orderDetails, index) => {
                        return (
                            <Fragment key={orderDetails.orderDetailsId}>
                                <SingleCourseInOrder orderDetails={orderDetails} />

                                {index < order.orderDetails.length - 1 && (
                                    <Divider sx={{ marginBlock: '10px' }} />
                                )}
                            </Fragment>
                        )
                    })}
                </ul>
            </AccordionDetails>
        </Accordion>
    )

}

export default SingleOrder