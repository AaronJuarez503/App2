$('#mio ').on('click', function(e) {
   let list = [];


    $('#mio').off('click', '#btn').on('click', '#btn', function() {
        var container = $(this).closest(".container");
        var headingContent = container.find("h3").text();
        var imageUrl = container.find('.imgBx').css("background-image").replace(/url\("?|"?\)$/g, '');
        var precio = container.find("span").text();

        var datos = {
            nombre: headingContent,
            imagen: imageUrl,
            precio: precio,
            cantidad: 1
        };

        let productoExistente = list.find(item => item.nombre === datos.nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
            actualizarCantidadEnUI(productoExistente);
        } else {
            list.push(datos);
            agregarNuevoProductoAUI(datos);
        }

        console.log(list);
    });

function actualizarCantidadEnUI(producto) {
    $(`.cart-item:contains('${producto.nombre}') .item-quantity`).text(`Cantidad: ${producto.cantidad}`);
}

function agregarNuevoProductoAUI(producto) {
    var html = `
        <div class="cart-item" data-nombre="${producto.nombre}">
            <div class="item-image" style="background-image: url('${producto.imagen}')"></div>
            <div class="item-info">
                <div class="item-name">${producto.nombre}</div>
                <div class="item-price">$${producto.precio}</div>
                <div class="item-quantity">Cantidad: ${producto.cantidad}</div>
            </div>
            <span class="remove-item">×</span>
        </div>
    `;
    $('.float-div').append(html);
}

// Evento para eliminar un item del carrito
$('.float-div').on('click', '.remove-item', function() {
    var nombreProducto = $(this).closest('.cart-item').data('nombre');
    list = list.filter(item => item.nombre !== nombreProducto);
    $(this).closest('.cart-item').remove();
    console.log(list);
});

// Cerrar el carrito
$('.float-div').on('click', '.close-btn', function() {
    $('.float-div').hide();
});


    //const r = $(e.target).attr('data-id');
    /*$('#mio').off('click', '#btn').on('click', '#btn', function() {

        var headingContent = $(this).closest(".container").find("h3").text()
        var imageUrl = $(this).closest(".container").find('.imgBx').css("background-image");
        imageUrl = imageUrl.replace(/url\("?/, '').replace(/\"?\)/, '');
        var precio = $(this).closest(".container").find("span").text()





        var list=[]


        var datos={
            nombre:headingContent,
            imagen:imageUrl,
            precio:precio,
            cantidad:1
        }

        let productoExistente = list.find(item => item.nombre === datos.nombre);

                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    list.push(datos);
                }


      


        console.log(list)
        
        
       
       
       // console.log("URL de la imagen: " + backgroundImage);



       var html=`
                <div class="cart-item">
                <div class="item-image" style="background-image: url('${imageUrl}')"></div>
                <div class="item-info">
                <div class="item-name">${headingContent}</div>
                <div class="item-price">$${precio}</div>
                <div class="item-quantity">Cantidad:${datos.cantidad}</div>
                </div>
                <span class="remove-item">×</span>
            </div>
            <span class="close-btn">×</span>
            </div>
       `

       $('.float-div').append(html)

       
       
        

        


   
       
        
    })*/



 
   
    





   
    
    


    
});
