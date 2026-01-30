
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/SUNLIST-1/', // GitHub Pages base path (must match repo name)
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    }
})
