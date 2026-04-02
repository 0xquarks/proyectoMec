import express from 'express';
import path from 'path';

import { createSparePart, updateSparePart, delSparePart, getSpareParts, getSparePartsGrouped, getSparePartsTypes, createSparePartType } from '../controllers/spareParts.js';

import { PUBLIC_DIR } from '../config.js';
import { isAdminMiddleware } from '../services/utils/auth.js';
import { uploadSparePart } from '../services/utils/utils.js';

const router = express.Router();

router.get('/repuestos', (req, res) => {
	res.sendFile(path.join(PUBLIC_DIR, 'html', 'repuestos.html'));
})

router.get('/api/spare-parts-types', getSparePartsTypes);
router.post('/api/spare-parts-types', createSparePartType);

router.get('/api/spare-parts', getSpareParts);

router.get('/api/spare-parts/grouped', getSparePartsGrouped);

router.delete('/api/spare-parts/:id', isAdminMiddleware, delSparePart);

router.put('/api/spare-parts/:id', isAdminMiddleware, updateSparePart);

router.post('/api/spare-parts', isAdminMiddleware, uploadSparePart.single('image'), createSparePart);

export default router;
