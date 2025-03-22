import { AccordionDetails, Divider } from "@mui/material"
import { Accordion, AccordionSummary } from "./style"
import { formatPrice } from "@/helper/course.list.helper"
import { formatDateTime } from "@/helper/blog.helper"
import { Fragment } from "react"
import { displayOrderStatusBox, displayOrderStatusEnum } from "@/helper/purchase.history.helper"
import SingleCourseInOrder from "./single.course.in.order"

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

                    {displayOrderStatusEnum(order)}
                </ul>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                {displayOrderStatusBox(order)}

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