$(function(){

    

    $.ajax({
        url: `/users/products`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            
            console.log('Datos recibidos:', data);

            function crearDivConElementos(clase, textoH3, textoSpan, textoP, textoButton1, textoButton2, textoButton3) {
                var $div = $('<div>', { class: clase });
                var $h3 = $('<h3>', { text: textoH3 });
                var $span = $('<span>', { text: textoSpan });
                var $p = $('<p>', { text: textoP });
                var $button1 = $('<button>', { text: textoButton1 });
                var $input = $('<input>', { type: 'text', value: '0', readonly: true });
                var $button2 = $('<button>', { text: textoButton2 });
                var $button3 = $('<button>', { text: textoButton3 });

                $button1.on('click', function() {
                    var currentValue = parseInt($input.val(), 10);
                    if (currentValue > 0) {
                        $input.val(currentValue - 1);
                    }
                });

                $button2.on('click', function() {
                    var currentValue = parseInt($input.val(), 10);
                    $input.val(currentValue + 1);
                });

                $button3.on('click', function() {
                    var cantidad = parseInt($input.val(), 10);
                    if (cantidad > 0) {
                        alert(`${textoH3} agregado al carrito con cantidad: ${cantidad}`);
                    } else {
                        alert('Por favor, selecciona una cantidad mayor a 0.');
                    }
                });

                $div.append($h3)
                .append($span)
                .append($p)
                .append($button1)
                .append($input)
                .append($button2)
                .append($button3);
                return $div;
            
        }
        data.forEach(function(item) {
            var $itemDiv = crearDivConElementos('item-con-imagen', item.nombre, item.precio, item.descripcion,'decrement', 'increment', 'agregar al carrito');
            $('#mio').append($itemDiv);})


            

             /*
            for (let index = 0; index < array.length; index++) {
                const element = array[index];

                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    
                }
                
            }*/
            
        },

        error: function(xhr, status, error) {
            console.error('Error en la petición AJAX:', error);
            $('#resultado').html('Error al cargar los datos');
        }
    });

})