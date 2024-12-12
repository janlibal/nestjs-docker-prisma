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
    const createUserDto: AuthEmailLoginDto = {
      password: 'pwd123!',
      email: 'john@example.com',
    }
    const userObject: User = { id: '1', ...createUserDto }
    mockAppService.validateLogin.mockReturnValue(userObject)
    const result = await controller.login(createUserDto)
    expect(mockAppService.validateLogin).toHaveBeenCalledWith(createUserDto)
    expect(result).toEqual(userObject)
  })
})
