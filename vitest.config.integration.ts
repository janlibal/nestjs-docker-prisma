import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    threads: false,
    setupFiles: ['tests/helpers/setup.ts']
  }
})