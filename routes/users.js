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

    console.log(items)
    res.json({ success: true });
    
    

    //res.render('compras',{mensaje:productoId})
    
});

router.get('/confirmacion-compra', (req, res) => {
   
    res.render('compras');
});


router.get('/compra', (req, res) => {
    const items = req.session.compraItems || [];
    res.send(items)
});

router.get('/pedido', (req, res) => {
    const items = req.session.compraItems || [];
    res.send(items)
});


router.get('/vertienda', (req, res) => {
    
    res.send("<center><h1 style='color: red;' >UPS! ocurrio un error estamos trabajando en ello regresa mas tarde</h1></center>")
});






module.exports = router;
