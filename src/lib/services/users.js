import prisma from '../prisma';

export const getUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            userId: true,
            username: true,
            name: true,
        }
    });

  return users;
};

export const createUser = async (name, username, password) => {  
    const user = await prisma.user.create({
        data: { name, username, password },
    });
    return user;
};