import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~tests': path.resolve(__dirname, 'src/tests/')
    }
  },
  test: {
    environment: 'jsdom',
    watch: false,
    setupFiles: './src/tests/setup-tests.js',
    globals: true,
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    coverage: {
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**/*.jsx', 'src/**/*.tsx'],
      exclude: ['./src/tests/setup-tests.js'],
      reportsDirectory: './src/tests/coverage'
    },
    reporters: ['vitest-sonar-reporter', 'default'],
    outputFile: 'test-report.xml'
  }
})
