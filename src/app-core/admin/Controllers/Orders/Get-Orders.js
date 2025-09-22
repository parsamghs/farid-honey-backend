import { getOrders } from "../../Services/Orders/Get-Orders.js";

export const listOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const stringifyBigInt = (obj) =>
      JSON.parse(JSON.stringify(obj, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));

    const orders = await getOrders({ page, limit });

    res.status(200).json(stringifyBigInt(orders));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در دریافت سفارش‌ها" });
  }
};
