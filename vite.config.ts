import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePugPlugin from 'vite-plugin-pug-transformer'

import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'

export default defineConfig({
    plugins: [
        vitePugPlugin({
            pugLocals: {
                // Используем относительные пути от src, Vite обработает их автоматически
                images: {
                    navbarLogo: '/src/images/navbar-logo.svg',
                    closeIcon: '/src/images/close-icon.svg',
                    headerBg: '/src/images/header-bg.jpg',
                    mapImage: '/src/images/map-image.png',
                    portfolio: {
                        1: '/src/images/portfolio/1.jpg',
                        2: '/src/images/portfolio/2.jpg',
                        3: '/src/images/portfolio/3.jpg',
                        4: '/src/images/portfolio/4.jpg',
                        5: '/src/images/portfolio/5.jpg',
                        6: '/src/images/portfolio/6.jpg',
                    },
                    about: {
                        1: '/src/images/about/1.jpg',
                        2: '/src/images/about/2.jpg',
                        3: '/src/images/about/3.jpg',
                        4: '/src/images/about/4.jpg',
                    },
                    team: {
                        1: '/src/images/team/1.jpg',
                        2: '/src/images/team/2.jpg',
                        3: '/src/images/team/3.jpg',
                    },
                    logos: {
                        microsoft: '/src/images/logos/microsoft.svg',
                        google: '/src/images/logos/google.svg',
                        facebook: '/src/images/logos/facebook.svg',
                        ibm: '/src/images/logos/ibm.svg',
                    },
                },
            },
        }),
        viteImagemin({
            plugins: {
                jpg: imageminMozjpeg(),
                png: imageminPngquant(),
            },
            makeWebp: {
                plugins: {
                    jpg: imageminWebp(),
                    png: imageminWebp(),
                },
            },
        }),
        ViteImageOptimizer({}),
    ],
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
