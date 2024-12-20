import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppRepository } from '../../../src/app/app.repository';
import { PrismaService } from '../../../src/database/prisma.service';

// Mock PrismaService
const mockPrismaService = {
  user: {
    create: vi.fn(),
  },
};

const prismaService = new PrismaService();

describe('UserRepository', () => {
  let userRepository: AppRepository;
  let appRepository = new AppRepository(prismaService);

  beforeEach(() => {
    // Initialize repository with mocked Prisma service
    userRepository = new AppRepository(mockPrismaService as unknown as PrismaService);
  });

  /*it('should create a user', async () => {
    
    const mockUserData = { email: 'band@email.com', password: 'Password123!!!', status: { id: 1 } }
    const mockUser = { id: '52e34616-79b2-4e7b-8444-0c3edcc760fd', ...mockUserData };

    // Mock the Prisma service method
    mockPrismaService.user.create.mockResolvedValue(mockUser);

    // Call the method
    const result = await userRepository.saveAndLogin(mockUserData);

    expect(result).toEqual(mockUser);
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({ data: mockUserData });
  });*/

  it('should create a user', async () => {
    const mockUserData = { email: 'band@email.com', password: 'Password123!!!', status: { id: 1 } }
    const mockUser = { id: '52e34616-79b2-4e7b-8444-0c3edcc760fd', email: mockUserData.email, password: mockUserData.password, statusId: mockUserData.status.id };

    // Spy on the prisma.user.create method
    const createSpy = vi.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

    // Call the method
    const result = await appRepository.saveAndLogin(mockUserData);

    // Assertions
    expect(result).toEqual(mockUser);
    expect(createSpy).toHaveBeenCalledWith({ data: mockUserData });
    expect(createSpy).toHaveBeenCalledTimes(1); // Ensure it was called once
  });
});
