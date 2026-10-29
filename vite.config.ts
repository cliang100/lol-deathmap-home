import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const resultsUrl = env.VITE_RESULTS_URL
  if (!resultsUrl) {
    throw new Error('VITE_RESULTS_URL is not set')
  }
  const url = new URL(resultsUrl)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`VITE_RESULTS_URL must use http or https, got ${url.protocol}`)
  }
  return {
    plugins: [react()],
    server: {
      hmr: { host: 'localhost' }
    },
  }
})