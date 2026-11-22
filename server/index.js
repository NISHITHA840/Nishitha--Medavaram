import { app } from './app.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../data/onevision.db');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[OneVision SQLite Server] Running on http://localhost:${PORT}`);
  console.log(`[OneVision SQLite Server] Database file: ${DB_PATH}`);
});
