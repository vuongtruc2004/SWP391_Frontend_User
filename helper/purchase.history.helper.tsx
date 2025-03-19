export const displayOrderStatus = (order: OrderResponse) => {
    return (
        <li className="flex flex-col gap-y-1.5 items-end w-[168px]">
            <p className="text-gray-400 font-semibold">Trạng thái</p>
            {order.orderStatus === 'COMPLETED' ? (
                <p className="text-green-500">Đã thanh toán</p>
            ) : (order.orderStatus === 'PENDING' ? (
                <p className="text-orange-500">Đang chờ thanh toán</p>
            ) : (
                <p className="text-red-500">Đã hết hạn thanh toán</p>
            ))}
        </li>
    )
}