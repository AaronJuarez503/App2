module.exports={
    marcas:function(conexion){
        const consulta = `SELECT * FROM marcas  `;
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
        const consulta = `SELECT * FROM productos WHERE marca_id = ${id}`;
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
    Insertartienda:function(conexion,cliente_id,nombre,direccion){
        console.log('entrando')
        const consulta = `INSERT INTO tiendas (cliente_id, nombre, dirreccion) VALUES (${cliente_id}, '${nombre}','${direccion}')`;
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