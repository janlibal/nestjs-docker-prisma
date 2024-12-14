import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { User } from './domain/user.domain'
import { create } from 'domain'

describe('AppController', () => {
  let controller: AppController
  let appService: AppService

  const mockAppService = {
    validateLogin: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile()

    controller = module.get<AppController>(AppController)
    appService = module.get<AppService>(AppService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a user', async () => {
    const createUserDto = {
      email: 'todd.doe@joedoe.com',
      password: 'Password123!',
    }

    const returnedUser = {
      id: 'b545cb1e-5c4f-46c3-b42d-b3db8ffa87ce',
      email: 'todd.doe@joedoe.com',
      password: 'Password123!',
      statusId: 1,
    }

    mockAppService.validateLogin.mockReturnValue(returnedUser)
    const result = await controller.login(createUserDto)
    expect(result).toEqual(returnedUser)
    expect(mockAppService.validateLogin).toHaveBeenCalled()
  })
})
