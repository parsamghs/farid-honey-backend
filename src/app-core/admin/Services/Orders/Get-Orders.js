import moment from "moment-jalaali";
import { findOrders } from "../../Models/Orders/Get-Orders.js";
import { formatNumber, formatNumbersintext } from "../../../../Helpers/Number-formatter.js";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

export const getOrders = async ({ page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const orders = await findOrders({ skip, limit });

  return orders.map((order) => {
    const jalaliDate = moment(order.order_date).format("jYYYY/jMM/jDD");
    const time = moment(order.order_time).format("HH:mm");

    return {
      id: order.id.toString(),      
      total_price: formatNumber(order.total_price, true),
      province: order.submit_address?.province || null,
      order_date: formatNumbersintext(jalaliDate),  
      order_time: formatNumbersintext(time),    
      user: {
        ...order.users,
        id: order.users.id,   
        phone_number: formatNumbersintext(order.users.phone_number),
      },
    };
  });
};