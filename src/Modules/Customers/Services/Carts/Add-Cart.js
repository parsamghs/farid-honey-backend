import {
  getProductPrice,
  getCartByUser,
  createCart,
  getCartItem,
  addCartItem,
  updateCartItem
} from '../../Models/Carts/Add-Cart.js';

export async function addToCartService(userId, productId, size) {
  const product = await getProductPrice(productId, size);
  if (!product) {
    throw new Error('محصول با سایز انتخاب شده یافت نشد');
  }
  const productPriceStr = product.price.toString();

  let cart = await getCartByUser(userId);
  if (!cart) {
    cart = await createCart(userId);
  }

  let item = await getCartItem(cart.id, productId, size);
  if (!item) {
    await addCartItem(cart.id, productId, size, 1, productPriceStr, productPriceStr);
  } else {
    const newQuantity = parseInt(item.quantity) + 1;
    const unitPrice = parseInt(item.unit_price);
    await updateCartItem(item.id, newQuantity, unitPrice * newQuantity);
  }
}
