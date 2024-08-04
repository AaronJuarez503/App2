module.exports={

    RegistrarCliente:function(conexion, {nom, apell, user, correo, pass}) {
        const insertar = `INSERT INTO cliente (nombre, apellido, usuario, correo, contraseña) VALUES ('${nom}', '${apell}', '${user}', '${correo}', '${pass}')`;
        return new Promise((resolve, reject) => {
            conexion.query(insertar, function (error, resultado) {
                if (error) {
                    reject(error);
                } else {
                    resolve(resultado);
                }
            });
        });
    },

    IniciarSesion:function(conexion, { user, pass }) {
        const consulta = `SELECT * FROM cliente WHERE usuario = '${user}' AND contraseña = '${pass}'`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    reject(error);
                } else {
                    resolve(resultado);
                }
            });
        });
    }

}