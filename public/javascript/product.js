$(function() {

    $.ajax({
        url: '/users/products',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Datos recibidos:', data);

            data.forEach(function(item) {
                // Clonar la tarjeta existente
                var $template = $('.container').first().clone();

                // Actualizar los elementos de la tarjeta con los datos del producto
                $template.find('h3').html(`${item.nombre}<br><span>$${item.precio}</span>`);
                $template.find('p').text(item.descripcion);
                $template.find('.imgBx').css('background-image', `url(${item.imagen})`);

                // Obtener y configurar los elementos de la tarjeta
                var $input = $template.find('input[type="text"]');
                var $button1 = $template.find('button').eq(0);
                var $button2 = $template.find('button').eq(1);
               // var $button3 = $template.find('button').eq(2);

                // Funcionalidad para decrementar
                $button1.on('click', function() {
                    var currentValue = parseInt($input.val(), 10);
                    if (currentValue > 0) {
                        $input.val(currentValue - 1);
                    }
                });

                // Funcionalidad para incrementar
                $button2.on('click', function() {
                    var currentValue = parseInt($input.val(), 10);
                    $input.val(currentValue + 1);
                });

                // Funcionalidad para agregar al carrito
               /* $button3.on('click', function() {
                    var cantidad = parseInt($input.val(), 10);
                    if (cantidad > 0) {
                        alert(`${item.nombre} agregado al carrito con cantidad: ${cantidad}`);
                    } else {
                        alert('Por favor, selecciona una cantidad mayor a 0.');
                    }
                });*/

                // Añadir la tarjeta actualizada al contenedor
                $('#mio').append($template);
            });

            // Elimina la tarjeta original si no deseas mantenerla
            $('.card').first().remove();
        }
    });


    
});