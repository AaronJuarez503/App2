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
    Insertarpedido:function(conexion,datos){
        console.log('entrando')

        const values = datos.map(item => [item.cliente_id, item.tienda_id, item.marca_id,item.total]);
        console.log(values)

        const consulta = `INSERT INTO pedidos_activos (cliente_id,tienda_id,marca_id,total) VALUES ?`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, [values], function (error, resultado) {
                if (error) {
                    throw (error);
                } else {
                    
                    resolve(resultado);
                }
            });

        })
    },

    Insertardetalles:function(conexion,datos){
        console.log('entrando')

        const values = datos.map(item => [item.pedido_id, item.id, item.precio,item.cantidad,item.total]);
        console.log(values)

        const consulta = `INSERT INTO detalles_pedido (pedido_id,producto_id,precio_unitario,cantidad,subtotal) VALUES ?`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, [values], function (error, resultado) {
                if (error) {
                    throw (error);
                } else {
                    resolve(resultado);
                }
            });

        })
    },
    }