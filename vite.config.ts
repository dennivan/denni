import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'create-redirects',
            apply: 'build',
            closeBundle: async () => {
                const filePath = resolve(__dirname, 'dist', '_redirects');
                const content = '/*    /index.html    200';
                try {
                    await writeFile(filePath, content);
                } catch (err) {
                    console.error(err);
                }
            },
        },
    ],
    build: {
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1000,
        commonjsOptions: {
            ignoreTryCatch: false,
        },
    },
    resolve: {
        alias: {
            '@assets': resolve(__dirname, './src/assets'),
            '@components': resolve(__dirname, './src/components'),
            '@hooks': resolve(__dirname, './src/hooks'),
            '@layout': resolve(__dirname, './src/layout'),
            '@pages': resolve(__dirname, './src/pages'),
            '@router': resolve(__dirname, './src/router'),
            '@services': resolve(__dirname, './src/services'),
        },
    },
    server: {
        strictPort: true,
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
});
