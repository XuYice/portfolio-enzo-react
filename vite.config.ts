import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the build run from any path (e.g. GitHub Pages /portfolio/)
export default defineConfig({
  plugins: [react()],
  base: './',
});
