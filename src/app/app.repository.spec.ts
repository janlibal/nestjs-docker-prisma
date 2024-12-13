import { Test, TestingModule } from '@nestjs/testing'
import { AppRepository } from './app.repository'
import { PrismaService } from '../database/prisma.service'

describe('AppRepository', () => {
  let repository: AppRepository
  let prismaService: PrismaService

  const mockPrismaService = {
    user: {
      create: jest.fn()
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    repository = module.get<AppRepository>(AppRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('should create a user', async () => {

    const clonedPayload = ({
      password: 'Password123!',
      email: 'john@example.com',
    })

    const returnedUser = {
      id: 'b545cb1e-5c4f-46c3-b42d-b3db8ffa87ce',
      password: 'Password123!',
      email: 'todd.doe@joedoe.com',
    }
    mockPrismaService.user.create.mockResolvedValue(returnedUser)
    const result = await repository.saveAndLogin(clonedPayload)
    expect(result).toEqual(returnedUser)
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({ data: clonedPayload })
  })
})
