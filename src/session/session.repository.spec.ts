import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../database/prisma.service'
import { SessionRepository } from './session.repository'
import { Session } from './domain/session.domain'

describe('SessionRepository', () => {
  let repository: SessionRepository
  let prismaService: PrismaService

  const mockPrismaService = {
    session: {
      findFirst: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    repository = module.get<SessionRepository>(SessionRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('should create a user', async () => {
    const inputData: Omit<Session, 'expiresAt' | 'createdAt' | 'hash' | 'userId'> = { id: 21 }

    const outputData = {
        id: 21,
        hash: 'HASH!!!!!',
        expiresAt: null,
        createdAt: '2024-12-10T16:14:57.213Z',
        userId: '19127268-b6d9-439b-8450-94859c73e9af',
        user: {
            id: '19127268-b6d9-439b-8450-94859c73e9af',
            password: 'Password123!',
            email: 'joe.doe@joedoe.com'
        }
    }
    
    mockPrismaService.session.findFirst.mockResolvedValue(outputData)
    const result = await repository.findById(inputData)
    expect(result).toEqual(expect.objectContaining(outputData))
    expect(mockPrismaService.session.findFirst).toHaveBeenCalledWith({ include: { user: true }, where: { id: outputData.id }, })
  })
})

