import { defineConfig } from 'vite'
import vitePugPlugin from 'vite-plugin-pug-transformer'

export default defineConfig({
    plugins: [vitePugPlugin({})],
    build: {
        // Минификация и оптимизация
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Удаление console.log в production
                drop_debugger: true,
            },
        },
        // Code splitting
        rollupOptions: {
            output: {
                // Оптимизация имен файлов
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
        // Оптимизация размера чанков
        chunkSizeWarningLimit: 1000,
        // Включение source maps только для отладки (можно отключить в production)
        sourcemap: false,
        // Оптимизация CSS
        cssCodeSplit: true,
        cssMinify: true,
    },
})
