import { getCartItemById, deleteCartItem } from '../../repositories/Carts/Delete-Cart-Item.js';

export async function removeFromCartService(itemId, userId) {
  const item = await getCartItemById(itemId, userId);
  if (!item) {
    throw new Error('محصولی در سبد خرید شما یافت نشد');
  }

  await deleteCartItem(itemId);
}
