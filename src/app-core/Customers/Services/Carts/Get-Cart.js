import { getCartByUserId, getCartItems } from '../../Models/Carts/Get-Cart.js';
import { formatNumber, formatNumbersintext } from '../../../../Helpers/Number-formatter.js';

export async function getCartService(userId) {
  const cart = await getCartByUserId(userId);
  if (!cart) {
    return { cart_id: null, products: [], total_price: "۰" };
  }

  const cartItems = await getCartItems(cart.id);
  
   cartItems.sort((a, b) => Number(a.id) - Number(b.id));

  const products = cartItems.map(item => ({
    id: item.id.toString(),
    name: formatNumbersintext(item.products.name),
    price: formatNumber(item.price, true),
    quantity: formatNumber(item.quantity, false).toString(),
    size: item.size || null,
    image_url: item.products.image_url || null
  }));

  const totalPriceNumber = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const total_price = formatNumber(totalPriceNumber, true);

  return {
    cart_id: cart.id.toString(),
    products,
    total_price
  };
}
