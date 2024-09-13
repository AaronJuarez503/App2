var express = require('express');
var router = express.Router();
var controller=require('../controller/index2')

/* GET users listing. */
router.get('/',controller.marcas);


router.get('/product',controller.ppppp);



router.post('/tienda', controller.Insertartienda);

router.get('/pedirproductos',function (req,res) {
    const productoId = req.query.productoId;
    const imagen = req.query.imagen;
    console.log(productoId)

    res.render('productos',{mensaje:productoId,imagen:imagen})
    
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
   
    res.render('codigo_pedido');
});


router.get('/compra', (req, res) => {
    const items = req.session.compraItems || [];
    res.send(items)
});

router.get('/pedido', (req, res) => {
    const items = req.session.compraItems || [];
    res.send(items)
});


router.get('/vertiendas', (req, res) => {
    
    res.send("<center><h1 style='color: red;' >UPS! ocurrio un error estamos trabajando en ello regresa mas tarde</h1></center>")
});



router.post('/insert', controller.insertarpedido);

router.get('/pruebas',controller.pruebas )

router.get('/validarcodigo',controller.vercodigo)


router.get('/pedidos',controller.pedidos)

router.get('/pmarcas',controller.pmarcas)

router.get('/detalles',(req,res)=>{
    var imagen=req.query.imagen
    var marca=req.query.marca
    var fecha=req.query.fecha
    


    console.log(`imagen:${imagen} °° fecha ${fecha}°°marca ${marca}`)
    res.render('pagina_inicio/deltalles',{imagen,fecha,marca})
})

router.get('/pernisos',controller.productos)

router.get('/vertienda',controller.buscartienda)


router.get('/vercompras',controller.vercompras)

router.get('/verificarcodigo',controller.verificarcodigo)


module.exports = router;
