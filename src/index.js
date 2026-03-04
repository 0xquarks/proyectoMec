const express = require("express");
const path = require("path");
const app = express();

// Servimos las carpetas para que Express las reconozca
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    // Ruta absoluta correcta
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get('/servicios', (req, res) => {
	res.sendFile(path.join(__dirname, 'html', 'servicios.html'));
})

app.get('/repuestos', (req, res) => {
	res.sendFile(path.join(__dirname, 'html', 'repuestos.html'));
})

app.get('/contactos', (req, res) => {
	res.sendFile(path.join(__dirname, 'html', 'contactos.html'));
})

app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000");
});
