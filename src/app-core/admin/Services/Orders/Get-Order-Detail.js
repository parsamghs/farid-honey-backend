import moment from "moment-jalaali";
import { formatNumber, formatNumbersintext } from "../../../../Helpers/Number-formatter.js";
import { findOrderDetails } from "../../Models/Orders/Get-Order-Detail.js";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

const toStringSafe = (val) => (typeof val === "bigint" ? val.toString() : val);

export const getOrderDetails = async ({ orderId, page = 1, limit = 10 }) => {
    const skip = (page - 1) * limit;

    const order = await findOrderDetails({ orderId, skip, limit });

    if (!order) return null;

    const jalaliDate = moment(order.order_date).format("jYYYY/jMM/jDD");
    const time = moment(order.order_time).format("HH:mm");

    return {
        id: toStringSafe(order.id), // آی‌دی‌ها فارسی نمی‌شن ❌
        total_price: formatNumber(order.total_price, true),
        order_date: formatNumbersintext(jalaliDate),
        order_time: formatNumbersintext(time),

        // کاربر
        user_id: toStringSafe(order.users?.id),
        user_name: formatNumbersintext(order.users?.name),
        user_phone_number: formatNumbersintext(order.users?.phone_number),

        // آدرس
        province: formatNumbersintext(order.submit_address?.province),
        city: formatNumbersintext(order.submit_address?.city),
        address: formatNumbersintext(order.submit_address?.address),
        plate: formatNumbersintext(order.submit_address?.plate),
        unit: formatNumbersintext(order.submit_address?.unit),
        postal_code: formatNumbersintext(order.submit_address?.postal_code),
        receiver: formatNumbersintext(order.submit_address?.receiver),
        address_phone_number: formatNumbersintext(order.submit_address?.phone_number),

        // آیتم‌ها
        items: order.orders_item.map((item) => ({
            id: toStringSafe(item.id), // آی‌دی‌ها فارسی نمی‌شن ❌
            quantity: formatNumbersintext(item.quantity),
            price: formatNumber(item.price, true),
            size: formatNumbersintext(item.size),
            product_id: toStringSafe(item.products?.id),
            product_name: formatNumbersintext(item.products?.name),
            product_category: formatNumbersintext(item.products?.category),
            product_image_url: item.products?.image_url,
        })),
    };
};