import { Test, TestingModule } from '@nestjs/testing'
import { User as UserEntity } from '@prisma/client'
import { User as UserDomain } from '../domain/user.domain'
import { PrismaService } from '../../database/prisma.service'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { AppRepository } from '../app.repository'

// Mock Prisma Service
const mockPrismaService = {
  user: {
    create: vi.fn(),
  },
}

describe('AppRepository', () => {
  let appRepository: AppRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile()

    appRepository = module.get<AppRepository>(AppRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(appRepository).toBeDefined()
  })

  describe('createUser', () => {
    it('should create a user and spy on Prisma call', async () => {
      const mockUser: UserEntity = {
        id: '1',
        password: 'pwd123456!!',
        email: 'jane@example.com',
        statusId: 1,
      }
      const createUserDto = {
        password: 'pwd123456!!',
        email: 'jane@example.com',
        status: { id: 1 },
      }
      const usr = {
        password: 'pwd123456!!',
        email: 'jane@example.com',
        statusId: 1,
      }
      mockPrismaService.user.create.mockResolvedValue(mockUser)

      const result = await appRepository.simpleSave(createUserDto)

      expect(result).toEqual(mockUser)
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({ data: usr })
      expect(mockPrismaService.user.create).toHaveBeenCalledTimes(1)
    })
  })
})
