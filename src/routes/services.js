import express from 'express';
import path from 'path';

import { updateService, createService, delService, getService, getServices } from '../controllers/services.js';

import { isAdminMiddleware } from '../services/utils/auth.js';
import { PUBLIC_DIR } from '../config.js';
import { uploadService } from '../services/utils/utils.js';

const router = express.Router();

router.get('/servicios', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'servicios.html'));
})

router.post('/api/services', isAdminMiddleware, uploadService.single('image'), createService);

router.put('/api/services/:id', isAdminMiddleware, updateService);

router.delete('/api/services/:id', isAdminMiddleware, delService)

router.get('/api/services', getServices);

router.get('/api/services/:id', getService);

export default router;
