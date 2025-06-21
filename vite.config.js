import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: true,
    allowedHosts: ['latex-processor-frontend.onrender.com'],
    port: 5173,
  },
})
