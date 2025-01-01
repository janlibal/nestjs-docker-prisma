import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import randomColor from 'randomcolor'

@Injectable()
export class TagsRepository {
  constructor(private prisma: PrismaService) {}

  async getExistingTags(tags: string[]) {
    return await this.prisma.tag.findMany({
      select: { id: true, name: true },
      where: { name: { in: tags } },
    })
  }

  async getCreatedCount(tags: string[], existingNames: string[]) {
    return await this.prisma.tag.createMany({
      data: tags
        .filter((tag) => !existingNames.includes(tag))
        .map((tag) => ({
          name: tag,
          color: randomColor({ luminosity: 'light' }),
        })),
    })
  }

  async getCreatedTags(tags: string[], existingIDs) {
    return await this.prisma.tag.findMany({
      select: { id: true },
      where: {
        name: { in: tags },
        id: { notIn: existingIDs },
      },
    })
  }
}
