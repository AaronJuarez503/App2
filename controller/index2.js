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
        try {
            console.log(req.body)
           await model.Insertartienda(con,38,req.body)
            res.send('hola')

        } catch (error) {

        }

    }
}