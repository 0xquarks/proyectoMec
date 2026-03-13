import express from 'express';
import path from 'path';

import { getSpareParts } from '../controllers/spareParts.js';

import { PUBLIC_DIR } from '../config.js';

const router = express.Router();

router.get('/repuestos', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'repuestos.html'));
})

router.get('/api/repuestos', getSpareParts);

export default router;
