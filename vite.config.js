import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' يخلي المسارات نسبية، فيشتغل الموقع صح على GitHub Pages
// سواء كان repo عادي (username.github.io/repo-name) أو user page
export default defineConfig({
  plugins: [react()],
  base: './',
});
