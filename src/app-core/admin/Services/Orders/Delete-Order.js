import { deleteOrderById } from "../../Models/Orders/Delete-Order.js";

export const removeOrder = async (orderId) => {
  try {
    const deletedOrder = await deleteOrderById(orderId);
    return deletedOrder;
  } catch (error) {
    throw error;
  }
};
