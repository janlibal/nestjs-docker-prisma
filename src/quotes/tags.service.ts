import { Injectable } from '@nestjs/common'
//import prisma from 'lib/prisma'
import randomColor from 'randomcolor'
import { PrismaService } from '../database/prisma.service'
import { TagRepository } from './tag.repository'

@Injectable()
export class TagService {
  constructor(
    private prisma: PrismaService,
    private tagRepository: TagRepository,
  ) {}

  async upsertTags(tags: string[]) {
    const existingTags = await this.tagRepository.getExistingTags(tags)

    const existingNames = existingTags.map((tag) => tag.name)
    const existingIDs = existingTags.map((tag) => tag.id)

    const createdCount = await this.tagRepository.getCreatedCount(
      tags,
      existingNames,
    )

    const tagIds = existingTags.map((tag) => tag.id)

    if (createdCount.count) {
      const createdTags = await this.tagRepository.getCreatedTags(
        tags,
        existingIDs,
      )
      const createdIds = createdTags.map((tag) => tag.id)
      tagIds.push(...createdIds)
    }
    return tagIds
  }
}
