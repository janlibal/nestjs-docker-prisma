import { prisma } from './prisma'

// eslint-disable-next-line import/no-default-export
export default async () => {
  await prisma.$transaction([
    prisma.playlist.deleteMany(),
  ])
}