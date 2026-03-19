import path from 'path';
import expres from 'express'

import { isAdminMiddleware } from '../services/middlewares/auth.js';
import { PUBLIC_DIR } from '../config.js';

const router = expres.Router();

router.get('/admin/dashboard', isAdminMiddleware, (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'dashboard.html'));
});

export default router
