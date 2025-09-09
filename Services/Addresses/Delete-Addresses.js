import { removeAddress } from '../../repositories/Addresses/Delete-Addresses.js';

export async function deleteAddressByUser(addressId, userId) {
  const deletedRows = await removeAddress(addressId, userId);

  if (deletedRows.length === 0) {
    throw new Error('آدرس یافت نشد یا اجازه حذف ندارید');
  }

  return deletedRows[0];
}
