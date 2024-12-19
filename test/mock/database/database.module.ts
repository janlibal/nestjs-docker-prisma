import { PrismaService } from '../../../src/database/prisma.service'
import { Global, Module } from '@nestjs/common'
import { MockedDatabaseService } from './database.service'

const mockDatabaseService = {
  provide: PrismaService,
  useClass: MockedDatabaseService,
}
@Module({
  providers: [mockDatabaseService],
  exports: [mockDatabaseService],
})
@Global()
export class MockedDatabaseModule {}