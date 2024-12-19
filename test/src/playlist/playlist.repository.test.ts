import { PlaylistRepository } from '../../../src/playlist/playlist.repository'
import { createRepositoryUnitTestApp } from 'helper/create.repository.unit'
import { prisma } from 'lib/prisma'
import { mockPlaylistInputData } from 'mock/data/playlist.data'
import { describe, it, expect, vi } from 'vitest'

describe('/playlist/playlist.repository', () => {
  const proxy = createRepositoryUnitTestApp(PlaylistRepository, {
    //providers: [authProvider],
  })

  it('should save new record', async () => {
    const playlistModel = mockPlaylistInputData
    const record = await proxy.repository.save(playlistModel)

    expect(record).toBeDefined()
    expect(record.title).toBe(playlistModel.title)
  })
})