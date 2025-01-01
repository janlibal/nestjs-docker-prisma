import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { PinoLoggerService } from '../../logger/adapters/pino.logger.service'
import { LoggerModule } from '../../logger/logger.module'
import { TagService } from '../tags.service'
import { TagsRepository } from '../tags.repository'



// Mock Prisma Service
const mockTagRepository = {
    getExistingTags: vi.fn(),
    getCreatedCount: vi.fn(),
    getCreatedTags: vi.fn()
}

describe('TagsService', () => {
  let tagService: TagService
  let tagtRepository: TagsRepository
  let logger: PinoLoggerService

  beforeEach(async () => {    
    const module: TestingModule = await Test.createTestingModule({
        imports: [LoggerModule],
      providers: [
        TagService,
        { 
            provide: TagsRepository, 
            useValue: mockTagRepository 
        },
        PinoLoggerService
      ],
    }).compile()

    tagService = module.get<TagService>(TagService)
    tagtRepository = module.get<TagsRepository>(TagsRepository)
    logger = module.get<PinoLoggerService>(PinoLoggerService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(tagService).toBeDefined()
  })

  describe('upsertTags', () => {
    it('should return an empty array if no tags passed', async () => {
        mockTagRepository.getExistingTags.mockImplementationOnce(callback => callback(mockTagRepository))
      
        // Ensure that all `findMany` and `createMany` invocations return empty results
        mockTagRepository.getExistingTags.mockResolvedValueOnce([])
        mockTagRepository.getCreatedCount.mockResolvedValueOnce({ count: 0 })
        mockTagRepository.getCreatedTags.mockResolvedValueOnce([])
        // Invoke `upsertTags` with no tag names
        const result = await tagService.upsertTags([])
        // Ensure an empty array is returned
        expect(tagService.upsertTags([])).toHaveReturnedWith([])
      })
  })

})
