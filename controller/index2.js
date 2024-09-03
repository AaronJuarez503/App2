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

    }
}