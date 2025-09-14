import prisma from '../../../../Config/db.js';

const UserRepository = {
  findById: async (id) => {
    return await prisma.users.findUnique({
      where: { id: BigInt(id) },
      select: { id: true, name: true, phone_number: true, role: true }
    });
  }
};

export default UserRepository;
