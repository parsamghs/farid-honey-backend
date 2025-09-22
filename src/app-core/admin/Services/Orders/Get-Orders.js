import { getOrdersWithPagination, countOrders } from "../../Models/Orders/Get-Orders.js";
import { formatNumber, formatNumbersintext } from "../../../../Helpers/Number-formatter.js";
import { formatJalaliDate } from "../../../../Helpers/Date-formatter.js";

export const listOrders = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const [orders, total] = await Promise.all([
    getOrdersWithPagination(skip, take),
    countOrders(),
  ]);

  const formatted = orders.map(order => ({
    name: order.users?.name ? formatNumbersintext(order.users.name) : null,
    phone_number: order.users?.phone_number ? formatNumber(order.users.phone_number, false) : null,
    province: order.submit_address?.province ? formatNumbersintext(order.submit_address.province) : null,
    total_price: formatNumber(order.total_price),
    created_at: formatJalaliDate(order.order_date, order.order_time, "jYYYY/jMM/jDD HH:mm"),
  }));

  return {
    data: formatted,
    meta: {
      total: formatNumber(total),
      page: formatNumber(page),
      limit: formatNumber(limit),
      totalPages: formatNumber(Math.ceil(total / limit)),
    },
  };
};
