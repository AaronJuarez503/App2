var express = require('express');
var router = express.Router();
var controlador = require('../controller/index')
var validator=require('../controller/validaciones')

/* GET home page. */
router.get('/',function(req, res) {
  res.render('inicio');
});
router.post('/',controlador.IniciarSesion)

router.get('/registrar',function(req, res) {
  res.render('crear');
});
router.post('/registrar',validator.Pregistrarse,controlador.RegistrarCliente)

router.get('/Bienvenido', function(req,res) {
  res.render('cliente')
});

router.get('/recuperar_cuenta', function(req, res){
  res.render('recuperacion')
});
router.post('/recuperar_cuenta', controlador.RecuperarCuenta)

router.get('/verificar_codigo', function(req, res){
  res.render('codigo')
});

module.exports = router;//no borrar 
