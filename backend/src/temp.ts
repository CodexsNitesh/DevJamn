import { prisma } from "./config/db";

async function test() {
  await prisma.user.findMany();

  await prisma.workspace.findMany();

  await prisma.channel.findMany();

  await prisma.oTP.findMany();
}