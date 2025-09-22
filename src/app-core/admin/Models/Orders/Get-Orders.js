import prisma from '../../../../Config/db.js';

export const findOrders = async ({ skip = 0, limit = 10 } = {}) => {
  return prisma.orders.findMany({
    skip,
    take: limit,
    orderBy: { order_date: "desc" },
    include: {
      users: {
        select: {
          id: true,
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
