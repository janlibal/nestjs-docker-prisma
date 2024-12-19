import { beforeAll, beforeEach, afterAll } from 'vitest'
import { prisma } from './lib/prisma'
import resetDb from './lib/reset.db'


beforeAll(() => {})

beforeEach(async () => {
  await resetDb()
})

afterAll(async () => {
  await resetDb()
  await prisma.$disconnect()
})