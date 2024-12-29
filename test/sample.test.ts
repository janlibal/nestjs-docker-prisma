import { expect, test, vi } from 'vitest'
import { addPost, addPost2, createPlaylist, getPostByID, getPosts, updatePlaylist } from './src/script'
import prisma from '../libs/__mocks__/prisma'

vi.mock('../libs/prisma')

test('createUser should return the generated user', async () => {
  const newPlaylist = { title: 'Bon Jovi' }
  prisma.playlist.create.mockResolvedValue({ ...newPlaylist, id: '1' }) as any
  const playlist = await createPlaylist(newPlaylist)
  expect(playlist).toStrictEqual({ ...newPlaylist, id: '1' })
})

test('getPosts should return an object with published & un-published posts separated', async () => {
  const mockPublishedPost = {
    id: 1,
    title: 'one',
  }
  prisma.post.findMany.mockResolvedValue([mockPublishedPost])

  const posts = await getPosts()
  expect(posts).toStrictEqual({
    published: [mockPublishedPost],
    unpublished: [mockPublishedPost],
  })
})

test('getPosts should return an object with published & un-published posts separated', async () => {
  const mockPublishedPost = { id: 1, title: 'one' }

  prisma.post.findMany
    .mockResolvedValueOnce([mockPublishedPost])
    .mockResolvedValueOnce([{ ...mockPublishedPost, title: 'one' }])

  const posts = await getPosts()
  expect(posts).toStrictEqual({
    published: [mockPublishedPost],
    unpublished: [{ ...mockPublishedPost, title: 'one' }],
  })
})

test('getPostByID should throw an error when no ID found', async () => {
  prisma.post.findUniqueOrThrow.mockImplementation(() => {
    throw new Error('There was an error.')
  })

  const response = await getPostByID(200)

  expect(response).toBe('There was an error.')
})

test('addPost should return an object containing the new post and the total count', async () => {
    // 1
    const mockPost = {
      title: 'title',
    }
  
    // 2
    const mockResponse = [ {...mockPost, id: 1 }, 100 ]
    prisma.$transaction.mockResolvedValue(mockResponse)
  
    // 3
    const data = await addPost(mockPost)
  
    // 4
    expect(data).toStrictEqual({
      newPost: mockResponse[0],
      count: mockResponse[1]
    })
  })


  test('addPost should return an object containing the new post and the total count', async () => {
    // 1
    const mockPost = {
      title: 'two',
    }
    const mockResponse = {
      newPost: { ...mockPost, id: 1,  },
      count: 100
    }
  
    // 2
    prisma.post.create.mockResolvedValue(mockResponse.newPost)
    prisma.post.count.mockResolvedValue(mockResponse.count)
  
    // 3
    prisma.$transaction.mockImplementation((callback) => callback(prisma)) as any
  
    // 4
    const data = await addPost2(mockPost)
  
    // 5
    expect(data.newPost.title).toBe('two')
    expect(data).toStrictEqual(mockResponse)
  })

  test('updateUser should delete user posts if clearPosts flag is true', async () => {
    prisma.playlist.update.mockResolvedValue({
      id: '1',
      title: 'BonJovi'
    })
  
    await updatePlaylist('1', {}, true)
  
    expect(prisma.playlist.deleteMany).toHaveBeenCalled()
    expect(prisma.playlist.deleteMany).toHaveBeenCalledWith({
      where: { id: '1' }
    }) as any
  })
