import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import sparePartsRoutes from './routes/sparePartsRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import appointmentRoutes from "./routes/appointmentRoutes.js";

import * as config from './config.js';

config.testMail();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/css', express.static(path.join(config.PUBLIC_DIR, 'css')));
app.use('/js', express.static(path.join(config.PUBLIC_DIR, 'js')));
app.use('/html', express.static(path.join(config.PUBLIC_DIR, 'html')));
app.use('/images', express.static(path.join(config.PUBLIC_DIR, 'images')));

app.use('/api', sparePartsRoutes);
app.use('/api', servicesRoutes);
app.use('/api', appointmentRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(config.PUBLIC_DIR, 'html', 'index.html'));
});

app.get('/servicios', (req, res) => {
	res.sendFile(path.join(config.PUBLIC_DIR, 'html', 'servicios.html'));
})

app.get('/repuestos', (req, res) => {
	res.sendFile(path.join(config.PUBLIC_DIR, 'html', 'repuestos.html'));
})

app.get('/contactos', (req, res) => {
	res.sendFile(path.join(config.PUBLIC_DIR, 'html', 'contactos.html'));
})

app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000");
});
