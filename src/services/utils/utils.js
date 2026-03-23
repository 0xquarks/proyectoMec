import multer from 'multer';
import path from 'path';

import { IMG_DIR } from '../../config.js';

const storageSparePart = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(IMG_DIR, "spare-parts"));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	}
})

const storageService = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(IMG_DIR, "services")); // carpeta donde se guarda
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	}
});

export const uploadSparePart = multer({ storage: storageSparePart });

export const uploadService = multer({ storage: storageService });
