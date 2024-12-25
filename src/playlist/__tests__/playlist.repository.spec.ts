import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { PlaylistRepository } from '../playlist.repository';
import { Playlist as PlaylistDomain } from '../domain/playlist.domain';
import { Playlist as PlaylistEntity } from '@prisma/client'
import { PrismaModule } from '../../database/prisma.module';

describe('CreateUserService', () => {
	let playlistRepository: PlaylistRepository;
	let prismaClient: PrismaService;

    beforeAll(async () => {
	const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
	  providers: [
        PlaylistRepository,
        {
          provide: PlaylistRepository,
          useClass: PrismaService,
        },
      ],
    }).compile();

    playlistRepository = module.get<PlaylistRepository>(PlaylistRepository);
    prismaClient = module.get<PrismaService>(PrismaService);

	

    });

    describe('create', () => {
		it('should be defined', async () => {
			expect(playlistRepository).toBeDefined();
		});

    	/*it('should create user', async () => {
			const createPlaylistData: PlaylistDomain = {
				title: 'BonJovi'
			};
            

			const savedPlaylistObject: PlaylistEntity = {
				id: 'aabbcc',
                title: 'Rafael Pezzetti',
            };
            jest.spyOn(prismaClient.playlist, 'create').mockResolvedValueOnce(savedPlaylistObject);
            expect(await playlistRepository.save(createPlaylistData)).toEqual(savedPlaylistObject);
            expect(prismaClient.playlist.create).toBeCalled();
        });*/
    });
});


/*describe('PLaylistRepository', () => {
	let repository: PlaylistRepository;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PlaylistRepository, PrismaService],
		}).compile();

		repository = module.get<PlaylistRepository>(PlaylistRepository);
		//Get a reference to the module's `PrismaService` and save it for usage in our tests.
		prisma = module.get<PrismaService>(PrismaService);
	});

	it('should get the first job for "steve"', async () => {
		//Use `jest.fn()` to mock the specific Prisma function that is used in the function under test (`getFirstJob()`). This will cause the next call to `prisma.name.findMany()` to return the data we've provided. The actual database won't be accessed.
		prisma.playlist.create = jest.fn().mockReturnValueOnce([
			{ id: '11AANBBCC', title: 'Band Name!!' }
		]);
	});
});

//Typescript definition for `.toHaveBeenCalledWithObjectMatchingHash()`.
declare global {
	namespace jest {
		interface Matchers<R> {
			toHaveBeenCalledWithObjectMatchingHash(expected: string): CustomMatcherResult;
		}
	}
}

//Ah, the terrifyingly-named `.toHaveBeenCalledWithObjectMatchingHash()` custom matcher. This matcher asserts that the `received` function (`prisma.name.findMany` in our example above) is called with an object whose "JSON hash" matches `expected`. "JSON hash" means that we first convert the object to JSON and then take its MD5 hash. Note that since we're not using this hash for anything other than tracking data consistency in a test, MD5 is suitable; there's no need for SHA-1 or some other alternative.
expect.extend({toHaveBeenCalledWithObjectMatchingHash(received, expected) {
	const isSpy = (received: any) =>
		received != null &&
		received.calls != null &&
		typeof received.calls.all === 'function' &&
		typeof received.calls.count === 'function';
	
	const receivedIsSpy = isSpy(received);
	const receivedName = receivedIsSpy ? 'spy' : received.getMockName();

	const calls = receivedIsSpy
		? received.calls.all().map((x: any) => x.args)
		: received.mock.calls;
	
	if(calls.length === 0) {
		return {
			pass: false,
			message: () => `expected the function to be called with an object that hashes to '${expected}'. Instead, the function was not called.`,
		};
	}

	if(calls[0].length === 0) {
		return {
			pass: false,
			message: () => `expected the function to be called with an object that hashes to '${expected}'. Instead, the function was called, but not with any arguments.`,
		};
	}

	const md5Hash = crypto.createHash('md5');
	const receivedHash = md5Hash.update(JSON.stringify(calls[0][0])).digest('hex');
	const pass = receivedHash === expected;
	
	if(pass) {
		return {
			pass: true,
			message: () => `expected the function to not be called with an object that hashes to '${expected}'. Instead, the passed object hashes to the same value.`,
		};
	} else {
		return {
			pass: false,
			message: () => `expected the function to be called with an object that hashes to '${expected}'. Instead, the passed object hashes to '${receivedHash}'.`,
		};
	}
}});*/