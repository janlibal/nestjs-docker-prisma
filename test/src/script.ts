import { Prisma } from '@prisma/client'
import prisma from '../../libs/prisma'

export const createPlaylist = async (playlist: Prisma.PlaylistCreateInput) => {
  return await prisma.playlist.create({
    data: playlist,
  })
}

export const getPosts = async () => {
  const published = await prisma.post.findMany({ where: { title: 'one' } })
  const unpublished = await prisma.post.findMany({ where: { title: 'two' } })

  return { published, unpublished }
}

export const getPostByID = async (id: number) => {
  try {
    return await prisma.post.findUniqueOrThrow({ where: { id:id } })
  } catch (e: any) {
    return e.message
  }
}

export const addPost = async (data: Prisma.PostCreateInput) => {
    const [ newPost, count ] = await prisma.$transaction([
      prisma.post.create({ data }),
      prisma.post.count()
    ])
    
    return { newPost, count }
  }

  export const addPost2 = async (data: Prisma.PostCreateInput) => {
    return await prisma.$transaction(async (tx) => {
      if (!('two' in data)) {
        data['two'] = true
      }
  
      const newPost = await tx.post.create({ data })
      const count = await tx.post.count()
  
      return { newPost, count }
    })
  }


  export const updatePlaylist = async (
    id: string, 
    data: Prisma.PlaylistUpdateInput,
    clearPosts: boolean
  ) => {
    const playlist = await prisma.playlist.update({
      where: { id:id },
      data
    })
    if (clearPosts) {
      await prisma.playlist.deleteMany({ where: { id: id }})
    }
  
    return playlist
  }

