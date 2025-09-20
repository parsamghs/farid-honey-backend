import {
  getCartItemByUser,
  updateCartItemQuantityRepo,
  deleteCartItemById
} from '../../Models/Carts/Update-Quantity.js';

export async function updateCartItemQuantityService(itemId, userId, action, quantity) {
  const item = await getCartItemByUser(itemId, userId);
  if (!item) {
    throw new Error('محصولی در سبد خرید شما یافت نشد');
  }

  const currentQuantity = parseInt(item.quantity);

  const actionMap = {
    increment: currentQuantity + 1,
    decrement: currentQuantity - 1
  };

  let newQuantity = action ? actionMap[action] : Number(quantity);

  if (newQuantity === undefined || isNaN(newQuantity)) {
    throw new Error('باید یا action یا quantity معتبر ارسال شود');
  }

  if (newQuantity <= 0) {
    await deleteCartItemById(itemId);
    return { deleted: true, newQuantity: 0 };
  }

  const unitPrice = parseInt(item.unit_price);
  const newPrice = (unitPrice * newQuantity).toString(); 

  await updateCartItemQuantityRepo(itemId, newQuantity, newPrice);

  return { deleted: false, newQuantity };
}
