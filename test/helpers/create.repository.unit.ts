import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { MockedDatabaseModule } from '../mock/database/database.module'


type ClassType<T> = new (...args: any[]) => T
export const createRepositoryUnitTestApp = <T>(Repository: ClassType<T>,module?: ModuleMetadata,) => {
  const proxy = {} as {
    repository: T
    app: TestingModule
  }

  beforeAll(async () => {
    const { imports, providers } = module || {}
    const app = await Test.createTestingModule({
      providers: [
        Repository,
        ...(providers || []),
      ],
      imports: [
        MockedDatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env'],
        }),
        ...(imports || []),
      ],
    }).compile()
    await app.init()

    const repository = app.get<T>(Repository)
    proxy.repository = repository
    proxy.app = app
  })
  return proxy
}