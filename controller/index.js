var conexion = require('../config/index')
var consulta = require('../model/index')

module.exports={

    RegistrarCliente:function(req,res){
        console.log(req.body)
        const {nom,apell,user,correo,pass} = req.body;

        consulta.RegistrarCliente(conexion,{nom,apell,user,correo,pass})
        .then(datos => {
            console.log('datos insertados con exito',datos)
            res.redirect('/')
        })
        .catch(error => {
            console.error('error al insertar', error)
            res.status(500).send('Error al insertar')
        })
      
    }
   
   
}//fin de modules exports no idont delet