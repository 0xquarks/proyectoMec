import express from 'express';
import path from 'path';
import { getServices, getService } from '../controllers/services.js';

import { PUBLIC_DIR } from '../config.js';

const router = express.Router();

router.get('/servicios', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'servicios.html'));
})

router.get('/api/services', getServices);

router.get('/api/services/:id', getService);

export default router;
