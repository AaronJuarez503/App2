module.exports={

    RegistrarCliente:function(conexion) {
        const insertar = `INSERT INTO cliente (nombre, apellido, usuario, correo, contraseña) VALUES ('${nom}, ${apell}, ${user}, ${correo}, ${pass}')`;
        return new Promise((Resolve, reject) => {
            conexion.query(insertar, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    Resolve(results);
                }
            });
        })
        
    }

}