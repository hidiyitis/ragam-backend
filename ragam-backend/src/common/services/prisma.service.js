// // prisma.service.js
import { PrismaClient } from "../../../prisma/generated/prisma/index.js"; // Adjust the import path based on your project structure

export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
