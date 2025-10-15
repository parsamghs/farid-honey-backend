import {
  getProductPrice,
  getCartByUser,
  createCart,
  getCartItem,
  addCartItem,
} from '../../Models/Carts/Add-Cart.js';

export async function addToCartService(userId, productId, size, quantity) {
  const normalizedProductId = Number(productId);

  if (isNaN(normalizedProductId)) {
    throw new Error('شناسه محصول معتبر نیست');
  }

  const product = await getProductPrice(normalizedProductId, size);
  if (!product) {
    throw new Error('محصول با سایز انتخاب شده یافت نشد');
  }
  const productPrice = Number(product.price);

  let cart = await getCartByUser(userId);
  if (!cart) {
    cart = await createCart(userId);
  }

  let item = await getCartItem(cart.id, normalizedProductId, size);
  if (item) {
    throw new Error('این محصول با این سایز در سبد خرید شما موجود هست');
  }

  await addCartItem(
    cart.id,
    normalizedProductId,
    size,
    quantity,
    (productPrice * quantity).toString(),
    productPrice.toString()
  );
}