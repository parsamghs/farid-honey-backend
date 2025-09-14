import { removeAddress } from '../../Models/Addresses/Delete-Addresses.js';

export async function deleteAddressByUser(addressId, userId) {
  const result = await removeAddress(addressId, userId);

  if (result.count === 0) {
    throw new Error('آدرس یافت نشد یا اجازه حذف ندارید');
  }

  return result;
}
