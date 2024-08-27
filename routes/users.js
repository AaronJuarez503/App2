var express = require('express');
var router = express.Router();
var controller=require('../controller/index2')

/* GET users listing. */
router.get('/',controller.marcas);


router.get('/products',controller.productos);



router.post('/tienda', controller.Insertartienda);

router.get('/pedirproductos',function (req,res) {
    const productoId = req.query.productoId;

    res.render('productos',{mensaje:productoId})
    
});


router.get('/detalles',function (req,res) {
    const producto = req.query.products;
    console.log(producto)

    //res.render('compras',{mensaje:productoId})
    
});



module.exports = router;
