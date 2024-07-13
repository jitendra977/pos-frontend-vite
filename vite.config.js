import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
const env = dotenv.config().parsed;

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env
  }
});
