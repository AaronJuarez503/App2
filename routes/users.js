var express = require('express');
var router = express.Router();
var controller=require('../controller/index2')

/* GET users listing. */
router.get('/',controller.marcas);


router.get('/products',controller.productos);


router.post('/tienda', controller.Insertartienda);


module.exports = router;
