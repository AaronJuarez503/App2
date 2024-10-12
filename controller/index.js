var conexion = require('../config/index')
var consulta = require('../model/index')
var email= require('../controller/enviargmail')
var aux=require('../controller/auxiliar')
var Gtoken = require('./Gtoken')

const bcrypt = require('bcrypt');

var gcodigo;

module.exports={
    iniciarsesion: async function (req,res) {
        const token = req.cookies.authToken;
        async function verificartoken() {
            try {
              var vtoken = await Gtoken.validarToken2(token);
              console.log("El token es válido:", vtoken);
              var rol = vtoken.rol;
              const touken = req.cookies.perfil;
              
              
            console.log("al macenado con exito")
             res.render('Pagina_inicio/index')
            } catch (error) {
              console.error("Error de validación del token:", error.message);
              if (error.message === "Token has expired.") {
                const refreshToken = req.cookies.refreshToken;
                try {
                  const decoded = await Gtoken.validarToken2(refreshToken);
                  const { rol, email } = decoded;
                  console.log("El token es válido:", decoded);
                  const tokennew = Gtoken.generarToken({ rol, email });
                  res.cookie('authToken', tokennew, { httpOnly: true, secure: true });
                  console.log("token refrescado exitosamente");
                  res.render('Pagina_inicio/index')
                } catch (error) {
                  console.error("Error de validación del token de actualización:", error.message);
                  if (error.message === "Token has expired." || error.message === "Token does not exist.") {
                    return res.render('inicio')
                  }
                  if (error.message === "Token is altered." || error.message === "Token verification failed.") {
                    return res.status(401).json({ message: "Token ha sido alterado", expired: true });
                  }
                }
              }
              if (error.message === "Token has expired." || error.message === "Token does not exist.") {
                return res.render('inicio')
              }
              if (error.message === "Token is altered." || error.message === "Token verification failed.") {
                return res.status(401).json({ message: "Token ha sido alterado", expired: true });
              }
            }
          }


          if (!token) {
            res.render('inicio')
        } else {
            verificartoken();
         }
    },

    RegistrarCliente:function(req,res){
       // console.log("datos"+req.body)
      // const {nom,apell,correo,pass} = req.body;

       req.session.datos=req.body;
   
       res.render('usuario')

    },


    insertregistrer:async function (req,res) {

          // Generar un salt


        try {
          const salt = await bcrypt.genSalt(10);
    
    // Encriptar la contraseña
         const contraseñaEncriptada = await bcrypt.hash(req.session.datos.pass, salt);

         
        console.log('datos para ingresar'+req.session.datos.nom)
        var rol=req.session.datos.rol;
        var nom=req.session.datos.nom;
        var apell=req.session.datos.apell;
        var correo=req.session.datos.correo;
        var pass=contraseñaEncriptada;
        var username = req.body.usuario
        console.log(req.session.datos)

            var datos = await consulta.RegistrarCliente(conexion,{username,correo,pass,rol})
            console.log('datos insertados')
            console.log(datos)
            var id = datos.insertId

            await consulta.Cliente(conexion,id,nom,apell)


            res.redirect('/principal')
            
        } catch (error) {
            console.error('error al insertar', error)
            res.status(500).send('Error al insertar')
            
        }

        
       
      
    },



    IniciarSesion:function(req, res){

        async  function para() {
            var username=req.body.username; 
            var password=req.body.password;
            console.log(password)
            // buscando usuario en la bd
            try {
                var  respuestabd = await consulta.buscarusuario(conexion,username)
                console.log("tu respuesta de la bd es  ; " )
                console.log( respuestabd)

                const esCorrecta = await bcrypt.compare(password, respuestabd.contrasena);
                
                if (esCorrecta) {
                  var rmarca= await consulta.buscarmarcas(conexion,respuestabd.id)
                console.log(rmarca)

                var play={
                    id:respuestabd.id,
                  

                   
                  }

                  if (rmarca!==false) {
                    play.tienda_id=rmarca.id,
                    play.tienda_nom=rmarca.nombre
                   
                  } 
                  console.log('no tienes tienda registrada todavia ')
                
                  var payload
                  var payload2
      
                  payload = {
                      id: respuestabd.id,
                      rol: respuestabd.rol,
                      nombre: respuestabd.usuario,
                      email: respuestabd.email
                  }
      
                  payload2 = {
                      id: respuestabd.id,
                      rol: respuestabd.rol,
                      nombre: respuestabd.usuario,
                      email: respuestabd.email
                  }
                  console.log(payload)
      
                  const token = Gtoken.generarToken(payload)
                  res.cookie('authToken', token, { httpOnly: true,secure: true })
      
                  const refreshToken = Gtoken.refreshToken(payload2)
                  res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true })

                  res.cookie('perfil',play,{ httpOnly: true,secure: true });

                  
                res.render('Pagina_inicio/index');

         

                 
                } else {
                  return res.render('inicio',{err:"usuario o contraseña incorrecto"});
                  
                }
                
                

                
    
    
             /*   const payload = {
                    rol:respuestabd.id_rol,
                    nombre:respuestabd.usuario,
                    email:respuestabd.correo,
                }
    
    
                const payload2 = {
                    rol:respuestabd.id_rol,
                    nombre:respuestabd.usuario,
                    email:respuestabd.correo,
                    refresh:'true'
                }
    
                console.log(payload)
               
                const token = Gtoken.generarToken(payload);
                res.cookie('authToken', token, { httpOnly: true,secure: true });
               // res.cookie('correo', respuestabd.correo,);
               // console.log("cokkie de correo almacenado con exito")
                const refreshToken = Gtoken.refreshToken(payload2);
                res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true });
                res.cookie('correo', respuestabd.correo, { httpOnly: true,secure: true });*/
    
              
                //aux.craertokens(res,respuestabd)
            } catch (error) {
                console.error('Error al buscar usuario:', error.message);
                res.render('inicio',{err:"usuario o contraseña incorrecto"});
            }
            
            }
    
            para()
        },

       /* req.session.correo;
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

    },*/

    RecuperarCuenta:function(req, res){
        const {correo} = req.body;

                req.session.correo=correo;


        consulta.RecuperarCuenta(conexion, {correo})
        .then(datos => {
            console.log('cuenta encontrada', datos)

            
             async function enviar () {
            
            
                try {
                  
                    const codigo = await email.generarcodigo()
                    console.log('tu codigo es : ' + codigo)
                    gcodigo = codigo;
                   // req.session.codigo[req.body.email] = codigo
                   
                   // console.log(req.session.codigo[req.body.email])
                   // console.log( "::::" + Object.keys(Verificacioncodes)+":::"+Object.values(Verificacioncodes) )
                  // res.render('login/codigo',{correo: req.session.correo})
                  res.redirect('/verificar_codigo')
                    const respuesta = await email.enviaremail(req.body.correo,codigo)
                   
                    console.log('Correo enviado correctamente : '+ respuesta);
                } catch (error) {
                    console.error('Error al enviar el correo : ', error);
                    res.status(500).send('Error al enviar el correo');
                    
                }
            }
    
         
              enviar();



        })
        .catch(error => {
            console.error('error al encontrar la cuenta', error)
            res.status(500).send('error al encontrar la cuenta')
        })


        



    },
    vcodigo:function(req,res){
        console.log(req.body)
        console.log("codigo generado :"+gcodigo)

        if (req.body.codigo==gcodigo) {
             res.redirect('/nueva_pass');
        } else {
            
             res.send("El codigo es incorrecto");
            
        }

        
        
    },
    Nuevacontra:function(req, res){
        const pass = req.body.password;
        console.log("tu correo que pedi es ;" + req.session.correo)

        const correo = req.session.correo;
        
        delete req.session.correo

        consulta.Nuevacontra(conexion,pass,correo)
        .then(datos => {
            console.log('contraseña actualizada', datos)
            res.json({ valid:true});

           //  res.redirect('/')
        })
        .catch(error => {
            console.error('error al actualizar la contraseña', error)
            res.json({ valid:false});
        })

    },
    findByEmail: async function (email) {
        try {
          return await consulta.FindByEmail(conexion,email);
        } catch (error) {
            console.error('correo no encontrado');
        }
    },

    findUser: async function (user) {
        try {
          return await consulta.FindUser(conexion,user);
        } catch (error) {
            console.error('usuario no encontrado');
        }
    },

    

}//fin de modules exports no idont delet