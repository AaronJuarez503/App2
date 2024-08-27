var express = require('express');
var router = express.Router();
var controller=require('../controller/index2')

/* GET users listing. */
router.get('/',controller.marcas);


router.get('/products',controller.productos);


router.get('/pedirproductos',function (req,res) {
    const productoId = req.query.productoId;

    res.render('productos',{mensaje:productoId})
    
});



module.exports = router;
