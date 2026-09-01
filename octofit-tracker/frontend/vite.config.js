import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const codespaceName = process.env.CODESPACE_NAME

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: codespaceName
      ? {
          host: `${codespaceName}-5173.app.github.dev`,
          clientPort: 443,
        }
      : undefined,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
})
