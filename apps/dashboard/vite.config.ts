import path from 'node:path'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	server: {
		port: 3001,
	},
	resolve: {
		alias: {
			convex: path.resolve('./node_modules/convex'),
		},
	},
	define: {
		'import.meta.env.VITE_CONVEX_URL': JSON.stringify(process.env.VITE_CONVEX_URL),
		'import.meta.env.VITE_CONVEX_SITE_URL': JSON.stringify(process.env.VITE_CONVEX_SITE_URL),
		'import.meta.env.VITE_MARKETING_URL': JSON.stringify(process.env.VITE_MARKETING_URL),
		'import.meta.env.VITE_DASHBOARD_URL': JSON.stringify(process.env.VITE_DASHBOARD_URL),
	},
	plugins: [tsConfigPaths(), tanstackStart(), nitro({ preset: 'cloudflare-pages' }), viteReact()],
})
