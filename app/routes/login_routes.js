const express = require('express');
const router = express.Router();
const path = require('path'); 
const LoginGestor = require('../gestores/login_gestor');

// Manejador de los archivos estaticos de Login
router.get('/login.:type', (req, res) => {
    const type = req.params.type;
    if (type === 'css' || type === 'js') {
        const filePath = path.join(__dirname, `../views/login/login.${type}`);
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(err.status).send('Error al cargar el archivo.');
            }
        });
    } else {
        res.status(400).send('Tipo de archivo no válido.');
    }
});
// ===========================================

function establecerCookie(res, name, value, options = {}) {
    const defaultOptions = {
      httpOnly: true,
    };
  
    res.cookie(name, value, { ...defaultOptions, ...options });
}
  


router.get('/', (req, res) => {
    res.render('login/login');
});

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const loginGestor = new LoginGestor();
    const result = await loginGestor.validarCredenciales(username, password);
    if (result) {
        establecerCookie(res, "Nombre_Completo", "");
        establecerCookie(res, "UserName", username);
        return res.redirect('/admin/inicio');
    } else {
        return res.render('login/login', {mensaje:"Nombre de usuario o contraseña incorrectos"});
    }
});

router.get('/cerrar-sesion', (req, res) => {
    // Limpiamos las cookies dee session
    establecerCookie(res, "Nombre_Completo", "");
    establecerCookie(res, "UserName", "");
    res.redirect('/login');
});

module.exports = router;