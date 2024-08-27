var express = require('express');
var router = express.Router();
var controller=require('../controller/index2')

/* GET users listing. */
router.get('/',controller.marcas);


router.get('/products',controller.productos);



router.post('/tienda', controller.Insertartienda);

router.get('/pedirproductos',function (req,res) {
    const productoId = req.query.productoId;
    console.log(productoId)

    res.render('productos',{mensaje:productoId})
    
});


router.post('/procesar-compra',function (req,res) {

    const items = req.body.items;
    // Aquí puedes procesar los items, guardarlos en una base de datos, etc.
    // Por ahora, simplemente los guardamos en la sesión
    req.session.compraItems = items;
    res.json({ success: true });
    
    

    //res.render('compras',{mensaje:productoId})
    
});

router.get('/confirmacion-compra', (req, res) => {
    const items = req.session.compraItems || [];
    res.render('confirmacion-compra', { items: items });
});






module.exports = router;
