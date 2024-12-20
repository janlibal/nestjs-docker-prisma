import { PrismaClient } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { prisma } from '../../lib/prisma'

@Injectable()
export class MockedDatabaseService {
  private client: PrismaClient
  constructor(readonly configService: ConfigService) {
    this.client = prisma
  }

  public get prisma() {
    return this.client
  }
}