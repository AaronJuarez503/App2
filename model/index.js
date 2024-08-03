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
    }

}