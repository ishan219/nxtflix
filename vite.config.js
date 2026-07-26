import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // The assessment expects the production bundle in "build", not Vite's default "dist".
    outDir: 'build',
  },
})
