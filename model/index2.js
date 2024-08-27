module.exports={
    marcas:function(conexion){
        const consulta = `SELECT * FROM marca  `;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw (error);
                } else if (resultado.length >0) {
                    resolve(resultado);
                }
            });
            
        })
    },
    productos:function(conexion,id){
        const consulta = `SELECT * FROM productos WHERE id_marca = ${id}`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw (error);
                } else if (resultado.length >0) {
                    resolve(resultado);
                }
            });
            
        })
    },
    Insertartienda:function(conexion,id_cliente,datos){
        console.log('entrando')
        const consulta = `INSERT INTO tienda (id_cliente, nombre, direccion, telefono) VALUES ('${id_cliente}', '${datos.nombre}', '${datos.direccion}', '${datos.numero}')`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw (error);
                } else {
                    resolve(resultado);
                }
            });

        })
    },
    }