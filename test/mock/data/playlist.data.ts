import { PlaylistDto } from '../../../src/playlist/dto/playlist.dto'

export const generateMockPlaylist = (): PlaylistDto => {
  return {
    title: 'Green Day',
  }
}

const mockPlaylistInputData = generateMockPlaylist()

export { mockPlaylistInputData }