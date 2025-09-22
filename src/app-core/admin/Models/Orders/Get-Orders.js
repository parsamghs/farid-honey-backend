import prisma from "../../../../Config/db.js";

/**
 * 
 * @param {number} skip
 * @param {number} take
 */
export const getOrdersWithPagination = async (skip, take) => {
  return prisma.orders.findMany({
    skip,
    take,
    orderBy: [
      { order_date: 'desc' },
      { order_time: 'desc' }
    ],
    select: {
      total_price: true,
      order_date: true,
      order_time: true,
      users: {
        select: {
          name: true,
          phone_number: true,
        },
      },
      submit_address: {
        select: {
          province: true,
        },
      },
    },
  });
};

export const countOrders = async () => {
  return prisma.orders.count();
};
