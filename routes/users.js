var express = require('express');
var router = express.Router();
var controller=require('../controller/index2')
var upload = require('../controller/multer')
var ia=require('../controller/Sexto_integrante/ia')



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


router.get('/vertiendas',controller.buscartienda2)


router.post('/actualizar',upload.single('imagen'),controller.actualizarTienda);


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

router.get('/viewtwo',(req,res)=>{
    res.render('viewshop')

})


router.get('/dias',controller.dias)

router.get('/asistente',(req,res)=>{res.render('Sexto_integrante')})

router.post('/chat',ia.question)

router.get('/habilitado',controller.habilitado)






module.exports = router;
