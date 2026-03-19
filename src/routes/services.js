import express from 'express';
import path from 'path';
import { delService, getService, getServices } from '../controllers/services.js';

import { isAdminMiddleware } from '../services/middlewares/auth.js';
import { PUBLIC_DIR } from '../config.js';

const router = express.Router();

router.get('/servicios', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'servicios.html'));
})

router.delete('/api/services/:id', delService)

router.get('/api/services', getServices);

router.get('/api/services/:id', getService);

export default router;
