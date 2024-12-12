import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './user.service'
import { UserRepository } from './user.repository'
import { AuthEmailLoginDto } from 'src/app/dto/auth.email.login.dto'

describe('UsersService', () => {
  let service: UsersService

  const mockUserRepository = {
    save: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    }).compile()

    service = moduleRef.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create new user', () => {
    const createUserDto = {
      email: 'chadwickboseman@email.com',
      password: 'pwd123!',
    }
    expect(service.create(createUserDto)).toMatchObject(createUserDto)
  })

  /*it('create => Should create a new user and return its data', async () => {
    // arrange
    const createUserDto = {
      email: 'chadwickboseman@email.com',
      password: 'pwd123!'
    }

    const user = {
      email: 'chadwickboseman@email.com',
      password: 'pwd123!'
    } 

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    // act
    const result = service.create(createUserDto);

    // assert
    expect(mockUserRepository.save).toBeCalled();
    expect(mockUserRepository.save).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });*/
})
