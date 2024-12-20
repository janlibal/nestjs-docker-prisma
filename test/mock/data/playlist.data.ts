import { PlaylistDto } from "../../../src/playlist/dto/playlist.dto"

export const generateMockPlaylist = (): PlaylistDto => {
  return {
    title: "Band name!"
  }
}

const mockPlaylistInputData1 = generateMockPlaylist()

export { mockPlaylistInputData1 }