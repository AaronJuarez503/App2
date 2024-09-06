var express = require('express');
var router = express.Router();
var controlador = require('../controller/index')
var validator=require('../controller/validaciones')

/* GET home page. */
router.get('/',function(req, res) {
  res.render('inicio');
});
router.post('/',validator.Piniciar,controlador.IniciarSesion)

router.get('/registrar',function(req, res) {
  res.render('crear');
});
router.post('/registrar',validator.Pregistrarse,controlador.RegistrarCliente)

router.get('/recuperar_cuenta', function(req, res){
  res.render('recuperacion')
});
router.post('/recuperar_cuenta',validator.Precuperar,controlador.RecuperarCuenta)//validar correo

router.post('/rrrr1',validator.user,controlador.insertregistrer)

router.get('/verificar_codigo', function(req, res){ //introdusircodgio
  res.render('codigo')
});
router.post('/vcodigo',controlador.vcodigo)//validar codigo

router.get('/nueva_pass', function(req, res){
  res.render('updata_contra')
});
router.post('/nueva_pass',validator.PnuevaPass,controlador.Nuevacontra)

router.get('/inicioC', function(req, res){
  res.render('cliente')
});

router.get('/tienda',function(req,res){
  res.render('ingreso')
})
router.get('/productos',function(req,res){
  res.render('productos')
})
router.get('/pedido',function(req,res){
  res.render('estado_pedido')
})
router.get('/codigoventa',function(req,res){
  res.render('codigo_pedido')
})
router.post('/yyyyyy',validator.codigoventa,()=>{
  console.log('no habido errores')

})

router.get('/compras',function(req,res){
  res.render('compras')
})

router.get('/marca',function(req,res){
  res.render('marca')
})
router.get('/principal',function(req,res){
  res.render('pagina_inicio/index')
})

router.get('/codigoapp',function(req,res){
  res.render('codigove')
})

router.get('/fecha',function(req,res){
  res.render('pagina_inicio/deltalles')
})



module.exports = router;//no borrar 


