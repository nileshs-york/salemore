import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';

const localPersistencePlugin = () => ({
  name: 'local-persistence',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/save-local-json' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const { fileName, data } = JSON.parse(body);
            const filePath = path.resolve(process.cwd(), 'src/data', fileName);
            console.log(`Writing ${Array.isArray(data) ? data.length : 'object'} entries to ${fileName}...`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      } else if (req.url === '/api/upload-local-file' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const { fileName, base64Data } = JSON.parse(body);
            // Remove meta info if present (e.g. "data:image/png;base64,")
            const base64Content = base64Data.split(';base64,').pop();
            const buffer = Buffer.from(base64Content, 'base64');
            const uploadPath = path.resolve(process.cwd(), 'public/uploads', fileName);
            fs.writeFileSync(uploadPath, buffer);
            res.statusCode = 200;
            res.end(JSON.stringify({ url: `/uploads/${fileName}` }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), localPersistencePlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: ['**/src/data/**'],
      },
    },
  };
});
