import { cpSync, existsSync } from 'fs'
import path, { resolve } from 'path'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: './test',
  test: {
    include: ['**/*.spec.ts', '**/*.e2e-spec.ts', './test/src/**/*.spec.ts'
    ],

    //threads: false,
    globals: true,
    setupFiles: [resolve(__dirname, './test/setup-file.ts')],
    environment: 'node',
    includeSource: [resolve(__dirname, './test')],
  },
  optimizeDeps: {
    needsInterop: ['lodash'],
  },

  // esbuild can not emit ts metadata
  esbuild: false,

  plugins: [
    swc.vite(),
    
  ],
})