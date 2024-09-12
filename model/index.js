module.exports={

    buscarusuario:function (conexion,username,password) {
        const consulta = `SELECT * FROM usuarios WHERE usuario = '${username}' AND contrasena ='${password}' AND rol ='cliente'`;
        //id_rol,usuario,correo, contraseña
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        
                        
                        return resolve(datos[0]);
                    } else {
                        return reject(new Error('usuario no encontrado '));
                        // No se encontró ningún usuario
                    }
                }
            });
        });
    },
    buscarmarcas:function(conexion,id){
        const consulta = `
                SELECT t.id, t.nombre
                FROM tiendas t
                JOIN clientes c ON t.cliente_id = c.id
                WHERE c.id = ${id}
                LIMIT 1
            `;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw (error);
                } else if (resultado.length >0) {
                    resolve(resultado[0]);
                }else{
                    resolve(false)
                }
            });
            
        })
    },

    RegistrarCliente:function(conexion, {username, correo, pass,rol}) {
        const insertar = `INSERT INTO usuarios ( usuario, email, contrasena,rol) VALUES ('${username}', '${correo}', '${pass}', '${rol}')`;
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
    Cliente:function(conexion, id, nombre, apellido) {
        const insertar = `INSERT INTO clientes ( id, nombre, apellido) VALUES (${id}, '${nombre}', '${apellido}')`;
        return new Promise((resolve, reject) => {
            conexion.query(insertar, function (error, resultado) {
                if (error) {
                    reject(error);
                } else { 
                    console.log('datos de clientes insertados correctamente')
                    resolve(resultado);
                }
            });
        });
    },

    IniciarSesion:function(conexion, { user, pass }) {
        const consulta = `SELECT * FROM usuarios WHERE usuario = '${user}' AND contraseña = '${pass}'`;
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
        const consulta = `SELECT * FROM usuarios WHERE email = '${correo}'`;
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
       
        return new Promise((resolve, reject) => {

            if (typeof correo !== 'undefined') {
                
            const consulta = `UPDATE cliente SET contraseña = '${pass}' WHERE correo = '${correo}'`;
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    console.log("actualizasion de contraseña fallida ...")
             
                   throw error
                } else {
                    
                    resolve(true);
                    console.log("actualizado correctamente.....")
                }
            });
                
            } else {
                return reject(false);
                
            }

        });
    },

    findemail:function(conexion,correo) {
        const consulta = `SELECT email FROM usuarios WHERE email = '${correo}'`;
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw error
                } else {
                    if (resultado.length>0) {
                       // console.log(resultado) 
                        return resolve(true); 
                       
                    } else {
                        console.log("No hay usuario con ese correo")
                        return reject(false); 
                        
                    }
                }
            });
        });
    },

    FindByEmail:function (conexion,email) {
        const consulta = `SELECT email FROM usuarios WHERE email = '${email}'`;
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error,resultado) {
                if (error) {
                    throw error;
                } else {
                    if (resultado.length > 0) {
                       // console.log(datos)
                        return resolve(true);
                    } else {
                        return reject(false);// No se encontró ningún usuario
                    }
                }
            });
        });
        
    },


    FindUser:function (conexion,username) {
        const consulta = `SELECT usuario FROM usuarios WHERE usuario = '${username}'`;
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        console.log(datos[0])
                        return resolve(true);
                    } else {
                        console.log("usuario encontrado ")
                        return reject(false);// No se encontró ningún usuario
                    }
                }
            });
        });
    },





}
