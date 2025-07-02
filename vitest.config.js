/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/tests/**/*.test.js'], // Ajusta según tu estructura
    exclude: ['client/**'],              // ❗️Ignora tests del frontend
    environment: 'node',
    globals: true,
  },
})
