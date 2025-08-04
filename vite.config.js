import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://equran.id',
        changeOrigin: true,
      },
      '/api/v2': {
        target: 'https://equran.id',
        changeOrigin: true,
      }
    }
  }
})