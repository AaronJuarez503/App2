$(function () {
        Carrito.load()
       $('#mio').off('click', '#btn').on('click', '#btn', function() {
            var container = $(this).closest(".card");
            var headingContent = container.find("h3").text();
    
            var id = $(this).data('id');
            var id_marca = $(this).data('id_m');
            var imagen = $(this).data('mmarca');
    
            console.log(id,':',id_marca)
    
    
            const partes = headingContent.split('$');
            const nombre = partes[0].trim(); // Eliminar espacios al final
            const numeros = partes[1];
            console.log(nombre,':',numeros)
            
              
    
            var imageUrl = container.find('.imgBx').css("background-image").replace(/url\("?|"?\)$/g, '');
           
          
            
            var precio = parseFloat(numeros);
    
            var datos = {
                id:id,
                marca:id_marca,
                mmarca:imagen,
                nombre: nombre,
                imagen: imageUrl,
                precio: precio,
                cantidad: 1,
                total: precio
               
            };
            
            Carrito.add(datos);
            Carrito.save();
            Carrito.updateCount();
            Carrito.updateTotal();
            
        });

        $('#cart-items').off('click', '#men').on('click', '#men', function() {
            var id = $(this).data('id');
            console.log(id)
            Carrito.updateCantidad(id, -1);
           
        })

        $('#cart-items').off('click', '#man').on('click', '#man', function() {
            var id = $(this).data('id');
            console.log(id)
            Carrito.updateCantidad(id, 1);
            
        })

       $(document).on('click', '.remove-item', function() {
        var nombreProducto = $(this).closest('.cart-item').data('nombre');
        Carrito.remove(nombreProducto);
        $(this).closest('.cart-item').remove();
        Carrito.save();
        Carrito.updateCount();
        Carrito.updateTotal();
        
        });
    });


    
