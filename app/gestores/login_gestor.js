const credenciales_mysql = require('../../credencial_mysql');
const mysql = require("mysql2/promise");

class LoginGestor {
    constructor() {
        this.config = credenciales_mysql;
    }

    async validarCredenciales(nombreUsuario, password) {
        try {
            const connection = await mysql.createConnection(this.config);
            const consulta = `SELECT * FROM usuario WHERE nombre = ? AND password = ? ;`;
            const [rows, fields] = await connection.execute(consulta, [nombreUsuario,password,]);
            await connection.end();
            if (rows.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error al seleccionar usuario:", error);
            throw error;
        }
    }
}

module.exports = LoginGestor;