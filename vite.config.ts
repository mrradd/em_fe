import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(`Mode: ${mode}`);
  console.log(`API base url: ${env.VITE_API_BASE_URL}`);
  console.log(`Port: ${env.VITE_APP_PORT}`);
  const port = Number(env.VITE_APP_PORT) || 5173;

  return {
    plugins: [react()],
    server: {
      port
    }
  };
});
