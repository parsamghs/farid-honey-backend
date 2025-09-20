import prisma from '../../../Config/db.js';

const UserRepository = {
  findByPhone: async (phone_number) => {
    return prisma.users.findUnique({ where: { phone_number } });
  }
};

export default UserRepository;