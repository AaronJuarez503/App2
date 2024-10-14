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
       // const consulta = `SELECT * FROM productos WHERE marca_id = ${id}`;
       const consulta=`
       SELECT 
              m.imagen AS imagen_marca,
              p.id,
              p.marca_id,
              p.nombre,
              p.imagen,
              p.precio,
              p.descripcion
                FROM marcas m
                JOIN productos p ON m.id = p.marca_id
                WHERE p.marca_id = ${id}
               
       `
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw (error);
                } else if (resultado.length >0) {
                    console.log(resultado)
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
        
    },
    pmarcas:function(conexion){
        console.log('entrando')
        //SUM(dp.subtotal) AS total_pedido

        const query = `
         SELECT 
        m.id AS marca_id,
        m.nombre AS marca_nombre,
        m.imagen AS marca_imagen,
        DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:00') AS fecha_hora_pedido,
        GROUP_CONCAT(DISTINCT pa.estado) AS estados,
        SUM(dp.subtotal) AS total_pedido,
        GROUP_CONCAT(DISTINCT pa.id) AS pedidos_ids
      FROM 
      marcas m
      JOIN productos p ON m.id = p.marca_id
      JOIN detalles_pedido dp ON p.id = dp.producto_id
      JOIN pedidos_activos pa ON dp.pedido_id = pa.id
      GROUP BY m.id, DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:00')
      ORDER BY m.nombre, fecha_hora_pedido DESC


    `;

       
        return new Promise((resolve, reject) => {
            conexion.query(query, function (error, resultado) {
                if (error) {
                    throw (error);
                } else {
                    resolve(resultado);
                }
            });

        })
    },

    detalles:function (conexion,marca,fecha) {
        const query = `
                
           SELECT 
            p.id AS producto_id, 
            p.imagen AS producto_imagen,
            p.precio AS producto_precio,
            p.nombre AS producto_nombre, 

            SUM(dp.cantidad) AS cantidad_total, 
            dp.precio_unitario, 
            SUM(dp.subtotal) AS subtotal_total, 
            pa.id,
            pa.fecha_pedido AS fecha,
            pa.estado 
        FROM 
            productos p
            JOIN detalles_pedido dp ON p.id = dp.producto_id 
            JOIN pedidos_activos pa ON dp.pedido_id = pa.id 
            JOIN marcas m ON p.marca_id = m.id 
        WHERE 
            m.id = ? 
            AND pa.fecha_pedido >= ? 
            
        GROUP BY 
            p.id, dp.precio_unitario, pa.estado 
        ORDER BY 
            p.nombre
           

      
    `;



        return new Promise((resolve, reject) => {
            conexion.query(query,[marca, fecha], function (error, resultado) {
                if (error) {
                    throw (error);
                } else {
                    resolve(resultado);
                }
            });
            
        })

        
    },
    buscartienda:function(conexion,id){
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
                    reject(error);
                } else if (resultado.length >0) {
                    resolve(resultado[0]);
                }else{
                    reject(new Error('No se encontró la tienda'));
                }
            });
            
        })
    },
    
    buscartienda2: function(conexion, id) {
        const consulta = `
          SELECT t.id,t.imagen, t.nombre, t.dirreccion, t.telefono
          FROM tiendas t
          JOIN clientes c ON t.cliente_id = c.id
          WHERE c.id = ${id}
          LIMIT 1
        `;
      
        return new Promise((resolve, reject) => {
          conexion.query(consulta, function(error, resultado) {
            if (error) {
              throw error;
            } else if (resultado.length > 0) {
              resolve(resultado[0]);
            } else {
              reject(new Error('No se encontró la tienda'));
            }
          });
        });
      },

    vertienda:async (conexion,id) => {
        const consulta =`SELECT * FROM tiendas WHERE cliente_id = ?`
        return new Promise ((resolve ,reject)=>{
            conexion.query(consulta,(error, resultado)=>{
                if (error) {
                    throw (error)
                } else if (resultado.length > 0){
                    resolve(resultado[0])
                } else {
                    resolve(false)
                }

            })
        })
        
    },
    vercompras: async (conexion,id) => {
        const consulta = `
        SELECT *,
        c.codigo 
        FROM pedidos_activos t
        JOIN clientes c ON t.cliente_id = c.id
        WHERE c.id = ${id}
        LIMIT 1
    `;

        return new Promise ((resolve ,reject)=>{
            conexion.query(consulta,(error, resultado)=>{
                if (error) {
                    throw (error)
                } else if (resultado.length > 0){
                    console.log(resultado)
                    resolve(true)
                    //resolve(resultado[0])
                } else {
                    console.log('alpareser no has realizado ninguna compra')
                    resolve(false)
                }

            })
        })
        
    },
    verificacodigo:function (conexion,id) {

        const consulta =`SELECT codigo FROM clientes WHERE id = ${id}`

          return new Promise ((resolve ,reject)=>{
    conexion.query(consulta,(error, resultado)=>{
        if (error) {
            throw (error)
        } else if (resultado.length > 0){
            
            resolve(resultado[0])
            //resolve(resultado[0])
        } else {
            console.log('alpareser no has realizado ninguna compra')
            resolve(false)
        }

    })
})
        
    },

    insertarcodigo: (conexion,codigo,id)=>{
        
        const consulta =`
        UPDATE clientes
            SET codigo = ${codigo}
            WHERE id=${id};
        `

        return new Promise ((resolve ,reject)=>{
         conexion.query(consulta,(error, resultado)=>{
        if (error) {
            throw (error)
         } else {
            console.log('codigo insertado correctamente')
            resolve(true)
        }

    })
})

    },

    actualizarTienda: function(conexion, id,id_imagen,imagen,datos) {
        console.log('datos para insertar en el modelo')
        console.log(datos)
        const consulta = `
            UPDATE tiendas
            SET id_imagen = ?, imagen = ?, nombre = ?, dirreccion = ?, telefono = ?
            WHERE cliente_id = ?
        `;
        
        return new Promise((resolve, reject) => {
            conexion.query(consulta, [id_imagen, imagen, datos.nombre, datos.direccion, datos.telefono, id], (error, resultado) => {
                if (error) {
                    console.error("Error al actualizar la tienda:", error);
                    reject(error);
                } else {
                    console.log("Tienda actualizada correctamente");
                    resolve(true);
                }
            });
        });
    },
    dias:function (conexion) {
        console.log('entrando')
        var consulta= `
        SELECT 
        m.id,
        m.nombre,
        m.imagen,
        cd.lunes,
        cd.martes,
        cd.miercoles,
        cd.jueves,
        cd.viernes,
        cd.sabado,
        cd.domingo

        
        FROM configuracion_dias_pedido cd
        LEFT JOIN marcas m ON m.id = cd.marca_id
       
        `
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
    habilitado:function (conexion,dia,marca){
        var consulta=`SELECT ${dia} FROM configuracion_dias_pedido WHERE marca_id = ${marca}`
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, resultado) {
                if (error) {
                    throw (error);
                } else {
                    resolve(resultado[0]);
                }
            });
            
        })

    }
}