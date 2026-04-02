import express from 'express';
import path from 'path';
import { PUBLIC_DIR } from '../config.js';

import { login, logout } from '../controllers/login.js'

const router = express.Router();

router.post('/api/login', login);

router.post('/api/logout', logout)

router.get('/login', (req, res) => {
	const userId = req.cookies.userId;

	if (userId) {
		return res.redirect('/admin/dashboard');
	}

	res.sendFile(path.join(PUBLIC_DIR, 'html', 'login.html'));
})

export default router;
