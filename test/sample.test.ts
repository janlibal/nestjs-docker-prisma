import { expect, test, vi } from 'vitest'
import { createPlaylist } from './src/script'
import prisma from '../libs/__mocks__/prisma'

vi.mock('../libs/prisma')

test('createUser should return the generated user', async () => {
  const newPlaylist = { title: 'Bon Jovi' }
  prisma.playlist.create.mockResolvedValue({ ...newPlaylist, id: '1' })
  const playlist = await createPlaylist(newPlaylist)
  expect(playlist).toStrictEqual({ ...newPlaylist, id: '1' })
})
