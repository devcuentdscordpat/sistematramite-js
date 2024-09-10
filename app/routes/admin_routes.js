const express = require('express');
const router = express.Router();
const path = require('path');
const { route } = require('./login_routes');

// Manejador de los archivos estaticos de Inicio Admin
router.get('/admin.:type', (req, res) => {
    const type = req.params.type;
    if (type === 'css' || type === 'js') {
        const filePath = path.join(__dirname, `../views/admin/admin.${type}`);
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(err.status).send('Error al cargar el archivo.');
            }
        });
    } else {
        res.status(400).send('Tipo de archivo no válido.');
    }
});
// ====================================================


router.get('/inicio', (req, res) => {

    res.render('admin/admin', {nombreVista: ""});
});

module.exports = router;