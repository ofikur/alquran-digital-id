// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // UBAH DARI '/apidev' MENJADI '/api'
      '/api': {
        target: 'https://equran.id',
        changeOrigin: true,
      },
      // Proxy untuk Al-Quran tetap sama dan benar
      '/api/v2': {
        target: 'https://equran.id',
        changeOrigin: true,
      }
    }
  }
})