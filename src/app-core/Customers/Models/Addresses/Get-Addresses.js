import prisma from '../../../../Config/db.js';

export async function getAddressesByUserId(userId) {
  return prisma.address.findMany({
    where: {
      user_id: userId
    },
    select: {
      id: true,
      province: true,
      city: true,
      address: true,
      plate: true,
      unit: true,
      postal_code: true,
      receiver: true,
      phone_number: true
    },
    orderBy: {
      id: 'desc'
    }
  });
}
