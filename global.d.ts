import { PrismaClient } from '@prisma/client';
declare global {
  namespace glabalThis {
    var prismadb: PrismaClient;
  }
}
