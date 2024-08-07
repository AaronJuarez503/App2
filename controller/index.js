var conexion = require('../config/index')
var consulta = require('../model/index')
var correo= require('../controller/enviargmail')



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
      
    },
    IniciarSesion:function(req, res){
        const {user, pass} = req.body;

        consulta.IniciarSesion(conexion, {user, pass})
        .then(datos => {
            console.log('sesion iniciada con exito', datos)
             res.redirect('/inicioC')
        })
        .catch(error => {
            console.error('error al iniciar sesion', error)
            res.status(500).send('Error al iniciar sesion')
        })

    },
    RecuperarCuenta:function(req, res){
        const {correo} = req.body;

        consulta.RecuperarCuenta(conexion, {correo})
        .then(datos => {
            console.log('cuenta encontrada', datos)
            res.send('verificar_codigo')
        })
        .catch(error => {
            console.error('error al encontrar la cuenta', error)
            res.status(500).send('error al encontrar la cuenta')
        })

    },
    Nuevacontra:function(req, res){
        const {pass} = req.body;

        consulta.Nuevacontra(conexion, {pass})
        .then(datos => {
            console.log('contraseña actualizada', datos)
             res.redirect('/')
        })
        .catch(error => {
            console.error('error al actualizar la contraseña', error)
            res.status(500).send('error al actualizar la contraseña')
        })

    }
   
   
}//fin de modules exports no idont delet