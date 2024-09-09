$(function() {

    $.ajax({
        url: '/users/compra',
        method: 'get',
        contentType: 'application/json',
        success: function(response) {
            // Redirige a la página de confirmación
            console.log(response)

            function separarPorMarcaId(datos) {
                const separados = {};
              
                datos.forEach(item => {
                  const marca = item.marca;
                  if (!separados[marca]) {
                    separados[marca] = [];
                  }
                  separados[marca].push(item);
                });
                console.log('datos'+separados)

                return separados;
              }
              var separar= separarPorMarcaId(response)

              console.log(separar)


              function crearTablas(datos) {
                var $container = $('#container');
                //$container.empty(); // Limpia el contenedor
                

                $.each(datos, function(id, productos) {
                    var $containerc = $('<div>').addClass('container')
                   // $containerc.appendTo($container)

                   
                    
                    var $tabla = $('<table>');
                    var $thead = $('<thead>').appendTo($tabla);
                    var $tbody = $('<tbody>').appendTo($tabla);

                    // Crear encabezado
                    $('<tr>')
                        .append('<th>Imagen</th>')
                        .append('<th>Nombre</th>')
                        .append('<th>Cantidad</th>')
                        .append('<th>Precio</th>')
                        .append('<th>Subtotal</th>')
                        .append('<th>Acción</th>')
                        .appendTo($thead);

                    var total = 0;
                   

                    // Crear filas
                    $.each(productos, function(i, producto) {
                       
                        var cantidad = 2; // Cantidad fija
                        var precio = 10.00; // Precio fijo
                        var subtotal = cantidad * precio;
                        total += subtotal;

                        $('<tr>')
                            .append('<td><img src="' + producto.imagen + '" alt="' + producto.nombre + '" width="50"></td>')
                            .append('<td>' + producto.nombre + '</td>')
                            .append('<td>' + cantidad + '</td>')
                            .append('<td>$' + precio.toFixed(2) + '</td>')
                            .append('<td>$' + subtotal.toFixed(2) + '</td>')
                            .append('<td><span class="trash-icon">🗑️</span></td>')
                            .appendTo($tbody);
                    });

                    // Agregar título y tabla al contenedor

                    var contenedor=`
                    <div class="container">
                        <div class="logo">
                            <img src="/placeholder.svg?height=100&width=100" alt="Logo de la empresa">
                    </div>
                    `
                  
                    $('<div>')
                    .addClass('logo')
                    .append('<img src="/placeholder.svg" alt="Logo de la empresa" width="100" height="100">').appendTo($containerc)
                   
                    $tabla.appendTo($containerc)
                    $('<div class="total-cell">').text('Total: $' + total.toFixed(2)).appendTo($containerc);
                });
            }

            

            // Llamar a las funciones para crear las tablas y el logo
           // crearLogoEmpresa();
            crearTablas(separar);
            
        





             /* for (const key in separar) {
                if (separar.hasOwnProperty(key)) {
                  const array = separar[key];
                  console.log(`Elementos con ID ${key}:`);
                  var rr=Modulo1.saludar('hola')
                  $('#container').append(rr)
                  array.forEach(item => {
                    console.log(`ID: ${item.id}, Nombre: ${item.nombre}`);
                    var rr2=Modulo1.saludar2('hola')
                    $('#table').append(rr2)
                  });
                  console.log("---------------------"); // Separador entre grupos
                }
              }*/

             


        },
        error: function(error) {
            console.error('Error al procesar la compra:', error);
            alert('Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.');
        }
    
})


})