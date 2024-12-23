import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'

export const createTestingModule = async (imports: any[], providers: any[]) => {
  return Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.test',
      }),
      ...imports,
    ],
    providers: [...providers],
  }).compile()
}
