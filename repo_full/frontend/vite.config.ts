import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    proxy: {
      '/categories': 'http://localhost:8080',
      '/catalog': 'http://localhost:8080',
      '/price': 'http://localhost:8080',
      '/admin': 'http://localhost:8080'
    }
  }
});
