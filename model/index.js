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
    },
    RecuperarCuenta:function(conexion, { correo }) {
        const consulta = `SELECT * FROM cliente WHERE correo = '${correo}'`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    reject(error);
                } else {
                    resolve(resultado);
                }
            });
        });
    },
    Nuevacontra:function(conexion, pass, correo ) {
        const consulta = `UPDATE cliente SET contraseña = '${pass}' WHERE correo = '${correo}'`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    console.log("actualizasion de contraseña fallida ...")
                    return reject(error);
                } else {
                    resolve(true);
                    console.log("actualizado correctamente.....")
                }
            });
        });
    },

    findemail:function(conexion,correo) {
        const consulta = `SELECT * FROM cliente WHERE correo = '${correo}'`;
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw error
                } else {
                    if (resultado.length>0) {
                        console.log(resultado) 
                        return resolve(true); 
                       
                    } else {
                        console.log("No hay usuario con ese correo")
                        return reject(false); 
                        
                    }
                }
            });
        });
    },

}