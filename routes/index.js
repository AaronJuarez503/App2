var express = require('express');
var router = express.Router();
var controlador = require('../controller/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro');
});

router.post('/',controlador.RegistrarCliente)


module.exports = router;//no borrar 
