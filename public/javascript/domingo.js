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
               // $container.empty(); // Limpia el contenedor
                

                $.each(datos, function(id, productos) {
                    var $containerc = $('<div>').addClass('container')
                    $containerc.appendTo($container)
                   
                   //var r = $cacezera.appendTo($tabal);

                   //console.log(r)

                   
                    
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
                    var img;
                    var id;
                
                    // Crear filas
                    $.each(productos, function(i, producto) {
                       img=producto.mmarca;
                       id=producto.marca;
                       
                        var subtotal = producto.cantidad * producto.precio;
                        total += subtotal;

                        $('<tr  id="'+producto.id+'">')
                            .append('<td data-label="Imagen"><img src="' + producto.imagen + '" alt="' + producto.nombre + '" width="50"></td>')
                            .append('<td data-label="Nombre">' + producto.nombre + '</td>')
                            .append('<td data-label="Cantidad">' + producto.cantidad + '</td>')
                            .append('<td data-label="Precio">$' + producto.precio + '</td>')
                            .append('<td data-label="Subtotal">$' + producto.total + '</td>')
                            .append(`<td id="btn" data-cell=${producto.marca} data-id="${producto.id}" data-label="Acción"><span class="trash-icon">🗑️</span></td>`)
                            .appendTo($tbody);
                    });

                    $('<div>')
                    .addClass('logo')
                    .append('<img src="'+img+'" alt="Logo de la empresa" width="100" height="100">').appendTo($containerc)
                   
                    $tabla.appendTo($containerc)
                    $(`<div id="${id}" class="total-cell">`).text('Total: $' + total).appendTo($containerc);
                });
            }

            

            // Llamar a las funciones para crear las tablas y el logo
           // crearLogoEmpresa();
            crearTablas(separar);

        },
        error: function(error) {
            console.error('Error al procesar la compra:', error);
            alert('Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.');
        }
    
}) //fin




$('#container').off('click', '#btn').on('click', '#btn', function() {
    var id=  $(this).data('id')
    console.log(id)

    var div = $(this).data("cell");


      console.log('el id del div es ',div)

    $(`#${id}`).closest('tr').remove();
    Carrito.delete(id,div);
    

})




})

