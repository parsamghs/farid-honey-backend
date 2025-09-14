import prisma from '../../../../Config/db.js';

const UserRepository = {
  findById: async (id) => {
    return await prisma.users.findUnique({
      where: { id: BigInt(id) },
    });
  },

  findByPhoneExcludingUser: async (phone_number, id) => {
    return await prisma.users.findFirst({
      where: {
        phone_number,
        NOT: { id: BigInt(id) }
      },
      select: { id: true }
    });
  },

  updateUser: async (fieldsObject, id) => {
    return await prisma.users.update({
      where: { id: BigInt(id) },
      data: fieldsObject,
      select: { id: true, name: true, phone_number: true, role: true }
    });
  }
};

export default UserRepository;
