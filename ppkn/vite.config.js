import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
  },
  build: {
    rollupOptions: {
      external: [], // Add external modules here if necessary
      output: {
        format: 'es',
      },
    },
  },
});
