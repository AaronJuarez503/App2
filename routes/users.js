var express = require('express');
var router = express.Router();
var controller=require('../controller/index2')

/* GET users listing. */
router.get('/',controller.marcas);


router.get('/pr0ducts/:id',controller.marcas);



module.exports = router;
