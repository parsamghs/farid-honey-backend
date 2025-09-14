import prisma from '../../../../Config/db.js';

export async function removeAddress(addressId, userId) {
  return prisma.address.deleteMany({
    where: {
      id: addressId,
      user_id: userId
    }
  });
}