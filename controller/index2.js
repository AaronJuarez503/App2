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

    ppppp: async function (req,res) {

        try {
            const productoId = req.query.productoId;
            console.log("buscando los productos "+productoId)
            var r= await model.productos(con,productoId)
            res.send(r)
            
        } catch (error) {
            console.log(error)
            
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

        
         
          
          
        try {
           var result = await model.verpedidos(con)
           //console.log(result)


           

           



          
          
          
          
         

        res.send(result)

          //console.log(resultadoSeparado);
         

        




        } catch (error) {
            console.log('errror')
            
        }
        
    },
    vercodigo: async function (req,res) {

      console.log(req.query.codigo)

      res.send({data:true})
      
    },
    pedidos: async function (req,res) {
        
    },
    pmarcas: async function (req,res) {


        var result = await model.pmarcas(con)

        console.log(result)


        res.send(result)
        
    },
    productos: async function (req,res) {
        var marca=req.query.marca
        var fecha=req.query.fecha
        try {
            var result = await model.detalles(con,marca,fecha)
            
            res.send(result)
        } catch (error) {
            console.error('error el consulta')
            
        }

        
    },
    buscartienda: async function (req,res) {
        console.log('buscando tienda')
        const token = req.cookies.perfil;
        if (!token) {
            console.log('alpareser no tienes tienda')
            res.redirect('principal')
            
        }else{
            console.log(token.id)

       try {
        var rmarca= await model.buscartienda(con,token.id)
        console.log(rmarca)

        res.send(rmarca)
       } catch (error) {
        
        
       }
        }
        
        
    },
    vertienda:async (req,res) => {
        try {
            
        } catch (error) {
            
        }
    },
    vercompras:async (req,res) => {
        try {
        const token = req.cookies.perfil;
        console.log('id del ciente :'+token.id)
        var r= await model.vercompras(con,token.id)
        res.send(r)
            
        } catch (error) {
            
        } 
    },
    verificarcodigo:async (req,res) => {
        var codigo = req.query.codigo
        try {
            const token = req.cookies.perfil;

            var respuesta=await model.verificarcodigo(con,toekn.id)
            if (respuesta.codigo===codigo) {
                res.send('codivo valido')
            } else if (respuesta.codigo===null) {
                //funcion para insertar
                
            } else{
                res.send('codigo no valido ')
                
            }
            
        } catch (error) {
            
        }
        
    }
}