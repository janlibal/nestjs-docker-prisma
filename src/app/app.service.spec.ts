import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { AppService } from './app.service'
import { AppRepository } from './app.repository'
import { SessionService } from '../session/session.service'
import { SessionRepository } from '../session/session.repository'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'

describe('AppService', () => {
  let service: AppService
  let appRepository: AppRepository

  const mockAppRepository = {
    saveAndLogin: jest.fn(),
  }

  const mockSessionRepository = {
    create: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        { provide: SessionRepository, useValue: mockSessionRepository },
        AppService,
        {
          provide: AppRepository,
          useValue: mockAppRepository,
        },
      ],
    }).compile()

    service = module.get<AppService>(AppService)
    appRepository = module.get<AppRepository>(AppRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  /*it('should create a user || SERVICE', async () => {
  
    const createUserDto = {
      email: 'todd.doe@joedoe.com',
      password: 'Password123!',
    }
    
    const returnedUser = {
      id: 'b545cb1e-5c4f-46c3-b42d-b3db8ffa87ce',
      email: 'todd.doe@joedoe.com',
      password: 'Password123!',
      statusId: 1
    }
    
    mockAppRepository.saveAndLogin.mockResolvedValue(returnedUser)
    const result = await service.validateLogin(createUserDto)
    expect(result).toEqual(returnedUser)
    expect(mockAppRepository.saveAndLogin).toHaveBeenCalledWith(createUserDto)  
  })*/
})
