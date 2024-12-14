import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  console.log('Seeding...')

  const status = await prisma.status.findFirst()
  if (!status) {
    await prisma.status.createMany({
      data: [
        {
          title: 'active',
        },
        {
          title: 'inactive',
        },
      ],
    })
  }

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      statusId: 1,
    },
  })
  console.log({ user1 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
