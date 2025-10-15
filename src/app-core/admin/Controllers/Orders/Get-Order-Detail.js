import { getOrderDetails } from "../../Services/Orders/Get-Order-Detail.js";

export const orderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const details = await getOrderDetails({ orderId, page, limit });

    if (!details) {
      return res.status(404).json({ message: "سفارشی با این شناسه پیدا نشد" });
    }

    res.status(200).json(details);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در دریافت جزئیات سفارش" });
  }
};
