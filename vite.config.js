import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // host: true listens on all network interfaces, so other devices on the
  // local network can open the site at http://<this-computer's-IP>:5173
  server: { host: true },
  preview: { host: true },
});
