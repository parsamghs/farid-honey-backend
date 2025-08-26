import pool from '../../Config/db.js';

async function submitOrder(req, res) {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });
  }

  const cart_id = req.params.cart_id;
  const { address_id } = req.body;

  if (!cart_id || !address_id) {
    return res.status(400).json({ message: 'cart_id در URL و address_id در بادی الزامی هستند' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const cartItemsResult = await client.query(
      'SELECT * FROM cart_items WHERE cart_id = $1',
      [cart_id]
    );

    if (cartItemsResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'سبد خرید خالی است' });
    }

    const addressResult = await client.query(
      'SELECT * FROM address WHERE id = $1 AND user_id = $2',
      [address_id, user_id]
    );

    if (addressResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'آدرس یافت نشد' });
    }

    const address = addressResult.rows[0];

    const submitAddressResult = await client.query(
      `INSERT INTO submit_address 
       (province, city, address, plate, unit, postal_code, receiver, phone_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id`,
      [
        address.province,
        address.city,
        address.address,
        address.plate,
        address.unit,
        address.postal_code,
        address.receiver,
        address.phone_number,
      ]
    );

    const submit_address_id = submitAddressResult.rows[0].id;

    let totalPrice = 0;
    cartItemsResult.rows.forEach(item => {
      totalPrice += parseInt(item.price);
    });

    const orderResult = await client.query(
      `INSERT INTO orders (total_price, user_id, address_id) 
       VALUES ($1, $2, $3) 
       RETURNING id`,
      [totalPrice.toString(), user_id, submit_address_id]
    );

    const order_id = orderResult.rows[0].id;

    for (const item of cartItemsResult.rows) {
      await client.query(
        `INSERT INTO orders_item (order_id, product_id, quantity, price, size)
     VALUES ($1,$2,$3,$4,$5)`,
        [order_id, item.product_id, item.quantity.toString(), item.price.toString(), item.size]
      );
    }

    await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cart_id]);

    await client.query('COMMIT');

    res.status(200).json({
      message: 'سفارش با موفقیت ثبت شد',
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'خطا در ثبت سفارش' });
  } finally {
    client.release();
  }
}

export default submitOrder;
