import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
const env = dotenv.config().parsed;

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env
  },
  server: {
    port: 5173, // Set the port to 3000
    host: true, // Allow access from network
    open: true, // Automatically open the browser when the server starts
  }
});