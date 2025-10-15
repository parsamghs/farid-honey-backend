import prisma from '../../../../Config/db.js';

export async function insertAddress({
  user_id,
  province,
  city,
  address,
  plate,
  unit,
  postal_code,
  receiver,
  phone_number
}) {
  return prisma.address.create({
    data: {
      user_id,
      province,
      city,
      address,
      plate,
      unit,
      postal_code: postal_code || null,
      receiver,
      phone_number
    }
  });
}
