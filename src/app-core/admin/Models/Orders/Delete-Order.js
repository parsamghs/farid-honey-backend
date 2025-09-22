import prisma from "../../../..//Config/db.js";

export const deleteOrderById = async (orderId) => {
  try {
    return await prisma.orders.delete({
      where: { id: BigInt(orderId) },
    });
  } catch (error) {
    throw error;
  }
};
