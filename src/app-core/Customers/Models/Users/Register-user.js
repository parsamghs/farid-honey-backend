import prisma from '../../../../Config/db.js';

const UserRepository = {
  findByPhone: async (phone_number) => {
    return await prisma.users.findFirst({
      where: { phone_number }
    });
  },

  create: async ({ name, phone_number, password, role, gmail, born_date }) => {
    return await prisma.users.create({
      data: {
        name,
        phone_number,
        password,
        role,
        gmail,
        born_date
      },
      select: {
        id: true,
        name: true,
        phone_number: true,
        role: true,
        gmail: true,
        born_date: true
      }
    });
  }
};

export default UserRepository;
