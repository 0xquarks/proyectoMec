import express from 'express';
import path from 'path';
import { PUBLIC_DIR } from '../config.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'index.html'));
})

export default router;
