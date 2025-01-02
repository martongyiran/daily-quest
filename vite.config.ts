import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === 'document',
						handler: 'NetworkFirst',
					},
					{
						urlPattern: ({ request }) =>
							['style', 'script', 'image'].includes(request.destination),
						handler: 'CacheFirst',
						options: {
							cacheName: 'assets-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
							},
						},
					},
				],
			},
			includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: 'DailyQuest',
				short_name: 'DailyQuest',
				description: 'A DailyQuest real life RPG for self improvement.',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'app-icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'app-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'app-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
});
