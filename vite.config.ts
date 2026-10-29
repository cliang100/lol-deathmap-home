import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'

// https://vite.dev/config/
const cspMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'">`

const cspPlugin = (): Plugin => ({
  name: 'csp-meta',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace('<head>', `<head>\n    ${cspMeta}`)
  },
})

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
    plugins: [react(), cspPlugin()],
    server: {
      hmr: { host: 'localhost' }
    },
  }
})