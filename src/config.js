import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '');
export const PUBLIC_DIR = path.resolve(__dirname, 'public');
export const DB_NAME = 'mechanic_db.sqlite';
