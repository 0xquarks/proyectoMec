import * as config from './config.js';

import path from 'path';
import express from 'express';

import { fileURLToPath } from 'url';
import { pool } from './db.js';
import { initMailServer, sendMail } from './services/mail/mailer.js';

import sparePartsRoutes from './routes/spareParts.js';
import servicesRoutes from './routes/services.js';
import indexRoutes from './routes/index.js';
import contactRoutes from './routes/contact.js';
import appointmentsRoutes from './routes/appointments.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/css', express.static(config.CSS_DIR));
app.use('/js', express.static(config.JS_DIR));
app.use('/html', express.static(config.HTML_DIR));
app.use('/images', express.static(config.IMG_DIR));

app.use(sparePartsRoutes);
app.use(servicesRoutes);
app.use(indexRoutes);
app.use(contactRoutes);
app.use(appointmentsRoutes);

app.use((req, res, next) => {
	res.status(404).json({
		message: 'endpoint not found'
	})
});

initMailServer();


app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
