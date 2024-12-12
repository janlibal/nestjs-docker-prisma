import { Test, TestingModule } from '@nestjs/testing'

import { SessionService } from '../session/session.service'
import { SessionRepository } from '../session/session.repository'
import { Session } from './domain/session.domain'

describe('SessionService', () => {
  let service: SessionService
  let sessionRepository: SessionRepository

  const mockSessionRepository = {
    findById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: SessionRepository,
          useValue: mockSessionRepository,
        },
      ],
    }).compile()

    service = module.get<SessionService>(SessionService)
    sessionRepository = module.get<SessionRepository>(SessionRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should get session data', async () => {
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

    mockSessionRepository.findById.mockResolvedValue(outputData)
    const result = await service.retrieve(inputData)
    expect(result).toEqual(expect.objectContaining(outputData))
    expect(mockSessionRepository.findById).toHaveBeenCalledWith(inputData)
  })


  
})
