import { Router } from 'express';
import path from 'path';

import { PUBLIC_DIR } from '../config.js';

const router = Router();

router.get('/contactos', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'contactos.html'));
})

export default router;
