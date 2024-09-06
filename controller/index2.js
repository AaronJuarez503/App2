const con=require('../config/index')
const model=require('../model/index2')



module.exports={
    marcas:async function(req,res){

        try {
            var r= await model.marcas(con)
            res.send(r)
            
        } catch (error) {
            
        }




    },

    productos: async function (req,res) {

        try {
            const productoId = req.query.productoId;
            console.log(productoId)
            var r= await model.productos(con,productoId)
            res.send(r)
            
        } catch (error) {
            
        }
        
    },

    Insertartienda: async function (req,res) {

        const token = req.cookies.perfil;
        console.log(token)
        try {
            console.log(req.body)
           await model.Insertartienda(con,token.id,req.body.nombre,req.body.direccion)
            res.render('Pagina_inicio/index',{value:'hola'})

        } catch (error) {

        }

    },
    insertarpedido: async function(req,res) {
        const token = req.cookies.perfil;
        var productos=req.body.items
        console.log(productos)

        const idsYTotales = productos.map(producto => ({
            cliente_id:token.id,
            tienda_id:token.tienda_id,
            marca_id:producto.marca,
            total: producto.total
          }));

        const detallesp=productos.map(({ marca, ...resto }) => resto);
          
          console.log(idsYTotales);
          console.log(detallesp);


        

          try {
            var resultado = await model.Insertarpedido(con,idsYTotales)

            const insertedIds = resultado.insertId ? [resultado.insertId] : [];
            for (let i = 1; i < resultado.affectedRows; i++) {
                insertedIds.push(resultado.insertId + i);
            }

            console.log(insertedIds)

            const updatedProductos = detallesp.map((producto, index) => {
                return {
                  pedido_id: insertedIds[index],
                  ...producto
                };
              });
              
              console.log(updatedProductos);

              await model.Insertardetalles(con,updatedProductos)

              res.send('Pedido realizado con éxito!')
              

            
          } catch (error) {
            
          }

        
        
    },
    pruebas:async function (req,res) {
        function separarPorMarcaId(datos) {
            const separados = {};
          
            datos.forEach(item => {
              const marcaId = item.marca_id;
              if (!separados[marcaId]) {
                separados[marcaId] = [];
              }
              separados[marcaId].push(item);
            });
          
            return separados;
          }
          
         
          
          
        try {
           var result = await model.verpedidos(con)
           //console.log(result)


           const resultadoSeparado = separarPorMarcaId(result);

           



          
          
          
          
         

          Object.keys(resultadoSeparado).forEach(marcaId => {
            //console.log(`Datos de la marca con ID ${marcaId}:`) 
            const unifiedArray = resultadoSeparado[marcaId].reduce((acc, item) => {
                const existingItem = acc.find(i => i.producto_id === item.producto_id);
                if (existingItem) {
                  existingItem.cantidad += item.cantidad;
                  existingItem.total += item.total;
                } else {
                  acc.push({
                    producto_id: item.producto_id,
                    imagen: item.producto_imagen,
                    nombre: item.producto_nombre,
                    cantidad: item.cantidad,
                    total: item.total
                  });
                }
                return acc;
              }, []);

              console.log(`Datos de la marca con ID ${marcaId}:`, unifiedArray);
        })
            

          //console.log(resultadoSeparado);
          res.send(resultadoSeparado)

        




        } catch (error) {
            console.log('errror')
            
        }
        
    },
    vercodigo: async function (req,res) {

      console.log(req.query.codigo)

      res.send({data:true})
      
    }
}