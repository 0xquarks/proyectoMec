import express from 'express';
import path from 'path';
import { PUBLIC_DIR } from '../config.js';

import { isAdminMiddleware } from '../services/utils/auth.js';
import { login } from '../controllers/login.js'

const router = express.Router();

router.post('/api/login', login);

router.get('/login', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'login.html'));
})

export default router;
