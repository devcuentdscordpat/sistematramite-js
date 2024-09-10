const express = require("express");
const app = express();
const configuraciones = require("./config");
const loginRoutes = require('./app/routes/login_routes');
const adminRoutes = require('./app/routes/admin_routes');


configuraciones(app);

app.get("/", (req, res) => {
    res.redirect('/login');
});

// Configurando rutas para usar
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () => {
  console.log(`Express server initialized http://127.0.0.1:3000`);
});
