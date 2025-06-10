import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    base: '/',
    plugins: [react(), eslint()],
    server: {
        port: 3000
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        reporters: ['verbose'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{test,spec}.{ts,tsx}'],
            exclude: [],
        },
    },
});
