import { PrismaService } from '../../../src/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { prisma } from 'lib/prisma'


@Injectable()
export class MockedDatabaseService {
  private client: PrismaService
  constructor(readonly configService: ConfigService) {
    this.client = prisma
  }

  public get prisma() {
    return this.client
  }
}