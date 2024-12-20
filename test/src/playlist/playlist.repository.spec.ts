
import { prisma } from '../../lib/prisma'
import { PlaylistRepository } from '../../../src/playlist/playlist.repository'
import { createRepositoryUnitTestApp } from '../../helpers/create.repository.unit'
import { mockPlaylistInputData1 } from '../../mock/data/playlist.data'


describe('/modules/user/user.service', () => {
  const proxy = createRepositoryUnitTestApp(PlaylistRepository)

  it('should register user successfully', async () => {
    const playlistModel = mockPlaylistInputData1
    await proxy.repository.save(playlistModel)

    const record = await prisma.playlist.findUnique({
      where: {
        id: '111',
        title: playlistModel.title,
      },
    })

    expect(record).toBeDefined()
    expect(record.title).toBe(playlistModel.title)
  })
})