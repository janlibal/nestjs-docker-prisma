import { UserService } from '@core/modules/user/user.service'
import { createServiceUnitTestApp } from '@test/helper/create-service-unit'
import { prisma } from '@test/lib/prisma'
import { mockUserInputData1 } from '@test/mock/data/user.data'
import { authProvider } from '@test/mock/modules/auth.mock'
import { describe, it, expect, vi } from 'vitest'

describe('/modules/user/user.service', () => {
  const proxy = createServiceUnitTestApp(UserService, {
    providers: [authProvider],
  })

  it('should register user successfully', async () => {
    const userModel = mockUserInputData1
    await proxy.service.register(userModel)

    const user = await prisma.user.findUnique({
      where: {
        username: userModel.username,
      },
    })

    expect(user).toBeDefined()
    expect(user?.username).toBe(userModel.username)
  })


})