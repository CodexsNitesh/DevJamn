import { prisma } from "../config/db";

async function main() {
  // Create User
  const user = await prisma.user.create({
    data: {
      name: "Nitesh",
      email: "test@test.com",
      password: "123456",
    },
  });

  // Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: "Dev Hub",
      description: "Main Team Workspace",
    },
  });

  // Add user as workspace owner
  const membership = await prisma.workspaceMember.create({
    data: {
      userId: user.id,
      workspaceId: workspace.id,
      role: "OWNER",
    },
  });

  console.log({ user, workspace, membership });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });