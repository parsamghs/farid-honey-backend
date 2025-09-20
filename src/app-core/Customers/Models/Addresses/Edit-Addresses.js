import prisma from '../../../../Config/db.js';

export async function getAddressById(addressId, userId) {
  return prisma.address.findFirst({
    where: {
      id: addressId,
      user_id: userId
    }
  });
}

export async function updateAddressById(addressId, userId, updatedValues) {
  const address = await prisma.address.findFirst({
    where: { id: addressId, user_id: userId }
  });
  if (!address) return null;

  const dataToUpdate = {};
  if (updatedValues.province !== undefined) dataToUpdate.province = updatedValues.province;
  if (updatedValues.city !== undefined) dataToUpdate.city = updatedValues.city;
  if (updatedValues.address !== undefined) dataToUpdate.address = updatedValues.address;
  if (updatedValues.plate !== undefined) dataToUpdate.plate = updatedValues.plate;
  if (updatedValues.unit !== undefined) dataToUpdate.unit = updatedValues.unit;
  if (updatedValues.Postal_code !== undefined) dataToUpdate.Postal_code = updatedValues.Postal_code;
  if (updatedValues.receiver !== undefined) dataToUpdate.receiver = updatedValues.receiver;

  const updated = await prisma.address.update({
    where: { id: addressId },
    data: dataToUpdate
  });

  return updated;
}

