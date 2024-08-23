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
            var r= await model.productos(con)
            res.send(r)
            
        } catch (error) {
            
        }
        
    }
}