var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'order_shop',
    user: 'root',
    password: ''
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion exitosa.....');
    }
});

module.exports = conexion;