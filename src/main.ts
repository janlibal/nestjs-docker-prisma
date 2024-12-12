import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { GlobalModule } from './global/global.module'
import { ConfigService } from '@nestjs/config'
import { AllConfigType } from './config/config/config.type'
import { API_PREFIX } from './shared/constants/global.constants'
import { ValidationPipe } from '@nestjs/common'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'

async function bootstrap() {
  const app = await NestFactory.create(GlobalModule)

  // Validation
  app.useGlobalPipes(new ValidationPipe())

  // enable shutdown hook
  app.enableShutdownHooks()

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const configService = app.get(ConfigService<AllConfigType>)

  app.setGlobalPrefix(API_PREFIX)

  const port = configService.getOrThrow('app.port', { infer: true })
  const nodeEnv = configService.getOrThrow('app.nodeEnv', { infer: true })
  const pkgInfo = configService.getOrThrow('app.name', { infer: true })
  const dbUrl = configService.getOrThrow('app.dbUrl', { infer: true })
  const apiPrefix = configService.getOrThrow('app.apiPrefix', { infer: true })

  app.enableCors()

  await app.listen(port, async () => {
    console.log(`Port: ${port}`)
    console.log(`NodeEnv: ${nodeEnv}`)
    console.log(`pkgInfo: ${pkgInfo}`)
    console.log(`dbUrl: ${dbUrl}`)
    console.log(`apiPrefix: ${apiPrefix}`)
    console.log(`Server started on ${port}`)
  })
}

bootstrap()
