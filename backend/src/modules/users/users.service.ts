import { prisma } from "../../config/db";

export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    username?: string;
    bio?: string;
    githubUsername?: string;
  }
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
};

export const updateAvatar = async (
  userId: string,
  avatar: string
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      avatar,
    },
  });
};

export const searchUsers = async (
  query: string
) => {
  return prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
    },
    take: 20,
  });
};