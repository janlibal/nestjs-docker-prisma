import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../src/database/prisma.service';
import { PlaylistController } from '../../src/playlist/playlist.controller';
import { PlaylistService } from '../../src/playlist/playlist.service';
import { describe, afterEach, afterAll, beforeAll, beforeEach, it, expect } from 'vitest'


describe('User (integration)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [PlaylistController],
      providers: [PlaylistService, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await prismaClient.user.deleteMany();  // Clear the database before each test
  });

  afterEach(async () => {
    await prismaClient.$disconnect();
  });

  it('should create and retrieve users', async () => {
    const newPlaylist = { title: 'Summer tunes' };

    // Test creating a user via the controller
    const response = await request(app.getHttpServer())
      .post('api/v1/playlist')
      .send(newPlaylist)
      .expect(201);

    expect(response.body.id).toEqual('string');
    expect(response.body.title).toEqual(newPlaylist.title);

    // Test retrieving the user from the database
    //const users = await prismaClient.user.findMany();
    //expect(users).toHaveLength(1);
    //expect(users[0].email).toEqual(newUser.email);
  });

  afterAll(async () => {
    await app.close();
  });
});
