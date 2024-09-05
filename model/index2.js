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

    verpedidos:function (conexion) {
        const consulta =`
        
       SELECT 
        pa.id AS pedido_id,
        pa.cliente_id,
        pa.marca_id,
        pa.fecha_pedido,
        pa.estado,
        pa.fecha_estimada_entrega,
        pa.total,
        dp.id AS detalle_pedido_id,
        dp.producto_id,
        dp.cantidad,
        dp.precio_unitario,
        dp.subtotal AS subtotal_producto,
        p.id AS producto_id,
        p.precio AS producto_precio,
        p.imagen AS producto_imagen,
        p.nombre AS producto_nombre,
        m.nombre AS marca_nombre,
        m.imagen AS marcas_imagen
      FROM 
        pedidos_activos pa
        INNER JOIN detalles_pedido dp ON pa.id = dp.pedido_id
        INNER JOIN productos p ON dp.producto_id = p.id
        LEFT JOIN marcas m ON pa.marca_id = m.id
      WHERE 
        pa.cliente_id = ?
        `
        return new Promise((resolve, reject) => {
            conexion.query(consulta, 16, function (error, resultado) {
                if (error) {
                    throw (error);
                } else {
                    resolve(resultado);
                }
            });

        })
        
    }


    }