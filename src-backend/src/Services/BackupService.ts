import { PrismaClient } from "../../../prisma/prisma_client_js";


export class BackupService {
  public async hi() {

    const prisma = new PrismaClient()
    const allUsers = await prisma.post.findMany()
    console.dir(allUsers, {depth: null})


  }
}
