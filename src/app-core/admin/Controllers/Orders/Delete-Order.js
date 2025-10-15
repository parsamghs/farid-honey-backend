import { removeOrder } from "../../Services/Orders/Delete-Order.js";

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deleted = await removeOrder(orderId);

    if (!deleted) {
      return res.status(404).json({ message: "سفارش پیدا نشد" });
    }

    return res.json({
      message: "سفارش با موفقیت حذف شد",
      deletedOrderId: orderId,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "خطا در حذف سفارش" });
  }
};
