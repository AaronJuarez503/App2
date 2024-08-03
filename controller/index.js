var conexion = require('../config/index')
var consulta = require('../model/index')

module.exports={

    RegistrarCliente:function(req,res){
        const {nom,apell,user,correo,pass} = req.body;
        conexion.query(consulta.RegistrarCliente(conexion),[nom,apell,user,correo,pass],function(error,results){
            if(error){
                console.log(error)
            }else{
                res.redirect('/')
            }
        });
    }
   
   
}//fin de modules exports no idont delet