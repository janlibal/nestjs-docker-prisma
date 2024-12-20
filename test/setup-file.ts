import { prisma } from './lib/prisma'
import resetDb from './lib/resetdb'

beforeAll(() => {})

beforeEach(async () => {
  await resetDb()
})

afterAll(async () => {
  await resetDb()
  await prisma.$disconnect()
})
