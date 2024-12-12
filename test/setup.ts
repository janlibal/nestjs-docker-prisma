// test/setup.ts
import { jest } from '@jest/globals'

beforeAll(() => {
  // Initialize global mocks, if needed
  jest.setTimeout(10000) // Set timeout for all tests to 10 seconds
})

afterEach(() => {
  // Clear mocks after each test
  jest.clearAllMocks()
})
