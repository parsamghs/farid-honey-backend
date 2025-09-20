import { getAddressById, updateAddressById } from '../../Models/Addresses/Edit-Addresses.js';

export async function editAddress(addressId, userId, updatedValues) {
  const existing = await getAddressById(addressId, userId);
  if (!existing) {
    throw new Error('آدرس یافت نشد یا اجازه ویرایش ندارید');
  }

  return updateAddressById(addressId, userId, updatedValues);
}
