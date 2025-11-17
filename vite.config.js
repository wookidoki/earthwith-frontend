import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 이 플러그인을 설치하셨다고 가정합니다.

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),      // 1. Vite React 플러그인
    tailwindcss(), // 2. Vite Tailwind 플러그인
  ],
})