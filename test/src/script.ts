import { Prisma } from '@prisma/client'
import prisma from '../../libs/prisma'

export const createPlaylist = async (playlist: Prisma.PlaylistCreateInput) => {
  return await prisma.playlist.create({
    data: playlist,
  })
}
