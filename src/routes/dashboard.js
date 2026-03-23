import path from 'path';
import express from 'express'

import { isAdminMiddleware } from '../services/utils/auth.js';
import { PUBLIC_DIR } from '../config.js';

const router = express.Router();

router.get('/admin/dashboard', isAdminMiddleware, (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'dashboard.html'));
});

export default router
