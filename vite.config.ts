import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    allowedHosts: ['www.aitroop.net', 'aitroop.net'],
  },
})
