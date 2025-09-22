import prisma from "../../../../Config/db.js";

export const findOrderDetails = async ({ orderId, skip = 0, limit = 10 }) => {
  return prisma.orders.findUnique({
    where: { id: BigInt(orderId) },
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
          city: true,
          address: true,
          plate: true,
          unit: true,
          postal_code: true,
          receiver: true,
          phone_number: true,
        },
      },
      orders_item: {
        skip,
        take: limit,
        orderBy: { price: "desc" },
        include: {
          products: {
            select: {
              id: true,
              name: true,
              category: true,
              image_url: true,
            },
          },
        },
      },
    },
  });
};
