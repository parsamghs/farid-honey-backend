import { getAddressById, updateAddressById } from '../../repositories/Addresses/Edit-Addresses.js';

export async function editAddress(addressId, userId, updatedValues) {
  const existing = await getAddressById(addressId, userId);
  if (!existing) {
    throw new Error('آدرس یافت نشد یا اجازه ویرایش ندارید');
  }

  return updateAddressById(addressId, userId, updatedValues);
}
