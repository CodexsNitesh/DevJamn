import { error } from "node:console";
import { prisma } from "../../config/db";

export const createWorkspace = async (
  userId: string,
  name: string,
  description?: string
) => {
  const workspace = await prisma.workspace.create({
    data: {
      name,
      description,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId,
      workspaceId: workspace.id,
      role: "OWNER",
    },
  });

  return workspace;
};

export const getMyWorkspace = async(
    userId: string
)=> {
    return prisma.workspaceMember.findMany({
        where:{
            userId,
        },
        include:{
            workspace: true,
        },
    });
};


export const getWorkspaceById = async (
  userId: string,
  workspaceId: string
) => {
  const membership =
    await prisma.workspaceMember.findFirst({
      where: {
        userId,
        workspaceId,
      },
    });

  if (!membership) {
    throw new Error("You are not a member of this workspace");
  }

  const workspace =
    await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return workspace;
};